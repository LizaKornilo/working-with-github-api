import './searchPanel.css';
import React, { useEffect, useState, useRef } from 'react';
import { searchRepos } from '../../api'

function SearchPanel({ setData, setError }) {
  const [formState, setFormState] = useState({
    value: "",
    filter: 'no filter'
  });

  const input = useRef(null);

  const setDataByTerms = async _ => {
    try {
      setData(formState.value !== '' ? await searchRepos(formState.value, formState.filter) : []);
    } catch (e) {
      setError(e.message);
    }
  }

  const handleInputChange = event => {
    const target = event.target;
    const value = target.type === 'radio' ? target.value : target.value;
    const name = target.name;
    setFormState({
      ...formState,
      [name]: value
    });
  }

  const handleSubmit = event => {
    setDataByTerms(formState.value);
    event.preventDefault();
    input.current.blur();
  }

  useEffect(() => {
    setDataByTerms(formState.value);
  }, [formState])

  return (
    <div className="search-panel">
      <form className='search-form' onSubmit={handleSubmit}>
        <input
          name="value"
          ref={input}
          className='search-form__input'
          value={formState.value}
          onChange={handleInputChange}
          type='text'
          placeholder='enter the search terms...' />
        <div className="filters">
          <label>
            <input
              name="filter"
              type="radio"
              value={'stars'}
              checked={formState.filter === 'stars'}
              onChange={handleInputChange}
            />
            filter by stars
          </label>
          <label>
            <input
              name="filter"
              type="radio"
              value={'forks'}
              checked={formState.filter === 'forks'}
              onChange={handleInputChange}
            />
            filter by forks
          </label>
          <label>
            <input
              name="filter"
              type="radio"
              value={'no filter'}
              checked={formState.filter === 'no filter'}
              onChange={handleInputChange}
            />
            no filter
          </label>
        </div>
      </form>
    </div>
  );
}

export default SearchPanel;