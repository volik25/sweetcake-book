//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withNx } = require('@nrwl/next/plugins/with-nx');

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  rewrites: async () => {
    return [
      // {
      //   source: '/api',
      //   destination: 'http://localhost:3333',
      // },
      // {
      //   source: '/static',
      //   destination: 'http://localhost:3333',
      // },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'taplink.st',
      },
    ],
  },
};

module.exports = withNx(nextConfig);
