/** @type {import('next').NextConfig} */

const nextConfig = {
  /**
   * При использовании next/imageкомпонента вам нужно будет добавить basePathперед src.
   * Например, использование /docs/me.pngбудет правильно отображать ваше изображение, если basePathустановлено значение /docs.
   *
   * не поддерживается с использованием Turbopack
   */
  // basePath: "star-wars",
  compress: true,
  devIndicators: {
    // какое то расхождение с докой
  },
  /**
   * не поддерживается с использованием Turbopack
   */
  // distDir: "dist-build",
  env: {
    someEnvVarible: "true",
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  /**
   * exportPathMap устарел,
   * теперь используется getStaticPaths.
   * Кажется, надо использовать что-то одно
   */
  generateBuildId: async () => {
    return "v1";
  },
  /**
   * отключение генерации Etags, которая включена по умолчанию
   */
  // generateEtags: false,
  headers: async () => {
    return [
      {
        source: "/",
        headers: [
          {
            key: "x-custom-header-so",
            value: "my custom header value",
          },
          {
            key: "x-another-custom-header-so-so",
            value: "my other custom header value",
          },
        ],
      },
    ];
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
