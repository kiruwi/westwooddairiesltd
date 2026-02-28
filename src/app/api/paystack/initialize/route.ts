import { NextRequest, NextResponse } from "next/server";

import { supabaseServer } from "@/lib/supabaseAdmin";

type InitializeRequest = {
  email?: unknown;
  amountKsh?: unknown;
  metadata?: unknown;
};

type PaystackInitializeData = {
  authorization_url?: string;
  access_code?: string;
  reference?: string;
};

type PaystackInitializeResponse = {
  status?: boolean;
  message?: string;
  data?: PaystackInitializeData;
};

type CheckoutMetadataItem = {
  slug: string;
  name: string;
  quantity: number;
  lineTotalKsh: number;
};

function isCheckoutMetadataItem(value: unknown): value is CheckoutMetadataItem {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.slug === "string" &&
    typeof candidate.name === "string" &&
    typeof candidate.quantity === "number" &&
    Number.isFinite(candidate.quantity) &&
    typeof candidate.lineTotalKsh === "number" &&
    Number.isFinite(candidate.lineTotalKsh)
  );
}

function extractCheckoutItems(metadata: unknown): CheckoutMetadataItem[] {
  if (!metadata || typeof metadata !== "object") {
    return [];
  }

  const items = (metadata as Record<string, unknown>).items;
  if (!Array.isArray(items)) {
    return [];
  }

  return items.filter(isCheckoutMetadataItem);
}

function getBaseUrl(request: NextRequest) {
  const proto = request.headers.get("x-forwarded-proto");
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");

  if (!host) return null;
  const resolvedProto = proto ?? (host.includes("localhost") ? "http" : "https");
  return `${resolvedProto}://${host}`;
}

export async function POST(request: NextRequest) {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json(
      { message: "Server is missing PAYSTACK_SECRET_KEY." },
      { status: 500 }
    );
  }

  let payload: InitializeRequest;
  try {
    payload = (await request.json()) as InitializeRequest;
  } catch {
    return NextResponse.json({ message: "Invalid JSON payload." }, { status: 400 });
  }

  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const amountKsh = typeof payload.amountKsh === "number" ? payload.amountKsh : NaN;
  const metadata = payload.metadata;

  if (!email || !email.includes("@")) {
    return NextResponse.json({ message: "A valid customer email is required." }, { status: 400 });
  }

  if (!Number.isFinite(amountKsh) || amountKsh <= 0) {
    return NextResponse.json({ message: "Amount must be greater than zero." }, { status: 400 });
  }

  const amountMinor = Math.round(amountKsh * 100);
  const baseUrl = getBaseUrl(request);
  const callbackUrl =
    process.env.PAYSTACK_CALLBACK_URL ??
    (baseUrl ? `${baseUrl}/checkout/callback` : null);

  if (!callbackUrl) {
    return NextResponse.json(
      { message: "Unable to resolve callback URL. Set PAYSTACK_CALLBACK_URL." },
      { status: 500 }
    );
  }

  const paystackResponse = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secretKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      amount: amountMinor,
      callback_url: callbackUrl,
      metadata,
      currency: "KES",
    }),
    cache: "no-store",
  });

  let responseBody: PaystackInitializeResponse;
  try {
    responseBody = (await paystackResponse.json()) as PaystackInitializeResponse;
  } catch {
    return NextResponse.json(
      { message: "Could not parse response from Paystack." },
      { status: 502 }
    );
  }

  if (!paystackResponse.ok || !responseBody.status || !responseBody.data?.authorization_url) {
    return NextResponse.json(
      { message: responseBody.message ?? "Failed to initialize Paystack transaction." },
      { status: 502 }
    );
  }

  const paystackReference = responseBody.data.reference ?? null;
  const checkoutItems = extractCheckoutItems(metadata);

  if (supabaseServer) {
    const { error: insertError } = await supabaseServer.from("orders").insert({
      customer_email: email,
      total_ksh: Math.round(amountKsh),
      currency: "KES",
      items: checkoutItems,
      payment_provider: "paystack",
      paystack_reference: paystackReference,
      payment_status: "pending",
    });

    if (insertError) {
      console.error("Failed to persist order in Supabase:", insertError.message);
    }
  } else {
    console.warn(
      "Supabase client is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
    );
  }

  return NextResponse.json({
    authorizationUrl: responseBody.data.authorization_url,
    reference: paystackReference,
    accessCode: responseBody.data.access_code ?? null,
    callbackUrl,
  });
}
