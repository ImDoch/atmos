import { mainWeatherContainer, searchContainer, backButton } from "./nodes.js"
import { getCurrentWeather, getTodaysForecast } from "./services.js"

const appNavigator = () => {
    if(location.hash.startsWith('#search=')) {
        searchPage()
    }
    else if (location.hash.startsWith('#weather=')) {
        weatherPage()
    }
    else {
        homePage()
    }
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
}

const homePage = async () => {
    mainWeatherContainer.classList.remove('hidden')
    searchContainer.classList.add('hidden')
    backButton.classList.add('hidden')

    navigator.geolocation.getCurrentPosition(
        (pos) => {
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;
            getCurrentWeather(lat, lon)
            getTodaysForecast(lat, lon)
        },
        (err) => {
            console.error("Error:", err.message);
        }
    );
    

}

const weatherPage = () => {
    mainWeatherContainer.classList.remove('hidden')
    searchContainer.classList.add('hidden')
    backButton.classList.remove('hidden')
}

const searchPage = () => {
    mainWeatherContainer.classList.add('hidden')
    searchContainer.classList.remove('hidden')
    backButton.classList.remove('hidden')
}

export { appNavigator }