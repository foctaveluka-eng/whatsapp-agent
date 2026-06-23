"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function OrdersPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Commandes</h1>
          <p className="text-gray-500 dark:text-gray-400">Suivez les ventes générées par WhatsApp.</p>
        </div>
      </div>

      <Card className="p-12 text-center text-gray-500">
        <p>Interface des commandes en cours de construction.</p>
      </Card>
    </div>
  );
}
