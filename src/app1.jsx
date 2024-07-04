import React, { useState, useEffect } from 'react';

const NationalitySelector = () => {
    const [countries, setCountries] = useState([]);
    const [selectedNationality, setSelectedNationality] = useState([]);
    const [selectedTaxResidence, setSelectedTaxResidence] = useState([]);
    const [showOtherNationalities, setShowOtherNationalities] = useState(false);
    const [showOtherTaxResidences, setShowOtherTaxResidences] = useState(false);

    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all')
            .then(response => response.json())
            .then(data => {
                const countryList = data.map(country => ({
                    name: country.name.common,
                    code: country.cca2
                }));
                setCountries(countryList);
            })
            .catch(error => {
                console.error('Error fetching countries:', error);
            });
    }, []);

    const handleNationalityChange = (event) => {
        const value = event.target.value;
        if (value === "Other") {
            setShowOtherNationalities(true);
        } else {
            setShowOtherNationalities(false);
            setSelectedNationality([value]);
        }
    };

    const handleTaxResidenceChange = (event) => {
        const value = event.target.value;
        if (value === "Other") {
            setShowOtherTaxResidences(true);
        } else {
            setShowOtherTaxResidences(false);
            setSelectedTaxResidence([value]);
        }
    };

    const handleOtherNationalityChange = (event) => {
        const options = event.target.options;
        const selectedOptions = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                selectedOptions.push(options[i].value);
            }
        }
        setSelectedNationality(selectedOptions);
    };

    const handleOtherTaxResidenceChange = (event) => {
        const options = event.target.options;
        const selectedOptions = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                selectedOptions.push(options[i].value);
            }
        }
        setSelectedTaxResidence(selectedOptions);
    };

    return (
        <div>
            <div>
                <h3>08 Your nationality/citizenship</h3>
                <label>What's your country of nationality/citizenship?</label>
                <select onChange={handleNationalityChange}>
                    <option value="">Select...</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                    <option value="Other">Other</option>
                </select>
                {showOtherNationalities && (
                    <select multiple value={selectedNationality} onChange={handleOtherNationalityChange}>
                        {countries.map(country => (
                            <option key={country.code} value={country.name}>{country.name}</option>
                        ))}
                    </select>
                )}
            </div>
            <div>
                <h3>09 Your tax details</h3>
                <label>In which country are you a tax resident?</label>
                <select onChange={handleTaxResidenceChange}>
                    <option value="">Select...</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                    <option value="Other">Other</option>
                </select>
                {showOtherTaxResidences && (
                    <select multiple value={selectedTaxResidence} onChange={handleOtherTaxResidenceChange}>
                        {countries.map(country => (
                            <option key={country.code} value={country.name}>{country.name}</option>
                        ))}
                    </select>
                )}
            </div>
            <button onClick={() => console.log(selectedNationality, selectedTaxResidence)}>Continue</button>
        </div>
    );
};

export default NationalitySelector;
