"use client";
import { motion } from "framer-motion";

export default function StreetSyncLoader() {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 2, duration: 0.5 }}
      onAnimationComplete={() => {
        if (typeof document !== "undefined") {
          document.body.style.overflow = "unset";
        }
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-white"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-4"
      >
        <h1 className="text-4xl font-black tracking-tighter text-black uppercase">
          Street<span className="text-green-600">Sync</span>
        </h1>
        <div className="h-1 w-24 bg-gray-200 overflow-hidden rounded">
          <motion.div 
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="h-full bg-green-600"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
