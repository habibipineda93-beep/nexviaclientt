import {
  CreditCard,
  Wallet,
  DollarSign,
  Download,
  Clock,
  CheckCircle2,
  ArrowUpRight,
  Receipt,
  Building2,
  Smartphone,
  Banknote,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const transactions = [
  { id: "TXN-001", date: "2024-12-14", method: "PSE", amount: "$150,000", status: "completed", description: "Recarga de saldo" },
  { id: "TXN-002", date: "2024-12-10", method: "Nequi", amount: "$50,000", status: "completed", description: "Recarga de saldo" },
  { id: "TXN-003", date: "2024-12-05", method: "Tarjeta Visa", amount: "$200,000", status: "completed", description: "Recarga de saldo" },
  { id: "TXN-004", date: "2024-11-28", method: "Efecty", amount: "$100,000", status: "pending", description: "Pendiente de confirmación" },
  { id: "TXN-005", date: "2024-11-20", method: "PSE", amount: "$300,000", status: "completed", description: "Recarga de saldo" },
];

const paymentMethods = [
  { name: "PSE", description: "Débito bancario directo", icon: Building2, available: true },
  { name: "Tarjeta Crédito/Débito", description: "Visa, Mastercard, Amex", icon: CreditCard, available: true },
  { name: "Efecty", description: "Pago en puntos Efecty", icon: Banknote, available: true },
  { name: "Nequi / Daviplata", description: "Billeteras digitales", icon: Smartphone, available: true },
];

export default function BillingPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Facturación</h1>
          <p className="text-muted-foreground text-sm">Gestiona tu saldo, pagos y facturación</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2" onClick={() => toast.info("Descargando factura...")}>
            <Download className="h-4 w-4" /> Descargar Factura
          </Button>
          <Button className="gap-2" style={{ background: "var(--nexvia-gradient)" }} onClick={() => toast.success("Redirigiendo a pasarela de pago...")}>
            <Wallet className="h-4 w-4" /> Recargar Saldo
          </Button>
        </div>
      </div>

      {/* Balance cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Saldo Disponible", value: "$45,200 COP", icon: Wallet, color: "text-primary", bg: "bg-primary/10" },
          { label: "Consumo del Mes", value: "$32,800 COP", icon: DollarSign, color: "text-accent", bg: "bg-accent/10" },
          { label: "Mensajes Restantes", value: "~1,674", icon: Receipt, color: "text-primary", bg: "bg-primary/10" },
          { label: "Tarifa SMS", value: "$27 COP", icon: CreditCard, color: "text-muted-foreground", bg: "bg-muted" },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="p-5">
              <div className={`p-2 rounded-lg ${s.bg} w-fit mb-3`}>
                <s.icon className={`h-4 w-4 ${s.color}`} />
              </div>
              <p className="font-display text-xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Payment methods */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-display">Medios de Pago</CardTitle>
            <CardDescription>Recarga tu saldo con cualquiera de estos métodos</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {paymentMethods.map((pm) => (
              <button
                key={pm.name}
                onClick={() => toast.success(`Redirigiendo a pago con ${pm.name}...`)}
                className="w-full flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary/30 hover:bg-muted/30 transition-all text-left"
              >
                <div className="p-2 rounded-lg bg-primary/10">
                  <pm.icon className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{pm.name}</p>
                  <p className="text-xs text-muted-foreground">{pm.description}</p>
                </div>
                <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground" />
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Transaction history */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-display">Historial de Transacciones</CardTitle>
              <Button variant="outline" size="sm" className="gap-2" onClick={() => toast.info("Exportando historial...")}>
                <Download className="h-3.5 w-3.5" /> Exportar
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-2 text-muted-foreground font-medium">ID</th>
                    <th className="text-left py-3 px-2 text-muted-foreground font-medium">Fecha</th>
                    <th className="text-left py-3 px-2 text-muted-foreground font-medium">Método</th>
                    <th className="text-right py-3 px-2 text-muted-foreground font-medium">Monto</th>
                    <th className="text-left py-3 px-2 text-muted-foreground font-medium">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((t) => (
                    <tr key={t.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="py-3 px-2 font-mono text-xs text-foreground">{t.id}</td>
                      <td className="py-3 px-2 text-muted-foreground">{t.date}</td>
                      <td className="py-3 px-2 text-foreground">{t.method}</td>
                      <td className="py-3 px-2 text-right font-semibold text-foreground">{t.amount}</td>
                      <td className="py-3 px-2">
                        <Badge variant={t.status === "completed" ? "default" : "secondary"}>
                          {t.status === "completed" ? "Completado" : "Pendiente"}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
