import "./Wishlist.css"

const Wishlist = ({wishlist, onRemoveFromWishlist}) => {

const handleRemoveFromWishlist = (evt) => {
    evt.preventDefault()
    onRemoveFromWishlist(evt.target.value)
}
   
    const displayable = (wishlist.length) ? wishlist.map((item, index) => {
        return  <div key={index} className="item-container">
                    <h3>{item.name}</h3>
                        <p>Departure: {item.depAirport}</p>
                        <p>Arrival: {item.arrAirport}</p>
                        <p>Duration: {item.duration} hours</p>
                        <p>Price: £{item.price}</p>
                    <button className="wishlist-button" onClick={handleRemoveFromWishlist} value={item.id}>Remove Trip</button>
                </div>
    }): <p id="null-wishlist">"You Have No Journeys Saved."</p>

    const calculateTotal = (wishlist.length) ? wishlist.reduce((totalSoFar, wishlist) => (totalSoFar + wishlist.price), 0) : null

    const displayTotal = (wishlist.length) ? 
    <div className="wishlist-cost">
        <h3>Total Wishlist Cost: {calculateTotal}</h3>
    </div> : null

    return (
        <section className="wishlist"> 
            <form>
            {displayable}
            </form>
            {displayTotal}
        </section>
    )
}

export default  Wishlist;