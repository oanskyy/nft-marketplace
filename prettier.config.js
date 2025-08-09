/** @type {import('prettier').Config} */
module.exports = {
  plugins: [
    require.resolve('@ianvs/prettier-plugin-sort-imports'),
    require('prettier-plugin-tailwindcss'),
  ],
}