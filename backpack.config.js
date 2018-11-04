module.exports = {
  webpack: (config, options, webpack) => {
    config.entry.main = './server/server.js'
    return config
  }
}
