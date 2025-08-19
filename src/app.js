import { toggleModeButton, mobileSearchButton, searchInput } from "./nodes.js"
import { toggleMode } from "./utils.js"
import { appNavigator } from "./navigation.js"

mobileSearchButton.addEventListener('click', () => location.hash = '#search=')
searchInput.addEventListener('input', (even) => {
    location.hash = `#search=${searchInput.value.trim()}`
    if(searchInput.value === '') location.hash = '#home'
})

//cambiar vistas
window.addEventListener('DOMContentLoaded', appNavigator, false)
window.addEventListener('hashchange', appNavigator, false)

//cambiar de modo
toggleModeButton.addEventListener('click', () => { 
    toggleMode()
})


