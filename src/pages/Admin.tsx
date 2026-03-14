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
  Save, Eye, EyeOff, Lock
} from "lucide-react";

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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
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
                <Input
                  type="password"
                  placeholder="Mot de passe"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                />
                <Button type="submit" className="w-full bg-accent hover:bg-accent/80">
                  Se connecter
                </Button>
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-8"
          >
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

          <Tabs defaultValue="links" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-auto gap-1 bg-muted/50 p-1">
              <TabsTrigger value="links" className="gap-2 text-xs md:text-sm"><Link2 className="h-4 w-4" /> Liens</TabsTrigger>
              <TabsTrigger value="general" className="gap-2 text-xs md:text-sm"><Globe className="h-4 w-4" /> Général</TabsTrigger>
              <TabsTrigger value="stats" className="gap-2 text-xs md:text-sm"><BarChart3 className="h-4 w-4" /> Stats</TabsTrigger>
              <TabsTrigger value="announce" className="gap-2 text-xs md:text-sm"><Bell className="h-4 w-4" /> Annonces</TabsTrigger>
              <TabsTrigger value="security" className="gap-2 text-xs md:text-sm"><Shield className="h-4 w-4" /> Sécurité</TabsTrigger>
            </TabsList>

            {/* LIENS */}
            <TabsContent value="links">
              <Card className="border-border/50 bg-card">
                <CardHeader>
                  <CardTitle className="font-display flex items-center gap-2">
                    <Link2 className="h-5 w-5 text-accent" /> Liens & Réseaux Sociaux
                  </CardTitle>
                  <CardDescription>Configure tous les liens de tes réseaux sociaux et de ton Discord</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 rounded-lg bg-discord/10 border border-discord/20">
                    <h3 className="font-display font-semibold text-discord mb-3">🎮 Discord</h3>
                    <SettingsField
                      label="Lien d'invitation Discord"
                      value={settings.discordLink}
                      onChange={(v) => updateSettings({ discordLink: v })}
                      placeholder="https://discord.gg/ton-serveur"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SettingsField
                      label="🎵 TikTok"
                      value={settings.tiktokLink}
                      onChange={(v) => updateSettings({ tiktokLink: v })}
                      placeholder="https://tiktok.com/@astuceson"
                    />
                    <SettingsField
                      label="📸 Instagram"
                      value={settings.instagramLink}
                      onChange={(v) => updateSettings({ instagramLink: v })}
                      placeholder="https://instagram.com/astuceson"
                    />
                    <SettingsField
                      label="🎬 YouTube"
                      value={settings.youtubeLink}
                      onChange={(v) => updateSettings({ youtubeLink: v })}
                      placeholder="https://youtube.com/@astuceson"
                    />
                    <SettingsField
                      label="🐦 Twitter / X"
                      value={settings.twitterLink}
                      onChange={(v) => updateSettings({ twitterLink: v })}
                      placeholder="https://x.com/astuceson"
                    />
                    <SettingsField
                      label="👻 Snapchat"
                      value={settings.snapchatLink}
                      onChange={(v) => updateSettings({ snapchatLink: v })}
                      placeholder="https://snapchat.com/add/astuceson"
                    />
                  </div>
                  <Button onClick={save} className="bg-accent hover:bg-accent/80 gap-2">
                    <Save className="h-4 w-4" /> Sauvegarder les liens
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* GÉNÉRAL */}
            <TabsContent value="general">
              <Card className="border-border/50 bg-card">
                <CardHeader>
                  <CardTitle className="font-display flex items-center gap-2">
                    <Globe className="h-5 w-5 text-accent" /> Paramètres Généraux
                  </CardTitle>
                  <CardDescription>Personnalise le contenu principal de ton site</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <SettingsField
                    label="Nom du site"
                    value={settings.siteName}
                    onChange={(v) => updateSettings({ siteName: v })}
                  />
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Description du site</Label>
                    <Textarea
                      value={settings.siteDescription}
                      onChange={(e) => updateSettings({ siteDescription: e.target.value })}
                      rows={3}
                    />
                  </div>
                  <SettingsField
                    label="Email de contact"
                    value={settings.contactEmail}
                    onChange={(v) => updateSettings({ contactEmail: v })}
                    type="email"
                  />
                  <SettingsField
                    label="Titre Hero (page d'accueil)"
                    value={settings.heroTitle}
                    onChange={(v) => updateSettings({ heroTitle: v })}
                  />
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Sous-titre Hero</Label>
                    <Textarea
                      value={settings.heroSubtitle}
                      onChange={(e) => updateSettings({ heroSubtitle: e.target.value })}
                      rows={2}
                    />
                  </div>
                  <Button onClick={save} className="bg-accent hover:bg-accent/80 gap-2">
                    <Save className="h-4 w-4" /> Sauvegarder
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* STATS */}
            <TabsContent value="stats">
              <Card className="border-border/50 bg-card">
                <CardHeader>
                  <CardTitle className="font-display flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-accent" /> Statistiques Affichées
                  </CardTitle>
                  <CardDescription>Modifie les chiffres affichés sur la page d'accueil</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <SettingsField
                      label="👥 Membres"
                      value={settings.statsMembers}
                      onChange={(v) => updateSettings({ statsMembers: v })}
                    />
                    <SettingsField
                      label="🎬 Vidéos TikTok"
                      value={settings.statsVideos}
                      onChange={(v) => updateSettings({ statsVideos: v })}
                    />
                    <SettingsField
                      label="⚡ Astuces partagées"
                      value={settings.statsAstuces}
                      onChange={(v) => updateSettings({ statsAstuces: v })}
                    />
                  </div>
                  <Button onClick={save} className="bg-accent hover:bg-accent/80 gap-2">
                    <Save className="h-4 w-4" /> Sauvegarder
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* ANNONCES */}
            <TabsContent value="announce">
              <Card className="border-border/50 bg-card">
                <CardHeader>
                  <CardTitle className="font-display flex items-center gap-2">
                    <Bell className="h-5 w-5 text-accent" /> Bandeau d'Annonce
                  </CardTitle>
                  <CardDescription>Affiche un message important en haut du site</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Switch
                      checked={settings.announcementEnabled}
                      onCheckedChange={(v) => updateSettings({ announcementEnabled: v })}
                    />
                    <Label>Activer le bandeau d'annonce</Label>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Texte de l'annonce</Label>
                    <Textarea
                      value={settings.announcementText}
                      onChange={(e) => updateSettings({ announcementText: e.target.value })}
                      placeholder="🎉 Nouveau giveaway ce week-end ! Rejoins le Discord pour participer !"
                      rows={2}
                    />
                  </div>
                  <Button onClick={save} className="bg-accent hover:bg-accent/80 gap-2">
                    <Save className="h-4 w-4" /> Sauvegarder
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* SÉCURITÉ */}
            <TabsContent value="security">
              <Card className="border-border/50 bg-card">
                <CardHeader>
                  <CardTitle className="font-display flex items-center gap-2">
                    <Shield className="h-5 w-5 text-accent" /> Sécurité & Maintenance
                  </CardTitle>
                  <CardDescription>Gère la sécurité et le mode maintenance de ton site</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-3">
                    <Switch
                      checked={settings.maintenanceMode}
                      onCheckedChange={(v) => updateSettings({ maintenanceMode: v })}
                    />
                    <div>
                      <Label className="block">Mode Maintenance</Label>
                      <p className="text-xs text-muted-foreground">Affiche une page de maintenance aux visiteurs</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                    <h3 className="font-display font-semibold mb-2 flex items-center gap-2">
                      <Lock className="h-4 w-4" /> Mot de passe admin
                    </h3>
                    <div className="flex items-center gap-2">
                      <Input
                        type={showPass ? "text" : "password"}
                        value="astuceson2024"
                        readOnly
                        className="font-mono"
                      />
                      <Button variant="outline" size="icon" onClick={() => setShowPass(!showPass)}>
                        {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Pour changer le mot de passe, modifie la variable ADMIN_PASS dans le code.
                    </p>
                  </div>

                  <Button onClick={save} className="bg-accent hover:bg-accent/80 gap-2">
                    <Save className="h-4 w-4" /> Sauvegarder
                  </Button>
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
