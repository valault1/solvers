/** @type {import('next').NextConfig} */
const exports = {
  // webpack: (config, { isServer }) => {
  //   if (!isServer) {
  //     config.target = "electron-renderer";
  //   }
  //   return config;
  // },
  output: "export",
  distDir: "out",
};

export default exports;
