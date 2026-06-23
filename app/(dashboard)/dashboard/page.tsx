import { Card } from "@/components/ui/Card";
import { Bot, Users, ArrowUpRight, MessageSquare, ShoppingBag } from "lucide-react";
import { createServerClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import DashboardChart from "./DashboardChart";

export default async function DashboardPage() {
  const supabase = createServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const [{ count: agentsCount }, { count: leadsCount }, { count: ordersCount }] = await Promise.all([
    supabase.from("agents").select("*", { count: "exact", head: true }).eq("user_id", user.id),
    supabase.from("leads").select("*", { count: "exact", head: true }).eq("user_id", user.id),
    supabase.from("orders").select("*", { count: "exact", head: true })
      .eq("user_id", user.id)
      .gte("created_at", new Date(new Date().setHours(0, 0, 0, 0)).toISOString()),
  ]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Tableau de bord</h1>
          <p className="text-gray-500 dark:text-gray-400">Bienvenue, voici un aperçu réel de votre activité.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-gray-500 dark:text-gray-400">
            <span className="text-sm font-medium">Total Agents Actifs</span>
            <Bot className="w-4 h-4" />
          </div>
          <div className="text-3xl font-bold">{agentsCount || 0}</div>
        </Card>

        <Card className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-gray-500 dark:text-gray-400">
            <span className="text-sm font-medium">Total Leads</span>
            <Users className="w-4 h-4" />
          </div>
          <div className="text-3xl font-bold flex items-center gap-2">
            {leadsCount || 0}
            <span className="text-xs font-medium text-wa-green flex items-center bg-wa-green/10 px-1.5 py-0.5 rounded">
              <ArrowUpRight className="w-3 h-3 mr-0.5" /> 0%
            </span>
          </div>
        </Card>

        <Card className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-gray-500 dark:text-gray-400">
            <span className="text-sm font-medium">Conversations (24h)</span>
            <MessageSquare className="w-4 h-4" />
          </div>
          <div className="text-3xl font-bold">0</div>
        </Card>

        <Card className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-gray-500 dark:text-gray-400">
            <span className="text-sm font-medium">Commandes du jour</span>
            <ShoppingBag className="w-4 h-4" />
          </div>
          <div className="text-3xl font-bold text-wa-green">{ordersCount || 0}</div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Évolution des Leads (7 derniers jours)</h2>
          <div className="h-72 w-full">
            <DashboardChart />
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold mb-4">Activité récente</h2>
          <p className="text-sm text-gray-500">Aucune activité récente pour le moment.</p>
        </Card>
      </div>
    </div>
  );
}
