// Tools
import normalizeWheel from "normalize-wheel"
import Hammer from "hammerjs"

// This class normalize scroll and wheel events so it's not possible to spam scroll or have different behaviors between devices (trackpad/mouse/screentouch)
export class Scroll {
    constructor(_scene) {
        this.wheeling = true
        this.triggered = false
        this.recentlyTriggered = false

        this.direction = 0
        this.previousValue = 0

        this.slide = {
            current: 0,
            min: 0,
            max: 5
        }

        this.lastTriggerTimeout = null
        this.idleTimeout = null
        this.hammerManager = null

        this.slides = document.querySelectorAll('.home__slide-count__el')

        // this.slides.forEach(slide => {
        //     slide.addEventListener('click', () => {
        //         console.log(slide)
        //     })
        // })

        this.init()
    }

    init() {
        this.hammerManager = new Hammer.Manager(
            document.body, {
            recognizers: [
                [Hammer.Pan, {
                    threshold: 0,
                    pointers: 0
                }],
            ],
        },
        )

        document.addEventListener(
            /Firefox/i.test(navigator.userAgent) ? "DOMMouseScroll" : "mousewheel",
            (_e) => {
                this.debounce(
                    this.onMouseWheel(_e),
                    750
                )
            }, {
            passive: true
            }
        )

        this.hammerManager.on('pan',
            (_e) => {
                console.log(_e)
                this.debounce(
                    this.onMouseWheel(_e),
                    750
                )
            }, {
            passive: true
            }
        )
    }

    changeCurrentSlide(current) {
        this.slides.forEach( slide => slide.classList.remove('slide--active') )
        this.slides[current].classList.add('slide--active')
    }

    changeBgText(current) {
        const $currentCase = document.querySelector(`.case--${current}`)
        const $currentTitle = $currentCase.querySelector('.case__title').innerText

        const $bgText1 = document.querySelector('.home__bg-text--1')
        const $bgText2 = document.querySelector('.home__bg-text--2')

        const bgTextContent = $currentTitle + "&nbsp;"
    
        $bgText1.innerHTML = ''
        $bgText2.innerHTML = ''
        $bgText1.classList.remove('bg-text--animation')
        $bgText2.classList.remove('bg-text--animation')
        $bgText1.classList.add('bg-text--transition')
        $bgText2.classList.add('bg-text--transition')
        $bgText1.innerHTML = bgTextContent.repeat(3)
        $bgText2.innerHTML = bgTextContent.repeat(3)
        setTimeout( () => {
            $bgText1.classList.remove('bg-text--transition')
            $bgText2.classList.remove('bg-text--transition')
            setTimeout( () => {
                $bgText1.classList.add('bg-text--animation')
                $bgText2.classList.add('bg-text--animation')
            }, 400 )
        }, 200 )
    }

    debounce(fn, time) {
        let timeout;

        return function() {
            const functionCall = () => fn.apply(this, arguments);
            
            clearTimeout(timeout);
            timeout = setTimeout(functionCall, time);
        }
    }

    counter(decrease) {
        if (decrease) {
            if (this.slide.current > 0) {
                this.slide.current--
            }
            else {
                this.slide.current = this.slide.max
            }
        }
        else {
            if (this.slide.current < this.slide.max) {
                this.slide.current++
            }
            else {
                this.slide.current = this.slide.min
            }
        }
    }

    // This is the function called on wheel event
    onWheel(_direction) {

        if (this.wheeling && this.direction > 0) {
            this.counter()
            document.querySelector('.cases').style.transform = `translateY(-${this.slide.current}00vh)`
            document.querySelectorAll('.case').forEach(cases => cases.classList.add('case__initial'))
            document.querySelector(`.case--${this.slide.current}`).classList.remove('case__initial')
            // console.log('down :' + this.currentSlide)
        }
        else if (this.wheeling && this.direction < 0) {
            this.counter(true)
            document.querySelector('.cases').style.transform = `translateY(-${this.slide.current}00vh)`
            document.querySelectorAll('.case').forEach(cases => cases.classList.add('case__initial'))
            document.querySelector(`.case--${this.slide.current}`).classList.remove('case__initial')
            // console.log('up :' + this.currentSlide)
        }

        this.changeCurrentSlide(this.slide.current)
    }

    onMouseWheel(_e) {
        this.triggered = false

        // Get normalized value
        const normalized = normalizeWheel(_e)

        this.triggered =
            this.testWheelByDirection(normalized.pixelY) ||
            this.testWheelByIdle() ||
            this.testWheelByIncrease(normalized.pixelY)

        if (this.triggered) {
            this.onWheel(this.direction)
            this.changeBgText(this.slide.current)

            this.recentlyTriggered = true

            // Clear current timeout
            if (this.lastTriggerTimeout) window.clearTimeout(this.lastTriggerTimeout)

            this.lastTriggerTimeout = window.setTimeout(() => {
                this.recentlyTriggered = false
            }, 750)
        }
    }

    testWheelByDirection(_value) {
        let result = false

        // Get direction
        const direction = Math.sign(_value)

        // Direction changed
        if (direction !== this.direction) result = true

        // Save direction
        this.direction = direction

        return result
    }

    testWheelByIdle() {
        let result = false

        // Clear current timeout
        if (this.idleTimeout) window.clearTimeout(this.idleTimeout)

        // Start new timeout
        this.idleTimeout = window.setTimeout(() => {
            this.wheeling = false
        }, 750)

        if (!this.wheeling) result = true

        this.wheeling = true

        return result
    }

    testWheelByIncrease(_value) {
        let result = false
        const sign = Math.sign(_value)

        if (!this.recentlyTriggered) {
            if (sign > 0 && _value > this.previousValue * 2) result = true

            if (sign < 0 && _value < this.previousValue * 2) result = true
        }

        this.previousValue = _value

        return result
    }
}