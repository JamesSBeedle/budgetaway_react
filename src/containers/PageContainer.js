import { useState, useEffect } from 'react'
import HeaderAndCountryFilter from '../components/HeaderAndCountryFilter'
import CountryContainer from './CountryContainer'
import FlightsContainer from './FlightsContainer';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import About from '../components/About'
import Wishlist from '../components/Wishlist'
import {addCountries, getCountriesWithLanguageAndRegion, getCountriesWithLanguage, getCountriesWithRegion, getAllLanguages, getAllCountries, getUKDetails, getWishlist, removeFromWishlistDB, addToWishlistDB} from "../services/DataServices"
import {flight_key} from "../config"
import countries from "../data/countries"
import airports from "../data/airportscode"

const PageContainer = () => {
   
    //Comment in to perform fetches from external APIs
    // const [rawCountries, setRawCountries] = useState([]);
    // const [rawAirports, setRawAirports] = useState([]);
    const [allCountries, setAllCountries] = useState([]);
    const [allLanguages, setAllLanguages] = useState([]);
    const [allRegions, setAllRegions] = useState([]);
    const [allFilteredCountries, setAllFilteredCountries] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState("");
    const [selectedRegion, setSelectedRegion] = useState("");
    const [selectedCountryId, setSelectedCountryId] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedFlight, setSelectedFlight] = useState([]);
    const [ukAirports, setUKAirports] = useState([])
    const [wishlist, setWishlist] = useState("")

    //Comment in to perform fetches from external APIs
    // const filterEntryArray = (array) => {
    //     let newArray = []
    //     array.map((entry) => {
    //         return newArray.push(entry.name)
    //     })
    //     return newArray.filter(Boolean)
    // }

    // useEffect(() => {
    //     fetch("https://restcountries.eu/rest/v2/all")
    //     .then(res => res.json())
    //     .then((data) => {
    //         setRawCountries(data.map((entry) => {
    //             return {name: entry.name, 
    //                 flag: entry.flag, 
    //                 latitude: entry.latlng[0],
    //                 longitude: entry.latlng[1],
    //                 region: (entry.subregion) ? entry.subregion : entry.region,
    //                 currencies: filterEntryArray(entry.currencies),
    //                 languages: filterEntryArray(entry.languages),
    //                 airports: []
    //             }
    //         }))
    //     })
    // }, [])

    // useEffect(() => {
    //     const testArray = []

    //     for(let i = 0; i < 6401; i += 100) {
    //         testArray.push(
    //             fetch(`http://api.aviationstack.com/v1/airports?access_key=${flight_key}&offset=${i}`)
    //             .then(res => res.json())
    //             .then(data => data.data.map((airport) => {
    //                 return {
    //                     airport: airport.airport_name,
    //                     country: airport.country_name,
    //                     iata: airport.iata_code
    //                 }
    //             }))
    //         )
    //     }
    //     Promise.all(testArray)
    //     .then(data => console.log(JSON.stringify(data.flat())))
    // }, [])

    // const getAllRegions = () => {
    //     const set = new Set(allFilteredCountries.map((country) => {
    //         return country.region
    //     }))
    //     setAllRegions(Array.from(set))
    // }

    useEffect(() => {
        setAllRegions(Array.from(new Set(allFilteredCountries.map((country) => country.region))))
    }, [allFilteredCountries, selectedLanguage])

    // comment in to add files to db
    // useEffect(() => {
    //     if (rawCountries.length > 0){
    //         addCountries(rawCountries)
    //     }
    // }, [rawCountries])

    // useEffect(() => {
    //     airports.forEach((airport) => {
    //         if (airport.country) {
    //             const index = countries.findIndex((country) => country.name === airport.country)
    //             if (index !== -1) {
    //                 countries[index].airports.push(airport)
    //             }
    //         }
    //     })
    //     setRawCountries(countries)
    // }, [])

    useEffect(() => {
        getAllLanguages()
            .then(data => setAllLanguages(data))
    }, [])

    //get filtered countries list depending on which filter is used
    useEffect(() => {
        if (selectedLanguage && selectedRegion) {
            getCountriesWithLanguageAndRegion(selectedLanguage, selectedRegion)
                .then(data => setAllFilteredCountries(data))
        }
        else if (selectedLanguage && !selectedRegion){
            getCountriesWithLanguage(selectedLanguage)
                .then(data => setAllFilteredCountries(data))
        } 
        else if (!selectedLanguage && selectedRegion) {
            getCountriesWithRegion(selectedRegion)
                .then(data => setAllFilteredCountries(data))
        } else {
            getAllCountries()
                .then(data => setAllFilteredCountries(data))
        }
    }, [selectedLanguage, selectedRegion])

    const findCountry = (searchCountry, collection) => {
        return collection.find(({name}) => name === searchCountry)
    }

    const getSelectedCountry = () => {
        setSelectedCountry(findCountry(selectedCountryId, allFilteredCountries))
    }

    const selectCountry = submitted => {
        setSelectedCountryId(submitted)
    }

    const luckyDip = () => {
        let randomValue = Math.floor(Math.random() * allFilteredCountries.length)
        let randomCountry = allFilteredCountries[randomValue]
        setSelectedCountryId(randomCountry.name)
        getSelectedCountry()
    }

    useEffect(() => {
        getSelectedCountry()
    })

    const durationCalculation = (depTime, arrTime) => {
        let depHoursSplit = depTime.split("")
        let depHours = parseInt(depHoursSplit.slice(11, 13).join(""))

        let arrHoursSplit = arrTime.split("")
        let arrHours = parseInt(arrHoursSplit.slice(11, 13).join(""))
        let adjustedArrHours = arrHours - selectedCountry.timezone

        if (adjustedArrHours - depHours > 0) {
            return adjustedArrHours - depHours
        } else {
            adjustedArrHours += 24
            return adjustedArrHours - depHours
        }
    }

    const priceCalculation = (time) => {
        return time * 100
    }

    const searchFlights = (departureAirport, destinationAirport) => {
        fetch(`http://api.aviationstack.com/v1/flights?access_key=${flight_key}&dep_iata=${departureAirport}&arr_iata=${destinationAirport}&limit=3`)
        .then(res => res.json())
        .then(data => 
            {
            const flightsArray = []
                data.data.map((flight) => {
                    return flightsArray.push(
                     {
                        name: selectedCountry.name,
                        depAirport: flight.departure.airport,
                        arrAirport: flight.arrival.airport,
                        duration: durationCalculation(flight.departure.scheduled, flight.arrival.scheduled),
                        price: priceCalculation(durationCalculation(flight.departure.scheduled, flight.arrival.scheduled)),
                        airline: flight.airline.name,
                        number: flight.flight.iata
                    })
                })
            setSelectedFlight(flightsArray)
        }
        )
    }

    const selectLanguage = submitted => {
        setAllFilteredCountries([])
        setAllRegions([])
        setSelectedRegion("")
        setSelectedCountry("")
        setSelectedCountryId("")
        setSelectedFlight("")
        setSelectedLanguage(submitted)
    }

    const selectRegion = submitted => {
        setSelectedFlight("")
        setSelectedRegion(submitted)
    }

    useEffect(() => {
        getUKDetails()
            .then(data => setUKAirports(data.airports))
    }, [])

    useEffect(() => {
        getWishlist()
            .then(data => setWishlist(data))
    }, [wishlist])

    const addToWishlist = (index) => {
        addToWishlistDB(selectedFlight[index])
        setWishlist([...wishlist, selectedFlight[index]])
        setSelectedFlight([])
    }

    const removeFromWishlist = (id) => {
        removeFromWishlistDB(id)
        getWishlist()
    }

    return (
        <Router>
            <>
                <HeaderAndCountryFilter countries={allFilteredCountries} selectedCountry={selectedCountry} onCountrySelect={selectCountry} luckyDip={luckyDip} languages={allLanguages} regions={allRegions} onLanguageChange={selectLanguage} onRegionChange={selectRegion}/>
                <Switch>
                    <Route exact path="/">
                        <CountryContainer selectedCountry={selectedCountry} onSearchSubmit={searchFlights} ukAirports={ukAirports}/>
                        <FlightsContainer flights={selectedFlight} onAddToWishlist={addToWishlist}/>
                    </Route>
                    <Route path="/wishlist" > 
                        <Wishlist wishlist = {wishlist} onRemoveFromWishlist={removeFromWishlist}/>
                    </Route>
                    <Route path="/about" component={About}/>
                </Switch>
            </>
        </Router>
    )
}

export default PageContainer
