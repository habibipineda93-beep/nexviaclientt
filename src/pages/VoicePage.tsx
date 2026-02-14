import { useState } from "react";
import {
  Phone,
  Plus,
  Search,
  Play,
  Pause,
  Volume2,
  Clock,
  Send,
  MoreHorizontal,
  FileAudio,
  Mic,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const campaigns = [
  { id: 1, name: "Recordatorio de Pago", status: "completed", calls: 800, answered: 640, duration: "2:15", date: "2024-12-13" },
  { id: 2, name: "Encuesta Satisfacción", status: "active", calls: 1200, answered: 480, duration: "1:45", date: "2024-12-14" },
  { id: 3, name: "Notificación de Corte", status: "scheduled", calls: 500, answered: 0, duration: "—", date: "2024-12-16" },
  { id: 4, name: "Promoción Fin de Año", status: "draft", calls: 0, answered: 0, duration: "—", date: "—" },
];

const statusBadge = (status: string) => {
  const map: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
    completed: { label: "Completada", variant: "default" },
    active: { label: "En curso", variant: "secondary" },
    scheduled: { label: "Programada", variant: "outline" },
    draft: { label: "Borrador", variant: "outline" },
  };
  const s = map[status] || map.draft;
  return <Badge variant={s.variant}>{s.label}</Badge>;
};

export default function VoicePage() {
  const [tab, setTab] = useState("campaigns");

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Llamadas de Voz</h1>
          <p className="text-muted-foreground text-sm">Campañas de llamadas automatizadas y Text-to-Speech</p>
        </div>
        <Button className="gap-2" style={{ background: "var(--nexvia-gradient)" }}>
          <Plus className="h-4 w-4" />
          Nueva Campaña
        </Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Llamadas Hoy", value: "1,280", icon: Phone },
          { label: "Tasa Respuesta", value: "72.5%", icon: Volume2 },
          { label: "Duración Prom.", value: "1:52", icon: Clock },
          { label: "Minutos Usados", value: "4,230", icon: Mic },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <s.icon className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-display text-lg font-bold text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="campaigns">Campañas</TabsTrigger>
          <TabsTrigger value="create">Crear Campaña</TabsTrigger>
          <TabsTrigger value="audio">Audios</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-display">Campañas de Voz</CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input className="h-9 pl-9 pr-3 rounded-lg border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30" placeholder="Buscar..." />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-2 text-muted-foreground font-medium">Campaña</th>
                      <th className="text-left py-3 px-2 text-muted-foreground font-medium">Estado</th>
                      <th className="text-right py-3 px-2 text-muted-foreground font-medium">Llamadas</th>
                      <th className="text-right py-3 px-2 text-muted-foreground font-medium">Contestadas</th>
                      <th className="text-right py-3 px-2 text-muted-foreground font-medium">Duración</th>
                      <th className="text-left py-3 px-2 text-muted-foreground font-medium">Fecha</th>
                      <th className="py-3 px-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {campaigns.map((c) => (
                      <tr key={c.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                        <td className="py-3 px-2 font-medium text-foreground">{c.name}</td>
                        <td className="py-3 px-2">{statusBadge(c.status)}</td>
                        <td className="py-3 px-2 text-right text-foreground">{c.calls.toLocaleString()}</td>
                        <td className="py-3 px-2 text-right text-foreground">{c.answered.toLocaleString()}</td>
                        <td className="py-3 px-2 text-right text-foreground">{c.duration}</td>
                        <td className="py-3 px-2 text-muted-foreground">{c.date}</td>
                        <td className="py-3 px-2"><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="create" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-display">Crear Campaña de Voz</CardTitle>
              <CardDescription>Configura llamadas automatizadas con Text-to-Speech o audio pregrabado</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Nombre de la Campaña</label>
                <input className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30" placeholder="Ej: Recordatorio de Pago Enero" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Tipo de Audio</label>
                <div className="grid grid-cols-2 gap-3">
                  <button className="p-4 rounded-lg border-2 border-primary bg-primary/5 text-center transition-all">
                    <Volume2 className="h-6 w-6 text-primary mx-auto mb-2" />
                    <span className="text-sm font-medium text-foreground">Text-to-Speech</span>
                    <p className="text-xs text-muted-foreground mt-1">Convierte texto a voz</p>
                  </button>
                  <button className="p-4 rounded-lg border border-border hover:border-primary/30 text-center transition-all">
                    <FileAudio className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
                    <span className="text-sm font-medium text-foreground">Audio Pregrabado</span>
                    <p className="text-xs text-muted-foreground mt-1">Sube un archivo MP3</p>
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Texto del Mensaje</label>
                <textarea className="w-full h-24 px-3 py-2 rounded-lg border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 resize-none" placeholder="Escribe el mensaje que será convertido a voz..." />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Destinatarios</label>
                <select className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring/30">
                  <option>Selecciona un grupo de contactos</option>
                  <option>Clientes con pagos pendientes</option>
                  <option>Todos los clientes</option>
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline">Guardar Borrador</Button>
                <Button variant="outline" className="gap-2"><Clock className="h-4 w-4" /> Programar</Button>
                <Button className="gap-2" style={{ background: "var(--nexvia-gradient)" }}><Phone className="h-4 w-4" /> Iniciar Llamadas</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audio" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-display">Biblioteca de Audios</CardTitle>
                <Button size="sm" variant="outline" className="gap-2"><Plus className="h-3.5 w-3.5" /> Subir Audio</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {["Saludo Corporativo", "Recordatorio de Pago", "Encuesta IVR", "Mensaje de Espera"].map((name) => (
                  <div key={name} className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/30 transition-colors">
                    <button className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0 hover:bg-primary/20 transition-colors">
                      <Play className="h-4 w-4 text-primary ml-0.5" />
                    </button>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-foreground">{name}</h4>
                      <p className="text-xs text-muted-foreground">0:32 • MP3 • 245 KB</p>
                    </div>
                    <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
