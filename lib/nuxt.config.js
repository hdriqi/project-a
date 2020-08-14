import path from 'path'

module.exports = {
  srcDir: path.join(__dirname, "client/"),
  buildDir: path.join(__dirname, ".nuxt"),
  env: {
    BASE_URL: process.env.BASE_URL || 'http://localhost:8000'
  },
  plugins: [
    { src: "~/plugins/generated_custom.js" },
    { src: "~plugins/nuxt-quill-plugin", ssr: false },
  ],
  css: [
    "quill/dist/quill.core.css",
    // for snow theme
    "quill/dist/quill.snow.css",
    // for bubble theme
    "quill/dist/quill.bubble.css",
  ],
  modules: ["nuxt-buefy"],
  head: {
    link: [
      {
        rel: 'stylesheet',
        href: 'https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css'
      }
    ]
  }
}