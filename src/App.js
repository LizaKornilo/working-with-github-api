import { useState, useEffect } from 'react';
import { getRepoCount } from './api';
import './App.css';
import SearchPanel from './components/SearchPanel/SearchPanel';
import SearchResults from './components/SearchResults/SearchResults';
import { trackPromise } from 'react-promise-tracker';
import Spinner from './components/Spinner/Spinner';

function App() {
  const [repoCount, setRepoCount] = useState(0);
  const [error, setError] = useState();

  const [searchTerms, setSearchTerms] = useState({
    terms: "",
    filter: "no filter"
  });

  const updateSearchTerms = (terms, filter) => {
    setSearchTerms({ terms: terms, filter: filter });
  }

  const setCount = async _ => {
    try {
      setRepoCount(searchTerms.terms !== '' ? await getRepoCount(searchTerms.terms, searchTerms.filter) : 0);
    } catch (e) {
      setError(e.message);
    }
  }

  useEffect(() => {
    trackPromise(
      setCount()
      , 'count'
    );
  }, [searchTerms]);

  return (
    <div className="App">
      <SearchPanel updateSearchTerms={updateSearchTerms} />
      <div className='container'>
        <Spinner area="count" />
        <div className='repos-count'>
          {
            error ? error : <>{repoCount} repository results</>
          }
        </div>
        <SearchResults searchTerms={searchTerms} repoCount={repoCount} />
      </div>
    </div>
  );
}

export default App;
