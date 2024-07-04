import React, { useState, useEffect } from 'react';

function App() {
    const [countries, setCountries] = useState([]);
    const [selectedNationality, setSelectedNationality] = useState([]);
    const [showOtherNationalities, setShowOtherNationalities] = useState(false);
    const [savedSelections, setSavedSelections] = useState([]);

    const ENDPOINT = 'https://restcountries.com/v3.1/all';
    const ukFlag = "https://flagcdn.com/w320/gb.png";
    const usFlag = "https://flagcdn.com/w320/us.png";

    const selectedStyle = { backgroundColor: '#e2ace2', border: 'solid 2px purple' };

    useEffect(() => {
        fetch(`${ENDPOINT}`)
            .then(response => response.json())
            .then(data => {
                const countryList = data.map(country => ({
                    name: country.name.common,
                    flag: country.flags.png,
                    code: country.cca2
                }));
                countryList.sort((a, b) => a.name.localeCompare(b.name));
                setCountries(countryList);
            })
            .catch(error => {
                console.error('Error fetching countries:', error);
            });
    }, []);

    const handleNationalityChange = (value) => {
        if (value === "Others") {
            setShowOtherNationalities(true);
        } else {
            setShowOtherNationalities(false);
            setSelectedNationality([{
                name: value,
                code: countries.find(country => country.name === value)?.code,
                flag: countries.find(country => country.name === value)?.flag
            }]);

        }
    };

    const handleCountrySelect = (countryName) => {
        const selectedCountry = countries.find(country => country.name === countryName);
        const updatedSelection = {
            name: selectedCountry.name,
            code: selectedCountry.code,
            flag: selectedCountry.flag
        };
        setSelectedNationality(prevSelected => {
            const alreadySelected = prevSelected.some(country => country.name === countryName);
            if (alreadySelected) {
                return prevSelected.filter(country => country.name !== countryName);
            } else {
                return [updatedSelection];
            }
        });

        setShowOtherNationalities(false);
    };

    const renderCountryOption = (country) => {
        return (
            <div className="list-cont" key={country.code}>
                <div className="cont-flag" onClick={() => handleCountrySelect(country.name)}>
                    <img src={country.flag} alt={country.name} />
                </div>
                <div className="cont-name" onClick={() => handleCountrySelect(country.name)}>
                    {country.name}
                </div>
            </ div>

        );
    };

    const renderSelectedCountries = (selectedCountries) => {
        const uk = selectedCountries.some(sel => sel.name === "United Kingdom");
        const us = selectedCountries.some(sel => sel.name === "United States")
        if ( !uk && !us) {
            return selectedCountries.map((country) => (
                <div className="country"
                    key={country.code}
                    style={selectedNationality.some(sel => sel.name === country.name) ? { ...selectedStyle } : {}}
                >
                    <div className="cont-flag">
                        <img src={country.flag} />
                    </div>
                    <div className="cont-name">
                        {country.name}
                    </div>
                </div>
            ));
        }
    };

    return (
        <>
            <div className="cont">
                <div className="country"
                    key='GB'
                    style={selectedNationality.some(sel => sel.name === "United Kingdom") ? { ...selectedStyle } : {}}
                >
                    <div className="cont-flag" onClick={() => handleNationalityChange("United Kingdom")}>
                        <img src={ukFlag} />
                    </div>
                    <div className="cont-name" onClick={() => handleNationalityChange("United Kingdom")}>
                        United Kingdom
                    </div>
                </div>

                <div className="country"
                    key='US'
                    style={selectedNationality.some(sel => sel.name === "United States") ? { ...selectedStyle } : {}}
                >
                    <div className="cont-flag" onClick={() => handleNationalityChange("United States")}>
                        <img src={usFlag} />
                    </div>
                    <div className="cont-name" onClick={() => handleNationalityChange("United States")}>
                        United States
                    </div>
                </div>

                <>
                    {renderSelectedCountries(selectedNationality)};
                </>

                <div className="country">
                    <div className="cont-name" onClick={() => handleNationalityChange("Others")}>
                        Others
                    </div>
                </div>

                {showOtherNationalities && (
                    <div className="cont-list">
                        {countries.map(country => renderCountryOption(country))}
                    </div>
                )}

            </div>
        </>
    );
};

export default App;
