import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { useSiteSettings } from "@/contexts/SiteSettings";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import {
  Settings, Link2, Globe, BarChart3, Bell, Shield, LogOut,
  Save, Eye, EyeOff, Lock, FileText, HelpCircle, Film, CalendarDays, Handshake, ShoppingBag
} from "lucide-react";
import AdminBlog from "@/components/admin/AdminBlog";
import AdminFAQ from "@/components/admin/AdminFAQ";
import AdminPortfolio from "@/components/admin/AdminPortfolio";
import AdminEvents from "@/components/admin/AdminEvents";
import AdminPartnerships from "@/components/admin/AdminPartnerships";
import AdminBoutique from "@/components/admin/AdminBoutique";

function LoginForm() {
  const [pass, setPass] = useState("");
  const { login } = useSiteSettings();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(pass)) {
      toast({ title: "✅ Connecté", description: "Bienvenue dans le panneau admin !" });
    } else {
      toast({ title: "❌ Erreur", description: "Mot de passe incorrect.", variant: "destructive" });
    }
  };

  return (
    <Layout>
      <section className="py-20 min-h-[60vh] flex items-center justify-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <Card className="border-border/50 bg-card">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 rounded-2xl bg-gradient-to-br from-neon-cyan/20 to-neon-pink/20 flex items-center justify-center">
                <Lock className="h-8 w-8 text-accent" />
              </div>
              <CardTitle className="font-display text-2xl">Panneau Admin</CardTitle>
              <CardDescription>Entre le mot de passe pour accéder aux paramètres</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <Input type="password" placeholder="Mot de passe" value={pass} onChange={(e) => setPass(e.target.value)} />
                <Button type="submit" className="w-full bg-accent hover:bg-accent/80">Se connecter</Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </Layout>
  );
}

function SettingsField({ label, value, onChange, type = "text", placeholder = "" }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      <Input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
    </div>
  );
}

