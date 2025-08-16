import { toggleModeButton, mobileSearchButton, searchInput } from "./nodes.js"
import { toggleMode } from "./utils.js"
import { navigator } from "./navigation.js"

mobileSearchButton.addEventListener('click', () => location.hash = '#search=')
searchInput.addEventListener('input', (even) => {
    location.hash = `#search=${searchInput.value.trim()}`
})

//cambiar vistas
window.addEventListener('DOMContentLoaded', navigator, false)
window.addEventListener('hashchange', navigator, false)

//cambiar de modo
toggleModeButton.addEventListener('click', () => { 
    toggleMode()
})

