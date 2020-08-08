import path from 'path'

module.exports = {
  srcDir: path.join(__dirname, "client/"),
  buildDir: path.join(__dirname, ".nuxt"),
  plugins: [
    { src: "~/plugins/generated_custom.js" },
    { src: "~plugins/nuxt-quill-plugin", ssr:false},
  ],
  css: [
    "quill/dist/quill.core.css",
    // for snow theme
    "quill/dist/quill.snow.css",
    // for bubble theme
    "quill/dist/quill.bubble.css",
  ],
  modules: ["nuxt-buefy"],
};