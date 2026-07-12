import type { MetadataRoute } from "next";

export const dynamic = "force-static";

import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — ${SITE_TAGLINE}`,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "browser",
    background_color: "#faf9f5",
    theme_color: "#737938",
    icons: [
      {
        src: "/favicon/favicon-180.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/favicon/favicon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
