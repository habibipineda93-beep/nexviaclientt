import { useState } from "react";
import {
  MessageCircle,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  Image,
  FileText,
  Send,
  Users,
  MoreHorizontal,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const conversations = [
  { id: 1, name: "Carlos Rodríguez", phone: "+57 300 123 4567", lastMsg: "Gracias por la información", time: "10:32", unread: 2 },
  { id: 2, name: "María López", phone: "+57 310 987 6543", lastMsg: "¿Cuándo estará disponible?", time: "09:15", unread: 0 },
  { id: 3, name: "Empresa XYZ", phone: "+57 320 555 1234", lastMsg: "Confirmado, gracias", time: "Ayer", unread: 1 },
  { id: 4, name: "Ana Martínez", phone: "+57 315 222 3344", lastMsg: "Perfecto, quedo atenta", time: "Ayer", unread: 0 },
];

const templates = [
  { id: 1, name: "Bienvenida", status: "approved", category: "Marketing", lang: "ES" },
  { id: 2, name: "Confirmación de Pedido", status: "approved", category: "Transaccional", lang: "ES" },
  { id: 3, name: "Recordatorio de Cita", status: "pending", category: "Utilidad", lang: "ES" },
  { id: 4, name: "Oferta Especial", status: "rejected", category: "Marketing", lang: "ES" },
];

const tplStatus = (s: string) => {
  const map: Record<string, { label: string; variant: "default" | "secondary" | "destructive" }> = {
    approved: { label: "Aprobada", variant: "default" },
    pending: { label: "En revisión", variant: "secondary" },
    rejected: { label: "Rechazada", variant: "destructive" },
  };
  const v = map[s] || map.pending;
  return <Badge variant={v.variant}>{v.label}</Badge>;
};

export default function WhatsappPage() {
  const [tab, setTab] = useState("conversations");

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">WhatsApp Business</h1>
          <p className="text-muted-foreground text-sm">Gestiona conversaciones y plantillas de WhatsApp</p>
        </div>
        <Button className="gap-2" style={{ background: "var(--nexvia-gradient)" }}>
          <Plus className="h-4 w-4" />
          Nuevo Mensaje
        </Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Conversaciones", value: "284", icon: MessageCircle },
          { label: "Mensajes Hoy", value: "1,432", icon: Send },
          { label: "Plantillas Activas", value: "12", icon: FileText },
          { label: "Tasa de Lectura", value: "94.2%", icon: CheckCircle2 },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent/10">
                <s.icon className="h-4 w-4 text-accent" />
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
          <TabsTrigger value="conversations">Conversaciones</TabsTrigger>
          <TabsTrigger value="templates">Plantillas</TabsTrigger>
          <TabsTrigger value="broadcast">Difusión</TabsTrigger>
        </TabsList>

        <TabsContent value="conversations" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-display">Conversaciones Recientes</CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input className="h-9 pl-9 pr-3 rounded-lg border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30" placeholder="Buscar contacto..." />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {conversations.map((c) => (
                  <div key={c.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/30 cursor-pointer transition-colors">
                    <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                      <span className="text-sm font-semibold text-accent">{c.name[0]}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-foreground truncate">{c.name}</h4>
                        <span className="text-xs text-muted-foreground">{c.time}</span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{c.lastMsg}</p>
                    </div>
                    {c.unread > 0 && (
                      <span className="h-5 w-5 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center font-medium">{c.unread}</span>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="mt-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-display">Plantillas de WhatsApp</CardTitle>
                <Button size="sm" className="gap-2" style={{ background: "var(--nexvia-gradient)" }}><Plus className="h-3.5 w-3.5" /> Nueva Plantilla</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-2 text-muted-foreground font-medium">Nombre</th>
                      <th className="text-left py-3 px-2 text-muted-foreground font-medium">Categoría</th>
                      <th className="text-left py-3 px-2 text-muted-foreground font-medium">Idioma</th>
                      <th className="text-left py-3 px-2 text-muted-foreground font-medium">Estado</th>
                      <th className="py-3 px-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {templates.map((t) => (
                      <tr key={t.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                        <td className="py-3 px-2 font-medium text-foreground">{t.name}</td>
                        <td className="py-3 px-2 text-muted-foreground">{t.category}</td>
                        <td className="py-3 px-2 text-muted-foreground">{t.lang}</td>
                        <td className="py-3 px-2">{tplStatus(t.status)}</td>
                        <td className="py-3 px-2"><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="broadcast" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-display">Difusión Masiva</CardTitle>
              <CardDescription>Envía mensajes a múltiples contactos usando plantillas aprobadas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Plantilla</label>
                <select className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring/30">
                  <option>Selecciona una plantilla aprobada</option>
                  <option>Bienvenida</option>
                  <option>Confirmación de Pedido</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Lista de Contactos</label>
                <select className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring/30">
                  <option>Selecciona un grupo</option>
                  <option>Clientes Premium</option>
                  <option>Nuevos Usuarios</option>
                  <option>Todos los Contactos</option>
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" className="gap-2"><Clock className="h-4 w-4" /> Programar</Button>
                <Button className="gap-2" style={{ background: "var(--nexvia-gradient)" }}><Send className="h-4 w-4" /> Enviar</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
