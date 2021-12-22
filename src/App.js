import { useState, useEffect } from 'react';
import { getRepoCount } from './api';
import './App.css';
import SearchPanel from './components/SearchPanel/SearchPanel';
import SearchResults from './components/SearchResults/SearchResults';

function App() {
  const [reposCount, setReposCount] = useState(0);
  const [error, setError] = useState();

  const [searchTerms, setSearchTerms] = useState({
    terms: "",
    filter: "no filter"
  });

  const updateSearchTerms = (terms, filter) => {
    setSearchTerms({ terms: terms, filter: filter });
  }

  const setRepoCount = async _ => {
    try {
      setReposCount(searchTerms.terms !== '' ? await getRepoCount(searchTerms.terms, searchTerms.filter) : 0);
    } catch (e) {
      setError(e.message);
    }
  }

  useEffect(() => {
    setRepoCount()
  }, [searchTerms]);

  return (
    <div className="App">
      <SearchPanel updateSearchTerms={updateSearchTerms} />
      <div className='container'>
        <div className='repos-count'>
          {
            error ? error : reposCount
          }
          &nbsp;repository results
        </div>
        <SearchResults searchTerms={searchTerms} />
      </div>
    </div>
  );
}

export default App;
