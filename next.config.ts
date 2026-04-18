import type { NextConfig } from "next";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const remotePatterns = [];

if (supabaseUrl) {
  const parsedSupabaseUrl = new URL(supabaseUrl);

  remotePatterns.push({
    protocol: parsedSupabaseUrl.protocol.replace(":", "") as "http" | "https",
    hostname: parsedSupabaseUrl.hostname,
    pathname: "/storage/v1/object/public/**",
  });
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns,
  },
};

export default nextConfig;
