export default (playerReady) => {
  if (!playerReady) return false

  const banner = document.getElementById('bannerFrame')
  const doc = banner.contentDocument || banner.contentWindow.document
  const canvas = doc.getElementById('canvas')

  return {
    doc,
    canvas,
  }
}
