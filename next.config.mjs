/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath: '/agilitrack',
  assetPrefix: '/agilitrack/',
  trailingSlash: true,
};
export default nextConfig;
