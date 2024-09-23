import React from 'react'
import unitedStates from './unitedStates';
import {
    CitySelect,
    CountrySelect,
    StateSelect,
    LanguageSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";


const StatesDropDown = () => {
    const [countryid, setCountryid] = useState(0);
    const [stateid, setstateid] = useState(0);

    return (
        <div>
            <h6>State</h6>
            <StateSelect
                countryid={countryid}
                onChange={(e) => {
                    setstateid(e.id);
                }}
                placeHolder="Select State"
            />
            <h6>City</h6>
            <CitySelect
                countryid={countryid}
                stateid={stateid}
                onChange={(e) => {
                    console.log(e);
                }}
                placeHolder="Select City"
            />
        </div>
    )
}

export default StatesDropDown;