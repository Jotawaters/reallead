import Link from "next/link";
import { MessageSquare, Users, Zap, Shield, BarChart3, Globe, ArrowRight, Check } from "lucide-react";

const features = [
  {
    icon: MessageSquare,
    title: "Chat CRM Inteligente",
    desc: "Interactua con tus contactos y datos del CRM usando lenguaje natural. Sin formularios complicados.",
  },
  {
    icon: Users,
    title: "Multi-usuario",
    desc: "Tu equipo completo puede acceder. Cada usuario tiene su propio historial y sesion.",
  },
  {
    icon: Zap,
    title: "Respuestas Instantaneas",
    desc: "Busca contactos, actualiza datos y genera reportes en segundos con inteligencia artificial.",
  },
  {
    icon: Shield,
    title: "Seguro y Privado",
    desc: "Tus datos nunca salen de tu cuenta. Encriptacion de extremo a extremo y autenticacion robusta.",
  },
  {
    icon: BarChart3,
    title: "Analiticas en Tiempo Real",
    desc: "Visualiza metricas de uso, conversaciones activas y rendimiento de tu equipo.",
  },
  {
    icon: Globe,
    title: "Acceso desde Cualquier Lugar",
    desc: "Funciona en desktop, tablet y celular. Solo necesitas un navegador web.",
  },
];

const plans = [
  {
    name: "Gratis",
    price: "$0",
    period: "para siempre",
    desc: "Perfecto para probar la plataforma",
    features: ["100 mensajes/mes", "1 usuario", "Chat basico", "Soporte por email"],
    cta: "Comenzar gratis",
    popular: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "USD/mes",
    desc: "Para equipos que necesitan mas",
    features: [
      "2,000 mensajes/mes",
      "Hasta 5 usuarios",
      "Historial completo",
      "Soporte prioritario",
      "Integraciones API",
    ],
    cta: "Elegir Pro",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "USD/mes",
    desc: "Para empresas con alto volumen",
    features: [
      "Mensajes ilimitados",
      "Usuarios ilimitados",
      "Agente personalizado",
      "Soporte dedicado",
      "API completa",
      "SLA garantizado",
    ],
    cta: "Contactar ventas",
    popular: false,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <MessageSquare size={18} className="text-white" />
            </div>
            <span className="font-bold text-lg text-gray-900">Real Lead Tools</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-600">
            <a href="#features" className="hover:text-primary transition">Funciones</a>
            <a href="#pricing" className="hover:text-primary transition">Precios</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/sign-in" className="text-sm text-gray-600 hover:text-primary transition">
              Iniciar sesion
            </Link>
            <Link
              href="/dashboard/chat"
              className="text-sm px-4 py-2 bg-primary text-white rounded-full hover:bg-primary-dark transition font-medium"
            >
              Probar gratis
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/5 text-primary text-sm font-medium rounded-full mb-6">
            <Zap size={14} />
            Potenciado por inteligencia artificial
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Tu CRM ahora habla
            <span className="text-primary"> tu idioma</span>
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10">
            Gestiona contactos, busca informacion y actualiza tu CRM conversando naturalmente.
            Sin curvas de aprendizaje, sin formularios complicados.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard/chat"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-primary text-white font-semibold rounded-full hover:bg-primary-dark transition text-lg"
            >
              Comenzar gratis
              <ArrowRight size={20} />
            </Link>
            <a
              href="#features"
              className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-gray-200 text-gray-700 font-semibold rounded-full hover:border-primary hover:text-primary transition text-lg"
            >
              Ver funciones
            </a>
          </div>
          <p className="mt-4 text-sm text-gray-400">No se requiere tarjeta de credito</p>
        </div>

        {/* Chat Preview */}
        <div className="max-w-2xl mx-auto mt-16">
          <div className="bg-white rounded-2xl shadow-2xl shadow-primary/10 border border-gray-100 overflow-hidden">
            <div className="bg-primary px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-white/30" />
                <div className="w-3 h-3 rounded-full bg-white/30" />
                <div className="w-3 h-3 rounded-full bg-white/30" />
              </div>
            </div>
            <div className="p-6 space-y-4 bg-gray-50">
              <div className="flex justify-start">
                <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm text-sm text-gray-700 max-w-[80%]">
                  Hola! Soy tu asistente CRM. ¿En que puedo ayudarte?
                </div>
              </div>
              <div className="flex justify-end">
                <div className="bg-primary px-4 py-3 rounded-2xl rounded-tr-sm text-sm text-white max-w-[80%]">
                  Busca todos los contactos de Buenos Aires
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm text-sm text-gray-700 max-w-[80%]">
                  Encontre <strong>24 contactos</strong> en Buenos Aires. Los 3 mas recientes son: Juan Garcia (jgarcia@email.com), Maria Lopez (mlopez@empresa.com) y Carlos Ruiz...
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Todo lo que necesitas para gestionar tu CRM
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Herramientas poderosas con una interfaz simple. Habla con tu CRM como si fuera un asistente personal.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="bg-white p-6 rounded-xl border border-gray-100 hover:shadow-lg hover:border-primary/20 transition">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <Icon size={24} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{f.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Planes simples y transparentes
            </h2>
            <p className="text-lg text-gray-500">
              Comenza gratis, escala cuando lo necesites.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative bg-white p-8 rounded-2xl border-2 ${
                  plan.popular ? "border-primary shadow-xl shadow-primary/10" : "border-gray-100"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent text-white text-xs font-bold rounded-full uppercase tracking-wide">
                    Mas popular
                  </div>
                )}
                <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
                <div className="mt-4 mb-2">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-sm text-gray-500 ml-1">{plan.period}</span>
                </div>
                <p className="text-sm text-gray-500 mb-6">{plan.desc}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                      <Check size={16} className="text-primary flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/dashboard/chat"
                  className={`block w-full text-center py-3 rounded-full font-semibold transition ${
                    plan.popular
                      ? "bg-primary text-white hover:bg-primary-dark"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-primary">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ¿Listo para transformar tu CRM?
          </h2>
          <p className="text-lg text-white/70 mb-8">
            Unite a las empresas que ya gestionan sus contactos conversando.
          </p>
          <Link
            href="/dashboard/chat"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-primary font-semibold rounded-full hover:bg-gray-100 transition text-lg"
          >
            Comenzar ahora — es gratis
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 bg-gray-900">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
              <MessageSquare size={12} className="text-white" />
            </div>
            <span className="font-semibold text-white text-sm">Real Lead Tools</span>
          </div>
          <p className="text-sm text-gray-500">
            2026 Real Lead Tools. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
