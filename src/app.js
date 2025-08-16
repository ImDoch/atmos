import { toggleModeButton } from "./nodes.js"

toggleModeButton.addEventListener('click', () => { 
    document.body.classList.toggle('light')
})