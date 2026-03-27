"use client";

import { cn } from "@/lib/utils";
import { Check, AlertCircle, ChevronRight, type LucideIcon } from "lucide-react";

interface IntegrationCardProps {
  icon: LucideIcon;
  iconBg: string;
  name: string;
  description: string;
  status: "connected" | "pending" | "disconnected";
  details?: string;
  onClick?: () => void;
}

const statusConfig = {
  connected: {
    label: "Conectado",
    dot: "bg-green-400",
    bg: "bg-green-50",
    text: "text-green-700",
  },
  pending: {
    label: "Pendiente",
    dot: "bg-yellow-400",
    bg: "bg-yellow-50",
    text: "text-yellow-700",
  },
  disconnected: {
    label: "No configurado",
    dot: "bg-gray-300",
    bg: "bg-gray-50",
    text: "text-gray-500",
  },
};

export default function IntegrationCard({
  icon: Icon,
  iconBg,
  name,
  description,
  status,
  details,
  onClick,
}: IntegrationCardProps) {
  const s = statusConfig[status];

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left p-5 rounded-xl border-2 transition hover:shadow-md",
        status === "connected"
          ? "border-green-200 bg-green-50/30"
          : "border-gray-100 bg-white hover:border-primary/30"
      )}
    >
      <div className="flex items-start gap-4">
        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0", iconBg)}>
          <Icon size={24} className="text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold text-gray-900">{name}</h3>
            <div className={cn("flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium", s.bg, s.text)}>
              <span className={cn("w-1.5 h-1.5 rounded-full", s.dot)} />
              {s.label}
            </div>
          </div>
          <p className="text-sm text-gray-500 mb-2">{description}</p>
          {details && (
            <p className="text-xs text-gray-400">{details}</p>
          )}
        </div>
        <ChevronRight size={18} className="text-gray-300 flex-shrink-0 mt-3" />
      </div>
    </button>
  );
}
