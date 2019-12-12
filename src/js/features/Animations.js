import anime from 'animejs'

export const caseHover = (targetCase) => {
    anime({
        targets: targetCase,
        skew: 0,
        scale: 3,
        easing: 'easeInOutExpo',
        duration: 750,
    })
}