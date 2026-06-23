"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function WidgetsPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Widgets</h1>
          <p className="text-gray-500 dark:text-gray-400">Créez des boutons WhatsApp pour votre site web.</p>
        </div>
      </div>

      <Card className="p-12 text-center text-gray-500">
        <p>Configurateur de widget en cours de construction.</p>
      </Card>
    </div>
  );
}
