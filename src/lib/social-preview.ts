/**
 * Shared social-preview image contract for thally.io.
 *
 * Keep the copy in `site.ts` aligned with app.thally.io. Link unfurlers cache
 * image URLs independently of page metadata, so every visual revision uses a
 * new, versioned filename.
 */

export interface SocialPreviewImage {
  url: string;
  width: number;
  height: number;
  alt: string;
  type: "image/png";
}

/** The current Open Graph and Twitter image served by the marketing site. */
export const socialPreviewImage: SocialPreviewImage = {
  url: "/brand/thally-og-2026-07-30.png",
  width: 1200,
  height: 630,
  alt: "Thally",
  type: "image/png",
};
