import { useState } from "react";
import { Play, Download, User, Sun, Salad, Target, FileText, ClipboardList } from "lucide-react";
import { motion } from "framer-motion";
import VideoCard from "@/components/VideoCard";
import VideoModal from "@/components/VideoModal";

const VIDEOS = [
  { id: "dByd6MvxTOE", title: "How to Naturally Boost Testosterone", desc: "Simple lifestyle habits that support healthy testosterone levels.", isNew: true },
  { id: "nvXCDYClYRg", title: "The Truth About Men's Energy & Fatigue", desc: "Why men lose energy with age and what you can do about it." },
  { id: "nm1TxQj9IsQ", title: "Sleep, Stress & Men's Hormones", desc: "How sleep quality directly impacts your hormone balance." },
  { id: "RxyXFGCbZUM", title: "Zinc & Magnesium: Why Men Need Them", desc: "The two most common nutrient deficiencies in men over 35." },
  { id: "oolNFuEBBsA", title: "Exercise for Hormonal Health", desc: "The best types of exercise to support vitality and energy." },
];

const LIFESTYLE = [
  { title: "Morning Routine for High-Energy Men", desc: "The first 60 minutes define your hormonal output.", icon: Sun },
  { title: "The Anti-Fatigue Diet Guide", desc: "Foods that drain you vs. foods that fuel you.", icon: Salad },
  { title: "Stress Management Techniques", desc: "Lowering cortisol to protect your testosterone.", icon: Target },
];

const BONUSES = [
  { title: "VitalPro Quick-Start Guide (PDF)", desc: "Everything you need to know in 5 minutes.", icon: FileText },
  { title: "7-Day Men's Vitality Plan", desc: "A day-by-day roadmap to feeling 10 years younger.", icon: ClipboardList },
];

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight mb-6 px-4 md:px-12 font-display">
    {children}
  </h2>
);

const Index = () => {
  const [selectedVideo, setSelectedVideo] = useState<typeof VIDEOS[0] | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      {/* HEADER */}
      <nav className="sticky top-0 z-40 w-full bg-background/90 backdrop-blur-md border-b border-border px-4 md:px-12 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl tracking-tighter leading-none font-display">
            <span className="font-extralight">VITAL</span>
            <span className="font-black text-primary">PRO</span>
          </h1>
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold mt-1">
            Inner Circle · Members Only
          </p>
        </div>
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold leading-none">Welcome, Member</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Premium Access</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-secondary border border-border flex items-center justify-center group-hover:border-primary transition-colors duration-300">
            <User size={20} className="text-muted-foreground group-hover:text-primary transition-colors duration-300" />
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header className="relative w-full h-[60vh] flex items-center px-4 md:px-12 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at 70% 30%, hsl(43 78% 46% / 0.13) 0%, transparent 50%), linear-gradient(45deg, hsl(0 0% 4%) 0%, hsl(0 0% 10%) 100%)`,
            }}
          />
        </div>
        <div className="relative z-20 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <h2 className="text-5xl md:text-7xl font-black uppercase leading-[0.9] mb-4 tracking-tighter font-display text-balance">
              Welcome to the <span className="text-primary">Inner Circle</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg">
              Exclusive videos, guides, and health content designed to optimize your performance.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-3 bg-primary text-primary-foreground font-black uppercase tracking-wider rounded-sm hover:brightness-90 transition-all flex items-center gap-2">
                <Play size={18} fill="currentColor" /> Start Watching
              </button>
              <button className="px-8 py-3 bg-foreground/10 backdrop-blur-md border border-foreground/20 text-foreground font-black uppercase tracking-wider rounded-sm hover:bg-foreground/20 transition-all flex items-center gap-2">
                <Download size={18} /> Download Guide
              </button>
            </div>
          </motion.div>
        </div>
      </header>

      {/* CONTENT */}
      <main className="py-12 space-y-16">
        {/* Row 1: Videos */}
        <section>
          <SectionTitle>Men's Health Essentials</SectionTitle>
          <div className="flex overflow-x-auto gap-4 px-4 md:px-12 pb-8 no-scrollbar">
            {VIDEOS.map((video) => (
              <VideoCard key={video.id} {...video} onClick={() => setSelectedVideo(video)} />
            ))}
          </div>
        </section>

        {/* Row 2: Lifestyle */}
        <section>
          <SectionTitle>VitalPro Lifestyle Tips</SectionTitle>
          <div className="flex overflow-x-auto gap-4 px-4 md:px-12 pb-8 no-scrollbar">
            {LIFESTYLE.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="flex-none w-[300px] p-6 rounded-xl bg-card border border-border relative overflow-hidden group"
                >
                  <div className="text-primary mb-4">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xl font-black uppercase font-display mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{item.desc}</p>
                  <span className="px-2 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-sm bg-primary text-primary-foreground">
                    Coming Soon
                  </span>
                  <div className="absolute -right-4 -bottom-4 text-foreground/5 rotate-12 group-hover:rotate-0 transition-transform duration-500">
                    <Icon size={100} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Row 3: Bonuses */}
        <section className="px-4 md:px-12">
          <SectionTitle>Your Bonuses</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {BONUSES.map((bonus, idx) => {
              const Icon = bonus.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-6 p-8 rounded-xl bg-card border-2 border-primary/30 hover:border-primary transition-all duration-300 group"
                >
                  <div className="p-4 rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
                    <Icon size={32} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-black uppercase font-display leading-none mb-1">{bonus.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{bonus.desc}</p>
                    <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary hover:text-foreground transition-colors">
                      <Download size={14} /> Download PDF
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="mt-20 border-t border-border bg-background px-4 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h1 className="text-3xl tracking-tighter leading-none font-display mb-4">
              <span className="font-extralight">VITAL</span>
              <span className="font-black text-primary">PRO</span>
            </h1>
            <p className="text-muted-foreground text-sm max-w-md mb-6">
              © 2025 VitalPro · Natural Vitalway LLC. All Rights Reserved.
            </p>
            <div className="flex gap-6 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Use</a>
              <a href="#" className="hover:text-primary transition-colors">Contact Us</a>
            </div>
          </div>
          <div className="bg-secondary/50 p-6 rounded-lg border border-border">
            <p className="text-[11px] leading-relaxed text-muted-foreground uppercase tracking-tight">
              Medical Disclaimer: This content is for informational purposes only and does not constitute medical advice.
              VitalPro is a dietary supplement — not intended to diagnose, treat, cure, or prevent any disease.
              Always consult with a healthcare professional before starting any new supplement regimen.
            </p>
          </div>
        </div>
      </footer>

      {/* VIDEO MODAL */}
      <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
    </div>
  );
};

export default Index;
