// Add dark / light detection that runs before loading Nuxt

// Global variable minimizers
const w = window
const de = document.documentElement

const knownColorSchemes = ['dark', 'light']

const preference = window.localStorage.getItem('<%= options.storageKey %>') || '<%= options.preference %>'
let value = preference === 'system' ? getColorScheme() : preference
// Applied forced color mode
const forcedColorMode = de.getAttribute('data-color-mode-forced')
if (forcedColorMode) {
  value = forcedColorMode
}

addColorScheme(value)

w['<%= options.globalName %>'] = {
  preference,
  value,
  getColorScheme,
  addColorScheme,
  removeColorScheme
}

function addColorScheme (value) {
  const className = '<%= options.classPrefix %>' + value + '<%= options.classSuffix %>'
  const dataValue = '<%= options.dataValue %>'
  if (de.classList) {
    de.classList.add(className)
  } else {
    de.className += ' ' + className
  }
  if (dataValue) {
    de.setAttribute('data-' + dataValue, value)
  }
}

function removeColorScheme (value) {
  const className = '<%= options.classPrefix %>' + value + '<%= options.classSuffix %>'
  const dataValue = '<%= options.dataValue %>'
  if (de.classList) {
    de.classList.remove(className)
  } else {
    de.className = de.className.replace(new RegExp(className, 'g'), '')
  }
  if (dataValue) {
    de.removeAttribute('data-' + dataValue)
  }
}

function prefersColorScheme (suffix) {
  return w.matchMedia('(prefers-color-scheme' + suffix + ')')
}

function getColorScheme () {
  if (w.matchMedia && prefersColorScheme('').media !== 'not all') {
    for (const colorScheme of knownColorSchemes) {
      if (prefersColorScheme(':' + colorScheme).matches) {
        return colorScheme
      }
    }
  }

  return '<%= options.fallback %>'
}
