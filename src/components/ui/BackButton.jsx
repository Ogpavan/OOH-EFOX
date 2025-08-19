import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

export default function BackButton({ label = "", className = "" }) {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(-1)}
      className={`flex items-center gap-2  rounded transition-transform duration-150 hover:scale-105     text-gray-700 hover:bg-gray-50 active:scale-95 ${className}`}
    >
      <ChevronLeft className="h-8 w-8 text-orange-600" />
      <span className="font-medium">{label}</span>
    </button>
  );
}