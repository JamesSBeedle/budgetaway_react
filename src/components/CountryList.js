import "./CountryList.css"

const CountryList = ({countries, onCountrySelect}) => {

    const countryDisplay = countries.map((country, index) => {
        return <option value={country.name} key={index}/>
    })

    const handleSelect = (evt) => {
        onCountrySelect(evt.target.value)
    }

    return (
        <form>
            <input list="countries-list" className="countries-list" onChange={handleSelect} placeholder="Search Country"/>
            <datalist  id="countries-list" >
                {countryDisplay}
            </datalist>
        </form>
    )
}

export default CountryList
