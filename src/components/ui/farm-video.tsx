"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "@/app/page.module.css";

type FarmVideoProps = {
  videoId: string;
  poster: string;
  posterAlt: string;
  title: string;
  subtitle?: string;
  /** Optional start time in seconds. */
  start?: number;
};

export function FarmVideo({
  videoId,
  poster,
  posterAlt,
  title,
  subtitle = "Watch the tour",
  start = 0,
}: FarmVideoProps) {
  const [playing, setPlaying] = useState(false);

  const src =
    `https://www.youtube-nocookie.com/embed/${videoId}` +
    `?autoplay=1&rel=0${start ? `&start=${start}` : ""}`;

  return (
    <div className={styles.videoFrame}>
      {playing ? (
        <iframe
          src={src}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
        />
      ) : (
        <button
          type="button"
          className={styles.videoPlaceholder}
          onClick={() => setPlaying(true)}
          aria-label={`Play ${title}`}
          style={{ cursor: "pointer", border: 0, background: "transparent", padding: 0, width: "100%" }}
        >
          <div className={styles.videoBg}>
            <Image
              src={poster}
              alt={posterAlt}
              fill
              sizes="(min-width: 1100px) 1100px, 100vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          <span className={styles.playBtn}>
            <span className={styles.playIcon} />
          </span>
          <div className={styles.videoText}>
            <h3>{title}</h3>
            <p>{subtitle}</p>
          </div>
        </button>
      )}
    </div>
  );
}
