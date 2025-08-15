const mobileSearchButton = document.querySelector('.search__button--mobile')
const mobileSearchModal = document.querySelector('.mobile-search')
const mobileCloseModal = document.querySelector('.close-modal')

mobileSearchButton.addEventListener('click', () => {
    mobileSearchModal.showModal()
})
mobileCloseModal.addEventListener('click', () => { 
    mobileSearchModal.close()
})