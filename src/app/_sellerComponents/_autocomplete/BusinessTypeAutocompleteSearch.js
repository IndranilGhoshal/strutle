'use client'
// AutocompleteSearch.js
import React, { useEffect, useState } from 'react';
import Autosuggest from 'react-autosuggest';
import { businesstypes } from '@/app/lib/json/businesstype';

const BusinessTypeAutocompleteSearch = ({setbusinesstype, businessdetailserror, businesstype}) => {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [languages, setLanguages] = useState([])


  useEffect(()=>{
    getData()
  },[])

  const getData = async () =>{
    let type = businesstypes
    setLanguages(type)
  }

  const getSuggestions = (inputValue) => {
    const regex = new RegExp(inputValue.trim(), 'i');
    let temp = languages.filter((language) => regex.test(language));
    return temp
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onChange = (event, { newValue }) => {
    if(event.type == "click"){
      setbusinesstype(newValue)
    }
    setValue(newValue);
  };


  const getSuggestionValue = (suggestion) => suggestion;

  const renderSuggestion = (suggestion) => <div className='d-flex'><p className='prod-txt-wp mb-0'>{suggestion}</p></div>;

  const inputProps = {
    placeholder: 'Select Business Type',
    value,
    onChange
  };

  // Custom theme for styling
  const theme = {
    container: 'autocomplete-container',
    suggestionsContainer: 'suggestions-container',
    suggestion: 'suggestion',
    suggestionHighlighted: 'suggestion-highlighted',
    input: businessdetailserror && !businesstype ? "error-txt" : ""
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
      theme={theme} // Apply custom theme for styling
    />
  );
};

export default BusinessTypeAutocompleteSearch;