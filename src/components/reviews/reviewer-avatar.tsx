"use client";

import Image from "next/image";
import { useState } from "react";

/** Google's supplied photo loads directly; missing/failed photos retain initials. */
export function ReviewerAvatar({ name, photoUrl, color = "#6b796b", size = 48 }: {
  name: string; photoUrl?: string; color?: string; size?: number;
}) {
  const [failedUrl, setFailedUrl] = useState<string>();
  const initials = name.trim().split(/\s+/).slice(0, 2).map(part => part[0]).join("").toUpperCase() || "G";
  return (
    <span aria-hidden="true" style={{ display: "inline-flex", position: "relative", flexShrink: 0, alignItems: "center", justifyContent: "center", width: size, height: size, borderRadius: "50%", overflow: "hidden", background: color, color: "#fff", fontSize: size * 0.29, fontWeight: 500, lineHeight: 1 }}>
      {initials}
      {photoUrl && failedUrl !== photoUrl && (
        <Image key={photoUrl} src={photoUrl} alt="" width={size} height={size} unoptimized
          loading="lazy" referrerPolicy="no-referrer" onError={() => setFailedUrl(photoUrl)}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      )}
    </span>
  );
}
