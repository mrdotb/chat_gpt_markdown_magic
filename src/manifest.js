import { defineManifest } from '@crxjs/vite-plugin'

export default defineManifest({
  name: 'ChatGPT markdown magic',
  description:
    'ChatGPT markdown magic is a chrome extension designed to seamlessly copy the output of ChatGPT conversations in markdown format.',
  version: '1.0.0',
  manifest_version: 3,
  icons: {
    16: 'img/logo-16.png',
    32: 'img/logo-34.png',
    48: 'img/logo-48.png',
    128: 'img/logo-128.png',
  },
  action: {
    default_popup: 'popup.html',
    default_icon: 'img/logo-48.png',
  },
  content_scripts: [
    {
      matches: ['https://chat.openai.com/*'],
      js: ['src/content/index.js'],
    },
  ],
  web_accessible_resources: [
    {
      resources: ['img/logo-16.png', 'img/logo-34.png', 'img/logo-48.png', 'img/logo-128.png'],
      matches: [],
    },
  ],
  permissions: ['clipboardWrite'],
})
