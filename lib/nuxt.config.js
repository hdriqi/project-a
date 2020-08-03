import path from 'path'

module.exports = {
  srcDir: path.join(__dirname, "client/"),
  buildDir: path.join(__dirname, ".nuxt"),
  plugins: [{ src: "~/plugins/generated_custom.js" }],
  modules: [
    "nuxt-buefy",
  ],
};