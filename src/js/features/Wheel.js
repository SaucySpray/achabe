// Tools
import normalizeWheel from "normalize-wheel"
import Hammer from "hammerjs"
import _ from "lodash"

class Wheel {
    constructor() {

        document.addEventListener(
            /Firefox/i.test(navigator.userAgent) ? "DOMMouseScroll" : "mousewheel",
            _.debounce(this.throttled, 250, {leading:true, trailing:false})
        )

    }

    throttled() {
        console.log('wheel')
    }
}

export { Wheel }