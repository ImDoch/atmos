import { header, searchInputs, searchForms, searchResultsCardsContainer } from "./nodes.js"
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
        searchResultsCardsContainer.innerHTML = ''
    }
    else if (event.target.closest('.header__logo')) {
        location.hash = '#home'
        searchInputs.forEach(input => {
            input.value = ''
        })
        searchResultsCardsContainer.innerHTML = ''
    }
    else if (event.target.closest('.search__button--mobile')) {
        location.hash = '#search='
    }
})

searchForms.forEach(form => {
    form.addEventListener('submit', (event) => {
        event.preventDefault()
        const input = form.querySelector('.search__input')
        location.hash = input.value.trim() ? `#search=${input.value.trim()}` : '#home'
    }) 
})

header.addEventListener('click', (event) => {
    if(event.target.closest('.toggle-mode-button')) {
        toggleMode()
    }
})