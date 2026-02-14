import { useState } from "react";
import {
  Users,
  Plus,
  Search,
  Upload,
  Download,
  Filter,
  MoreHorizontal,
  Mail,
  Phone,
  MessageSquare,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const contacts = [
  { id: 1, name: "Carlos Rodríguez", email: "carlos@empresa.com", phone: "+57 300 123 4567", group: "Premium", status: "active" },
  { id: 2, name: "María López", email: "maria@corp.co", phone: "+57 310 987 6543", group: "Nuevos", status: "active" },
  { id: 3, name: "Pedro García", email: "pedro@tienda.com", phone: "+57 320 555 1234", group: "Premium", status: "active" },
  { id: 4, name: "Ana Martínez", email: "ana@empresa.co", phone: "+57 315 222 3344", group: "General", status: "inactive" },
  { id: 5, name: "Luis Herrera", email: "luis@negocio.com", phone: "+57 318 777 8899", group: "General", status: "active" },
  { id: 6, name: "Sandra Díaz", email: "sandra@corp.co", phone: "+57 312 444 5566", group: "Premium", status: "active" },
];

export default function ContactsPage() {
  const [search, setSearch] = useState("");
  const filtered = contacts.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Contactos</h1>
          <p className="text-muted-foreground text-sm">Gestiona tu base de datos de contactos</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2"><Upload className="h-4 w-4" /> Importar</Button>
          <Button variant="outline" className="gap-2"><Download className="h-4 w-4" /> Exportar</Button>
          <Button className="gap-2" style={{ background: "var(--nexvia-gradient)" }}><Plus className="h-4 w-4" /> Agregar</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Contactos", value: "3,241" },
          { label: "Activos", value: "2,987" },
          { label: "Grupos", value: "8" },
          { label: "Nuevos (30d)", value: "+185" },
        ].map((s) => (
          <Card key={s.label}>
            <CardContent className="p-4">
              <p className="font-display text-lg font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <CardTitle className="text-base font-display">Lista de Contactos</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  className="h-9 pl-9 pr-3 rounded-lg border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30"
                  placeholder="Buscar contacto..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
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
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">Nombre</th>
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">Email</th>
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">Teléfono</th>
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">Grupo</th>
                  <th className="text-left py-3 px-2 text-muted-foreground font-medium">Estado</th>
                  <th className="py-3 px-2"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr key={c.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <span className="text-xs font-semibold text-primary">{c.name[0]}</span>
                        </div>
                        <span className="font-medium text-foreground">{c.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-2 text-muted-foreground">{c.email}</td>
                    <td className="py-3 px-2 text-muted-foreground">{c.phone}</td>
                    <td className="py-3 px-2"><Badge variant="secondary">{c.group}</Badge></td>
                    <td className="py-3 px-2">
                      <Badge variant={c.status === "active" ? "default" : "outline"}>
                        {c.status === "active" ? "Activo" : "Inactivo"}
                      </Badge>
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8"><MessageSquare className="h-3.5 w-3.5" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8"><Mail className="h-3.5 w-3.5" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-3.5 w-3.5" /></Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
