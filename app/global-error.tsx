"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="fr" className="dark">
      <body className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center">
        <div className="text-center px-4">
          <h2 className="text-2xl font-bold mb-4">Une erreur est survenue</h2>
          <p className="text-gray-400 mb-6">{error.message || "Erreur inattendue"}</p>
          <button
            onClick={reset}
            className="px-6 py-2 bg-[#25D366] text-white rounded-lg font-medium hover:bg-[#128C7E] transition-colors"
          >
            Réessayer
          </button>
        </div>
      </body>
    </html>
  );
}
