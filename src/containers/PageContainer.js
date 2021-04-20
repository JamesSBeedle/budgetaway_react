import { useState, useEffect } from 'react'
import HeaderAndCountryFilter from '../components/HeaderAndCountryFilter'
import CountryContainer from './CountryContainer'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import About from '../components/About'
import Wishlist from '../components/Wishlist'
// import {addCountries, getCountriesWithLanguageAndRegion, getCountriesWithLanguage, getCountriesWithRegion, getAllLanguages, getAllRegions, getAllCountries} from "../services/DataServices"
// import {flight_key} from "../config"

const PageContainer = () => {
   
    const [rawCountries, setRawCountries] = useState([]);
    const [rawAirports, setRawAirports] = useState([]);
    const [allCountries, setAllCountries] = useState([]);
    // const [allLanguages, setAllLanguages] = useState([]);
    // const [allRegions, setAllRegions] = useState([]);
    const [allFilteredCountries, setAllFilteredCountries] = useState([]);
    // const [allFilteredFlights, setAllFilteredFlights] = useState([]);
    // const [selectedLanguage, setSelectedLanguage] = useState("");
    // const [selectedRegion, setSelectedRegion] = useState("");
    const [selectedCountryId, setSelectedCountryId] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("");
    const [departureAirport, setDepartureAirport] = useState("");
    // const [selectedFlight, setSelectedFlight] = useState("");

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
    //                     country: airport.country_name
    //                 }
    //             }))
    //         )
    //     }
    //     Promise.all(testArray)
    //     .then(data => console.log(JSON.stringify(data.flat())))
    //         // .then(data => {
    //         //     setRawAirports(data.data.map((airport) => {
    //         //         return {
    //         //             airport: airport.airport_name,
    //         //             country: airport.country_name
    //         //         }
    //         //     }))
    //         // })
    //         // .then(console.log(rawAirports))
        
    //     // setRawAirports(testArray.map((airport) => {
    //     //     return {
    //     //         airport: airport.airport_name,
    //     //         country: airport.country_name
    //     //     }
    //     // }))
    //     // console.log(rawAirports)
        
    // }, [])


    // useEffect(() => {
    //     if (rawAirports.length > 0 && rawCountries.length > 0) {
    //         const countries = [...rawCountries]
    //         rawAirports.forEach((airport) => {
    //             const index = countries.findIndex((country) => country.name === airport.country)
    //             if (index !== -1) {
    //                 countries[index].airports.push(airport.airport)
    //             }
    //         })
    //         setAllCountries(countries)
    //     }
    // }, [rawAirports, rawCountries])

    
    // iterate through all countries and save each country to the db
    // also populate allLanguages and allRegions
    useEffect(() => {
        if (allCountries.length > 0){
            addCountries(allCountries)
            // setAllLanguages(
            //     getAllLanguages()
            //         .then(data => data)
            // )
            // setAllRegions(
            //     getAllRegions()
            //         .then(data => data)
            // )
        }
    }, [allCountries])

    //get filtered countries list depending on which filter is used
    useEffect(() => {
    //     if (selectedLanguage && selectedRegion) {
            // setAllFilteredCountries(
            //     getCountriesWithLanguageAndRegion(selectedLanguage, selectedRegion)
            //         .then(data => data))
    //     }
    //     else if (selectedLanguage && !selectedRegion){
            // setAllFilteredCountries(
            //     getCountriesWithLanguage(selectedLanguage)
            //         .then(data => data))
    //     } 
    //     else if (!selectedLanguage && selectedRegion) {
            // setAllFilteredCountries(
            //     getCountriesWithRegion(selectedRegion)
            //         .then(data => data))
    //     } else {
            setAllFilteredCountries(rawCountries)
            // setAllFilteredCountries(
            //     getAllCountries()
            //         .then(data => data))
    //     }
    // }, [selectedLanguage, selectedRegion, allCountries])
    }, [rawCountries])
    // }, [allCountries])

    useEffect(() => {
        airports.forEach((airport) => {
            if (airport.country) {
                const index = countries.findIndex((country) => country.name === airport.country)
                if (index !== -1) {
                    countries[index].airports.push(airport)
                }
            }
        })
        setAllCountries(countries)
    }, [])

    const findCountry = (searchCountry, collection) => {
        return collection.find(({name}) => name === searchCountry)
    }

    const getSelectedCountry = () => {
        setSelectedCountry(findCountry(selectedCountryId, rawCountries))
    }

    const selectCountry = submitted => {
        setSelectedCountryId(submitted)
    }

    const luckyDip = () => {
        let randomValue = Math.floor(Math.random() * allFilteredCountries.length)
        let randomCountry = allFilteredCountries[randomValue]
        setSelectedCountryId(randomCountry.country_name)
        getSelectedCountry()
    }

    useEffect(() => {
        getSelectedCountry()
    })

    const searchFlights = (departureAirport) => {
        setDepartureAirport(departureAirport)
    }

    return (
        <Router>
            <>
                <HeaderAndCountryFilter countries={allFilteredCountries} selectedCountry={selectedCountry} onCountrySelect={selectCountry} luckyDip={luckyDip}/>
                <Switch>
                    <Route exact path="/">
                        <CountryContainer selectedCountry={selectedCountry} onCountrySelect={selectCountry}/>
                    </Route>
                    <Route path="/wishlist" component={Wishlist}/>
                    <Route path="/about" component={About}/>
                </Switch>
            </>
        </Router>
    )


}

export default PageContainer
