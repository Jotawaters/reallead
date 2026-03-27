import { Check, CreditCard, ArrowRight, AlertCircle, Download, Calendar } from "lucide-react";

const plans = [
  {
    name: "Gratis",
    price: "$0",
    period: "para siempre",
    features: ["100 mensajes/mes", "1 usuario", "Chat basico", "Soporte por email"],
    current: true,
    popular: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "USD/mes",
    features: ["2,000 mensajes/mes", "Hasta 5 usuarios", "Historial completo", "Soporte prioritario", "Integraciones API"],
    current: false,
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "USD/mes",
    features: ["Mensajes ilimitados", "Usuarios ilimitados", "Agente personalizado", "Soporte dedicado", "API completa", "SLA garantizado"],
    current: false,
    popular: false,
  },
];

const invoices = [
  { date: "1 Mar 2026", amount: "$0.00", status: "Gratis", id: "INV-001" },
  { date: "1 Feb 2026", amount: "$0.00", status: "Gratis", id: "INV-002" },
  { date: "1 Ene 2026", amount: "$0.00", status: "Gratis", id: "INV-003" },
];

export default function BillingPage() {
  return (
    <div className="p-8 overflow-y-auto h-full">
      <div className="max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Suscripcion y facturacion</h1>
          <p className="text-gray-500 mt-1">Gestiona tu plan, metodo de pago y facturas.</p>
        </div>

        {/* Current Plan Banner */}
        <div className="bg-gradient-to-r from-primary to-primary-light rounded-xl p-6 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/70 mb-1">Plan actual</p>
              <h2 className="text-2xl font-bold">Gratis</h2>
              <p className="text-sm text-white/70 mt-2">47 de 100 mensajes usados este mes</p>
              <div className="mt-3 w-64 h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full" style={{ width: "47%" }} />
              </div>
            </div>
            <button className="px-5 py-2.5 bg-white text-primary font-semibold rounded-full hover:bg-gray-100 transition flex items-center gap-2">
              Actualizar plan
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Alert */}
        <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl mb-8">
          <AlertCircle size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-amber-800">Te quedan 53 mensajes este mes</p>
            <p className="text-xs text-amber-600 mt-0.5">
              Actualiza a Pro para obtener 2,000 mensajes mensuales y funciones premium.
            </p>
          </div>
        </div>

        {/* Plans */}
        <div className="mb-8">
          <h3 className="font-semibold text-gray-900 mb-4">Planes disponibles</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative bg-white p-6 rounded-xl border-2 ${
                  plan.current
                    ? "border-primary bg-primary/5"
                    : plan.popular
                    ? "border-accent"
                    : "border-gray-100"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-accent text-white text-[10px] font-bold rounded-full uppercase tracking-wide">
                    Recomendado
                  </div>
                )}
                {plan.current && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-primary text-white text-[10px] font-bold rounded-full uppercase tracking-wide">
                    Plan actual
                  </div>
                )}
                <h4 className="font-semibold text-gray-900">{plan.name}</h4>
                <div className="mt-2 mb-4">
                  <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-xs text-gray-500 ml-1">{plan.period}</span>
                </div>
                <ul className="space-y-2 mb-5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-gray-600">
                      <Check size={14} className="text-primary flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-2.5 rounded-full text-sm font-semibold transition ${
                    plan.current
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : plan.popular
                      ? "bg-accent text-white hover:bg-accent-dark"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  disabled={plan.current}
                >
                  {plan.current ? "Plan actual" : `Elegir ${plan.name}`}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <CreditCard size={20} className="text-primary" />
              <h3 className="font-semibold text-gray-900">Metodo de pago</h3>
            </div>
            <button className="text-sm text-primary hover:underline">Agregar tarjeta</button>
          </div>
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-12 h-8 bg-gray-200 rounded flex items-center justify-center">
              <CreditCard size={16} className="text-gray-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500">No hay metodo de pago configurado</p>
              <p className="text-xs text-gray-400">Agrega una tarjeta para actualizar tu plan</p>
            </div>
          </div>
        </div>

        {/* Invoices */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Calendar size={20} className="text-primary" />
            <h3 className="font-semibold text-gray-900">Historial de facturacion</h3>
          </div>
          <div className="divide-y divide-gray-50">
            {invoices.map((inv) => (
              <div key={inv.id} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500 w-24">{inv.date}</span>
                  <span className="text-sm font-medium text-gray-900">{inv.amount}</span>
                  <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{inv.status}</span>
                </div>
                <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-primary transition">
                  <Download size={12} />
                  PDF
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
