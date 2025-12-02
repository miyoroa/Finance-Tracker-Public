"use client";
import { Download } from "lucide-react";
import { Button } from "./button";

export function DownloadButton({ onClick, children, variant = "outline", size = "default", className = "" }) {
  return (
    <Button
      variant={variant}
      size={size}
      onClick={onClick}
      className={`flex items-center gap-2 ${className}`}
    >
      <Download className="w-4 h-4" />
      {children}
    </Button>
  );
}
