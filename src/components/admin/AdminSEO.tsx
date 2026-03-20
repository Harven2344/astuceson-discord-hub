import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useSiteSettings } from "@/contexts/SiteSettings";
import { toast } from "@/hooks/use-toast";
import { Save, Search, Globe, Image, Tag, Eye } from "lucide-react";

export default function AdminSEO() {
  const { settings, updateSettings } = useSiteSettings();

  const save = () => {
    toast({ title: "✅ Sauvegardé", description: "Les paramètres SEO ont été mis à jour." });
  };

  return (
    <div className="space-y-6">
      <Card className="border-border/30 bg-card/80">
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2">
            <Search className="h-5 w-5 text-neon-green" /> Référencement (SEO)
          </CardTitle>
          <CardDescription>Optimise le référencement de ton site sur les moteurs de recherche</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
              <Globe className="h-3.5 w-3.5" /> Titre SEO
            </Label>
            <Input
              value={settings.seoTitle}
              onChange={(e) => updateSettings({ seoTitle: e.target.value })}
              placeholder="Astuceson — Créateur TikTok"
              maxLength={60}
            />
            <p className="text-[10px] text-muted-foreground">{settings.seoTitle.length}/60 caractères recommandés</p>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
              <Tag className="h-3.5 w-3.5" /> Meta Description
            </Label>
            <Textarea
              value={settings.seoDescription}
              onChange={(e) => updateSettings({ seoDescription: e.target.value })}
              placeholder="Description de votre site..."
              rows={3}
              maxLength={160}
              className="resize-none"
            />
            <p className="text-[10px] text-muted-foreground">{settings.seoDescription.length}/160 caractères recommandés</p>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
              <Tag className="h-3.5 w-3.5" /> Mots-clés
            </Label>
            <Input
              value={settings.seoKeywords}
              onChange={(e) => updateSettings({ seoKeywords: e.target.value })}
              placeholder="tiktok, créateur, contenu..."
            />
            <p className="text-[10px] text-muted-foreground">Séparés par des virgules</p>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
              <Image className="h-3.5 w-3.5" /> Image OG (Open Graph)
            </Label>
            <Input
              value={settings.seoOgImage}
              onChange={(e) => updateSettings({ seoOgImage: e.target.value })}
              placeholder="https://example.com/og-image.jpg"
            />
            <p className="text-[10px] text-muted-foreground">Image affichée lors du partage sur les réseaux sociaux (1200×630px recommandé)</p>
          </div>

          {/* Preview */}
          <div className="border-t border-border/30 pt-5">
            <h3 className="font-display font-bold text-sm mb-3 flex items-center gap-2">
              <Eye className="h-4 w-4 text-neon-purple" /> Aperçu Google
            </h3>
            <div className="rounded-xl bg-white/5 border border-border/30 p-5 space-y-1">
              <p className="text-neon-cyan text-base font-medium truncate">{settings.seoTitle || settings.siteName}</p>
              <p className="text-neon-green text-xs truncate">https://astuceson.com</p>
              <p className="text-muted-foreground text-xs line-clamp-2">{settings.seoDescription || settings.siteDescription}</p>
            </div>
          </div>

          <Button onClick={save} className="bg-gradient-to-r from-neon-green to-neon-cyan hover:opacity-90 gap-2 rounded-xl">
            <Save className="h-4 w-4" /> Sauvegarder
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
