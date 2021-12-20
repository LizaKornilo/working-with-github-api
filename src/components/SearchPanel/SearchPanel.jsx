import './searchPanel.css';
import React, { useEffect, useState } from 'react';

function SearchPanel({ setData, setError, setReposCount }) {
  const [value, setValue] = useState("");

  const setDataByTerms = (terms) => {
    fetch(`https://api.github.com/search/repositories?page=1&per_page=20&q=${terms.split(' ').join('%')}`)
      .then(res => res.json())
      .then(data => {
        console.log(value);
        console.log(data);
        if (data.message) {
          setError(data.message);
        } else {
          setError(null);
          setReposCount(data.items.length);
          setData(data.items);
        }
      });
  }

  const handleChange = event => {
    setValue(event.target.value);
  }

  const handleSubmit = event => {
    document.getElementById("input").blur();
    setDataByTerms(value);
    event.preventDefault();
  }

  useEffect(() => {
    setDataByTerms(value);
  }, [value])


  return (
    <div className="search-panel">
      <form className='search-form' onSubmit={handleSubmit}>
        <input id="input" className='search-form__input' value={value} onChange={handleChange} type='text' placeholder='enter the search terms...' />
      </form>
    </div>
  );
}

export default SearchPanel;