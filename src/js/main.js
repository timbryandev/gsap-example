const pageEl = document.querySelector('[asscroll-container]')
const targetPosEl = document.querySelector('[data-targetPos]')
const currentPosEl = document.querySelector('[data-currentPos]')
const maxScrollEl = document.querySelector('[data-maxScroll]')
const scrollEndEl = document.querySelector('[data-scrollEnd]')
const scrollPercent = document.querySelector('[data-scrollPercent]')

const asscroll = new window.ASScroll({
  scrollElements: pageEl,
  ease: 0.1,
  touchEase: 1,
  customScrollbar: true,
  scrollbarEl: '.my-scrollbar',
  scrollbarHandleEl: '.my-scrollbar-handle',
  scrollbarStyles: true,
  disableNativeScrollbar: true,
  touchScrollType: 'scrollTop',
  disableRaf: true,
  disableResize: true,
  limitLerpRate: true,
  blockScrollClass: '.asscroll-block'
})

window.addEventListener('load', () => {
  asscroll.enable()
  maxScrollEl.textContent = asscroll.maxScroll
})

function onRaf () {
  asscroll.update()
  window.requestAnimationFrame(onRaf)
}
window.requestAnimationFrame(onRaf)

window.addEventListener('resize', () => {
  const width = window.innerWidth
  const height = window.innerHeight
  asscroll.resize({ width, height })
  maxScrollEl.textContent = asscroll.maxScroll
})

asscroll.on('scroll', scrollPos => (targetPosEl.textContent = scrollPos))
asscroll.on('scrollEnd', scrollPos => (scrollEndEl.textContent = scrollPos))
asscroll.on(
  'update',
  ({ currentPos }) => {
    currentPosEl.textContent = currentPos
    const currentPercentage = (100 / asscroll.maxScroll) * currentPos
    scrollPercent.textContent = Math.ceil(currentPercentage)
  }
)
