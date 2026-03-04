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
  FileText,
  Printer,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useState } from "react";

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

// Proforma invoice data
const NEXVIA_INFO = {
  razonSocial: "NEXVIA S.A.S.",
  nit: "902.022.826-3",
  direccion: "CR 1ª No 11-95, Chía / Cundinamarca",
  telefono: "601 9664525",
  email: "gerencia@nexvia.com.co",
  web: "www.nexvia.com.co",
};

const IVA_RATE = 0.19;

function ProformaInvoice({ smsStandard, smsPremium }: { smsStandard: number; smsPremium: number }) {
  const costoStandard = smsStandard * 10;
  const costoPremium = smsPremium * 10;
  const subtotal = costoStandard + costoPremium;
  const iva = Math.round(subtotal * IVA_RATE);
  const total = subtotal + iva;
  const today = new Date().toLocaleDateString("es-CO", { year: "numeric", month: "long", day: "numeric" });
  const invoiceNum = `PRO-${Date.now().toString().slice(-6)}`;

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-6 text-sm" id="proforma-invoice">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-display text-xl font-bold text-foreground">{NEXVIA_INFO.razonSocial}</h3>
          <p className="text-muted-foreground text-xs">NIT: {NEXVIA_INFO.nit}</p>
          <p className="text-muted-foreground text-xs">{NEXVIA_INFO.direccion}</p>
          <p className="text-muted-foreground text-xs">Tel: {NEXVIA_INFO.telefono}</p>
          <p className="text-muted-foreground text-xs">{NEXVIA_INFO.email}</p>
          <p className="text-muted-foreground text-xs">{NEXVIA_INFO.web}</p>
        </div>
        <div className="text-right">
          <Badge variant="secondary" className="mb-2">FACTURA PROFORMA</Badge>
          <p className="text-xs text-muted-foreground">No. {invoiceNum}</p>
          <p className="text-xs text-muted-foreground">Fecha: {today}</p>
        </div>
      </div>

      {/* Separator */}
      <div className="border-t border-border" />

      {/* Client info placeholder */}
      <div>
        <p className="text-xs font-medium text-muted-foreground mb-1">CLIENTE</p>
        <p className="text-foreground font-medium">Nombre del Cliente</p>
        <p className="text-muted-foreground text-xs">NIT/CC: _______________</p>
        <p className="text-muted-foreground text-xs">Dirección: _______________</p>
      </div>

      {/* Items table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-border">
              <th className="text-left py-2 px-2 text-muted-foreground font-medium">Descripción</th>
              <th className="text-right py-2 px-2 text-muted-foreground font-medium">Cantidad</th>
              <th className="text-right py-2 px-2 text-muted-foreground font-medium">Precio Unit.</th>
              <th className="text-right py-2 px-2 text-muted-foreground font-medium">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {smsStandard > 0 && (
              <tr className="border-b border-border">
                <td className="py-2 px-2 text-foreground">
                  <p className="font-medium">SMS Estándar</p>
                  <p className="text-xs text-muted-foreground">Hasta 160 caracteres (GSM-7)</p>
                </td>
                <td className="py-2 px-2 text-right text-foreground">{smsStandard.toLocaleString()}</td>
                <td className="py-2 px-2 text-right text-foreground">$10 COP</td>
                <td className="py-2 px-2 text-right font-medium text-foreground">${costoStandard.toLocaleString()} COP</td>
              </tr>
            )}
            {smsPremium > 0 && (
              <tr className="border-b border-border">
                <td className="py-2 px-2 text-foreground">
                  <p className="font-medium">SMS Premium (Emoji/Unicode)</p>
                  <p className="text-xs text-muted-foreground">Hasta 70 caracteres (UCS-2)</p>
                </td>
                <td className="py-2 px-2 text-right text-foreground">{smsPremium.toLocaleString()}</td>
                <td className="py-2 px-2 text-right text-foreground">$10 COP</td>
                <td className="py-2 px-2 text-right font-medium text-foreground">${costoPremium.toLocaleString()} COP</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="flex justify-end">
        <div className="w-64 space-y-1">
          <div className="flex justify-between text-muted-foreground">
            <span>Subtotal:</span>
            <span className="text-foreground">${subtotal.toLocaleString()} COP</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>IVA (19%):</span>
            <span className="text-foreground">${iva.toLocaleString()} COP</span>
          </div>
          <div className="border-t border-border pt-1 flex justify-between font-bold text-foreground">
            <span>TOTAL:</span>
            <span>${total.toLocaleString()} COP</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-border pt-4 text-center">
        <p className="text-xs text-muted-foreground">
          Factura electrónica conforme a la normativa DIAN — Resolución de facturación vigente.
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {NEXVIA_INFO.razonSocial} — NIT {NEXVIA_INFO.nit} — Régimen Común
        </p>
      </div>
    </div>
  );
}

export default function BillingPage() {
  const [smsStandard, setSmsStandard] = useState(1000);
  const [smsPremium, setSmsPremium] = useState(200);

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
          { label: "Mensajes Restantes", value: "~4,520", icon: Receipt, color: "text-primary", bg: "bg-primary/10" },
          { label: "Tarifa SMS", value: "$10 COP", icon: CreditCard, color: "text-muted-foreground", bg: "bg-muted" },
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

      <Tabs defaultValue="proforma">
        <TabsList>
          <TabsTrigger value="proforma" className="gap-2"><FileText className="h-3.5 w-3.5" /> Factura Proforma</TabsTrigger>
          <TabsTrigger value="history">Historial</TabsTrigger>
          <TabsTrigger value="methods">Medios de Pago</TabsTrigger>
        </TabsList>

        <TabsContent value="proforma" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-display">Generar Factura Proforma</CardTitle>
              <CardDescription>Configura las cantidades de mensajes para generar tu factura proforma</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">SMS Estándar (160 chars)</label>
                  <input
                    type="number"
                    value={smsStandard}
                    onChange={(e) => setSmsStandard(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring/30"
                    placeholder="Cantidad de SMS estándar"
                  />
                  <p className="text-xs text-muted-foreground">$10 COP por mensaje</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">SMS Premium (70 chars / Emoji)</label>
                  <input
                    type="number"
                    value={smsPremium}
                    onChange={(e) => setSmsPremium(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring/30"
                    placeholder="Cantidad de SMS premium"
                  />
                  <p className="text-xs text-muted-foreground">$10 COP por mensaje (incluye emojis/unicode)</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="gap-2" onClick={() => {
                  window.print();
                  toast.success("Preparando impresión...");
                }}>
                  <Printer className="h-4 w-4" /> Imprimir
                </Button>
                <Button variant="outline" className="gap-2" onClick={() => toast.info("Descargando PDF...")}>
                  <Download className="h-4 w-4" /> Descargar PDF
                </Button>
              </div>
            </CardContent>
          </Card>

          <ProformaInvoice smsStandard={smsStandard} smsPremium={smsPremium} />
        </TabsContent>

        <TabsContent value="history" className="mt-4">
          <Card>
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
        </TabsContent>

        <TabsContent value="methods" className="mt-4">
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
