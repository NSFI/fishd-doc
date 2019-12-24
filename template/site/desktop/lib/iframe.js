let init = false
export default function initIframe () {
  if (init) {
    return
  }
  init = true
  window.addEventListener('message', (e) => {
    const event = e.data || ''
    switch(event.type) {
      case 'pathChange':
        if (event.data.slice(2)) {
          location.assign(`/#/components/${event.data.slice(2)}`)
        }
        break
    }
  })
  // 重新加载demo
  window.reloadDemo = function (data) {
    const iframe = document.querySelector('.u-iframe');
    if (iframe) {
      iframe.contentWindow.postMessage({
        type: 'reloadDemo',
        data
      }, '*')
    }
  }
}
