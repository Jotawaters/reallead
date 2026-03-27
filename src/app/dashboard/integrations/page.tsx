"use client";

import { useState } from "react";
import { Building2, MessageCircle, Camera, Puzzle } from "lucide-react";
import IntegrationCard from "@/components/integrations/IntegrationCard";
import TokkoSetup from "@/components/integrations/TokkoSetup";
import WhatsAppSetup from "@/components/integrations/WhatsAppSetup";
import InstagramSetup from "@/components/integrations/InstagramSetup";

type View = "list" | "tokko" | "whatsapp" | "instagram";

export default function IntegrationsPage() {
  const [view, setView] = useState<View>("list");

  if (view === "tokko") return (
    <div className="p-8 overflow-y-auto h-full">
      <TokkoSetup onBack={() => setView("list")} />
    </div>
  );
  if (view === "whatsapp") return (
    <div className="p-8 overflow-y-auto h-full">
      <WhatsAppSetup onBack={() => setView("list")} />
    </div>
  );
  if (view === "instagram") return (
    <div className="p-8 overflow-y-auto h-full">
      <InstagramSetup onBack={() => setView("list")} />
    </div>
  );

  return (
    <div className="p-8 overflow-y-auto h-full">
      <div className="max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Puzzle size={24} className="text-primary" />
            <h1 className="text-2xl font-bold text-gray-900">Integraciones</h1>
          </div>
          <p className="text-gray-500">
            Conecta tus herramientas para que el bot acceda a tus propiedades y responda por todos tus canales.
          </p>
        </div>

        {/* Status summary */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white border border-gray-100 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-gray-900">1</p>
            <p className="text-xs text-gray-500">Conectada</p>
          </div>
          <div className="bg-white border border-gray-100 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-yellow-500">1</p>
            <p className="text-xs text-gray-500">Pendiente</p>
          </div>
          <div className="bg-white border border-gray-100 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-gray-300">1</p>
            <p className="text-xs text-gray-500">No configurada</p>
          </div>
        </div>

        {/* CRM Section */}
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">CRM & Propiedades</h3>
          <IntegrationCard
            icon={Building2}
            iconBg="bg-[#1a1a2e]"
            name="Tokko Broker"
            description="Busqueda de propiedades, contactos y operaciones de tu CRM inmobiliario"
            status="connected"
            details="147 propiedades sincronizadas — Ultima sync: hace 5 min"
            onClick={() => setView("tokko")}
          />
        </div>

        {/* Channels Section */}
        <div>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Canales de comunicacion</h3>
          <div className="space-y-3">
            <IntegrationCard
              icon={MessageCircle}
              iconBg="bg-[#25D366]"
              name="WhatsApp Business"
              description="Responde mensajes de WhatsApp automaticamente con inteligencia artificial"
              status="pending"
              details="Webhook configurado — Pendiente verificacion de token"
              onClick={() => setView("whatsapp")}
            />
            <IntegrationCard
              icon={Camera}
              iconBg="bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737]"
              name="Instagram Business"
              description="Responde mensajes directos de Instagram con tu asistente IA"
              status="disconnected"
              onClick={() => setView("instagram")}
            />
          </div>
        </div>

        {/* Coming soon */}
        <div className="mt-8 p-5 bg-gray-50 rounded-xl border border-dashed border-gray-200">
          <h4 className="text-sm font-semibold text-gray-500 mb-2">Proximamente</h4>
          <div className="flex flex-wrap gap-3">
            <span className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs text-gray-500">Facebook Messenger</span>
            <span className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs text-gray-500">Telegram</span>
            <span className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs text-gray-500">MercadoLibre</span>
            <span className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs text-gray-500">Zonaprop</span>
            <span className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs text-gray-500">Argenprop</span>
          </div>
        </div>
      </div>
    </div>
  );
}
