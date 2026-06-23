"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center">
      <div className="text-center px-4">
        <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl">⚠️</span>
        </div>
        <h2 className="text-2xl font-bold mb-2">Une erreur est survenue</h2>
        <p className="text-gray-400 mb-8 max-w-sm mx-auto">
          {error.message || "Quelque chose s'est mal passé. Veuillez réessayer."}
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="px-6 py-2 bg-[#25D366] text-white rounded-lg font-medium hover:bg-[#128C7E] transition-colors"
          >
            Réessayer
          </button>
          <Link
            href="/"
            className="px-6 py-2 border border-white/10 text-white rounded-lg font-medium hover:bg-white/5 transition-colors"
          >
            Accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
