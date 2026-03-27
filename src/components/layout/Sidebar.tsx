"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MessageSquare,
  Settings,
  CreditCard,
  BarChart3,
  Puzzle,
  User,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navItems = [
  { href: "/dashboard", label: "Resumen", icon: BarChart3, exact: true },
  { href: "/dashboard/chat", label: "Chat", icon: MessageSquare },
  { href: "/dashboard/integrations", label: "Integraciones", icon: Puzzle },
  { href: "/dashboard/settings", label: "Configuracion", icon: Settings },
  { href: "/dashboard/billing", label: "Suscripcion", icon: CreditCard },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen">
      {/* Logo */}
      <div className="p-5 border-b border-gray-100">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
            <MessageSquare size={18} className="text-white" />
          </div>
          <div>
            <h1 className="text-base font-bold text-gray-900 leading-tight">Real Lead Tools</h1>
            <p className="text-[10px] text-gray-400 uppercase tracking-wider">CRM Assistant</p>
          </div>
        </Link>
      </div>

      {/* Company selector */}
      <div className="px-4 py-3 border-b border-gray-100">
        <button className="w-full flex items-center justify-between px-3 py-2 bg-gray-50 rounded-lg text-sm hover:bg-gray-100 transition">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-accent/10 rounded text-[10px] font-bold text-accent flex items-center justify-center">
              RL
            </div>
            <span className="text-gray-700 font-medium">Mi Empresa</span>
          </div>
          <ChevronDown size={14} className="text-gray-400" />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5">
        <p className="px-3 py-2 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
          Menu
        </p>
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition",
                active
                  ? "bg-primary/10 text-primary"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              )}
            >
              <Icon size={18} />
              {item.label}
              {item.label === "Chat" && (
                <span className="ml-auto w-2 h-2 bg-green-400 rounded-full" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="p-3 border-t border-gray-100">
        <div className="relative">
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center">
              <User size={14} className="text-white" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-gray-700">Usuario Demo</p>
              <p className="text-[11px] text-gray-400">Plan Gratis</p>
            </div>
            <ChevronDown size={14} className="text-gray-400" />
          </button>
          {userMenuOpen && (
            <div className="absolute bottom-full left-0 right-0 mb-1 bg-white rounded-lg shadow-lg border border-gray-100 py-1">
              <Link
                href="/dashboard/settings"
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
              >
                <Settings size={14} />
                Configuracion
              </Link>
              <Link
                href="/"
                className="flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50"
              >
                <LogOut size={14} />
                Cerrar sesion
              </Link>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
