import { NextRequest, NextResponse } from "next/server";
import { sendToHandler } from "@/lib/handler-client";
import { DEMO_MODE, DEMO_USER } from "@/lib/demo-mode";

export async function POST(req: NextRequest) {
  let userId: string;
  let orgId: string | null = null;
  let email: string;

  if (DEMO_MODE) {
    userId = DEMO_USER.userId;
    orgId = DEMO_USER.orgId;
    email = DEMO_USER.email;
  } else {
    const { auth, currentUser } = await import("@clerk/nextjs/server");
    const session = await auth();
    if (!session.userId) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    userId = session.userId;
    orgId = session.orgId ?? null;
    const user = await currentUser();
    email = user?.emailAddresses?.[0]?.emailAddress || "";
  }

  const body = await req.json();
  const message = body.message?.trim();
  if (!message) {
    return NextResponse.json(
      { error: "El mensaje no puede estar vacio" },
      { status: 400 }
    );
  }

  try {
    const companyId = orgId || userId;
    const response = await sendToHandler({
      companyId,
      userId,
      userEmail: email,
      message,
    });
    return NextResponse.json({ message: response.message });
  } catch (error) {
    console.error("Handler error:", error);
    return NextResponse.json(
      { error: "Error al procesar tu mensaje. Por favor intenta de nuevo." },
      { status: 503 }
    );
  }
}
