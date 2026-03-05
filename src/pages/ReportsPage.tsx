import {
  BarChart3,
  Download,
  Calendar,
  TrendingUp,
  MessageSquare,
  AlertTriangle,
  DollarSign,
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
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const OPERATOR_COLORS = {
  Claro: "#E30613",
  Tigo: "#00377B",
  Movistar: "#5CB615",
  WOM: "#6B2D8B",
};

const operatorMonthlyData = [
  { name: "Jul", Claro: 3200, Tigo: 2100, Movistar: 1800, WOM: 1100 },
  { name: "Ago", Claro: 3600, Tigo: 2400, Movistar: 1900, WOM: 1200 },
  { name: "Sep", Claro: 3100, Tigo: 2000, Movistar: 1700, WOM: 1000 },
  { name: "Oct", Claro: 4100, Tigo: 2800, Movistar: 2100, WOM: 1200 },
  { name: "Nov", Claro: 4600, Tigo: 3100, Movistar: 2400, WOM: 1400 },
  { name: "Dic", Claro: 5200, Tigo: 3400, Movistar: 2700, WOM: 1500 },
];

const deliveryRateData = [
  { name: "Jul", Claro: 98.2, Tigo: 97.5, Movistar: 98.8, WOM: 96.9 },
  { name: "Ago", Claro: 98.5, Tigo: 97.8, Movistar: 99.1, WOM: 97.2 },
  { name: "Sep", Claro: 97.9, Tigo: 97.2, Movistar: 98.5, WOM: 96.5 },
  { name: "Oct", Claro: 98.8, Tigo: 98.1, Movistar: 99.3, WOM: 97.5 },
  { name: "Nov", Claro: 99.1, Tigo: 98.4, Movistar: 99.5, WOM: 97.8 },
  { name: "Dic", Claro: 99.0, Tigo: 98.2, Movistar: 99.4, WOM: 97.6 },
];

const rejectionData = [
  { name: "Teléfono apagado", value: 6.2, color: "#EF4444" },
  { name: "Número mal escrito", value: 3.8, color: "#F59E0B" },
  { name: "Número inexistente", value: 4.1, color: "#8B5CF6" },
  { name: "Fuera de cobertura", value: 2.5, color: "#6366F1" },
];

const tooltipStyle = {
  backgroundColor: "hsl(0 0% 100%)",
  border: "1px solid hsl(210 16% 90%)",
  borderRadius: "8px",
  fontSize: "12px",
};

export default function ReportsPage() {
  const totalRejected = rejectionData.reduce((s, d) => s + d.value, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Reportes</h1>
          <p className="text-muted-foreground text-sm">Análisis de entrega SMS por operador</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2"><Calendar className="h-4 w-4" /> Últimos 6 meses</Button>
          <Button variant="outline" className="gap-2"><Download className="h-4 w-4" /> Exportar</Button>
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total SMS", value: "127,450", icon: MessageSquare, change: "+18%" },
          { label: "Tasa de Entrega", value: "98.2%", icon: TrendingUp, change: "+0.5%" },
          { label: "Rechazados", value: `${totalRejected.toFixed(1)}%`, icon: AlertTriangle, change: "-1.2%" },
          { label: "Costo Total", value: "$1,274,500", icon: DollarSign, change: "+18%" },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <s.icon className="h-4 w-4 text-primary" />
                <span className="text-xs font-medium text-accent">{s.change}</span>
              </div>
              <p className="font-display text-xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Mensajes Entregados por Operador */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-display">Mensajes Entregados por Operador</CardTitle>
          <CardDescription>Últimos 6 meses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={operatorMonthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(210 16% 90%)" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="hsl(210 10% 55%)" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(210 10% 55%)" />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="Claro" fill={OPERATOR_COLORS.Claro} radius={[4, 4, 0, 0]} />
                <Bar dataKey="Tigo" fill={OPERATOR_COLORS.Tigo} radius={[4, 4, 0, 0]} />
                <Bar dataKey="Movistar" fill={OPERATOR_COLORS.Movistar} radius={[4, 4, 0, 0]} />
                <Bar dataKey="WOM" fill={OPERATOR_COLORS.WOM} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-4 mt-4 justify-center">
            {Object.entries(OPERATOR_COLORS).map(([name, color]) => (
              <div key={name} className="flex items-center gap-2 text-sm">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: color }} />
                <span className="text-foreground">{name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tasa de Entrega por Operador + Rechazos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-display">Tasa de Entrega por Operador</CardTitle>
            <CardDescription>Porcentaje mensual</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={deliveryRateData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(210 16% 90%)" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="hsl(210 10% 55%)" />
                  <YAxis domain={[95, 100]} tick={{ fontSize: 12 }} stroke="hsl(210 10% 55%)" />
                  <Tooltip contentStyle={tooltipStyle} formatter={(value: number) => `${value}%`} />
                  <Line type="monotone" dataKey="Claro" stroke={OPERATOR_COLORS.Claro} strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="Tigo" stroke={OPERATOR_COLORS.Tigo} strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="Movistar" stroke={OPERATOR_COLORS.Movistar} strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="WOM" stroke={OPERATOR_COLORS.WOM} strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-display">Mensajes Rechazados</CardTitle>
            <CardDescription>Razones de rechazo — Total: {totalRejected.toFixed(1)}%</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-48 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={rejectionData} cx="50%" cy="50%" innerRadius={45} outerRadius={75} dataKey="value" strokeWidth={0}>
                    {rejectionData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} formatter={(value: number) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3">
              {rejectionData.map((d) => (
                <div key={d.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: d.color }} />
                    <span className="text-sm text-foreground">{d.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-foreground">{d.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
