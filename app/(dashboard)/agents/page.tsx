import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Plus, Bot, Power, MoreVertical, Edit } from "lucide-react";
import Link from "next/link";
import { createServerClient } from "@/lib/supabase";
import { cookies } from "next/headers";

export default async function AgentsPage() {
  const cookieStore = cookies();
  const supabase = createServerClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return <div>Non autorisé</div>;
  }

  const { data: agents } = await supabase
    .from("agents")
    .select("*")
    .eq("user_id", session.user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Agents IA</h1>
          <p className="text-gray-500 dark:text-gray-400">Gérez vos assistants virtuels WhatsApp.</p>
        </div>
        <Button variant="wa" className="gap-2">
          <Plus className="w-4 h-4" />
          Créer un agent
        </Button>
      </div>

      {!agents || agents.length === 0 ? (
        <Card className="p-12 text-center text-gray-500">
          <Bot className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-medium mb-2">Aucun agent configuré</h3>
          <p className="mb-6">Commencez par créer votre premier assistant virtuel.</p>
          <Button variant="wa" className="mx-auto">Créer mon premier agent</Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent: any) => (
            <Card key={agent.id} className="flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl bg-wa-green/10 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-wa-green" />
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
              
              <h3 className="text-xl font-bold mb-1">{agent.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Modèle: {agent.model}</p>
              
              <div className="flex items-center gap-2 mb-6">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                  agent.status === "Actif" ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400" : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
                }`}>
                  {agent.status === "Actif" && <span className="w-1.5 h-1.5 rounded-full bg-current" />}
                  {agent.status}
                </span>
              </div>

              <div className="mt-auto grid grid-cols-2 gap-2 pt-4 border-t border-gray-100 dark:border-white/5">
                <Button variant="outline" className="w-full gap-2 text-xs h-9">
                  <Edit className="w-3.5 h-3.5" /> Modifier
                </Button>
                <Button variant="outline" className="w-full gap-2 text-xs h-9">
                  <Power className="w-3.5 h-3.5" /> {agent.status === "Actif" ? "Désactiver" : "Activer"}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
