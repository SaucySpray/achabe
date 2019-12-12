class Parallax {
    constructor(elements, target, damping, offset, spread) {
        this.elements = elements
        this.target = target

        this.props = {
            damping: damping,
            offset: offset,
            spread: spread
        }

        this.mousePos = {
            x: 0,
            y: 0
        }

        this.newPos = {
            x: 0,
            y: 0
        }

        this.target.addEventListener('mousemove', (event) => {
            if(window.innerWidth > 992) {
                // Get mouse pos
                this.mousePos.x = event.clientX
                this.mousePos.y = event.clientY

                // console.log(this.mousePos.x + ' ' + this.mousePos.y)

                // Move to new position
                this.elements.forEach(element => {
                    this.move(element)
                })
            }
            else {
                this.reset()
            }
        })

        this.target.addEventListener('resize', () => {
            if(window.innerWidth <= 992) {
                this.reset()
            }
        })

        this.target.addEventListener('mouseenter', () => this.mouseIn())
        this.target.addEventListener('mouseleave', () => this.reset())
    }

    easeInOutQuart(t) {
        return t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t
    }

    moveEase(element) {
        let dX = this.mousePos.x - element.getBoundingClientRect().x
        let dY = this.mousePos.y - element.getBoundingClientRect().y

        element.setAttribute('style', `transform: translate(${dX}px, ${dY}px);`)
    }

    move(element) {
        this.newPos.x = (((this.mousePos.x / window.innerWidth) - this.props.damping) / this.props.offset) * this.props.spread
        this.newPos.y = (((this.mousePos.y / window.innerHeight) - this.props.damping) / this.props.offset) * this.props.spread

        element.setAttribute('style', `transform: translate(${this.newPos.x}px, ${this.newPos.y}px);`)
    }

    mouseIn() {
        this.elements.forEach( element => {
            setTimeout(() => element.classList.remove('parallax--transition'), 250)
        })
    }

    reset() {
        this.elements.forEach((el) => {
            el.style.transform = 'translate(0, 0)';
            el.classList.add('parallax--transition');
        });
    }
}

export { Parallax }