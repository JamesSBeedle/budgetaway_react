import "./FlightContainer.css"

const FlightContainer = ({flights, onAddToWishlist}) => {

    const handleAddToWishlist = (evt) => {
        evt.preventDefault()
        onAddToWishlist(evt.target.value)
    }

    // <h2 id="flight-name">{flight.name}</h2>
    <button className="flight-button" onSubmit={handleAddToWishlist}>Add to Wishlist</button>
    
    const displayableDetails = (flights.length > 0) ? 
        flights.map((flight, index) => {
            return (<div className= "flight" key={index}>
            <div id="flight-details">
                <h4 id="departure">Dep. Airport: {flight.depAirport}</h4>
                <h4 id="arrival">Arr. Airport: {flight.arrAirport}</h4>
                <h4 id="duration">Duration: {flight.duration} hours</h4>
                <h4 id="price">Price: £{flight.price}</h4>
                <h4 id="airline">Airline: {flight.airline}</h4>
                <h4 id="flight-number">Flight: {flight.number}</h4>
            </div>
            
            <button className="flight-button" onClick={handleAddToWishlist} value={index}>Add to Wishlist</button>
        </div>) 
        })
        : null

    return (
        <div>
            {displayableDetails}
        </div>
    )
}
export default FlightContainer
