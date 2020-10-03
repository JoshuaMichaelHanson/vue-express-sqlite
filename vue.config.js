module.exports = {
  devServer : {
    proxy: 'http://localhost:3000',
    port: 3000,
    public: "midnight-comet-child.glitch.me:3000",
  }
}