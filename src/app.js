const mobileSearchButton = document.querySelector('.search__button--mobile')
const mobileSearchModal = document.querySelector('.mobile-search')
const mobileCloseModal = document.querySelector('.close-modal')
const toggleModeButton = document.querySelector('.toggle-mode-button')

mobileSearchButton.addEventListener('click', () => {
    mobileSearchModal.showModal()
})
mobileCloseModal.addEventListener('click', () => { 
    mobileSearchModal.close()
})
toggleModeButton.addEventListener('click', () => { 
    document.body.classList.toggle('light')
})