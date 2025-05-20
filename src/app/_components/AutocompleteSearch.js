'use client'
// AutocompleteSearch.js
import React, { useEffect, useState } from 'react';
import Autosuggest from 'react-autosuggest';
import { productapi } from '../lib/apiService';
import { removeLocalStorageData, setLocalStorageData, showLoader } from '../lib/common';
import { useRouter } from 'next/navigation';

const AutocompleteSearch = () => {
  const router = useRouter()
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [languages, setLanguages] = useState([])


  useEffect(()=>{
    getProduct()
  },[])

  const getProduct = async () =>{
    let response = await productapi({search:true})
    if(response.success){
      let {result} = response;
      setLanguages(result)
    }else{
      setLanguages([])
    }
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
      getProductid(newValue)
    }
    setValue(newValue);
  };

  const getProductid = async (p) =>{
    let response = await productapi({searchid:true, productname:p})
    if(response.success){
      let {result} = response;
      setValue('')
      goto('/product/' + result)
    }
  }

  const goto = (path) => {
          showLoader()
          router.push("/consumer" + path)
          removeLocalStorageData("pathName")
          setLocalStorageData('pathName', path)
      }


  const getSuggestionValue = (suggestion) => suggestion;

  const renderSuggestion = (suggestion) => <div className='d-flex'><i className="bi bi-search mx-2"></i><p className='prod-txt-wp mb-0'>{suggestion}</p></div>;

  const inputProps = {
    placeholder: 'Search By Product Name...',
    value,
    onChange
  };

  // Custom theme for styling
  const theme = {
    container: 'autocomplete-container',
    suggestionsContainer: 'suggestions-container',
    suggestion: 'suggestion',
    suggestionHighlighted: 'suggestion-highlighted',
    input: 'autocomplete-input'
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

export default AutocompleteSearch;