import axios from 'axios'
const url = 'https://covid19.mathdro.id/api';

export const fetchData = async () => {
    try {
        //destructuring response
        const { data: {confirmed, recovered, deaths, lastUpdate, countries} } = await axios.get(url);
        //destructured data
        const modifiedData = {confirmed, recovered, deaths, lastUpdate, countries}

        return modifiedData

    } catch (error) {
        console.log("Failed to fetch data: " + error);
    }
}

export const fetchCountries = async () => {
    try {
        const countries = await axios.get(url + '/countries');

        return countries.data

    } catch (error) {
        console.log("Failed to fetch data: " + error);
    }
}

export const fetchByCountry = async (param) => {
    try {
        const countrystat = await axios.get(url + '/countries/' + param);

        return countrystat.data

    } catch (error) {
        console.log("Failed to fetch data: " + error);
    }
}