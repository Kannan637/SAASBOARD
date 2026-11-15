import { NextResponse } from "next/server";

interface LeadRequestPayload {
  fullName: string;
  mobile: string;
  selectedPlan: string;
  email?: string;
  message?: string;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<LeadRequestPayload>;

    const fullName = (body.fullName ?? "").trim();
    const mobileRaw = (body.mobile ?? "").trim();
    const selectedPlan = (body.selectedPlan ?? "").trim();
    const email = (body.email ?? "").trim();
    const message = (body.message ?? "").trim();

    if (!fullName || fullName.length < 2) {
      return NextResponse.json(
        { error: "Please enter your name." },
        { status: 400 }
      );
    }

    const mobileNormalized = mobileRaw.replace(/[\s-]/g, "");
    const indianMobileRegex = /^(?:\+91)?[6-9]\d{9}$/;
    if (!indianMobileRegex.test(mobileNormalized)) {
      return NextResponse.json(
        {
          error:
            "Please enter a valid 10-digit Indian mobile number (optional +91 prefix).",
        },
        { status: 400 }
      );
    }

    if (!selectedPlan) {
      return NextResponse.json(
        { error: "Please select a plan option." },
        { status: 400 }
      );
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const record = {
      leadId: `SASH-${Date.now()}`,
      fullName,
      mobile: mobileNormalized,
      selectedPlan,
      email: email || null,
      message: message || null,
      receivedAt: new Date().toISOString(),
    };

    // Structured server log for CRM / webhook / email integration
    console.info("[SASH_LEAD_SUBMISSION]", JSON.stringify(record));

    return NextResponse.json(
      {
        ok: true,
        message: "Thank you. Our team will call you back shortly.",
        leadId: record.leadId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[SASH_LEAD_ERROR]", error);
    return NextResponse.json(
      {
        error:
          "Unable to submit your request right now. Please call us directly at +91 90030 09353.",
      },
      { status: 500 }
    );
  }
}

