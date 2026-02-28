import {
  HelpCircle,
  Book,
  MessageSquare,
  Phone,
  Mail,
  ExternalLink,
  ChevronRight,
  Search,
  FileText,
  Video,
  Zap,
  Users,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const guides = [
  { title: "Primeros Pasos", desc: "Cómo configurar tu cuenta y enviar tu primer SMS", icon: Zap, tag: "Básico" },
  { title: "Envío Masivo por Archivo", desc: "Carga archivos CSV/Excel para envíos masivos", icon: FileText, tag: "Intermedio" },
  { title: "Plantillas y Variables", desc: "Personaliza mensajes con variables dinámicas", icon: MessageSquare, tag: "Intermedio" },
  { title: "Integración API REST", desc: "Conecta tus sistemas con la API de NEXVIA", icon: Book, tag: "Avanzado" },
  { title: "Gestión de Contactos", desc: "Organiza y segmenta tu base de datos", icon: Users, tag: "Básico" },
  { title: "Reportes y Análisis", desc: "Interpreta tus métricas de envío", icon: Video, tag: "Intermedio" },
];

const faqItems = [
  { q: "¿Cuánto cuesta un SMS?", a: "El costo estándar es de $27 COP por mensaje. Los mensajes con emojis (Premium) tienen un costo de $35 COP." },
  { q: "¿Qué métodos de pago aceptan?", a: "Aceptamos PSE, tarjetas de crédito/débito, Efecty, Gana, Nequi y Daviplata." },
  { q: "¿Cuántos caracteres tiene un SMS?", a: "Un SMS estándar tiene hasta 160 caracteres. Con emojis, el límite baja a 70 caracteres por segmento." },
  { q: "¿Puedo programar envíos?", a: "Sí, puedes programar envíos individuales y masivos seleccionando fecha y hora en el formulario de envío." },
  { q: "¿Qué es un mensaje Flash?", a: "Un SMS Flash se muestra directamente en la pantalla del destinatario sin guardarse en el historial." },
];

export default function HelpPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Centro de Ayuda</h1>
          <p className="text-muted-foreground text-sm">Guías, tutoriales y soporte técnico</p>
        </div>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="font-display text-lg font-semibold text-foreground mb-3">¿En qué podemos ayudarte?</h2>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input className="w-full h-12 pl-12 pr-4 rounded-xl border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30" placeholder="Buscar en guías, tutoriales, preguntas frecuentes..." />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Guides */}
      <div>
        <h2 className="font-display text-lg font-semibold text-foreground mb-4">Guías y Tutoriales</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {guides.map((g) => (
            <Card key={g.title} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => toast.info(`Abriendo: ${g.title}`)}>
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                    <g.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-semibold text-foreground">{g.title}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground">{g.desc}</p>
                    <span className="inline-block mt-2 text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded">{g.tag}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 mt-1" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-display">Preguntas Frecuentes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {faqItems.map((faq, i) => (
            <details key={i} className="group rounded-lg border border-border p-3">
              <summary className="flex items-center justify-between cursor-pointer text-sm font-medium text-foreground">
                {faq.q}
                <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-90" />
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">{faq.a}</p>
            </details>
          ))}
        </CardContent>
      </Card>

      {/* Contact support */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => toast.info("Abriendo chat de soporte...")}>
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-primary/10">
              <MessageSquare className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="font-display font-bold text-foreground">Chat en Vivo</p>
              <p className="text-xs text-muted-foreground">Lun-Vie 8am-6pm</p>
            </div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => toast.info("Llamando a soporte...")}>
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-accent/10">
              <Phone className="h-6 w-6 text-accent" />
            </div>
            <div>
              <p className="font-display font-bold text-foreground">Soporte Telefónico</p>
              <p className="text-xs text-muted-foreground">+57 601 234 5678</p>
            </div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => toast.info("Abriendo formulario de email...")}>
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-muted">
              <Mail className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <p className="font-display font-bold text-foreground">Email</p>
              <p className="text-xs text-muted-foreground">soporte@nexvia.com.co</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
