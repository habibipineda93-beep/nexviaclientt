import { useState } from "react";
import {
  Settings,
  User,
  Bell,
  Shield,
  Key,
  Globe,
  Copy,
  Eye,
  EyeOff,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function SettingsPage() {
  const [tab, setTab] = useState("profile");
  const [showApiKey, setShowApiKey] = useState(false);
  const apiKey = "nxv_live_sk_a8f3b2c1d4e5f6g7h8i9j0k1l2m3n4o5";

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Configuración</h1>
        <p className="text-muted-foreground text-sm">Administra tu cuenta y preferencias</p>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="profile" className="gap-2"><User className="h-3.5 w-3.5" /> Perfil</TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2"><Bell className="h-3.5 w-3.5" /> Notificaciones</TabsTrigger>
          <TabsTrigger value="api" className="gap-2"><Key className="h-3.5 w-3.5" /> API</TabsTrigger>
          <TabsTrigger value="security" className="gap-2"><Shield className="h-3.5 w-3.5" /> Seguridad</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-display">Información Personal</CardTitle>
              <CardDescription>Actualiza los datos de tu cuenta</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Nombre completo</label>
                  <input className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring/30" defaultValue="Carlos Rodríguez" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Empresa</label>
                  <input className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring/30" defaultValue="Empresa XYZ S.A.S." />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Correo electrónico</label>
                  <input className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring/30" defaultValue="carlos@empresa.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Teléfono</label>
                  <input className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring/30" defaultValue="+57 300 123 4567" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">NIT / Cédula</label>
                  <input className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring/30" defaultValue="900.123.456-7" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Ciudad</label>
                  <input className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring/30" defaultValue="Bogotá D.C." />
                </div>
              </div>
              <div className="flex justify-end">
                <Button style={{ background: "var(--nexvia-gradient)" }} onClick={() => toast.success("Perfil actualizado correctamente")}>
                  Guardar Cambios
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-display">Preferencias de Notificaciones</CardTitle>
              <CardDescription>Configura cómo recibes alertas y reportes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "Alertas de saldo bajo", desc: "Notificación cuando tu saldo sea inferior a $5,000" },
                { label: "Reporte diario de envíos", desc: "Resumen diario enviado a tu email" },
                { label: "Fallo en campañas", desc: "Alerta inmediata si una campaña falla" },
                { label: "Nuevas funcionalidades", desc: "Actualizaciones y novedades de la plataforma" },
                { label: "Confirmación de recargas", desc: "Confirmación por email de cada recarga" },
              ].map((n) => (
                <div key={n.label} className="flex items-center justify-between p-3 rounded-lg border border-border">
                  <div>
                    <p className="text-sm font-medium text-foreground">{n.label}</p>
                    <p className="text-xs text-muted-foreground">{n.desc}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-9 h-5 bg-muted rounded-full peer peer-checked:bg-primary transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-card after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-4" />
                  </label>
                </div>
              ))}
              <div className="flex justify-end">
                <Button style={{ background: "var(--nexvia-gradient)" }} onClick={() => toast.success("Notificaciones actualizadas")}>
                  Guardar
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-display">Credenciales API</CardTitle>
              <CardDescription>Usa estas credenciales para integrar NEXVIA con tus sistemas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">API Key</label>
                <div className="flex gap-2">
                  <div className="flex-1 h-10 px-3 rounded-lg border border-input bg-muted/30 flex items-center font-mono text-sm text-foreground">
                    {showApiKey ? apiKey : "nxv_live_sk_••••••••••••••••••••••••"}
                  </div>
                  <Button variant="outline" size="icon" onClick={() => setShowApiKey(!showApiKey)}>
                    {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => { navigator.clipboard.writeText(apiKey); toast.success("API Key copiada"); }}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Endpoint Base</label>
                <div className="flex gap-2">
                  <div className="flex-1 h-10 px-3 rounded-lg border border-input bg-muted/30 flex items-center font-mono text-sm text-foreground">
                    https://api.nexvia.com.co/v1
                  </div>
                  <Button variant="outline" size="icon" onClick={() => { navigator.clipboard.writeText("https://api.nexvia.com.co/v1"); toast.success("URL copiada"); }}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <p className="text-sm font-medium text-foreground mb-2">📖 Documentación</p>
                <p className="text-xs text-muted-foreground">Consulta la documentación completa de la API en <span className="text-primary font-medium">docs.nexvia.com.co</span></p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base font-display">Webhooks</CardTitle>
              <CardDescription>Configura endpoints para recibir eventos en tiempo real</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">URL del Webhook</label>
                <input className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30" placeholder="https://tuservidor.com/webhook/nexvia" />
              </div>
              <div className="flex flex-wrap gap-2">
                {["Entrega SMS", "Fallo de envío", "Recarga de saldo", "Nuevo contacto"].map((event) => (
                  <Badge key={event} variant="secondary" className="cursor-pointer">{event}</Badge>
                ))}
              </div>
              <div className="flex justify-end">
                <Button style={{ background: "var(--nexvia-gradient)" }} onClick={() => toast.success("Webhook configurado")}>
                  Guardar Webhook
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-display">Seguridad de la Cuenta</CardTitle>
              <CardDescription>Gestiona contraseña y autenticación</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Contraseña actual</label>
                <input type="password" className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring/30" placeholder="••••••••" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Nueva contraseña</label>
                  <input type="password" className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring/30" placeholder="Mínimo 8 caracteres" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Confirmar contraseña</label>
                  <input type="password" className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring/30" placeholder="Repite la contraseña" />
                </div>
              </div>
              <div className="flex justify-end">
                <Button style={{ background: "var(--nexvia-gradient)" }} onClick={() => toast.success("Contraseña actualizada")}>
                  Cambiar Contraseña
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
