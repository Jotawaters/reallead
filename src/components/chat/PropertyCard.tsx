"use client";

import { Home, MapPin, Maximize2, Bath, Car } from "lucide-react";

interface Property {
  id: number | null;
  titulo: string;
  tipo: string;
  operacion: string;
  precio: number | null;
  moneda: string;
  ambientes: number | null;
  banos: number | null;
  cocheras: number | null;
  superficie_total: number | null;
  direccion: string;
  zona: string;
  foto: string | null;
  url: string;
}

export default function PropertyCard({ property }: { property: Property }) {
  const price = property.precio
    ? `${property.moneda} ${property.precio.toLocaleString("es-AR")}`
    : "Consultar";

  return (
    <div className="w-[272px] flex-shrink-0 bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition">
      {/* Image */}
      <div className="h-36 bg-gray-100 relative">
        {property.foto ? (
          <img
            src={property.foto}
            alt={property.titulo}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Home size={32} className="text-gray-300" />
          </div>
        )}
        <span className="absolute top-2 left-2 px-2 py-0.5 bg-accent text-white text-[10px] font-bold rounded-full uppercase">
          {property.operacion}
        </span>
      </div>

      {/* Content */}
      <div className="p-3">
        <p className="text-lg font-bold text-accent">{price}</p>
        <p className="text-xs font-medium text-gray-900 mt-1 line-clamp-2 leading-tight">
          {property.titulo}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-3 mt-2 text-[11px] text-gray-500">
          {property.ambientes && (
            <span className="flex items-center gap-1">
              <Home size={12} />
              {property.ambientes} amb.
            </span>
          )}
          {property.superficie_total && (
            <span className="flex items-center gap-1">
              <Maximize2 size={12} />
              {property.superficie_total}m²
            </span>
          )}
          {property.banos && (
            <span className="flex items-center gap-1">
              <Bath size={12} />
              {property.banos}
            </span>
          )}
          {property.cocheras ? (
            <span className="flex items-center gap-1">
              <Car size={12} />
              {property.cocheras}
            </span>
          ) : null}
        </div>

        {/* Location */}
        {property.direccion && (
          <p className="flex items-center gap-1 text-[11px] text-gray-400 mt-2">
            <MapPin size={11} />
            {property.direccion}{property.zona ? `, ${property.zona}` : ""}
          </p>
        )}

        {/* CTA */}
        {property.url && (
          <a
            href={property.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-3 text-center py-2 bg-accent/10 text-accent text-xs font-semibold rounded-full hover:bg-accent/20 transition"
          >
            Ver ficha y agendar visita →
          </a>
        )}
      </div>
    </div>
  );
}
