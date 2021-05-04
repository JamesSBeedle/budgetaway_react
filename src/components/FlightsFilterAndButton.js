import {useState} from "react"
import "./FlightsFilterAndButton.css"

const FlightsFilterAndButton = ({selectedCountry, onSearchSubmit, ukAirports}) => {

    const [departureAirport, setDepartureAirport] = useState("")
    const [destinationAirport, setDestinationAirport] = useState("")

    const defaults = ukAirports
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((airport, index) => {
        return <option value={airport.iata} key={index}>{airport.name}</option>
    })

    const airports = selectedCountry.airports
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((airport, index) => {
        return <option value={airport.iata} key={index}>{airport.name}</option>
    })

    const handleDepAirportChange = (evt) => {
        setDepartureAirport(evt.target.value)
    }

    const handleDestAirportChange = (evt) => {
        setDestinationAirport(evt.target.value)
    }
    
    const handleSearchSubmit = (evt) => {
        evt.preventDefault()
        onSearchSubmit(departureAirport, destinationAirport)
        setDepartureAirport("")
        setDestinationAirport("")
    }

    return (
        <div className="airport-selection">
            <form onSubmit={handleSearchSubmit}>
                <input list="departure-airport" className="airport" onChange={handleDepAirportChange} placeholder="Departure Airport"/>
                <datalist id="departure-airport">
                    {defaults}
                </datalist>
                <input list="dest-airport" className="airport" onChange={handleDestAirportChange} placeholder="Destination Airport"/>
                <datalist id="dest-airport" >
                    {airports}
                </datalist>
                <input type="submit" value="Search Flights"/>
            </form>
        </div>
    )
}

export default FlightsFilterAndButton
