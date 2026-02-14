import { useState } from "react";
import {
  Mail,
  Plus,
  Search,
  Eye,
  MousePointerClick,
  Send,
  Clock,
  MoreHorizontal,
  BarChart3,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const campaigns = [
  { id: 1, name: "Newsletter Diciembre", status: "sent", recipients: 3200, opens: 1280, clicks: 384, date: "2024-12-12" },
  { id: 2, name: "Oferta Black Friday", status: "sent", recipients: 5000, opens: 2250, clicks: 675, date: "2024-11-29" },
  { id: 3, name: "Bienvenida Nuevos Clientes", status: "active", recipients: 150, opens: 98, clicks: 42, date: "Automático" },
  { id: 4, name: "Encuesta Q4", status: "draft", recipients: 0, opens: 0, clicks: 0, date: "—" },
];

const statusBadge = (status: string) => {
  const map: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
    sent: { label: "Enviado", variant: "default" },
    active: { label: "Activo", variant: "secondary" },
    draft: { label: "Borrador", variant: "outline" },
  };
  const s = map[status] || map.draft;
  return <Badge variant={s.variant}>{s.label}</Badge>;
};

export default function EmailPage() {
  const [tab, setTab] = useState("campaigns");

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Email Marketing</h1>
          <p className="text-muted-foreground text-sm">Crea y gestiona campañas de email profesionales</p>
        </div>
        <Button className="gap-2" style={{ background: "var(--nexvia-gradient)" }}>
          <Plus className="h-4 w-4" />
          Nueva Campaña
        </Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Emails Enviados", value: "8,350", icon: Send },
          { label: "Tasa de Apertura", value: "42.3%", icon: Eye },
          { label: "Tasa de Clicks", value: "12.8%", icon: MousePointerClick },
          { label: "Campañas Activas", value: "3", icon: BarChart3 },
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
          <TabsTrigger value="compose">Crear Email</TabsTrigger>
          <TabsTrigger value="templates">Plantillas</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-display">Campañas de Email</CardTitle>
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
                      <th className="text-right py-3 px-2 text-muted-foreground font-medium">Enviados</th>
                      <th className="text-right py-3 px-2 text-muted-foreground font-medium">Aperturas</th>
                      <th className="text-right py-3 px-2 text-muted-foreground font-medium">Clicks</th>
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
                        <td className="py-3 px-2 text-right text-foreground">{c.opens.toLocaleString()}</td>
                        <td className="py-3 px-2 text-right text-foreground">{c.clicks.toLocaleString()}</td>
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

        <TabsContent value="compose" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-display">Crear Campaña de Email</CardTitle>
              <CardDescription>Configura y envía tu campaña de email marketing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Asunto</label>
                  <input className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30" placeholder="Escribe el asunto del email" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Remitente</label>
                  <input className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30" placeholder="nombre@tuempresa.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Lista de Destinatarios</label>
                <select className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring/30">
                  <option>Selecciona un grupo de contactos</option>
                  <option>Todos los clientes</option>
                  <option>Clientes Premium</option>
                  <option>Nuevos registros</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Contenido</label>
                <div className="h-48 rounded-lg border border-input bg-muted/20 flex items-center justify-center">
                  <p className="text-sm text-muted-foreground">Editor de email (arrastra y suelta)</p>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline">Guardar Borrador</Button>
                <Button variant="outline" className="gap-2"><Clock className="h-4 w-4" /> Programar</Button>
                <Button className="gap-2" style={{ background: "var(--nexvia-gradient)" }}><Send className="h-4 w-4" /> Enviar</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-display">Plantillas de Email</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {["Newsletter", "Promocional", "Transaccional", "Bienvenida", "Reactivación"].map((name) => (
                  <div key={name} className="rounded-lg border border-border hover:border-primary/30 hover:shadow-sm transition-all cursor-pointer overflow-hidden">
                    <div className="h-32 bg-muted/30 flex items-center justify-center">
                      <Mail className="h-8 w-8 text-muted-foreground/40" />
                    </div>
                    <div className="p-3">
                      <h4 className="font-medium text-foreground text-sm">{name}</h4>
                      <p className="text-xs text-muted-foreground mt-1">Plantilla de {name.toLowerCase()}</p>
                    </div>
                  </div>
                ))}
                <div className="rounded-lg border border-dashed border-border hover:border-primary/30 transition-all cursor-pointer flex items-center justify-center min-h-[180px]">
                  <div className="text-center">
                    <Plus className="h-8 w-8 text-muted-foreground/40 mx-auto" />
                    <p className="text-sm text-muted-foreground mt-2">Crear Plantilla</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
