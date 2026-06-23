"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-6">
        <span className="text-3xl">⚠️</span>
      </div>
      <h2 className="text-2xl font-bold mb-2">Erreur du tableau de bord</h2>
      <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm">
        {error.message || "Une erreur inattendue s'est produite."}
      </p>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="px-6 py-2 bg-[#25D366] text-white rounded-lg font-medium hover:bg-[#128C7E] transition-colors"
        >
          Réessayer
        </button>
        <button
          onClick={() => router.push("/dashboard")}
          className="px-6 py-2 border border-gray-200 dark:border-white/10 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
        >
          Tableau de bord
        </button>
      </div>
    </div>
  );
}
