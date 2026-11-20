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

    const now = new Date();
    const leadId = `SASH-${now.getTime()}`;
    const timestampFormatted = now.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

    const record = {
      leadId,
      timestamp: timestampFormatted,
      fullName,
      mobile: mobileNormalized,
      selectedPlan,
      email: email || "",
      message: message || "",
      receivedAt: now.toISOString(),
    };

    // Structured server log for CRM / webhook / email tracking
    console.info("[SASH_LEAD_SUBMISSION]", JSON.stringify(record));

    // Forward to Google Sheet via Google Apps Script Web App
    const googleScriptUrl =
      process.env.GOOGLE_SCRIPT_URL?.trim() ||
      process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL?.trim();

    let sheetSynced = false;

    if (googleScriptUrl) {
      try {
        // Universal payload with alias keys (name/fullName, phone/mobile, plan/selectedPlan)
        // ensures compatibility with any Google Apps Script implementation
        const sheetPayload = {
          timestamp: timestampFormatted,
          leadId,
          name: fullName,
          fullName,
          phone: mobileNormalized,
          mobile: mobileNormalized,
          plan: selectedPlan,
          selectedPlan,
          email: email || "",
          message: message || "",
        };

        const targetUrl = new URL(googleScriptUrl);
        // Add query parameters as well so scripts that inspect e.parameter work out-of-the-box
        Object.entries(sheetPayload).forEach(([key, val]) => {
          targetUrl.searchParams.set(key, String(val));
        });

        const sheetRes = await fetch(targetUrl.toString(), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(sheetPayload),
          redirect: "follow",
          signal: AbortSignal.timeout(12000),
        });

        const sheetResText = await sheetRes.text();
        console.info(
          `[SASH_GOOGLE_SHEET_RESPONSE] status=${sheetRes.status}:`,
          sheetResText.slice(0, 300)
        );

        sheetSynced = sheetRes.ok;
      } catch (sheetErr) {
        console.error(
          "[SASH_GOOGLE_SHEET_FORWARD_ERROR]",
          sheetErr instanceof Error ? sheetErr.message : String(sheetErr)
        );
      }
    } else {
      console.warn(
        "[SASH_GOOGLE_SHEET_WARNING] GOOGLE_SCRIPT_URL is not set in environment."
      );
    }

    return NextResponse.json(
      {
        ok: true,
        message: "Thank you! Your enquiry has been received. Our team will call you back shortly.",
        leadId: record.leadId,
        sheetSynced,
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
