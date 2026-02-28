import { createHmac, timingSafeEqual } from "node:crypto";

import { NextRequest, NextResponse } from "next/server";

import { hasSupabaseServiceRole, supabaseServer } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

function signaturesMatch(expected: string, incoming: string) {
  const expectedBuffer = Buffer.from(expected, "utf8");
  const incomingBuffer = Buffer.from(incoming, "utf8");

  if (expectedBuffer.length !== incomingBuffer.length) {
    return false;
  }

  return timingSafeEqual(expectedBuffer, incomingBuffer);
}

export async function POST(request: NextRequest) {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json(
      { message: "Server is missing PAYSTACK_SECRET_KEY." },
      { status: 500 }
    );
  }

  const signature = request.headers.get("x-paystack-signature");
  if (!signature) {
    return NextResponse.json({ message: "Missing Paystack signature." }, { status: 401 });
  }

  const rawBody = await request.text();
  const computedSignature = createHmac("sha512", secretKey).update(rawBody).digest("hex");

  if (!signaturesMatch(computedSignature, signature)) {
    return NextResponse.json({ message: "Invalid Paystack signature." }, { status: 401 });
  }

  let eventPayload: unknown;
  try {
    eventPayload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ message: "Invalid webhook payload." }, { status: 400 });
  }

  if (!eventPayload || typeof eventPayload !== "object") {
    return NextResponse.json({ message: "Invalid webhook payload shape." }, { status: 400 });
  }

  const eventObject = eventPayload as Record<string, unknown>;
  const eventName = typeof eventObject.event === "string" ? eventObject.event : "";
  const eventData =
    eventObject.data && typeof eventObject.data === "object"
      ? (eventObject.data as Record<string, unknown>)
      : null;
  const reference = eventData && typeof eventData.reference === "string"
    ? eventData.reference
    : null;

  if (!reference) {
    return NextResponse.json({ message: "Webhook payload missing reference." }, { status: 400 });
  }

  const paymentStatus =
    eventName === "charge.success"
      ? "success"
      : eventName === "charge.failed"
        ? "failed"
        : null;

  if (!paymentStatus) {
    return NextResponse.json({ received: true, ignored: true });
  }

  if (!supabaseServer) {
    console.warn(
      "Supabase client is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
    );
    return NextResponse.json({ received: true, persisted: false });
  }

  if (!hasSupabaseServiceRole) {
    console.warn(
      "SUPABASE_SERVICE_ROLE_KEY is not configured. Webhook cannot update order statuses."
    );
    return NextResponse.json({ received: true, persisted: false });
  }

  const { error: updateError } = await supabaseServer
    .from("orders")
    .update({
      payment_status: paymentStatus,
      paystack_payload: eventPayload,
    })
    .eq("paystack_reference", reference);

  if (updateError) {
    console.error("Failed to update order status from webhook:", updateError.message);
    return NextResponse.json({ message: "Failed to persist webhook." }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
