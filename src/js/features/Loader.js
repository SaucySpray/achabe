import anime from 'animejs'

const loaderStart = (loaderLoad, $loaderLine, $loaderPercent, $loader) => {
    anime({
        targets: loaderLoad,
        loaderLine: 100,
        loaderPercent: '100%',
        easing: 'easeInOutExpo',
        round: 1,
        duration: 2000,
        update: () => {
            $loaderLine.style.width = loaderLoad.loaderLine + "%"
            $loaderPercent.innerText = loaderLoad.loaderPercent
        },
        complete: () => {
            loaderAnim($loaderLine, $loader)
        }
    })
}

const loaderAnim = ($loaderLine, $loader) => {
    anime.timeline({
        targets: $loaderLine,
        scaleX: 1.5,
        duration: 150,
        easing: 'easeInOutExpo'
    })
    .add({
        targets: $loaderLine,
        height: '120vh',
        duration: 400,
        easing: 'easeInOutExpo'
    })
    .add({
        targets: $loader,
        translateX: '150%',
        duration: 800,
        easing: 'easeInOutExpo',
        complete: () => {
            document.querySelector('.case--0').classList.remove('case__initial')
        }
    })
}

// Loader
const Loader = () => {
    const $loader = document.querySelector('.loader')
    const loaderLoad = {
        loaderLine: 0,
        loaderPercent: '0%'
    }

    const $loaderLine = $loader.querySelector('.loader__line')
    const $loaderPercent = $loader.querySelector('.loader__percentage')

    loaderStart(loaderLoad, $loaderLine, $loaderPercent, $loader)
}

export { Loader }