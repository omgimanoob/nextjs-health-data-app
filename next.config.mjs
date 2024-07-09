/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.resolve.alias['bootstrap/dist/css/bootstrap.min.css.map'] = false;
        config.resolve.alias['/_next/static/css/app/bootstrap.min.css.map'] = false;
      }
      return config;
    },
  };

export default nextConfig;
