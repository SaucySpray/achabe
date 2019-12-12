// Import SCSS
import './scss/main.scss'
import 'aos/dist/aos.css';

// Import JS
import { Home } from './js/Home'
import { Case } from './js/Case'

// Import modules
import LazyLoad from "vanilla-lazyload"

const home = document.querySelector('.home')
const casePage = document.querySelector('.casePage')

if(home) {
    const lazyLoad = new LazyLoad({
        elements_selector: '.lazy'
    })
    Home()
}

if (casePage) {
    Case()
}

window.addEventListener('load', event => console.log(event))