import { useState, useRef } from "react";
import {
  Send,
  Upload,
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
  FileSpreadsheet,
  User,
  Users,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
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
  const [tab, setTab] = useState("one-to-one");
  const [message, setMessage] = useState("");
  const [recipient, setRecipient] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [bulkMessage, setBulkMessage] = useState("");
  const [bulkFile, setBulkFile] = useState<File | null>(null);
  const [acceptedTermsBulk, setAcceptedTermsBulk] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const bulkTextareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // One-to-one calculations
  const containsEmoji = hasEmojis(message);
  const maxChars = getMaxChars(message);
  const charCount = message.length;
  const parts = getSmsParts(message);
  const totalCost = calculateCost(message, 1);

  // Bulk calculations
  const bulkContainsEmoji = hasEmojis(bulkMessage);
  const bulkMaxChars = getMaxChars(bulkMessage);
  const bulkCharCount = bulkMessage.length;
  const bulkParts = getSmsParts(bulkMessage);

  const handleEmojiSelect = (emoji: string, ref: React.RefObject<HTMLTextAreaElement>, setter: React.Dispatch<React.SetStateAction<string>>, currentMsg: string) => {
    const ta = ref.current;
    if (ta) {
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const newMsg = currentMsg.slice(0, start) + emoji + currentMsg.slice(end);
      setter(newMsg);
      setTimeout(() => {
        ta.focus();
        ta.setSelectionRange(start + emoji.length, start + emoji.length);
      }, 0);
    } else {
      setter((prev) => prev + emoji);
    }
  };

  const handleSendOne = () => {
    if (!message.trim()) { toast.error("Escribe un mensaje"); return; }
    if (!recipient.trim()) { toast.error("Ingresa un número de destino"); return; }
    if (!acceptedTerms) { toast.error("Debes aceptar los términos y condiciones"); return; }
    toast.success(`Enviando ${parts} SMS a ${recipient} — Costo: $${totalCost.toLocaleString()} COP`);
  };

  const handleSendBulk = () => {
    if (!bulkMessage.trim()) { toast.error("Escribe un mensaje"); return; }
    if (!bulkFile) { toast.error("Sube un archivo con los destinatarios"); return; }
    if (!acceptedTermsBulk) { toast.error("Debes aceptar los términos y condiciones"); return; }
    toast.success(`Enviando SMS masivo con archivo "${bulkFile.name}" — ${bulkParts} parte(s) por mensaje`);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = [".csv", ".xlsx", ".xls", ".txt"];
      const ext = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();
      if (!validTypes.includes(ext)) {
        toast.error("Formato no válido. Usa CSV, Excel o TXT");
        return;
      }
      setBulkFile(file);
      toast.success(`Archivo "${file.name}" cargado correctamente`);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">SMS</h1>
          <p className="text-muted-foreground text-sm">Envía mensajes individuales o masivos</p>
        </div>
        <div className="flex gap-2">
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
          <TabsTrigger value="one-to-one" className="gap-2">
            <User className="h-3.5 w-3.5" /> Uno a Uno
          </TabsTrigger>
          <TabsTrigger value="bulk" className="gap-2">
            <FileSpreadsheet className="h-3.5 w-3.5" /> Masivos
          </TabsTrigger>
          <TabsTrigger value="campaigns">Campañas</TabsTrigger>
          <TabsTrigger value="templates">Plantillas</TabsTrigger>
        </TabsList>

        {/* ── UNO A UNO ── */}
        <TabsContent value="one-to-one" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-display flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                Envío Individual
              </CardTitle>
              <CardDescription>Envía un mensaje de texto a un solo número</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Número de destino</label>
                <input
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30"
                  placeholder="+57 300 123 4567"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground">Mensaje</label>
                  <div className="flex items-center gap-1">
                    <EmojiPicker onEmojiSelect={(emoji) => handleEmojiSelect(emoji, textareaRef, setMessage, message)} />
                  </div>
                </div>
                <textarea
                  ref={textareaRef}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full h-32 px-3 py-2 rounded-lg border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 resize-none"
                  placeholder="Escribe tu mensaje aquí..."
                />
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-3">
                    <span className={charCount > maxChars ? "text-destructive font-medium" : "text-muted-foreground"}>
                      {charCount} / {maxChars} caracteres
                    </span>
                    {containsEmoji && (
                      <Badge variant="secondary" className="text-xs h-5">
                        Emoji detectado — máx. 70 chars (Premium)
                      </Badge>
                    )}
                    {!containsEmoji && charCount > 0 && (
                      <Badge variant="outline" className="text-xs h-5">
                        Estándar — 160 chars
                      </Badge>
                    )}
                    {parts > 1 && (
                      <span className="text-muted-foreground">{parts} partes SMS</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-foreground font-medium">
                    <DollarSign className="h-3 w-3" />
                    Costo: ${totalCost.toLocaleString()} COP
                    <span className="text-muted-foreground font-normal ml-1">(${COST_PER_SMS}/msg)</span>
                  </div>
                </div>
              </div>

              {/* Terms acceptance */}
              <div className="flex items-start gap-2 p-3 rounded-lg border border-border bg-muted/30">
                <Checkbox
                  id="terms-one"
                  checked={acceptedTerms}
                  onCheckedChange={(checked) => setAcceptedTerms(checked === true)}
                  className="mt-0.5"
                />
                <label htmlFor="terms-one" className="text-xs text-muted-foreground cursor-pointer leading-relaxed">
                  Acepto los <span className="text-primary font-medium underline">términos y condiciones</span> de NEXVIA para el envío de mensajes. Declaro que cuento con la autorización de los destinatarios según la normativa colombiana de protección de datos (Ley 1581 de 2012).
                </label>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" className="gap-2"><Clock className="h-4 w-4" /> Programar</Button>
                <Button className="gap-2" style={{ background: "var(--nexvia-gradient)" }} onClick={handleSendOne} disabled={!acceptedTerms}>
                  <Send className="h-4 w-4" /> Enviar Ahora
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── MASIVOS ── */}
        <TabsContent value="bulk" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-display flex items-center gap-2">
                <FileSpreadsheet className="h-4 w-4 text-primary" />
                Envío Masivo por Archivo
              </CardTitle>
              <CardDescription>Sube un archivo CSV, Excel o TXT con los números de los destinatarios</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* File upload */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Archivo de destinatarios</label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary/40 hover:bg-muted/20 transition-all"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".csv,.xlsx,.xls,.txt"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  {bulkFile ? (
                    <div className="flex items-center justify-center gap-3">
                      <FileSpreadsheet className="h-8 w-8 text-primary" />
                      <div className="text-left">
                        <p className="text-sm font-medium text-foreground">{bulkFile.name}</p>
                        <p className="text-xs text-muted-foreground">{(bulkFile.size / 1024).toFixed(1)} KB — Haz clic para cambiar</p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-foreground font-medium">Haz clic para subir tu archivo</p>
                      <p className="text-xs text-muted-foreground mt-1">CSV, Excel (.xlsx, .xls) o TXT — una línea por número</p>
                    </>
                  )}
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground">Mensaje</label>
                  <div className="flex items-center gap-1">
                    <EmojiPicker onEmojiSelect={(emoji) => handleEmojiSelect(emoji, bulkTextareaRef, setBulkMessage, bulkMessage)} />
                  </div>
                </div>
                <textarea
                  ref={bulkTextareaRef}
                  value={bulkMessage}
                  onChange={(e) => setBulkMessage(e.target.value)}
                  className="w-full h-32 px-3 py-2 rounded-lg border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 resize-none"
                  placeholder="Escribe tu mensaje aquí..."
                />
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-3">
                    <span className={bulkCharCount > bulkMaxChars ? "text-destructive font-medium" : "text-muted-foreground"}>
                      {bulkCharCount} / {bulkMaxChars} caracteres
                    </span>
                    {bulkContainsEmoji && (
                      <Badge variant="secondary" className="text-xs h-5">Emoji detectado — máx. 70 chars (Premium)</Badge>
                    )}
                    {!bulkContainsEmoji && bulkCharCount > 0 && (
                      <Badge variant="outline" className="text-xs h-5">Estándar — 160 chars</Badge>
                    )}
                    {bulkParts > 1 && (
                      <span className="text-muted-foreground">{bulkParts} partes SMS</span>
                    )}
                  </div>
                  <span className="text-muted-foreground">
                    Costo: ${COST_PER_SMS} COP × destinatario × {bulkParts} parte(s)
                  </span>
                </div>
              </div>

              {/* Terms acceptance */}
              <div className="flex items-start gap-2 p-3 rounded-lg border border-border bg-muted/30">
                <Checkbox
                  id="terms-bulk"
                  checked={acceptedTermsBulk}
                  onCheckedChange={(checked) => setAcceptedTermsBulk(checked === true)}
                  className="mt-0.5"
                />
                <label htmlFor="terms-bulk" className="text-xs text-muted-foreground cursor-pointer leading-relaxed">
                  Acepto los <span className="text-primary font-medium underline">términos y condiciones</span> de NEXVIA para el envío masivo de mensajes. Declaro que la base de datos cargada cumple con la normativa colombiana de protección de datos (Ley 1581 de 2012) y que todos los destinatarios han autorizado el envío.
                </label>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" className="gap-2"><Clock className="h-4 w-4" /> Programar</Button>
                <Button className="gap-2" style={{ background: "var(--nexvia-gradient)" }} onClick={handleSendBulk} disabled={!acceptedTermsBulk}>
                  <Send className="h-4 w-4" /> Enviar Masivo
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

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
