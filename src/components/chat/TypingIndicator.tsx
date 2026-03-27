"use client";

export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3 bg-white rounded-2xl rounded-tl-sm shadow-sm w-fit">
      <div className="typing-dot w-2 h-2 bg-gray-400 rounded-full" />
      <div className="typing-dot w-2 h-2 bg-gray-400 rounded-full" />
      <div className="typing-dot w-2 h-2 bg-gray-400 rounded-full" />
    </div>
  );
}
