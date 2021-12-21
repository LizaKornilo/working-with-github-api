import './searchPanel.css';
import React, { useEffect, useState, useRef } from 'react';
import { searchRepos } from '../../api'

function SearchPanel({ setData, setError }) {
  const [value, setValue] = useState('');

  const input = useRef(null);

  const setDataByTerms = async () => {
    try {
      setData(value !== '' ? await searchRepos(value) : []);
    } catch(e) {
      setError(e.message);
    }
  }

  const handleChange = event => {
    setValue(event.target.value);
  }

  const handleSubmit = event => {
    this.input.current.blur();
    setDataByTerms(value);
    event.preventDefault();
  }

  useEffect(() => {
    setDataByTerms(value);
  }, [value])


  return (
    <div className="search-panel">
      <form className='search-form' onSubmit={handleSubmit}>
        <input ref={input} className='search-form__input' value={value} onChange={handleChange} type='text' placeholder='enter the search terms...' />
      </form>
    </div>
  );
}

export default SearchPanel;