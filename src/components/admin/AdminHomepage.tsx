import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useSiteSettings } from "@/contexts/SiteSettings";
import { toast } from "@/hooks/use-toast";
import { Save, LayoutDashboard, Eye, BarChart3, Zap, Link2, Megaphone, Type, Ticket } from "lucide-react";

export default function AdminHomepage() {
  const { settings, updateSettings } = useSiteSettings();

  const save = () => {
    toast({ title: "✅ Sauvegardé", description: "La page d'accueil a été mise à jour." });
  };

  const sections = [
    { key: "showMarquee" as const, label: "Bandeau défilant (Marquee)", desc: "Texte qui défile en boucle", icon: Ticket },
    { key: "showHeroStats" as const, label: "Section statistiques", desc: "Membres, vidéos, contenus", icon: BarChart3 },
    { key: "showHeroFeatures" as const, label: "Section fonctionnalités", desc: '"Pourquoi rejoindre ?"', icon: Zap },
    { key: "showHeroQuickLinks" as const, label: "Liens rapides (Explorer)", desc: "Événements, galerie, partenariats", icon: Link2 },
    { key: "showHeroCTA" as const, label: "Section CTA finale", desc: '"Prêt à rejoindre l\'aventure ?"', icon: Megaphone },
  ];

  return (
    <div className="space-y-6">
      {/* Sections visibility */}
      <Card className="border-border/30 bg-card/80">
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2">
            <LayoutDashboard className="h-5 w-5 text-neon-purple" /> Sections de la page d'accueil
          </CardTitle>
          <CardDescription>Active ou désactive les sections de la page d'accueil</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {sections.map(s => (
            <div key={s.key} className="flex items-center justify-between p-4 rounded-xl bg-muted/20 border border-border/30">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${settings[s.key] ? "bg-neon-green/10" : "bg-muted/30"}`}>
                  <s.icon className={`h-4 w-4 ${settings[s.key] ? "text-neon-green" : "text-muted-foreground"}`} />
                </div>
                <div>
                  <Label className="font-medium text-sm">{s.label}</Label>
                  <p className="text-[11px] text-muted-foreground">{s.desc}</p>
                </div>
              </div>
              <Switch
                checked={settings[s.key]}
                onCheckedChange={(v) => updateSettings({ [s.key]: v })}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* CTA customization */}
      <Card className="border-border/30 bg-card/80">
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2">
            <Megaphone className="h-5 w-5 text-neon-orange" /> Bouton d'action principal (CTA)
          </CardTitle>
          <CardDescription>Personnalise le bouton principal du hero</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
              <Type className="h-3.5 w-3.5" /> Texte du bouton
            </Label>
            <Input
              value={settings.ctaButtonText}
              onChange={(e) => updateSettings({ ctaButtonText: e.target.value })}
              placeholder="Rejoindre le Discord"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
              <Link2 className="h-3.5 w-3.5" /> Lien du bouton (optionnel)
            </Label>
            <Input
              value={settings.ctaButtonLink}
              onChange={(e) => updateSettings({ ctaButtonLink: e.target.value })}
              placeholder="Laisse vide pour utiliser le lien Discord"
            />
            <p className="text-[10px] text-muted-foreground">Si vide, le bouton redirigera vers ton Discord</p>
          </div>

          {/* Preview */}
          <div className="border-t border-border/30 pt-4">
            <Label className="text-xs text-muted-foreground flex items-center gap-1.5 mb-3"><Eye className="h-3.5 w-3.5" /> Aperçu</Label>
            <div className="flex justify-center p-6 rounded-xl bg-muted/10 border border-border/20">
              <button className="bg-discord text-white px-8 py-3 rounded-2xl font-display font-bold text-sm">
                🎮 {settings.ctaButtonText || "Rejoindre le Discord"}
              </button>
            </div>
          </div>

          <Button onClick={save} className="bg-gradient-to-r from-neon-orange to-neon-yellow hover:opacity-90 gap-2 rounded-xl text-background">
            <Save className="h-4 w-4" /> Sauvegarder
          </Button>
        </CardContent>
      </Card>

      {/* Maintenance message */}
      <Card className="border-border/30 bg-card/80">
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2">
            <Eye className="h-5 w-5 text-neon-cyan" /> Page de maintenance
          </CardTitle>
          <CardDescription>Personnalise le message affiché en mode maintenance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-muted-foreground">Message de maintenance</Label>
            <Textarea
              value={settings.maintenanceMessage}
              onChange={(e) => updateSettings({ maintenanceMessage: e.target.value })}
              placeholder="Le site est en maintenance. Revenez bientôt !"
              rows={2}
              className="resize-none"
            />
          </div>
          <Button onClick={save} className="bg-gradient-to-r from-neon-cyan to-neon-purple hover:opacity-90 gap-2 rounded-xl">
            <Save className="h-4 w-4" /> Sauvegarder
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
