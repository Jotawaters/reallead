import Link from "next/link";
import { MessageSquare, Users, TrendingUp, Clock, ArrowRight, Activity } from "lucide-react";

const stats = [
  { label: "Mensajes este mes", value: "1,247", change: "+12%", icon: MessageSquare, color: "primary" },
  { label: "Usuarios activos", value: "8", change: "+2", icon: Users, color: "accent" },
  { label: "Consultas resueltas", value: "98%", change: "+3%", icon: TrendingUp, color: "green-500" },
  { label: "Tiempo promedio", value: "2.4s", change: "-0.3s", icon: Clock, color: "purple-500" },
];

const recentChats = [
  { user: "Juan Garcia", message: "Busca contactos en Buenos Aires", time: "Hace 5 min" },
  { user: "Maria Lopez", message: "Actualiza el email de Carlos Ruiz", time: "Hace 12 min" },
  { user: "Pedro Sanchez", message: "¿Cuantos contactos nuevos hay esta semana?", time: "Hace 1 hora" },
  { user: "Ana Fernandez", message: "Exporta los contactos del sector inmobiliario", time: "Hace 2 horas" },
];

export default function DashboardPage() {
  return (
    <div className="p-8 overflow-y-auto h-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Buen dia 👋</h1>
        <p className="text-gray-500 mt-1">Aqui tienes un resumen de la actividad de tu equipo.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white p-5 rounded-xl border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 bg-${stat.color}/10 rounded-lg flex items-center justify-center`}>
                  <Icon size={20} className={`text-${stat.color}`} />
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-400 mt-1">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-gray-900">Actividad reciente</h2>
            <Link href="/dashboard/chat" className="text-sm text-primary hover:underline flex items-center gap-1">
              Ver todo <ArrowRight size={14} />
            </Link>
          </div>
          <div className="space-y-4">
            {recentChats.map((chat, i) => (
              <div key={i} className="flex items-start gap-3 pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-primary">
                    {chat.user.split(" ").map(n => n[0]).join("")}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{chat.user}</p>
                  <p className="text-sm text-gray-500 truncate">{chat.message}</p>
                </div>
                <span className="text-xs text-gray-400 flex-shrink-0">{chat.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-900 mb-5">Acciones rapidas</h2>
          <div className="space-y-3">
            <Link
              href="/dashboard/chat"
              className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition"
            >
              <MessageSquare size={18} className="text-primary" />
              <div>
                <p className="text-sm font-medium text-gray-900">Nuevo chat</p>
                <p className="text-xs text-gray-500">Consulta al asistente CRM</p>
              </div>
            </Link>
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition"
            >
              <Users size={18} className="text-gray-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">Gestionar equipo</p>
                <p className="text-xs text-gray-500">Invita nuevos usuarios</p>
              </div>
            </Link>
            <Link
              href="/dashboard/billing"
              className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition"
            >
              <Activity size={18} className="text-gray-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">Ver uso</p>
                <p className="text-xs text-gray-500">Mensajes y limites del plan</p>
              </div>
            </Link>
          </div>

          {/* Usage bar */}
          <div className="mt-6 pt-5 border-t border-gray-100">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-600">Uso del plan</span>
              <span className="font-medium text-gray-900">47 / 100</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: "47%" }} />
            </div>
            <p className="text-xs text-gray-400 mt-2">53 mensajes restantes este mes</p>
          </div>
        </div>
      </div>
    </div>
  );
}
