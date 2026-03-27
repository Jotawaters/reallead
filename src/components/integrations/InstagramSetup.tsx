"use client";

import { useState } from "react";
import { ArrowLeft, Check, AlertCircle, Loader2, ExternalLink, Eye, EyeOff, Copy, CheckCheck, Camera } from "lucide-react";

interface InstagramSetupProps {
  onBack: () => void;
}

export default function InstagramSetup({ onBack }: InstagramSetupProps) {
  const [pageId, setPageId] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [appSecret, setAppSecret] = useState("");
  const [showToken, setShowToken] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<"success" | "error" | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const webhookUrl = "https://handler-real-lead-tools-xxxxx.run.app/webhooks/meta";
  const verifyToken = "rlt_verify_abc123def456";

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleTest = async () => {
    setTesting(true);
    setTestResult(null);
    await new Promise((r) => setTimeout(r, 2000));
    setTestResult(accessToken.length > 5 ? "success" : "error");
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
      <button onClick={onBack} className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary mb-6 transition">
        <ArrowLeft size={16} />
        Volver a integraciones
      </button>

      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] rounded-xl flex items-center justify-center">
          <Camera size={28} className="text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Instagram Business</h2>
          <p className="text-sm text-gray-500">Responde mensajes directos de Instagram con IA</p>
        </div>
      </div>

      {/* Steps */}
      <div className="bg-purple-50 border border-purple-100 rounded-xl p-4 mb-6">
        <h4 className="text-sm font-semibold text-purple-900 mb-3">Pasos para configurar</h4>
        <ol className="text-sm text-purple-700 space-y-2">
          <li className="flex items-start gap-2">
            <span className="w-5 h-5 bg-purple-200 rounded-full flex items-center justify-center text-xs font-bold text-purple-800 flex-shrink-0 mt-0.5">1</span>
            Tu cuenta de Instagram debe ser <strong>Business</strong> o <strong>Creator</strong>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-5 h-5 bg-purple-200 rounded-full flex items-center justify-center text-xs font-bold text-purple-800 flex-shrink-0 mt-0.5">2</span>
            Conecta Instagram a una <strong>Pagina de Facebook</strong>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-5 h-5 bg-purple-200 rounded-full flex items-center justify-center text-xs font-bold text-purple-800 flex-shrink-0 mt-0.5">3</span>
            En Meta for Developers, agrega el producto <strong>Instagram</strong> a tu app
          </li>
          <li className="flex items-start gap-2">
            <span className="w-5 h-5 bg-purple-200 rounded-full flex items-center justify-center text-xs font-bold text-purple-800 flex-shrink-0 mt-0.5">4</span>
            Copia el <strong>Page ID</strong>, <strong>Access Token</strong> y <strong>App Secret</strong>
          </li>
        </ol>
        <a href="#" className="inline-flex items-center gap-1 text-sm text-purple-600 hover:text-purple-800 mt-3 font-medium">
          Ver guia paso a paso <ExternalLink size={12} />
        </a>
      </div>

      {/* Webhook Config */}
      <div className="bg-white border border-gray-100 rounded-xl p-6 mb-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Configuracion del Webhook en Meta</h3>
        <p className="text-xs text-gray-500 mb-4">Usa la misma URL de webhook que WhatsApp (Meta enruta ambos canales por la misma URL).</p>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">URL del Webhook</label>
            <div className="flex items-center gap-2">
              <input type="text" readOnly value={webhookUrl} className="flex-1 px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 font-mono" />
              <button onClick={() => copyToClipboard(webhookUrl, "url")} className="p-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                {copied === "url" ? <CheckCheck size={16} className="text-green-500" /> : <Copy size={16} className="text-gray-400" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Token de verificacion</label>
            <div className="flex items-center gap-2">
              <input type="text" readOnly value={verifyToken} className="flex-1 px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 font-mono" />
              <button onClick={() => copyToClipboard(verifyToken, "token")} className="p-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                {copied === "token" ? <CheckCheck size={16} className="text-green-500" /> : <Copy size={16} className="text-gray-400" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Credentials Form */}
      <div className="bg-white border border-gray-100 rounded-xl p-6 space-y-5">
        <h3 className="text-sm font-semibold text-gray-900">Credenciales de Instagram</h3>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Page ID (Facebook Page vinculada)</label>
          <input
            type="text"
            value={pageId}
            onChange={(e) => { setPageId(e.target.value); setSaved(false); }}
            placeholder="ej: 123456789012345"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Access Token</label>
          <div className="relative">
            <input
              type={showToken ? "text" : "password"}
              value={accessToken}
              onChange={(e) => { setAccessToken(e.target.value); setTestResult(null); setSaved(false); }}
              placeholder="ej: EAAx..."
              className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
            <button onClick={() => setShowToken(!showToken)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              {showToken ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">App Secret</label>
          <div className="relative">
            <input
              type={showSecret ? "text" : "password"}
              value={appSecret}
              onChange={(e) => { setAppSecret(e.target.value); setSaved(false); }}
              placeholder="ej: abc123..."
              className="w-full px-4 py-3 pr-10 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
            <button onClick={() => setShowSecret(!showSecret)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              {showSecret ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {testResult === "success" && (
          <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
            <Check size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm font-medium text-green-800">Token verificado. Conexion con Instagram activa.</p>
          </div>
        )}
        {testResult === "error" && (
          <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle size={18} className="text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm font-medium text-red-800">Token invalido. Verifica tus credenciales.</p>
          </div>
        )}

        {saved && (
          <div className="flex items-start gap-3 p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <Check size={18} className="text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-primary">Instagram configurado</p>
              <p className="text-xs text-gray-500 mt-0.5">Tu bot ahora responde mensajes directos de Instagram.</p>
            </div>
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <button
            onClick={handleTest}
            disabled={!accessToken || testing}
            className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 text-gray-700 text-sm font-medium rounded-full hover:bg-gray-50 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {testing ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
            {testing ? "Verificando..." : "Verificar token"}
          </button>
          <button
            onClick={handleSave}
            disabled={!pageId || !accessToken || !appSecret || testResult !== "success" || saving}
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
