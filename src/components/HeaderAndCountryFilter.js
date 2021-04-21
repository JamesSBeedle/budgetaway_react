import CountryList from './CountryList'
import NavBar from "./NavBar"
import './HeaderAndCountryFilter.css'
import logo from "../logo.png"

const HeaderAndCountryFilter = ({countries, onCountrySelect, luckyDip, languages, onLanguageChange}) => {

    const budgetClick = () => {
    }

    const handleLuckyDip = (evt) => {
        luckyDip()
    }

    const displayLanguages = (languages) ?
        languages.sort((a, b) => a.name.localeCompare(b.name))
        .map((language, id) => {
            return <option value={language.name} key={id}>{language.name}</option>
        }) : null

    const handleLanguageSelect = (evt) => {
        onLanguageChange(evt.target.value)
    }

    return (
        <header>
            <div className="title-links">
                <img src={logo} alt="logo"/>
                <div className="navbar">
                    <NavBar/>
                </div>
            </div>

            <div className="search-bar">
                    <select name="lanugages" id="languages" onChange={handleLanguageSelect}>
                        <option value="disabled">Select Language</option>
                        {displayLanguages}
                    </select>
                    <select name="regions" id="regions">
                        <option value="disabled">Select Region</option>
                    </select>
                <CountryList countries={countries} onCountrySelect={onCountrySelect}/> 

                    <button className="lucky-dip" onClick={handleLuckyDip}>
                        <option countries={countries}>Lucky Dip</option>
                    </button>
            </div>    
        </header>
    )
}

export default HeaderAndCountryFilter
