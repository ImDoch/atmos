const toggleModeButton = document.querySelector('.toggle-mode-button')

toggleModeButton.addEventListener('click', () => { 
    document.body.classList.toggle('light')
})