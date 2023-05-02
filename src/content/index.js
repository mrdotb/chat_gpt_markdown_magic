import { NodeHtmlMarkdown } from 'node-html-markdown'

const nhm = new NodeHtmlMarkdown()

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text).then(
    () => console.log('Text copied to clipboard successfully!'),
    (err) => console.error('Unable to copy text to clipboard.', err),
  )
}

const copyAsMarkdown = (event) => {
  const nodeContent = event.target.closest('.relative').querySelector('.markdown')
  const markdown = nhm.translate(nodeContent.innerHTML)
  copyToClipboard(markdown)
}

const createButton = () => {
  const button = document.createElement('button')
  button.className = `md-copy flex ml-auto gap-2 h-full w-full rounded-md p-1 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400`
  button.onclick = copyAsMarkdown
  button.innerHTML = `<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>`
  return button
}

const injectButtons = () => {
  const $copyBtns = document.querySelectorAll(
    'button.flex.ml-auto.gap-2.h-full.w-full.rounded-md.p-1',
  )
  Array.from($copyBtns).forEach(($copyBtn) => {
    // if not already injected
    if ($copyBtn.parentNode.children.length === 3) {
      $copyBtn.parentNode.prepend(createButton())
    }
  })
}

// Observe the dom and call the callback when the dom is quiet
const createDomQuietHook = (callback, quietPeriod = 500) => {
  let timeoutId = null

  const mutationCallback = () => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      modifyDom(callback)
    }, quietPeriod)
  }

  const observer = new MutationObserver(mutationCallback)
  const config = { childList: true, subtree: true, attributes: true, characterData: true }

  observer.observe(document.documentElement, config)

  const modifyDom = (callback) => {
    // Temporarily disconnect the observer
    observer.disconnect()

    // Perform the DOM modification
    callback()

    // Reconnect the observer
    observer.observe(document.documentElement, config)
  }

  return () => observer.disconnect()
}

createDomQuietHook(() => {
  injectButtons()
}, 500)
