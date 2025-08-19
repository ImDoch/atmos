import { header, searchInputs } from "./nodes.js"
import { toggleMode } from "./utils.js"
import { appNavigator } from "./navigation.js"

//cambiar vistas
window.addEventListener('DOMContentLoaded', appNavigator, false)
window.addEventListener('hashchange', appNavigator, false)

document.addEventListener('click', (event) => {
    if (event.target.closest('.back-button')) {
        location.hash = '#home'
        searchInputs.forEach(input => {
            input.value = ''
        })
    }
    else if (event.target.closest('.header__logo')) {
        location.hash = '#home'
        searchInputs.forEach(input => {
            input.value = ''
        })
    }
    else if (event.target.closest('.search__button--mobile')) {
        location.hash = '#search='
    }
})

document.addEventListener('input', (event) => {
    const input = event.target
    if(event.target.matches('.search__input--header')) {
        location.hash = `#search=${input.value.trim()}`
        if(input.value === '') {
            location.hash = '#home'
        }
    }
    else if(event.target.matches('.search__input--mobile')) {
        location.hash = `#search=${input.value.trim()}`
    }
})

header.addEventListener('click', (event) => {
    if(event.target.closest('.toggle-mode-button')) {
        toggleMode()
    }
})






