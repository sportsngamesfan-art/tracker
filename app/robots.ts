import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://harry-kane-ballon-dor.vercel.app/sitemap.xml",
  };
}
