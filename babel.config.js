<<<<<<< HEAD
// let prodPlugins = []
// if (process.env.NODE_ENV === 'production') {
//   prodPlugins = ['transform-remove-console']
// }
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  // production: {
  //   plugins: ['transform-remove-console']
  // }
=======
let prodPlugins = [];
if (process.env.NODE_ENV === "production") {
  prodPlugins = ["transform-remove-console"];
>>>>>>> 578c7961bbe9bfaa76e60e3bff55cd66b2a12a02
}
module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  env: {
    development: {
      plugins: ["dynamic-import-node", ...prodPlugins],
    },
  },
};
