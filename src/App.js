import { useState } from 'react';
import './App.css';
import SearchPanel from './components/SearchPanel/SearchPanel';
import SearchResults from './components/SearchResults/SearchResults';

function App() {
  const [reposCount, setReposCount] = useState(0);
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState();

  const setData = (items) => {
    setRepos(items);
    setReposCount(items.length)
  };

  return (
    <div className="App">
      <SearchPanel setData={setData} setError={setError} setReposCount={setReposCount} />
      <div className='container'>
        {error ? (
          <h3>{error}</h3>) :
          (<>
            <h3 className='count'>{reposCount} repository results</h3>
            <SearchResults repos={repos} />
          </>)}
      </div>
    </div>
  );
}

export default App;
