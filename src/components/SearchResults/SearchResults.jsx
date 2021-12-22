import './searchResults.css';
import RepoCard from '../RepoCard/RepoCard';
import { useState, useEffect } from 'react/cjs/react.development';
import { searchRepos } from '../../api'

function SearchResults({ searchTerms }) {
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState();

  const setReposByTermsAndFilter = async _ => {
    try {
      setRepos(searchTerms.terms !== '' ? await searchRepos(searchTerms.terms, searchTerms.filter) : []);
    } catch (e) {
      setError(e.message);
    }
  }

  useEffect(() => {
    console.log(searchTerms); setReposByTermsAndFilter()
  }, [searchTerms]);

  return (
    <div className='search-results'>
      <div className="container">
        {
          error ? (
            <h3>{error}</h3>) :
            (
              <ul className='repos'>{
                repos.map((repo) => {
                  return <li key={repo.id}>
                    <hr />
                    <RepoCard repo={repo} />
                  </li>
                })
              }</ul>
            )
        }
      </div>
    </div>);
}

export default SearchResults;