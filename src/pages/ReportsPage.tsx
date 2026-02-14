import {
  BarChart3,
  Download,
  Calendar,
  TrendingUp,
  MessageSquare,
  MessageCircle,
  Mail,
  Phone,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

const monthlyData = [
  { name: "Jul", sms: 8200, whatsapp: 5400, email: 3200, voz: 1200 },
  { name: "Ago", sms: 9100, whatsapp: 6200, email: 3800, voz: 1400 },
  { name: "Sep", sms: 7800, whatsapp: 5800, email: 4100, voz: 1100 },
  { name: "Oct", sms: 10200, whatsapp: 7100, email: 4500, voz: 1600 },
  { name: "Nov", sms: 11500, whatsapp: 8200, email: 5200, voz: 1800 },
  { name: "Dic", sms: 12800, whatsapp: 9000, email: 5800, voz: 2100 },
];

const pieData = [
  { name: "SMS", value: 45, color: "hsl(170 60% 40%)" },
  { name: "WhatsApp", value: 28, color: "hsl(145 65% 40%)" },
  { name: "Email", value: 18, color: "hsl(190 70% 35%)" },
  { name: "Voz", value: 9, color: "hsl(210 50% 50%)" },
];

const deliveryData = [
  { name: "Lun", rate: 98.5 },
  { name: "Mar", rate: 99.1 },
  { name: "Mié", rate: 97.8 },
  { name: "Jue", rate: 99.3 },
  { name: "Vie", rate: 98.9 },
  { name: "Sáb", rate: 99.5 },
  { name: "Dom", rate: 99.2 },
];

export default function ReportsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Reportes</h1>
          <p className="text-muted-foreground text-sm">Análisis detallado de tu actividad de mensajería</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2"><Calendar className="h-4 w-4" /> Últimos 6 meses</Button>
          <Button variant="outline" className="gap-2"><Download className="h-4 w-4" /> Exportar</Button>
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Mensajes", value: "127,450", icon: MessageSquare, change: "+18%" },
          { label: "Tasa de Entrega", value: "98.9%", icon: TrendingUp, change: "+0.5%" },
          { label: "Canales Activos", value: "4", icon: BarChart3, change: "" },
          { label: "Costo Promedio", value: "$0.012", icon: Mail, change: "-8%" },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <s.icon className="h-4 w-4 text-primary" />
                {s.change && <span className="text-xs font-medium text-accent">{s.change}</span>}
              </div>
              <p className="font-display text-xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-display">Volumen por Canal</CardTitle>
            <CardDescription>Últimos 6 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(210 16% 90%)" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="hsl(210 10% 55%)" />
                  <YAxis tick={{ fontSize: 12 }} stroke="hsl(210 10% 55%)" />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(0 0% 100%)", border: "1px solid hsl(210 16% 90%)", borderRadius: "8px", fontSize: "12px" }} />
                  <Bar dataKey="sms" fill="hsl(170 60% 40%)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="whatsapp" fill="hsl(145 65% 40%)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="email" fill="hsl(190 70% 35%)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="voz" fill="hsl(210 50% 50%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-display">Distribución</CardTitle>
            <CardDescription>Por canal de comunicación</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" strokeWidth={0}>
                    {pieData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: "hsl(0 0% 100%)", border: "1px solid hsl(210 16% 90%)", borderRadius: "8px", fontSize: "12px" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-2">
              {pieData.map((d) => (
                <div key={d.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: d.color }} />
                    <span className="text-foreground">{d.name}</span>
                  </div>
                  <span className="font-medium text-foreground">{d.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Delivery rate chart */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-display">Tasa de Entrega</CardTitle>
          <CardDescription>Últimos 7 días</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={deliveryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(210 16% 90%)" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="hsl(210 10% 55%)" />
                <YAxis domain={[96, 100]} tick={{ fontSize: 12 }} stroke="hsl(210 10% 55%)" />
                <Tooltip contentStyle={{ backgroundColor: "hsl(0 0% 100%)", border: "1px solid hsl(210 16% 90%)", borderRadius: "8px", fontSize: "12px" }} />
                <Line type="monotone" dataKey="rate" stroke="hsl(170 60% 40%)" strokeWidth={2} dot={{ fill: "hsl(170 60% 40%)", r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
