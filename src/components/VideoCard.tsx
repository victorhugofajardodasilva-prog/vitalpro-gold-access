import { useState } from "react";
import { Play } from "lucide-react";
import { motion } from "framer-motion";

const PDF_URL = "https://natural-vitalway.shop/nailexodus/vitalpro-guide.pdf";
const PDF_FILENAME = "VitalPro-Unlock-Your-Energy-Strength-and-Vitality.pdf";

interface VideoCardProps {
  id: string;
  title: string;
  desc: string;
  isNew?: boolean;
  onClick: () => void;
}

const VideoCard = ({ id, title, desc, isNew, onClick }: VideoCardProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "tween", duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
      className="flex-none w-[280px] md:w-[320px] cursor-pointer group"
      onClick={onClick}
    >
      <div className="relative aspect-video rounded-lg overflow-hidden bg-secondary mb-3 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]">
        {!loaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-secondary via-muted to-secondary bg-[length:200%_100%] animate-shimmer" />
        )}
        <img
          src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
          alt={title}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
          onLoad={() => setLoaded(true)}
        />
        <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-xl">
            <Play size={24} fill="currentColor" />
          </div>
        </div>
        <div className="absolute top-2 left-2 flex gap-1">
          {isNew && (
            <span className="px-2 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-sm bg-primary text-primary-foreground">
              New
            </span>
          )}
          <span className="px-2 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-sm bg-foreground/20 text-foreground">
            Members Only
          </span>
        </div>
      </div>
      <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors duration-300 font-display">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{desc}</p>
    </motion.div>
  );
};

export default VideoCard;
