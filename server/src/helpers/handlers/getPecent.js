module.exports = (full, compress) => {
  return Math.floor((full - compress) / full * 100)
}
