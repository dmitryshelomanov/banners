export default (doc, color) => {
  const header = doc.querySelector('head')
  const style = doc.createElement('style')
  let oldStyle

  if (oldStyle = doc.querySelector('style[data-style]')) {
    oldStyle.innerHTML = `body {background-color: ${color} !important}`
    return
  }

  style.setAttribute('data-style', 1)
  style.innerText = `body {background-color: ${color} !important}`
  header.appendChild(style)
}
