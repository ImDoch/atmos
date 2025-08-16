import { mainWeatherView, searchView, backButton } from "./nodes.js"

const navigator = () => {
    if(location.hash.startsWith('#search=')) {
        searchPage()
    }
    else if (location.hash.startsWith('#weather=')) {
        weatherPage()
    }
    else {
        homePage()
    }
}

const homePage = () => {
    mainWeatherView.classList.remove('hidden')
    searchView.classList.add('hidden')
    backButton.classList.add('hidden')
}

const weatherPage = () => {
    mainWeatherView.classList.remove('hidden')
    searchView.classList.add('hidden')
    backButton.classList.remove('hidden')
}

const searchPage = () => {
    mainWeatherView.classList.add('hidden')
    searchView.classList.remove('hidden')
    backButton.classList.remove('hidden')
}

export { navigator }