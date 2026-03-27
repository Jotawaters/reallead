import { User, Building2, Bell, Shield, Palette, Globe, Mail, Phone, MapPin, Plus } from "lucide-react";

const teamMembers = [
  { name: "Juan Garcia", email: "jgarcia@miempresa.com", role: "Administrador", status: "Activo", initials: "JG" },
  { name: "Maria Lopez", email: "mlopez@miempresa.com", role: "Miembro", status: "Activo", initials: "ML" },
  { name: "Pedro Sanchez", email: "psanchez@miempresa.com", role: "Miembro", status: "Pendiente", initials: "PS" },
];

export default function SettingsPage() {
  return (
    <div className="p-8 overflow-y-auto h-full">
      <div className="max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Configuracion</h1>
          <p className="text-gray-500 mt-1">Gestiona tu cuenta, equipo y preferencias.</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 bg-gray-100 p-1 rounded-lg w-fit">
          <button className="px-4 py-2 text-sm font-medium bg-white text-gray-900 rounded-md shadow-sm">
            Perfil
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-500 rounded-md hover:text-gray-700">
            Empresa
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-500 rounded-md hover:text-gray-700">
            Equipo
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-500 rounded-md hover:text-gray-700">
            Notificaciones
          </button>
        </div>

        {/* Company Info */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Building2 size={20} className="text-primary" />
            <h2 className="font-semibold text-gray-900">Informacion de la empresa</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Nombre de la empresa</label>
              <input
                type="text"
                defaultValue="Mi Empresa SRL"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Industria</label>
              <select className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/20">
                <option>Inmobiliaria</option>
                <option>Tecnologia</option>
                <option>Salud</option>
                <option>Educacion</option>
                <option>Otro</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">
                <Mail size={12} className="inline mr-1" />
                Email corporativo
              </label>
              <input
                type="email"
                defaultValue="contacto@miempresa.com"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">
                <Phone size={12} className="inline mr-1" />
                Telefono
              </label>
              <input
                type="text"
                defaultValue="+54 11 5555-0000"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-gray-500 mb-1.5">
                <MapPin size={12} className="inline mr-1" />
                Direccion
              </label>
              <input
                type="text"
                defaultValue="Av. Corrientes 1234, CABA, Argentina"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button className="px-5 py-2.5 bg-primary text-white text-sm font-medium rounded-full hover:bg-primary-dark transition">
              Guardar cambios
            </button>
          </div>
        </div>

        {/* Team */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <User size={20} className="text-primary" />
              <h2 className="font-semibold text-gray-900">Equipo</h2>
              <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                {teamMembers.length} miembros
              </span>
            </div>
            <button className="flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-sm font-medium rounded-full hover:bg-primary-dark transition">
              <Plus size={14} />
              Invitar
            </button>
          </div>
          <div className="space-y-3">
            {teamMembers.map((member) => (
              <div key={member.email} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition">
                <div className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-primary">{member.initials}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{member.name}</p>
                  <p className="text-xs text-gray-400">{member.email}</p>
                </div>
                <span className="text-xs text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                  {member.role}
                </span>
                <span className={`text-xs px-2.5 py-1 rounded-full ${
                  member.status === "Activo" ? "bg-green-50 text-green-600" : "bg-yellow-50 text-yellow-600"
                }`}>
                  {member.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Bell size={20} className="text-primary" />
            <h2 className="font-semibold text-gray-900">Preferencias</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-gray-900">Notificaciones por email</p>
                <p className="text-xs text-gray-400">Recibir resumen diario de actividad</p>
              </div>
              <div className="w-10 h-6 bg-primary rounded-full relative cursor-pointer">
                <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-sm" />
              </div>
            </div>
            <div className="flex items-center justify-between py-2 border-t border-gray-50">
              <div>
                <p className="text-sm font-medium text-gray-900">Idioma</p>
                <p className="text-xs text-gray-400">Idioma de la interfaz y respuestas</p>
              </div>
              <select className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm">
                <option>Espanol (LATAM)</option>
                <option>English</option>
                <option>Portugues (BR)</option>
              </select>
            </div>
            <div className="flex items-center justify-between py-2 border-t border-gray-50">
              <div>
                <p className="text-sm font-medium text-gray-900">Zona horaria</p>
                <p className="text-xs text-gray-400">Para reportes y timestamps</p>
              </div>
              <select className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm">
                <option>America/Argentina/Buenos_Aires (GMT-3)</option>
                <option>America/Mexico_City (GMT-6)</option>
                <option>America/Bogota (GMT-5)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
