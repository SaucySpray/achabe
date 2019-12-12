import SplitTextJS from 'split-text-js'
import * as Animations from './features/Animations'
import { Loader } from './features/Loader'
import { Grain } from './features/Grain'
import AOS from 'aos'
import { Scroll } from './features/Scroll'
import { Wheel } from './features/Wheel'
import { Parallax } from './features/Parallax'

import dotcontrolVideo from '../static/videos/dotcontrol.mp4'
import tweatVideo from '../static/videos/tweat.mov'
import teaserVideo from '../static/videos/teaser.mp4'
import dooodleVideo from '../static/videos/dooodle.mov'
import gazVideo from '../static/videos/gaz.mov'
import terrastarVideo from '../static/videos/terrastar.mov'

import dotcontrolImage from '../static/images/posters/dotcontrol.png'
import tweatImage from '../static/images/posters/tweat.png'
import teaserImage from '../static/images/posters/teaser.png'
import dooodleImage from '../static/images/posters/dooodle.png'
import gazImage from '../static/images/posters/gaz.png'
import terrastarImage from '../static/images/posters/terrastar.png'

const Home = () => {
    Loader()
    new Grain(document.querySelector('.grain'))
    AOS.init()
    new Scroll()

    // Parallax
    const titles = document.querySelectorAll('[data-parallax="title"]')
    const videos = document.querySelectorAll('[data-parallax="video"]')
    const cta = document.querySelectorAll('[data-parallax="cta"]')
    const contact = document.querySelectorAll('[data-parallax="contact"]')
    const contactButton = document.querySelector('.home__contact__text')
    const contactCloseButton = document.querySelector('.js-contact-close')
    const contactModale = document.querySelector('.contact')
    const slides = document.querySelectorAll('[data-parallax="slides"]')
    const bgText = document.querySelectorAll('[data-parallax="bg-text"]')
    new Parallax(titles, document.body, 0.5, 2.5, 70)
    new Parallax(videos, document.body, 0.5, 6, 110)
    new Parallax(cta, document.body, 0.5, 2.5, 70)
    new Parallax(contact, document.body, 0.5, 3, 10)
    new Parallax(slides, document.body, 0.5, 3, 10)
    new Parallax(bgText, document.body, 0.5, 3, -40)

    // Contact hover
    document.querySelector('.home__contact__text').addEventListener('mouseenter', () => {
        document.querySelector('.home__contact__text').classList.add('contact--text')
    })
    document.querySelector('.home__contact__text').addEventListener('mouseleave', () => {
        document.querySelector('.home__contact__text').classList.remove('contact--text')
    })

    // Title animation
    const $titles = document.querySelectorAll('.case__title')
    const $cases = document.querySelectorAll('.js-home-case')
    const splittedTitles = []

    $titles.forEach(title => {
        splittedTitles.push(
            new SplitTextJS(title)
        )
    })

    // Background text
    const $bgText1 = document.querySelector('.home__bg-text--1')
    const $bgText2 = document.querySelector('.home__bg-text--2')
    const bgTextContent = $bgText1.innerText + "&nbsp;"

    $bgText1.innerHTML = bgTextContent.repeat(3)
    $bgText2.innerHTML = bgTextContent.repeat(3)

    // Case click
    // $cases.forEach(cases => {
    //     cases.addEventListener('click', (event) => {
    //         event.preventDefault()
    //         cases.querySelector('.case__video').classList.add('video--large')

    //         setTimeout( () => {
    //             Animations.caseHover(cases)
    //         }, 600 )
            
    //         const link = cases.querySelector('.case__cta--inner').href

    //         setTimeout(function(){
    //             window.location.href = link
    //         }, 1000)
    //     })
    // })

    // Contact modale
    contactButton.addEventListener('click', () => {
        contactModale.classList.add('contact__active')
    })

    contactCloseButton.addEventListener('click', () => {
        contactModale.classList.remove('contact__active')
    })

    // Resize
    window.addEventListener('resize', () => {
        if(window.innerWidth < 1014) {
            contactModale.classList.remove('contact__active')
        }
    })
}

export { Home }