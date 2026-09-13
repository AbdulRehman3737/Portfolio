"use client";

import { motion } from "motion/react";
import { profile } from "@/lib/profile";
import ProfileCard from "../reactbits/ProfileCard";

export default function ProfileBeacon({ reduceMotion, isTouch }: { reduceMotion: boolean; isTouch: boolean }) {
  const downloadResume = () => {
    const a = document.createElement("a");
    a.href = "/resume.pdf";
    a.download = "";
    a.click();
  };

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, scale: 0.94, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative mx-auto w-full max-w-xs sm:mx-0 sm:max-w-none"
    >
      <div className="relative z-[1]">
        <ProfileCard
          avatarUrl="/portrait.jpg"
          name={profile.name}
          title={profile.title}
          handle={profile.githubHandle.replace(/^@/, "")}
          status="Open to work — Remote"
          contactText="Resume"
          onContactClick={downloadResume}
          enableTilt={!isTouch && !reduceMotion}
          enableMobileTilt={false}
          behindGlowColor="rgba(234,178,105,0.55)"
        />
      </div>
    </motion.div>
  );
}
