import { magicIcon, termostatIcon, windIcon, rainIcon, uvIndexIcon } from "./nodes.js"

//cambio de modo
const toggleMode = () => {
    document.body.classList.toggle('light')
    if(document.body.classList.contains('light')) {
        magicIcon.src = 'assets/magic-icon-white.svg'
        magicIcon.parentElement.style.backgroundColor = 'hsl(0 0% 5%)'
        magicIcon.parentElement.style.color = 'hsl(0 0% 95%)'
        termostatIcon.src = './assets/termostat-icon-light.svg'
        windIcon.src = './assets/wind-icon-light.svg'
        rainIcon.src = './assets/rain-icon-light.svg'
        uvIndexIcon.src = './assets/uv-index-icon-light.svg'
    }
    else {
        magicIcon.src = 'assets/magic-icon-black.svg'
        magicIcon.parentElement.style.backgroundColor = 'hsl(0 0% 100%)'
        magicIcon.parentElement.style.color = 'hsl(0 0% 5%)'
        termostatIcon.src = './assets/termostat-icon-dark.svg'
        windIcon.src = './assets/wind-icon-dark.svg'
        rainIcon.src = './assets/rain-icon-dark.svg'
        uvIndexIcon.src = './assets/uv-index-icon-dark.svg'
    }
    
}

export {toggleMode}