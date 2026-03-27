/**
 * Client for searching properties via the handler's Tokko endpoint.
 */

const HANDLER_URL = process.env.HANDLER_URL || "http://localhost:8000";

interface TokkoSearchParams {
  api_key: string;
  operation_type?: number;
  property_type?: number;
  rooms?: number;
  price_from?: number;
  price_to?: number;
  currency?: string;
  location?: string;
  limit?: number;
  offset?: number;
}

export interface TokkoProperty {
  id: number | null;
  titulo: string;
  tipo: string;
  operacion: string;
  precio: number | null;
  moneda: string;
  ambientes: number | null;
  banos: number | null;
  cocheras: number | null;
  superficie_cubierta: number | null;
  superficie_total: number | null;
  direccion: string;
  zona: string;
  descripcion: string;
  foto: string | null;
  url: string;
}

interface TokkoSearchResult {
  propiedades: TokkoProperty[];
  total: number;
}

export async function searchTokko(params: TokkoSearchParams): Promise<TokkoSearchResult> {
  const query = new URLSearchParams();
  query.set("api_key", params.api_key);
  if (params.operation_type) query.set("operation_type", String(params.operation_type));
  if (params.property_type) query.set("property_type", String(params.property_type));
  if (params.rooms) query.set("rooms", String(params.rooms));
  if (params.price_from) query.set("price_from", String(params.price_from));
  if (params.price_to) query.set("price_to", String(params.price_to));
  if (params.currency) query.set("currency", params.currency);
  if (params.location) query.set("location", params.location);
  query.set("limit", String(params.limit || 3));
  query.set("offset", String(params.offset || 0));

  const res = await fetch(`${HANDLER_URL}/tools/tokko/search?${query.toString()}`);
  if (!res.ok) {
    throw new Error(`Tokko search failed: ${res.status}`);
  }
  return res.json();
}

/**
 * Parse a user message to extract property search filters.
 * Returns null if the message doesn't seem to be about properties.
 */
export function parsePropertyQuery(message: string): Partial<TokkoSearchParams> | null {
  const lower = message.toLowerCase();

  // Keywords that indicate property search
  const propertyKeywords = [
    "propiedad", "propiedades", "departamento", "depto", "deptos", "casa", "casas",
    "oficina", "local", "ph", "terreno", "galpon", "alquiler", "alquilar", "venta",
    "vender", "comprar", "busca", "busco", "buscando", "necesito", "quiero",
    "ambientes", "dormitorios", "habitaciones", "cochera", "garage",
    "inmueble", "inmuebles", "disponible", "disponibles",
  ];

  const isPropertyQuery = propertyKeywords.some((k) => lower.includes(k));
  if (!isPropertyQuery) return null;

  const filters: Partial<TokkoSearchParams> = {};

  // Operation type
  if (lower.includes("alquil") || lower.includes("renta") || lower.includes("arriend")) {
    filters.operation_type = 2;
  } else if (lower.includes("vent") || lower.includes("compr")) {
    filters.operation_type = 1;
  } else if (lower.includes("temporar") || lower.includes("temporal")) {
    filters.operation_type = 3;
  }

  // Property type
  if (lower.includes("depto") || lower.includes("departamento")) {
    filters.property_type = 2;
  } else if (lower.includes("casa")) {
    filters.property_type = 3;
  } else if (lower.includes("oficina")) {
    filters.property_type = 5;
  } else if (lower.includes("local")) {
    filters.property_type = 7;
  } else if (lower.includes(" ph")) {
    filters.property_type = 13;
  } else if (lower.includes("terreno")) {
    filters.property_type = 1;
  } else if (lower.includes("galpon")) {
    filters.property_type = 24;
  }

  // Rooms
  const roomMatch = lower.match(/(\d+)\s*(ambiente|ambientes|dormitorio|dormitorios|habitacion|habitaciones)/);
  if (roomMatch) {
    filters.rooms = parseInt(roomMatch[1]);
  }

  // Currency
  if (lower.includes("dolar") || lower.includes("usd") || lower.includes("dolares")) {
    filters.currency = "USD";
  } else if (lower.includes("peso") || lower.includes("ars")) {
    filters.currency = "ARS";
  }

  // Price
  const priceMatch = lower.match(/(?:hasta|menos de|maximo|max)\s*(?:usd|ars|\$)?\s*(\d[\d.,]*)/);
  if (priceMatch) {
    filters.price_to = parseFloat(priceMatch[1].replace(/[.,]/g, ""));
  }
  const priceFromMatch = lower.match(/(?:desde|minimo|min|mas de)\s*(?:usd|ars|\$)?\s*(\d[\d.,]*)/);
  if (priceFromMatch) {
    filters.price_from = parseFloat(priceFromMatch[1].replace(/[.,]/g, ""));
  }

  // Location - common Argentine neighborhoods/cities
  const locations = [
    "palermo", "belgrano", "recoleta", "caballito", "almagro", "centro",
    "barrio norte", "san telmo", "puerto madero", "nunez", "colegiales",
    "villa urquiza", "villa crespo", "flores", "rosario", "cordoba",
    "mendoza", "tucuman", "mar del plata", "la plata", "zona norte",
    "zona sur", "zona oeste",
  ];
  for (const loc of locations) {
    if (lower.includes(loc)) {
      filters.location = loc.charAt(0).toUpperCase() + loc.slice(1);
      break;
    }
  }

  return filters;
}

/**
 * Format properties into a readable chat message.
 */
export function formatPropertiesMessage(properties: TokkoProperty[], total: number, filters: Partial<TokkoSearchParams>): string {
  if (total === 0) {
    return "No encontre propiedades con esos criterios. ¿Queres que busque con filtros diferentes?";
  }

  const parts: string[] = [];

  // Header
  let header = `Encontre **${total} propiedad${total !== 1 ? "es" : ""}**`;
  const filterDesc: string[] = [];
  if (filters.operation_type === 1) filterDesc.push("en venta");
  if (filters.operation_type === 2) filterDesc.push("en alquiler");
  if (filters.operation_type === 3) filterDesc.push("en alquiler temporario");
  if (filters.location) filterDesc.push(`en ${filters.location}`);
  if (filterDesc.length) header += ` ${filterDesc.join(" ")}`;
  header += `. Te muestro las primeras ${properties.length}:`;
  parts.push(header);
  parts.push("");

  // Properties
  for (const p of properties) {
    const price = p.precio
      ? `${p.moneda} ${p.precio.toLocaleString("es-AR")}`
      : "Consultar precio";

    parts.push(`**${p.titulo}**`);
    parts.push(`${p.tipo} | ${p.operacion} | ${price}`);

    const details: string[] = [];
    if (p.ambientes) details.push(`${p.ambientes} amb.`);
    if (p.banos) details.push(`${p.banos} baños`);
    if (p.superficie_total) details.push(`${p.superficie_total}m²`);
    if (p.cocheras) details.push(`${p.cocheras} cochera${p.cocheras > 1 ? "s" : ""}`);
    if (details.length) parts.push(details.join(" | "));

    if (p.direccion) parts.push(`📍 ${p.direccion}${p.zona ? `, ${p.zona}` : ""}`);
    if (p.url) parts.push(`[Ver ficha completa](${p.url})`);
    parts.push("");
  }

  if (total > properties.length) {
    parts.push(`_Hay ${total - properties.length} mas. Podes pedirme que te muestre mas resultados o que filtre por precio, zona, ambientes, etc._`);
  }

  return parts.join("\n");
}
