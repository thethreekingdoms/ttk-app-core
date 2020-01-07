// const path = require("path");
// const { override, fixBabelImports, addWebpackAlias } = require("customize-cra");

// module.exports = override(
//   //do stuff with the webpack config...
//   // config.resolve.alias = {
//   //   "@": resolve("src")
//   // };
//   // return config;
//   fixBabelImports("import", {
//     libraryName: "antd",
//     libraryDirectory: "es",
//     style: "css"
//   }),
//   // used to minimise bundle size by 500KB
//   function(config, env) {
//     const alias = config.resolve.alias || {};
//     alias["@ant-design/icons/lib/dist$"] = path.resolve(
//       __dirname,
//       "./icons.js"
//     );
//     config.resolve.alias = alias;
//     return config;
//   },
//   addWebpackAlias({
//     ["@"]: path.join(__dirname, ".", "./")
//   })
// );
