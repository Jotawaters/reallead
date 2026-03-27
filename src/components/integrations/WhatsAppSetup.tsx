"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Check, Loader2, MessageCircle, Smartphone, Wifi, WifiOff, RefreshCw, Power } from "lucide-react";

interface WhatsAppSetupProps {
  onBack: () => void;
}

type Status = "disconnected" | "qr" | "connecting" | "connected";

export default function WhatsAppSetup({ onBack }: WhatsAppSetupProps) {
  const [status, setStatus] = useState<Status>("disconnected");
  const [phone, setPhone] = useState("");
  const [qrCountdown, setQrCountdown] = useState(60);

  // Simulate QR expiration countdown
  useEffect(() => {
    if (status !== "qr") return;
    if (qrCountdown <= 0) {
      setStatus("disconnected");
      return;
    }
    const timer = setTimeout(() => setQrCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [status, qrCountdown]);

  const handleConnect = () => {
    setStatus("qr");
    setQrCountdown(60);
    // Simulate scan after 5 seconds
    setTimeout(() => {
      setStatus("connecting");
      setTimeout(() => {
        setStatus("connected");
        setPhone("+54 11 5555-1234");
      }, 2000);
    }, 5000);
  };

  const handleDisconnect = () => {
    setStatus("disconnected");
    setPhone("");
  };

  const handleRefreshQr = () => {
    setQrCountdown(60);
  };

  return (
    <div className="max-w-2xl">
      <button onClick={onBack} className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary mb-6 transition">
        <ArrowLeft size={16} />
        Volver a integraciones
      </button>

      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 bg-[#25D366] rounded-xl flex items-center justify-center">
          <MessageCircle size={28} className="text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">WhatsApp Business</h2>
          <p className="text-sm text-gray-500">Conecta tu WhatsApp escaneando un codigo QR</p>
        </div>
      </div>

      {/* Connected State */}
      {status === "connected" && (
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                <Wifi size={24} className="text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-green-800 text-lg">WhatsApp conectado</h3>
                <p className="text-sm text-green-600 mt-1">
                  <Smartphone size={14} className="inline mr-1" />
                  Numero: <strong>{phone}</strong>
                </p>
                <p className="text-xs text-green-500 mt-1">
                  Tu bot esta respondiendo mensajes automaticamente
                </p>
              </div>
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-green-200 text-green-800 rounded-full text-xs font-medium">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                En linea
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white border border-gray-100 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-gray-900">156</p>
              <p className="text-xs text-gray-500">Mensajes hoy</p>
            </div>
            <div className="bg-white border border-gray-100 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-gray-900">42</p>
              <p className="text-xs text-gray-500">Conversaciones</p>
            </div>
            <div className="bg-white border border-gray-100 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-gray-900">2.1s</p>
              <p className="text-xs text-gray-500">Tiempo respuesta</p>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-xl p-5">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Ultimos mensajes</h4>
            <div className="space-y-3">
              {[
                { from: "+54 11 4444-5678", msg: "Hola, busco depto de 2 ambientes en Palermo", time: "Hace 2 min" },
                { from: "+54 11 3333-9012", msg: "Quiero agendar una visita al depto de Recoleta", time: "Hace 8 min" },
                { from: "+54 11 2222-3456", msg: "Tienen algo en alquiler por Belgrano?", time: "Hace 15 min" },
              ].map((m, i) => (
                <div key={i} className="flex items-start gap-3 pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                  <div className="w-8 h-8 bg-[#25D366]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageCircle size={14} className="text-[#25D366]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-700">{m.from}</p>
                    <p className="text-sm text-gray-500 truncate">{m.msg}</p>
                  </div>
                  <span className="text-[10px] text-gray-400 flex-shrink-0">{m.time}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleDisconnect}
            className="flex items-center gap-2 px-5 py-2.5 border border-red-200 text-red-600 text-sm font-medium rounded-full hover:bg-red-50 transition"
          >
            <Power size={14} />
            Desconectar WhatsApp
          </button>
        </div>
      )}

      {/* Disconnected State */}
      {status === "disconnected" && (
        <div className="space-y-4">
          <div className="bg-white border border-gray-100 rounded-xl p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <WifiOff size={20} className="text-gray-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">WhatsApp no conectado</h3>
                <p className="text-sm text-gray-500">Conecta tu numero para que el bot responda automaticamente</p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6">
              <h4 className="text-sm font-semibold text-blue-900 mb-2">¿Como funciona?</h4>
              <ol className="text-sm text-blue-700 space-y-1.5">
                <li>1. Hace click en <strong>&quot;Conectar WhatsApp&quot;</strong></li>
                <li>2. Escanea el codigo QR con tu celular (como WhatsApp Web)</li>
                <li>3. Listo! El bot empieza a responder automaticamente</li>
              </ol>
            </div>

            <button
              onClick={handleConnect}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-[#25D366] text-white font-semibold rounded-full hover:bg-[#1da851] transition text-base"
            >
              <MessageCircle size={20} />
              Conectar WhatsApp
            </button>
          </div>
        </div>
      )}

      {/* QR Code State */}
      {status === "qr" && (
        <div className="bg-white border border-gray-100 rounded-xl p-8 text-center">
          <h3 className="font-semibold text-gray-900 mb-2">Escanea el codigo QR</h3>
          <p className="text-sm text-gray-500 mb-6">
            Abri WhatsApp en tu celular → Menu (⋮) → Dispositivos vinculados → Vincular dispositivo
          </p>

          {/* Fake QR Code */}
          <div className="inline-block p-4 bg-white border-2 border-gray-200 rounded-2xl mb-4">
            <div className="w-48 h-48 bg-gray-900 rounded-lg relative overflow-hidden">
              {/* QR pattern simulation */}
              <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 gap-[2px] p-3">
                {Array.from({ length: 144 }).map((_, i) => (
                  <div
                    key={i}
                    className={`rounded-sm ${Math.random() > 0.4 ? "bg-white" : "bg-gray-900"}`}
                  />
                ))}
              </div>
              {/* Center logo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 bg-[#25D366] rounded-lg flex items-center justify-center shadow-lg">
                  <MessageCircle size={20} className="text-white" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-4">
            <Loader2 size={14} className="animate-spin" />
            Esperando escaneo... ({qrCountdown}s)
          </div>

          <button
            onClick={handleRefreshQr}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm text-gray-500 hover:text-primary transition rounded-full border border-gray-200 hover:border-primary"
          >
            <RefreshCw size={14} />
            Generar nuevo QR
          </button>
        </div>
      )}

      {/* Connecting State */}
      {status === "connecting" && (
        <div className="bg-white border border-gray-100 rounded-xl p-8 text-center">
          <div className="w-16 h-16 bg-[#25D366]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Loader2 size={28} className="text-[#25D366] animate-spin" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Conectando...</h3>
          <p className="text-sm text-gray-500">
            Vinculando tu numero de WhatsApp con Real Lead Tools
          </p>
        </div>
      )}
    </div>
  );
}
