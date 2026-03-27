import { NextRequest, NextResponse } from "next/server";
import { DEMO_MODE, DEMO_USER } from "@/lib/demo-mode";
import { searchTokko, parsePropertyQuery, formatPropertiesMessage } from "@/lib/tokko-client";

// Demo Tokko API key (replace with per-tenant key from DB in production)
const DEMO_TOKKO_KEY = process.env.TOKKO_API_KEY || "";

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

  // Check if this is a property search query
  const propertyFilters = parsePropertyQuery(message);

  if (propertyFilters) {
    try {
      const result = await searchTokko({
        api_key: DEMO_TOKKO_KEY,
        ...propertyFilters,
        limit: 3,
      });
      const reply = formatPropertiesMessage(
        result.propiedades,
        result.total,
        propertyFilters
      );
      return NextResponse.json({ message: reply, properties: result.propiedades });
    } catch (error) {
      console.error("Tokko search error:", error);
      return NextResponse.json({
        message: "Hubo un error al buscar propiedades. Por favor intenta de nuevo.",
      });
    }
  }

  // Non-property messages: respond with helpful context
  const lower = message.toLowerCase();

  if (lower.includes("hola") || lower.includes("buenas") || lower.includes("buen dia")) {
    return NextResponse.json({
      message:
        "Hola! Soy el asistente de **Real Lead Tools**. Puedo ayudarte a buscar propiedades en tu catalogo de Tokko Broker.\n\nProba con algo como:\n- \"Busca departamentos en alquiler\"\n- \"Casas en venta en Centro\"\n- \"Departamentos de 2 ambientes\"",
    });
  }

  if (lower.includes("ayuda") || lower.includes("help") || lower.includes("que podes hacer")) {
    return NextResponse.json({
      message:
        "Puedo buscar propiedades en tu catalogo de Tokko Broker. Decime que buscas:\n\n" +
        "**Tipo de operacion:** venta, alquiler, temporario\n" +
        "**Tipo de propiedad:** departamento, casa, oficina, local, PH, terreno\n" +
        "**Filtros:** ambientes, precio, zona/barrio, moneda (USD/ARS)\n\n" +
        "Ejemplo: _\"Busca departamentos en alquiler de 2 ambientes en Centro\"_",
    });
  }

  if (lower.includes("mas resultado") || lower.includes("ver mas") || lower.includes("mostrar mas")) {
    return NextResponse.json({
      message: "Para ver mas resultados, repeti tu busqueda. Por ejemplo: _\"Busca mas departamentos en alquiler\"_",
    });
  }

  return NextResponse.json({
    message:
      "No estoy seguro de que buscas. Puedo ayudarte a encontrar propiedades en Tokko Broker.\n\n" +
      "Proba con: _\"Busca departamentos en alquiler\"_ o _\"Casas en venta en Centro\"_",
  });
}
