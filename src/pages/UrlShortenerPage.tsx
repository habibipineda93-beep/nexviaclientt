import { useState } from "react";
import { Link2, Copy, Check, ExternalLink, Trash2, BarChart3, MousePointerClick } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { shortenUrl, getStoredUrls, deleteUrl, simulateClick, type ShortenedUrl } from "@/lib/url-shortener";
import { toast } from "sonner";

export default function UrlShortenerPage() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<ShortenedUrl | null>(null);
  const [history, setHistory] = useState<ShortenedUrl[]>(getStoredUrls());
  const [copied, setCopied] = useState<string | null>(null);

  const totalLinks = history.length;
  const totalClicks = history.reduce((sum, u) => sum + u.clicks, 0);

  const handleShorten = () => {
    const trimmed = url.trim();
    if (!trimmed) { toast.error("Ingresa una URL válida"); return; }
    try {
      new URL(trimmed.startsWith("http") ? trimmed : `https://${trimmed}`);
    } catch {
      toast.error("URL no válida"); return;
    }
    const fullUrl = trimmed.startsWith("http") ? trimmed : `https://${trimmed}`;
    const shortened = shortenUrl(fullUrl);
    setResult(shortened);
    setHistory(getStoredUrls());
    setUrl("");
    toast.success("URL acortada exitosamente");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    toast.success("Copiado al portapapeles");
    setTimeout(() => setCopied(null), 2000);
  };

  const handleDelete = (code: string) => {
    deleteUrl(code);
    setHistory(getStoredUrls());
    toast.success("URL eliminada");
  };

  const handleSimulateClick = (code: string) => {
    simulateClick(code);
    setHistory(getStoredUrls());
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Acortador de URLs</h1>
        <p className="text-muted-foreground text-sm">Acorta URLs con el dominio nex.co y monitorea estadísticas de apertura</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Link2 className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="font-display text-lg font-bold text-foreground">{totalLinks}</p>
              <p className="text-xs text-muted-foreground">URLs Creadas</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-accent/10">
              <MousePointerClick className="h-4 w-4 text-accent" />
            </div>
            <div>
              <p className="font-display text-lg font-bold text-foreground">{totalClicks}</p>
              <p className="text-xs text-muted-foreground">Clics Totales</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <BarChart3 className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="font-display text-lg font-bold text-foreground">
                {totalLinks > 0 ? (totalClicks / totalLinks).toFixed(1) : "0"}
              </p>
              <p className="text-xs text-muted-foreground">Promedio Clics/URL</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Shortener form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-display flex items-center gap-2">
            <Link2 className="h-4 w-4 text-primary" />
            Acortar nueva URL
          </CardTitle>
          <CardDescription>Pega cualquier URL larga y obtendrás un enlace corto con el dominio nex.co</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.ejemplo.com/pagina-muy-larga-con-parametros..."
              className="flex-1 h-10 px-3 rounded-lg border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30"
              onKeyDown={(e) => e.key === "Enter" && handleShorten()}
            />
            <Button onClick={handleShorten} style={{ background: "var(--nexvia-gradient)" }}>
              Acortar
            </Button>
          </div>

          {result && (
            <div className="p-4 rounded-lg border border-primary/20 bg-primary/5 space-y-2">
              <p className="text-xs text-muted-foreground">URL acortada:</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 text-sm font-semibold text-primary break-all">
                  {result.short}
                </code>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0"
                  onClick={() => copyToClipboard(result.short)}
                >
                  {copied === result.short ? <Check className="h-4 w-4 text-accent" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground truncate">Original: {result.original}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* URL history with stats */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-display">Historial y Estadísticas</CardTitle>
          <CardDescription>Monitorea las aperturas de cada enlace acortado</CardDescription>
        </CardHeader>
        <CardContent>
          {history.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Link2 className="h-10 w-10 mx-auto mb-3 opacity-30" />
              <p className="text-sm">No hay URLs acortadas aún</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-2 text-muted-foreground font-medium">URL Corta</th>
                    <th className="text-left py-3 px-2 text-muted-foreground font-medium">URL Original</th>
                    <th className="text-right py-3 px-2 text-muted-foreground font-medium">Clics</th>
                    <th className="text-left py-3 px-2 text-muted-foreground font-medium">Creada</th>
                    <th className="py-3 px-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((item) => (
                    <tr key={item.code} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-2">
                          <code className="text-primary font-medium">{item.short}</code>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => copyToClipboard(item.short)}
                          >
                            {copied === item.short ? <Check className="h-3 w-3 text-accent" /> : <Copy className="h-3 w-3" />}
                          </Button>
                        </div>
                      </td>
                      <td className="py-3 px-2 text-muted-foreground max-w-[200px] truncate">{item.original}</td>
                      <td className="py-3 px-2 text-right">
                        <Badge variant={item.clicks > 0 ? "default" : "secondary"}>
                          {item.clicks} clics
                        </Badge>
                      </td>
                      <td className="py-3 px-2 text-muted-foreground text-xs">
                        {new Date(item.createdAt).toLocaleDateString("es-CO")}
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            title="Simular clic"
                            onClick={() => handleSimulateClick(item.code)}
                          >
                            <MousePointerClick className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-destructive"
                            onClick={() => handleDelete(item.code)}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
