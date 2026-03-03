import { useState } from "react";
import { Link2, Copy, Check, ExternalLink, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { shortenUrl, getStoredUrls, type ShortenedUrl } from "@/lib/url-shortener";
import { toast } from "sonner";

export default function UrlShortenerDialog({ trigger }: { trigger?: React.ReactNode }) {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<ShortenedUrl | null>(null);
  const [history, setHistory] = useState<ShortenedUrl[]>(getStoredUrls());
  const [copied, setCopied] = useState<string | null>(null);

  const handleShorten = () => {
    const trimmed = url.trim();
    if (!trimmed) {
      toast.error("Ingresa una URL válida");
      return;
    }
    try {
      new URL(trimmed.startsWith("http") ? trimmed : `https://${trimmed}`);
    } catch {
      toast.error("URL no válida");
      return;
    }
    const fullUrl = trimmed.startsWith("http") ? trimmed : `https://${trimmed}`;
    const shortened = shortenUrl(fullUrl);
    setResult(shortened);
    setHistory(getStoredUrls());
    toast.success("URL acortada exitosamente");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    toast.success("Copiado al portapapeles");
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm" className="gap-2">
            <Link2 className="h-3.5 w-3.5" />
            Acortar URL
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display flex items-center gap-2">
            <Link2 className="h-5 w-5 text-primary" />
            Acortador de URL — NEXV
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <div className="flex gap-2">
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Pega tu URL larga aquí..."
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

          {history.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Historial reciente</h4>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {history.slice(0, 8).map((item) => (
                  <div
                    key={item.code}
                    className="flex items-center gap-2 p-2 rounded-lg border border-border text-sm"
                  >
                    <Link2 className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                    <span className="font-medium text-primary truncate">{item.short}</span>
                    <span className="text-muted-foreground truncate flex-1 text-xs">
                      {item.original}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 shrink-0"
                      onClick={() => copyToClipboard(item.short)}
                    >
                      {copied === item.short ? <Check className="h-3 w-3 text-accent" /> : <Copy className="h-3 w-3" />}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
