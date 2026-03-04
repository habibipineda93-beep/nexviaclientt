import {
  MessageSquare,
  MessageCircle,
  Mail,
  Phone,
  TrendingUp,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  Send,
  CheckCircle2,
  XCircle,
  Clock,
  Plus,
  Zap,
  Link2,
  CalendarClock,
  FileText,
  Upload,
  Download,
  BarChart3,
  Settings,
  HelpCircle,
  Wallet,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const stats = [
  { title: "Mensajes Enviados", value: "12,847", change: "+12.5%", trend: "up", icon: Send, color: "text-primary", bg: "bg-primary/10" },
  { title: "Tasa de Entrega", value: "98.7%", change: "+0.3%", trend: "up", icon: CheckCircle2, color: "text-accent", bg: "bg-accent/10" },
  { title: "URLs Acortadas", value: "156", change: "+24", trend: "up", icon: Link2, color: "text-primary", bg: "bg-primary/10" },
  { title: "Créditos Disponibles", value: "$45,200", change: "-2,100", trend: "down", icon: CreditCard, color: "text-muted-foreground", bg: "bg-muted" },
];

const chartData = [
  { name: "Lun", sms: 1200, whatsapp: 800, email: 400, voz: 150 },
  { name: "Mar", sms: 1800, whatsapp: 1200, email: 600, voz: 200 },
  { name: "Mié", sms: 1400, whatsapp: 900, email: 500, voz: 180 },
  { name: "Jue", sms: 2200, whatsapp: 1500, email: 800, voz: 250 },
  { name: "Vie", sms: 1900, whatsapp: 1100, email: 700, voz: 220 },
  { name: "Sáb", sms: 800, whatsapp: 600, email: 300, voz: 80 },
  { name: "Dom", sms: 500, whatsapp: 400, email: 200, voz: 50 },
];

const channelData = [
  { name: "SMS", value: 5200, icon: MessageSquare, color: "hsl(170 60% 40%)" },
  { name: "WhatsApp", value: 3800, icon: MessageCircle, color: "hsl(145 65% 40%)" },
  { name: "Email", value: 2500, icon: Mail, color: "hsl(190 70% 35%)" },
  { name: "Voz", value: 1347, icon: Phone, color: "hsl(210 50% 50%)" },
];

const recentActivity = [
  { type: "sms", message: "Campaña 'Promo Diciembre' enviada", time: "Hace 5 min", status: "success", count: "2,500 mensajes" },
  { type: "whatsapp", message: "Plantilla 'Bienvenida' aprobada", time: "Hace 15 min", status: "success", count: "" },
  { type: "email", message: "Campaña 'Newsletter Semanal' programada", time: "Hace 1 hora", status: "pending", count: "1,200 emails" },
  { type: "sms", message: "Envío fallido — saldo insuficiente", time: "Hace 2 horas", status: "error", count: "350 mensajes" },
  { type: "voz", message: "Campaña de recordatorio completada", time: "Hace 3 horas", status: "success", count: "800 llamadas" },
];

const statusIcon = (status: string) => {
  switch (status) {
    case "success": return <CheckCircle2 className="h-4 w-4 text-accent" />;
    case "error": return <XCircle className="h-4 w-4 text-destructive" />;
    case "pending": return <Clock className="h-4 w-4 text-muted-foreground" />;
    default: return null;
  }
};

export default function DashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground text-sm">Resumen de tu actividad de mensajería</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="gap-2" style={{ background: "var(--nexvia-gradient)" }}>
                <Plus className="h-4 w-4" /> Nuevo Envío
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Selecciona canal</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/sms")} className="gap-3 cursor-pointer">
                <MessageSquare className="h-4 w-4 text-primary" />
                <div><p className="font-medium">SMS</p><p className="text-xs text-muted-foreground">Individual o masivo</p></div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/whatsapp")} className="gap-3 cursor-pointer">
                <MessageCircle className="h-4 w-4 text-accent" />
                <div><p className="font-medium">WhatsApp</p><p className="text-xs text-muted-foreground">Mensaje o difusión</p></div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/email")} className="gap-3 cursor-pointer">
                <Mail className="h-4 w-4 text-primary" />
                <div><p className="font-medium">Email Marketing</p><p className="text-xs text-muted-foreground">Campaña de correo</p></div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/voice")} className="gap-3 cursor-pointer">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <div><p className="font-medium">Llamada de Voz</p><p className="text-xs text-muted-foreground">Text-to-Speech o audio</p></div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" className="gap-2" onClick={() => navigate("/reports")}>
            <BarChart3 className="h-4 w-4" /> Ver Reportes
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={stat.title} className="hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => navigate(["/reports", "/reports", "/url-shortener", "/billing"][i])}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${stat.bg}`}><stat.icon className={`h-4 w-4 ${stat.color}`} /></div>
                <span className={`flex items-center gap-1 text-xs font-medium ${stat.trend === "up" ? "text-accent" : "text-destructive"}`}>
                  {stat.trend === "up" ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}{stat.change}
                </span>
              </div>
              <p className="font-display text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Action toolbar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="gap-2" onClick={() => navigate("/sms")}>
              <Zap className="h-3.5 w-3.5" /> Envío Rápido SMS
            </Button>
            <Button variant="outline" size="sm" className="gap-2" onClick={() => navigate("/url-shortener")}>
              <Link2 className="h-3.5 w-3.5" /> Acortar URL
            </Button>
            <Button variant="outline" size="sm" className="gap-2" onClick={() => navigate("/sms")}>
              <CalendarClock className="h-3.5 w-3.5" /> Programar Envío
            </Button>
            <Button variant="outline" size="sm" className="gap-2" onClick={() => navigate("/sms")}>
              <FileText className="h-3.5 w-3.5" /> Plantillas
            </Button>
            <Button variant="outline" size="sm" className="gap-2" onClick={() => navigate("/reports")}>
              <Download className="h-3.5 w-3.5" /> Exportar Reporte
            </Button>
            <Button variant="outline" size="sm" className="gap-2" onClick={() => navigate("/billing")}>
              <Wallet className="h-3.5 w-3.5" /> Recargar Saldo
            </Button>
            <Button variant="outline" size="sm" className="gap-2" onClick={() => navigate("/settings")}>
              <Settings className="h-3.5 w-3.5" /> Configuración
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-display">Mensajes Enviados</CardTitle>
                <CardDescription>Últimos 7 días por canal</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={() => navigate("/reports")}>Ver más</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="gradSms" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(170 60% 40%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(170 60% 40%)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gradWa" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(145 65% 40%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(145 65% 40%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(210 16% 90%)" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="hsl(210 10% 55%)" />
                  <YAxis tick={{ fontSize: 12 }} stroke="hsl(210 10% 55%)" />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(0 0% 100%)", border: "1px solid hsl(210 16% 90%)", borderRadius: "8px", fontSize: "12px" }} />
                  <Area type="monotone" dataKey="sms" stroke="hsl(170 60% 40%)" fill="url(#gradSms)" strokeWidth={2} />
                  <Area type="monotone" dataKey="whatsapp" stroke="hsl(145 65% 40%)" fill="url(#gradWa)" strokeWidth={2} />
                  <Area type="monotone" dataKey="email" stroke="hsl(190 70% 35%)" fill="transparent" strokeWidth={2} />
                  <Area type="monotone" dataKey="voz" stroke="hsl(210 50% 50%)" fill="transparent" strokeWidth={1.5} strokeDasharray="4 4" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-display">Por Canal</CardTitle>
            <CardDescription>Distribución esta semana</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-40 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={channelData} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} width={70} stroke="hsl(210 10% 55%)" />
                  <Bar dataKey="value" radius={[0, 6, 6, 0]} fill="hsl(170 60% 40%)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              {channelData.map((ch) => {
                const routes: Record<string, string> = { SMS: "/sms", WhatsApp: "/whatsapp", Email: "/email", Voz: "/voice" };
                return (
                  <button key={ch.name} onClick={() => navigate(routes[ch.name])} className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-2"><ch.icon className="h-4 w-4 text-muted-foreground" /><span className="text-sm text-foreground">{ch.name}</span></div>
                    <div className="flex items-center gap-2"><span className="text-sm font-semibold text-foreground">{ch.value.toLocaleString()}</span><ArrowUpRight className="h-3 w-3 text-muted-foreground" /></div>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick access + Recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-display">Acceso Rápido</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              { label: "Enviar SMS", icon: MessageSquare, url: "/sms", color: "bg-primary/10 text-primary" },
              { label: "Enviar WhatsApp", icon: MessageCircle, url: "/whatsapp", color: "bg-accent/10 text-accent" },
              { label: "Crear Campaña Email", icon: Mail, url: "/email", color: "bg-primary/10 text-primary" },
              { label: "Llamada Masiva", icon: Phone, url: "/voice", color: "bg-muted text-muted-foreground" },
              { label: "Acortador URLs", icon: Link2, url: "/url-shortener", color: "bg-primary/10 text-primary" },
              { label: "Recargar Saldo", icon: Wallet, url: "/billing", color: "bg-accent/10 text-accent" },
              { label: "Ver Reportes", icon: BarChart3, url: "/reports", color: "bg-primary/10 text-primary" },
              { label: "Configuración", icon: Settings, url: "/settings", color: "bg-muted text-muted-foreground" },
              { label: "Centro de Ayuda", icon: HelpCircle, url: "/help", color: "bg-accent/10 text-accent" },
            ].map((item) => (
              <button key={item.label} onClick={() => navigate(item.url)} className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors text-left">
                <div className={`p-2 rounded-lg ${item.color}`}><item.icon className="h-4 w-4" /></div>
                <span className="text-sm font-medium text-foreground">{item.label}</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground ml-auto" />
              </button>
            ))}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-display">Actividad Reciente</CardTitle>
              <Button variant="outline" size="sm" onClick={() => navigate("/reports")}>Ver todo</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, i) => (
                <div key={i} className="flex items-start gap-3 pb-3 border-b border-border last:border-0 last:pb-0">
                  {statusIcon(activity.status)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground truncate">{activity.message}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                      {activity.count && <span className="text-xs text-muted-foreground">• {activity.count}</span>}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-xs shrink-0" onClick={() => navigate("/reports")}>
                    Ver
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
