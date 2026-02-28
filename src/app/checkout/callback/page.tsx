import Link from "next/link";

type PageProps = {
  searchParams:
    | {
        reference?: string;
        trxref?: string;
      }
    | Promise<{
        reference?: string;
        trxref?: string;
      }>;
};

type PaystackVerifyData = {
  status?: string;
  reference?: string;
  amount?: number;
  currency?: string;
  paid_at?: string | null;
  customer?: {
    email?: string;
  };
};

type PaystackVerifyResponse = {
  status?: boolean;
  message?: string;
  data?: PaystackVerifyData;
};

async function verifyTransaction(reference: string) {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  if (!secretKey) {
    return {
      ok: false,
      message: "PAYSTACK_SECRET_KEY is not configured on the server.",
      data: null as PaystackVerifyData | null,
    };
  }

  const response = await fetch(
    `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${secretKey}`,
      },
      cache: "no-store",
    }
  );

  let payload: PaystackVerifyResponse;
  try {
    payload = (await response.json()) as PaystackVerifyResponse;
  } catch {
    return {
      ok: false,
      message: "Could not parse verification response from Paystack.",
      data: null as PaystackVerifyData | null,
    };
  }

  if (!response.ok || !payload.status || !payload.data) {
    return {
      ok: false,
      message: payload.message ?? "Payment verification failed.",
      data: payload.data ?? null,
    };
  }

  return {
    ok: true,
    message: payload.message ?? "Verification complete.",
    data: payload.data,
  };
}

export default async function CheckoutCallbackPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await Promise.resolve(searchParams);
  const reference = resolvedSearchParams.reference ?? resolvedSearchParams.trxref ?? "";

  if (!reference) {
    return (
      <main className="bg-[#c7d5f0] px-6 pb-28 pt-48 text-[#213864] md:pt-52">
        <div className="mx-auto max-w-[800px] rounded-3xl bg-white p-8 font-paragraph">
          <h1 className="text-3xl font-title-italic tracking-tight">Payment Callback</h1>
          <p className="mt-3 text-base text-black/80">
            No transaction reference was provided in the callback URL.
          </p>
          <Link
            href="/checkout"
            className="mt-6 inline-flex rounded-full bg-[#213864] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1a2f57]"
          >
            Back to checkout
          </Link>
        </div>
      </main>
    );
  }

  const verification = await verifyTransaction(reference);
  const paymentStatus = verification.data?.status ?? "unknown";
  const isSuccess = verification.ok && paymentStatus === "success";

  return (
    <main className="bg-[#c7d5f0] px-6 pb-28 pt-48 text-[#213864] md:pt-52">
      <div className="mx-auto max-w-[800px] rounded-3xl bg-white p-8 font-paragraph">
        <h1 className="text-3xl font-title-italic tracking-tight">
          {isSuccess ? "Payment Successful" : "Payment Status"}
        </h1>
        <p className="mt-3 text-base text-black/80">
          {isSuccess
            ? "Your transaction was verified successfully."
            : `We received your callback, but status is "${paymentStatus}".`}
        </p>

        <div className="mt-6 grid gap-2 rounded-2xl bg-[#f7f9ff] p-5 text-sm text-black">
          <p>
            <span className="font-semibold text-[#213864]">Reference:</span> {reference}
          </p>
          <p>
            <span className="font-semibold text-[#213864]">Verify Message:</span>{" "}
            {verification.message}
          </p>
          {typeof verification.data?.amount === "number" ? (
            <p>
              <span className="font-semibold text-[#213864]">Amount:</span> KSH{" "}
              {(verification.data.amount / 100).toLocaleString("en-KE")}
            </p>
          ) : null}
          {verification.data?.customer?.email ? (
            <p>
              <span className="font-semibold text-[#213864]">Email:</span>{" "}
              {verification.data.customer.email}
            </p>
          ) : null}
        </div>

        <div className="mt-6 flex items-center gap-3">
          <Link
            href="/checkout"
            className="inline-flex rounded-full bg-[#213864] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#1a2f57]"
          >
            Back to checkout
          </Link>
          <Link
            href="/products"
            className="inline-flex rounded-full border border-[#213864]/30 px-4 py-2 text-sm font-semibold text-[#213864] transition hover:bg-[#213864] hover:text-white"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    </main>
  );
}
