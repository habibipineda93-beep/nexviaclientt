import { useState, useRef } from "react";
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
  Link2,
  DollarSign,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import EmojiPicker from "@/components/EmojiPicker";
import UrlShortenerDialog from "@/components/UrlShortenerDialog";
import { hasEmojis, getMaxChars, getSmsParts, calculateCost, COST_PER_SMS } from "@/lib/sms-utils";
import { toast } from "sonner";

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
  const [message, setMessage] = useState("");
  const [recipients, setRecipients] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const containsEmoji = hasEmojis(message);
  const maxChars = getMaxChars(message);
  const charCount = message.length;
  const parts = getSmsParts(message);
  const recipientCount = recipients.trim() ? recipients.split(",").filter((r) => r.trim()).length : 0;
  const totalCost = calculateCost(message, Math.max(recipientCount, 1));

  const handleEmojiSelect = (emoji: string) => {
    const ta = textareaRef.current;
    if (ta) {
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const newMsg = message.slice(0, start) + emoji + message.slice(end);
      setMessage(newMsg);
      setTimeout(() => {
        ta.focus();
        ta.setSelectionRange(start + emoji.length, start + emoji.length);
      }, 0);
    } else {
      setMessage((prev) => prev + emoji);
    }
  };

  const handleSend = () => {
    if (!message.trim()) {
      toast.error("Escribe un mensaje");
      return;
    }
    if (!recipients.trim()) {
      toast.error("Ingresa al menos un destinatario");
      return;
    }
    toast.success(`Enviando ${parts} SMS a ${recipientCount} destinatario(s) — Costo: $${totalCost.toLocaleString()} COP`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">SMS Masivos</h1>
          <p className="text-muted-foreground text-sm">Envía y gestiona campañas de mensajes de texto</p>
        </div>
        <div className="flex gap-2">
          <UrlShortenerDialog />
          <Button className="gap-2" style={{ background: "var(--nexvia-gradient)" }}>
            <Plus className="h-4 w-4" />
            Nueva Campaña
          </Button>
        </div>
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
                  <input
                    value={recipients}
                    onChange={(e) => setRecipients(e.target.value)}
                    className="flex-1 h-10 px-3 rounded-lg border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30"
                    placeholder="Ingresa números separados por coma"
                  />
                  <Button variant="outline" className="gap-2"><Upload className="h-4 w-4" /> Importar</Button>
                </div>
                {recipientCount > 0 && (
                  <p className="text-xs text-muted-foreground">{recipientCount} destinatario(s)</p>
                )}
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground">Mensaje</label>
                  <div className="flex items-center gap-1">
                    <UrlShortenerDialog
                      trigger={
                        <Button variant="ghost" size="sm" className="gap-1 h-7 text-xs">
                          <Link2 className="h-3 w-3" />
                          Acortar URL
                        </Button>
                      }
                    />
                    <EmojiPicker onEmojiSelect={handleEmojiSelect} />
                  </div>
                </div>
                <textarea
                  ref={textareaRef}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full h-32 px-3 py-2 rounded-lg border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 resize-none"
                  placeholder="Escribe tu mensaje aquí..."
                />
                {/* Character info bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-3">
                    <span className={charCount > maxChars ? "text-destructive font-medium" : "text-muted-foreground"}>
                      {charCount} / {maxChars} caracteres
                    </span>
                    {containsEmoji && (
                      <Badge variant="secondary" className="text-xs h-5">
                        Emoji detectado — máx. 70 chars
                      </Badge>
                    )}
                    {parts > 1 && (
                      <span className="text-muted-foreground">
                        {parts} partes SMS
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-foreground font-medium">
                    <DollarSign className="h-3 w-3" />
                    Costo: ${totalCost.toLocaleString()} COP
                    <span className="text-muted-foreground font-normal ml-1">
                      (${COST_PER_SMS}/msg)
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" className="gap-2"><Clock className="h-4 w-4" /> Programar</Button>
                <Button className="gap-2" style={{ background: "var(--nexvia-gradient)" }} onClick={handleSend}>
                  <Send className="h-4 w-4" /> Enviar Ahora
                </Button>
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
