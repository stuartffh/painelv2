import { MessageSquareText } from "lucide-react";
import Link from "next/link";

export function Logo({ size = "default" }: { size?: "default" | "large" }) {
  return (
    <Link 
      href="/" 
      className={`inline-flex items-center gap-2 transition-transform hover:scale-105 ${
        size === "large" ? "text-2xl" : "text-xl"
      }`}
    >
      <MessageSquareText 
        className={`text-primary ${
          size === "large" ? "h-8 w-8" : "h-6 w-6"
        }`} 
      />
      <span className="font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        ZapChatBR
      </span>
    </Link>
  );
}