import CountryList from './CountryList'
import NavBar from "./NavBar"
import './HeaderAndCountryFilter.css'
import logo from "../logo.png"

const HeaderAndCountryFilter = ({countries, onCountrySelect, luckyDip, languages, onRegionChange, onLanguageChange, regions}) => {

    const handleLuckyDip = (evt) => {
        luckyDip()
    }

    const displayRegions = (regions) ? 
        regions.sort().map((region, index) => {
            return <option value={region} key={index}/>
        }) : null

    const displayLanguages = (languages) ?
        languages.sort((a, b) => a.name.localeCompare(b.name))
        .map((language, id) => {
            return <option value={language.name} key={id}/>
        }) : null
        

    const handleLanguageSelect = (evt) => {
        onLanguageChange(evt.target.value)
    }

    const handleRegionSelect = (evt) => {
        onRegionChange(evt.target.value)
    }

    return (
        <header>
            <div className="title-links">
                <div></div>
                <img src={logo} alt="logo"/>
                <div className="navbar">
                    <NavBar/>
                </div>
            </div>

            <div className="search-bar-selector">
                <input list="languages" className="languages" onChange={handleLanguageSelect}/>
                    <datalist  id="languages" >
                        {displayLanguages}
                    </datalist>

                    <input list="regions" className="regions" onChange={handleRegionSelect}/>
                    <datalist  id="regions" >
                        {displayRegions}
                    </datalist>
                    <div className="nations">
                    <CountryList countries={countries} onCountrySelect={onCountrySelect}/>
                    </div>

                    <button className="lucky-dip" onClick={handleLuckyDip}>
                        Lucky Dip
                    </button>
            </div>
        </header>
    )
}

export default HeaderAndCountryFilter
