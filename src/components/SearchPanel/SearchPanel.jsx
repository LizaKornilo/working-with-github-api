import './searchPanel.css';
import React, { useEffect, useState, useRef } from 'react';

function SearchPanel({ updateSearchTerms }) {
  const [formState, setFormState] = useState({
    value: "",
    filter: 'no filter'
  });

  const input = useRef(null);

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
    updateSearchTerms(formState.value, formState.filter);
    event.preventDefault();
    input.current.blur();
  }

  useEffect(() => {
    updateSearchTerms(formState.value, formState.filter);
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
          <div className="form_radio_btn">
            <input
              id="radio-stars"
              name="filter"
              type="radio"
              value={'stars'}
              checked={formState.filter === 'stars'}
              onChange={handleInputChange}
            />
            <label htmlFor='radio-stars'>filter by stars</label>
          </div>
          <div className="form_radio_btn">
            <input
              id='radio-forks'
              name="filter"
              type="radio"
              value={'forks'}
              checked={formState.filter === 'forks'}
              onChange={handleInputChange}
            />
            <label htmlFor='radio-forks'>by forks</label>
          </div>
          <div className="form_radio_btn">
            <input
              id='radio-no-filter'
              name="filter"
              type="radio"
              value={'no filter'}
              checked={formState.filter === 'no filter'}
              onChange={handleInputChange}
            />
            <label htmlFor='radio-no-filter'>no filter</label>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SearchPanel;