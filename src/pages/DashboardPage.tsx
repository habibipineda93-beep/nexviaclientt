import {
  MessageSquare,
  MessageCircle,
  Mail,
  Phone,
  TrendingUp,
  Users,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  Send,
  CheckCircle2,
  XCircle,
  Clock,
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

const stats = [
  {
    title: "Mensajes Enviados",
    value: "12,847",
    change: "+12.5%",
    trend: "up",
    icon: Send,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    title: "Tasa de Entrega",
    value: "98.7%",
    change: "+0.3%",
    trend: "up",
    icon: CheckCircle2,
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    title: "Contactos Activos",
    value: "3,241",
    change: "+185",
    trend: "up",
    icon: Users,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    title: "Créditos Disponibles",
    value: "45,200",
    change: "-2,100",
    trend: "down",
    icon: CreditCard,
    color: "text-muted-foreground",
    bg: "bg-muted",
  },
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
        <Button
          onClick={() => navigate("/sms")}
          className="gap-2"
          style={{ background: "var(--nexvia-gradient)" }}
        >
          <Send className="h-4 w-4" />
          Nuevo Envío
        </Button>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${stat.bg}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
                <span className={`flex items-center gap-1 text-xs font-medium ${stat.trend === "up" ? "text-accent" : "text-destructive"}`}>
                  {stat.trend === "up" ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {stat.change}
                </span>
              </div>
              <p className="font-display text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Area chart */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-display">Mensajes Enviados</CardTitle>
            <CardDescription>Últimos 7 días por canal</CardDescription>
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
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(0 0% 100%)",
                      border: "1px solid hsl(210 16% 90%)",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Area type="monotone" dataKey="sms" stroke="hsl(170 60% 40%)" fill="url(#gradSms)" strokeWidth={2} />
                  <Area type="monotone" dataKey="whatsapp" stroke="hsl(145 65% 40%)" fill="url(#gradWa)" strokeWidth={2} />
                  <Area type="monotone" dataKey="email" stroke="hsl(190 70% 35%)" fill="transparent" strokeWidth={2} />
                  <Area type="monotone" dataKey="voz" stroke="hsl(210 50% 50%)" fill="transparent" strokeWidth={1.5} strokeDasharray="4 4" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Channel breakdown */}
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
            <div className="space-y-3">
              {channelData.map((ch) => (
                <div key={ch.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ch.icon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">{ch.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-foreground">{ch.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick access + recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Quick access */}
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
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => navigate(item.url)}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors text-left"
              >
                <div className={`p-2 rounded-lg ${item.color}`}>
                  <item.icon className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium text-foreground">{item.label}</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground ml-auto" />
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Recent activity */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-display">Actividad Reciente</CardTitle>
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
                      {activity.count && (
                        <span className="text-xs text-muted-foreground">• {activity.count}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
