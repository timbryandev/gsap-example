;(function () {
  let isTicking = false // prevent recalculations in between requestAnimationFrame
  const scrollerContainer = document.querySelector('#scroller')
  const progressBarButton = scrollerContainer.querySelector(
    '.progress-bar__button'
  )
  const levelElements = document.querySelectorAll('.level')
  const progressButtons = document.querySelectorAll('.progress__button')

  function smoothScroll (element) {
    const options = { behavior: 'smooth', inline: 'center' }
    element.scrollIntoView(options)
  }

  function setProgressPosition () {
    const { scrollTop, scrollHeight, clientHeight } = scrollerContainer
    const scrollPercentage = (100 * scrollTop) / (scrollHeight - clientHeight)
    progressBarButton.style.top = `${scrollPercentage}%`
    progressBarButton.style.transform = `translateY(-${scrollPercentage}%)`
  }

  function animateOnScroll () {
    if (isTicking === false) {
      window.requestAnimationFrame(function () {
        setProgressPosition()
        isTicking = false
      })

      isTicking = true
    }
  }

  scrollerContainer.addEventListener('scroll', animateOnScroll)

  progressButtons.forEach((button, idx) => {
    button.addEventListener('click', () => {
      if (!levelElements[idx]) return

      smoothScroll(levelElements[idx])
    })
  })
})()
