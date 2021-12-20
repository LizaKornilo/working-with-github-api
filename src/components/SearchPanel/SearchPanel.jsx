import './searchPanel.css';
import React, { useState } from 'react';

function SearchPanel() {
  const [value, setValue] = useState("");

  const handleChange = event => {
    setValue(event.target.value);
  }

  const handleSubmit = event => {
    document.getElementById("input").blur();
    event.preventDefault();
  }

  return (
    <div className="search-panel">
      <form className='search-form' onSubmit={handleSubmit}>
        <input id="input" className='search-form__input' value={value} onChange={handleChange} type='text' placeholder='enter the search terms...' />
      </form>
    </div>
  );
}

export default SearchPanel;