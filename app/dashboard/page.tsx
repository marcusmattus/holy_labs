import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { NavBar } from "@/components/shared/NavBar"
import Link from "next/link"
import { Plus, ExternalLink, Settings, BarChart3, Zap, Clock } from "lucide-react"

export default async function DashboardPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect("/auth/login?redirect=/dashboard")
  }

  // Fetch user's apps
  const { data: apps } = await supabase
    .from("generated_apps")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(10)

  // Fetch user profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  // Fetch subscription
  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", user.id)
    .eq("status", "active")
    .single()

  const stats = {
    totalApps: apps?.length || 0,
    liveApps: apps?.filter(a => a.status === "live").length || 0,
    draftApps: apps?.filter(a => a.status === "draft").length || 0,
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <NavBar />
      <main className="flex-1 w-full">
        {/* Header */}
        <header className="p-10 border-b border-border bg-panel">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between md:items-end gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[10px] font-mono text-accent px-2 py-0.5 border border-accent">USR</span>
                <h2 className="text-xl font-serif italic text-muted">Control Center</h2>
              </div>
              <h1 className="text-4xl font-sans tracking-tight uppercase">
                Welcome, <span className="font-bold">{profile?.full_name || user.email?.split("@")[0]}</span>
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="border border-border px-4 py-2 flex items-center gap-2">
                <Zap className="w-4 h-4 text-accent" />
                <span className="text-[10px] font-mono uppercase tracking-widest">
                  {subscription?.plan || "Free"} Plan
                </span>
              </div>
              {!subscription && (
                <Link
                  href="/store"
                  className="bg-accent text-background px-6 py-3 font-bold text-sm tracking-widest uppercase hover:bg-accent/90 transition-colors"
                >
                  Upgrade
                </Link>
              )}
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="max-w-6xl mx-auto p-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
            {[
              { label: "Total Apps", value: stats.totalApps, icon: BarChart3 },
              { label: "Live", value: stats.liveApps, icon: ExternalLink },
              { label: "Drafts", value: stats.draftApps, icon: Clock },
              { label: "This Month", value: stats.totalApps, icon: Zap },
            ].map((stat, idx) => (
              <div key={idx} className="border border-border p-6 hover:border-accent transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className="w-5 h-5 text-accent" />
                  <span className="text-[10px] font-mono text-muted uppercase">{stat.label}</span>
                </div>
                <div className="text-4xl font-bold">{stat.value}</div>
              </div>
            ))}
          </div>

          {/* Apps Section */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold uppercase tracking-tight">Your Apps</h2>
            <Link
              href="/studio/new"
              className="flex items-center gap-2 bg-foreground text-background px-6 py-3 font-bold text-sm tracking-widest uppercase hover:bg-accent hover:text-foreground transition-colors"
            >
              <Plus className="w-4 h-4" /> New App
            </Link>
          </div>

          {apps && apps.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {apps.map((app) => (
                <div
                  key={app.id}
                  className="border border-border p-6 hover:border-accent transition-colors group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold tracking-tight">{app.name}</h3>
                      <p className="text-[10px] font-mono text-muted uppercase mt-1">
                        {app.app_type || "Application"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 border border-border px-2 py-1">
                      <div
                        className="w-1.5 h-1.5"
                        style={{
                          background: app.status === "live" ? "var(--accent)" : "#444",
                        }}
                      />
                      <span className="text-[9px] font-mono uppercase">{app.status}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted mb-6 line-clamp-2">
                    {app.description || "No description"}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="text-[10px] font-mono text-muted uppercase">
                      {new Date(app.created_at).toLocaleDateString()}
                    </span>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link href={`/studio/${app.id}`} className="hover:text-accent">
                        <Settings className="w-4 h-4" />
                      </Link>
                      <Link href={`/insights/${app.id}`} className="hover:text-accent">
                        <BarChart3 className="w-4 h-4" />
                      </Link>
                      {app.preview_url && (
                        <a href={app.preview_url} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="border border-border p-12 text-center">
              <div className="w-16 h-16 border border-border flex items-center justify-center mx-auto mb-6">
                <Plus className="w-8 h-8 text-muted" />
              </div>
              <h3 className="text-xl font-bold uppercase mb-2">No Apps Yet</h3>
              <p className="text-muted font-mono text-sm uppercase mb-6">
                Create your first app to get started
              </p>
              <Link
                href="/studio/new"
                className="inline-flex items-center gap-2 bg-accent text-background px-6 py-3 font-bold text-sm tracking-widest uppercase hover:bg-accent/90 transition-colors"
              >
                <Plus className="w-4 h-4" /> Create App
              </Link>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="h-12 border-t border-border flex items-center px-10 justify-between font-mono text-[10px] tracking-widest bg-background">
        <div className="flex gap-6 opacity-40">
          <span>NODE: STABLE</span>
          <span>LATENCY: 14MS</span>
        </div>
        <div className="flex gap-6">
          <span className="text-accent">HOLY_ENGINE ACTIVE</span>
        </div>
      </footer>
    </div>
  )
}