function AdminDashboard() {
  const { settings, updateSettings, logout } = useSiteSettings();
  const [showPass, setShowPass] = useState(false);

  const save = () => {
    toast({ title: "✅ Sauvegardé", description: "Les paramètres ont été mis à jour." });
  };

  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold flex items-center gap-3">
                <Settings className="h-8 w-8 text-accent" />
                Panneau <span className="text-gradient">Admin</span>
              </h1>
              <p className="text-muted-foreground mt-1">Gère tous les paramètres de ton site</p>
            </div>
            <Button variant="outline" onClick={logout} className="gap-2">
              <LogOut className="h-4 w-4" /> Déconnexion
            </Button>
          </motion.div>

          <Tabs defaultValue="blog" className="space-y-6">
            <TabsList className="flex flex-wrap h-auto gap-1 bg-muted/50 p-1">
              <TabsTrigger value="blog" className="gap-1.5 text-xs"><FileText className="h-3.5 w-3.5" /> Blog</TabsTrigger>
              <TabsTrigger value="boutique" className="gap-1.5 text-xs"><ShoppingBag className="h-3.5 w-3.5" /> Boutique</TabsTrigger>
              <TabsTrigger value="faq" className="gap-1.5 text-xs"><HelpCircle className="h-3.5 w-3.5" /> FAQ</TabsTrigger>
              <TabsTrigger value="portfolio" className="gap-1.5 text-xs"><Film className="h-3.5 w-3.5" /> Portfolio</TabsTrigger>
              <TabsTrigger value="events" className="gap-1.5 text-xs"><CalendarDays className="h-3.5 w-3.5" /> Événements</TabsTrigger>
              <TabsTrigger value="partners" className="gap-1.5 text-xs"><Handshake className="h-3.5 w-3.5" /> Partenaires</TabsTrigger>
              <TabsTrigger value="links" className="gap-1.5 text-xs"><Link2 className="h-3.5 w-3.5" /> Liens</TabsTrigger>
              <TabsTrigger value="general" className="gap-1.5 text-xs"><Globe className="h-3.5 w-3.5" /> Général</TabsTrigger>
              <TabsTrigger value="stats" className="gap-1.5 text-xs"><BarChart3 className="h-3.5 w-3.5" /> Stats</TabsTrigger>
              <TabsTrigger value="announce" className="gap-1.5 text-xs"><Bell className="h-3.5 w-3.5" /> Annonces</TabsTrigger>
              <TabsTrigger value="security" className="gap-1.5 text-xs"><Shield className="h-3.5 w-3.5" /> Sécurité</TabsTrigger>
            </TabsList>

            <TabsContent value="blog"><AdminBlog /></TabsContent>
            <TabsContent value="boutique"><AdminBoutique /></TabsContent>
            <TabsContent value="faq"><AdminFAQ /></TabsContent>
            <TabsContent value="portfolio"><AdminPortfolio /></TabsContent>
            <TabsContent value="events"><AdminEvents /></TabsContent>
            <TabsContent value="partners"><AdminPartnerships /></TabsContent>

            <TabsContent value="links">
              <Card className="border-border/50 bg-card">
                <CardHeader>
                  <CardTitle className="font-display flex items-center gap-2"><Link2 className="h-5 w-5 text-accent" /> Liens & Réseaux</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 rounded-lg bg-discord/10 border border-discord/20">
                    <h3 className="font-display font-semibold text-discord mb-3">🎮 Discord</h3>
                    <SettingsField label="Lien d'invitation" value={settings.discordLink} onChange={(v) => updateSettings({ discordLink: v })} placeholder="https://discord.gg/..." />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SettingsField label="🎵 TikTok" value={settings.tiktokLink} onChange={(v) => updateSettings({ tiktokLink: v })} />
                    <SettingsField label="📸 Instagram" value={settings.instagramLink} onChange={(v) => updateSettings({ instagramLink: v })} />
                    <SettingsField label="🎬 YouTube" value={settings.youtubeLink} onChange={(v) => updateSettings({ youtubeLink: v })} />
                    <SettingsField label="🐦 Twitter / X" value={settings.twitterLink} onChange={(v) => updateSettings({ twitterLink: v })} />
                    <SettingsField label="👻 Snapchat" value={settings.snapchatLink} onChange={(v) => updateSettings({ snapchatLink: v })} />
                  </div>
                  <Button onClick={save} className="bg-accent hover:bg-accent/80 gap-2"><Save className="h-4 w-4" /> Sauvegarder</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="general">
              <Card className="border-border/50 bg-card">
                <CardHeader>
                  <CardTitle className="font-display flex items-center gap-2"><Globe className="h-5 w-5 text-accent" /> Général</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <SettingsField label="Nom du site" value={settings.siteName} onChange={(v) => updateSettings({ siteName: v })} />
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea value={settings.siteDescription} onChange={(e) => updateSettings({ siteDescription: e.target.value })} rows={3} />
                  </div>
                  <SettingsField label="Email de contact" value={settings.contactEmail} onChange={(v) => updateSettings({ contactEmail: v })} type="email" />
                  <SettingsField label="Titre Hero" value={settings.heroTitle} onChange={(v) => updateSettings({ heroTitle: v })} />
                  <div className="space-y-2">
                    <Label>Sous-titre Hero</Label>
                    <Textarea value={settings.heroSubtitle} onChange={(e) => updateSettings({ heroSubtitle: e.target.value })} rows={2} />
                  </div>
                  <Button onClick={save} className="bg-accent hover:bg-accent/80 gap-2"><Save className="h-4 w-4" /> Sauvegarder</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="stats">
              <Card className="border-border/50 bg-card">
                <CardHeader>
                  <CardTitle className="font-display flex items-center gap-2"><BarChart3 className="h-5 w-5 text-accent" /> Statistiques</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <SettingsField label="👥 Membres" value={settings.statsMembers} onChange={(v) => updateSettings({ statsMembers: v })} />
                    <SettingsField label="🎬 Vidéos" value={settings.statsVideos} onChange={(v) => updateSettings({ statsVideos: v })} />
                    <SettingsField label="⚡ Contenus" value={settings.statsAstuces} onChange={(v) => updateSettings({ statsAstuces: v })} />
                  </div>
                  <Button onClick={save} className="bg-accent hover:bg-accent/80 gap-2"><Save className="h-4 w-4" /> Sauvegarder</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="announce">
              <Card className="border-border/50 bg-card">
                <CardHeader>
                  <CardTitle className="font-display flex items-center gap-2"><Bell className="h-5 w-5 text-accent" /> Bandeau d'Annonce</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Switch checked={settings.announcementEnabled} onCheckedChange={(v) => updateSettings({ announcementEnabled: v })} />
                    <Label>Activer le bandeau</Label>
                  </div>
                  <div className="space-y-2">
                    <Label>Texte de l'annonce</Label>
                    <Textarea value={settings.announcementText} onChange={(e) => updateSettings({ announcementText: e.target.value })} rows={2} />
                  </div>
                  <Button onClick={save} className="bg-accent hover:bg-accent/80 gap-2"><Save className="h-4 w-4" /> Sauvegarder</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security">
              <Card className="border-border/50 bg-card">
                <CardHeader>
                  <CardTitle className="font-display flex items-center gap-2"><Shield className="h-5 w-5 text-accent" /> Sécurité</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-3">
                    <Switch checked={settings.maintenanceMode} onCheckedChange={(v) => updateSettings({ maintenanceMode: v })} />
                    <div>
                      <Label className="block">Mode Maintenance</Label>
                      <p className="text-xs text-muted-foreground">Affiche une page de maintenance</p>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                    <h3 className="font-display font-semibold mb-2 flex items-center gap-2"><Lock className="h-4 w-4" /> Mot de passe admin</h3>
                    <div className="flex items-center gap-2">
                      <Input type={showPass ? "text" : "password"} value="astuceson2024" readOnly className="font-mono" />
                      <Button variant="outline" size="icon" onClick={() => setShowPass(!showPass)}>
                        {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
}

export default function Admin() {
  const { isAdmin } = useSiteSettings();
  return isAdmin ? <AdminDashboard /> : <LoginForm />;
}
