"use client";

import { useState } from "react";
import { ArrowLeft, Building2, Check, AlertCircle, Loader2, ExternalLink, Eye, EyeOff, Home } from "lucide-react";

interface TokkoSetupProps {
  onBack: () => void;
}

export default function TokkoSetup({ onBack }: TokkoSetupProps) {
  const [apiKey, setApiKey] = useState("");
  const [branchId, setBranchId] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<"success" | "error" | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [propertyCount, setPropertyCount] = useState(0);

  const handleTest = async () => {
    setTesting(true);
    setTestResult(null);
    // Simulated test
    await new Promise((r) => setTimeout(r, 2000));
    if (apiKey.length > 5) {
      setTestResult("success");
      setPropertyCount(147);
    } else {
      setTestResult("error");
    }
    setTesting(false);
  };

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSaving(false);
    setSaved(true);
  };

  return (
    <div className="max-w-2xl">
      {/* Header */}
      <button onClick={onBack} className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary mb-6 transition">
        <ArrowLeft size={16} />
        Volver a integraciones
      </button>

      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 bg-[#1a1a2e] rounded-xl flex items-center justify-center">
          <Building2 size={28} className="text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Tokko Broker</h2>
          <p className="text-sm text-gray-500">Conecta tu cuenta para que el bot busque tus propiedades</p>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6">
        <h4 className="text-sm font-semibold text-blue-900 mb-2">¿Como obtener tu API Key?</h4>
        <ol className="text-sm text-blue-700 space-y-1.5">
          <li>1. Ingresa a tu panel de <strong>Tokko Broker</strong></li>
          <li>2. Ve a <strong>Configuracion → API</strong></li>
          <li>3. Copia tu <strong>API Key</strong> y <strong>Branch ID</strong></li>
          <li>4. Pegalos aqui abajo</li>
        </ol>
        <a
          href="#"
          className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 mt-2 font-medium"
        >
          Ver guia completa
          <ExternalLink size={12} />
        </a>
      </div>

      {/* Form */}
      <div className="bg-white border border-gray-100 rounded-xl p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">API Key de Tokko</label>
          <div className="relative">
            <input
              type={showKey ? "text" : "password"}
              value={apiKey}
              onChange={(e) => { setApiKey(e.target.value); setTestResult(null); setSaved(false); }}
              placeholder="ej: a1b2c3d4e5f6..."
              className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
            <button
              onClick={() => setShowKey(!showKey)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Branch ID (Sucursal)</label>
          <input
            type="text"
            value={branchId}
            onChange={(e) => { setBranchId(e.target.value); setSaved(false); }}
            placeholder="ej: 12345"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
          <p className="text-xs text-gray-400 mt-1">Opcional. Si tienes varias sucursales, indica cual usar.</p>
        </div>

        {/* Test Result */}
        {testResult === "success" && (
          <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
            <Check size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-green-800">Conexion exitosa</p>
              <p className="text-xs text-green-600 mt-0.5">
                Se encontraron <strong>{propertyCount} propiedades</strong> en tu cuenta de Tokko Broker.
              </p>
            </div>
          </div>
        )}
        {testResult === "error" && (
          <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle size={18} className="text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red-800">Error de conexion</p>
              <p className="text-xs text-red-600 mt-0.5">
                No se pudo conectar con Tokko Broker. Verifica que el API Key sea correcto.
              </p>
            </div>
          </div>
        )}

        {/* Saved */}
        {saved && (
          <div className="flex items-start gap-3 p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <Check size={18} className="text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-primary">Integracion guardada</p>
              <p className="text-xs text-gray-500 mt-0.5">
                Tu bot ahora puede buscar propiedades de tu cuenta de Tokko.
              </p>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={handleTest}
            disabled={!apiKey || testing}
            className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 text-gray-700 text-sm font-medium rounded-full hover:bg-gray-50 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {testing ? <Loader2 size={14} className="animate-spin" /> : <Home size={14} />}
            {testing ? "Probando..." : "Probar conexion"}
          </button>
          <button
            onClick={handleSave}
            disabled={!apiKey || !testResult || testResult !== "success" || saving}
            className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-medium rounded-full hover:bg-primary-dark transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
            {saving ? "Guardando..." : "Guardar integracion"}
          </button>
        </div>
      </div>
    </div>
  );
}
