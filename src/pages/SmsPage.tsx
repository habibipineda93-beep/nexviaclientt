import { useState } from "react";
import {
  Send,
  Upload,
  Users,
  Clock,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  CheckCircle2,
  XCircle,
  Loader2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const campaigns = [
  { id: 1, name: "Promo Navidad 2024", status: "sent", recipients: 2500, delivered: 2470, date: "2024-12-14", rate: "98.8%" },
  { id: 2, name: "Recordatorio Pago", status: "sent", recipients: 1200, delivered: 1188, date: "2024-12-13", rate: "99.0%" },
  { id: 3, name: "Bienvenida Nuevos", status: "scheduled", recipients: 350, delivered: 0, date: "2024-12-15", rate: "—" },
  { id: 4, name: "Encuesta Satisfacción", status: "draft", recipients: 0, delivered: 0, date: "—", rate: "—" },
  { id: 5, name: "Alerta de Servicio", status: "failed", recipients: 500, delivered: 120, date: "2024-12-12", rate: "24.0%" },
];

const statusBadge = (status: string) => {
  const map: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
    sent: { label: "Enviado", variant: "default" },
    scheduled: { label: "Programado", variant: "secondary" },
    draft: { label: "Borrador", variant: "outline" },
    failed: { label: "Fallido", variant: "destructive" },
  };
  const s = map[status] || map.draft;
  return <Badge variant={s.variant}>{s.label}</Badge>;
};

export default function SmsPage() {
  const [tab, setTab] = useState("campaigns");

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">SMS Masivos</h1>
          <p className="text-muted-foreground text-sm">Envía y gestiona campañas de mensajes de texto</p>
        </div>
        <Button className="gap-2" style={{ background: "var(--nexvia-gradient)" }}>
          <Plus className="h-4 w-4" />
          Nueva Campaña
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Enviados Hoy", value: "3,247", icon: Send },
          { label: "Tasa de Entrega", value: "98.7%", icon: CheckCircle2 },
          { label: "En Cola", value: "156", icon: Clock },
          { label: "Créditos SMS", value: "28,400", icon: Users },
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
          <TabsTrigger value="send">Envío Rápido</TabsTrigger>
          <TabsTrigger value="templates">Plantillas</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-display">Campañas SMS</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input className="h-9 pl-9 pr-3 rounded-lg border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30" placeholder="Buscar..." />
                  </div>
                  <Button variant="outline" size="icon"><Filter className="h-4 w-4" /></Button>
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
                      <th className="text-right py-3 px-2 text-muted-foreground font-medium">Destinatarios</th>
                      <th className="text-right py-3 px-2 text-muted-foreground font-medium">Entregados</th>
                      <th className="text-right py-3 px-2 text-muted-foreground font-medium">Tasa</th>
                      <th className="text-left py-3 px-2 text-muted-foreground font-medium">Fecha</th>
                      <th className="py-3 px-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {campaigns.map((c) => (
                      <tr key={c.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                        <td className="py-3 px-2 font-medium text-foreground">{c.name}</td>
                        <td className="py-3 px-2">{statusBadge(c.status)}</td>
                        <td className="py-3 px-2 text-right text-foreground">{c.recipients.toLocaleString()}</td>
                        <td className="py-3 px-2 text-right text-foreground">{c.delivered.toLocaleString()}</td>
                        <td className="py-3 px-2 text-right text-foreground">{c.rate}</td>
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

        <TabsContent value="send" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-display">Envío Rápido de SMS</CardTitle>
              <CardDescription>Envía un mensaje de texto a uno o varios destinatarios</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Destinatarios</label>
                <div className="flex gap-2">
                  <input className="flex-1 h-10 px-3 rounded-lg border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30" placeholder="Ingresa números separados por coma" />
                  <Button variant="outline" className="gap-2"><Upload className="h-4 w-4" /> Importar</Button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Mensaje</label>
                <textarea className="w-full h-32 px-3 py-2 rounded-lg border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 resize-none" placeholder="Escribe tu mensaje aquí..." maxLength={160} />
                <p className="text-xs text-muted-foreground text-right">0 / 160 caracteres</p>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" className="gap-2"><Clock className="h-4 w-4" /> Programar</Button>
                <Button className="gap-2" style={{ background: "var(--nexvia-gradient)" }}><Send className="h-4 w-4" /> Enviar Ahora</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-display">Plantillas SMS</CardTitle>
              <CardDescription>Gestiona tus plantillas de mensaje reutilizables</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["Bienvenida", "Recordatorio de Pago", "Confirmación de Cita", "Promoción"].map((name) => (
                  <div key={name} className="p-4 rounded-lg border border-border hover:border-primary/30 hover:shadow-sm transition-all cursor-pointer">
                    <h4 className="font-medium text-foreground text-sm">{name}</h4>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      Hola {"{{nombre}}"}, este es un mensaje de {name.toLowerCase()}...
                    </p>
                    <div className="flex items-center gap-2 mt-3">
                      <Badge variant="secondary">Activa</Badge>
                      <span className="text-xs text-muted-foreground">142 caracteres</span>
                    </div>
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
