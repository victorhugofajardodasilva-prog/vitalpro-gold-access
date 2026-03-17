import { useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Video {
  id: string;
  title: string;
  desc: string;
}

interface VideoModalProps {
  video: Video | null;
  onClose: () => void;
}

const VideoModal = ({ video, onClose }: VideoModalProps) => {
  useEffect(() => {
    document.body.style.overflow = video ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [video]);

  return (
    <AnimatePresence>
      {video && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-background/95 backdrop-blur-xl"
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-foreground/50 hover:text-foreground transition-colors"
          >
            <X size={32} />
          </button>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ ease: [0.4, 0, 0.2, 1] }}
            className="w-full max-w-[900px]"
          >
            <div className="aspect-video w-full bg-background rounded-lg overflow-hidden shadow-2xl shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]">
              <iframe
                src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
                title={video.title}
                className="w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
            <div className="mt-8">
              <span className="px-2 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-sm bg-primary text-primary-foreground">
                Now Playing
              </span>
              <h2 className="text-3xl md:text-4xl font-black uppercase font-display mt-2 mb-2">
                {video.title}
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl">{video.desc}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VideoModal;
