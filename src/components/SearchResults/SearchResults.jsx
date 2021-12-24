import './searchResults.css';
import RepoCard from '../RepoCard/RepoCard';
import { useState, useEffect } from 'react';
import { searchRepos } from '../../api'
import Paginate from '../Paginate/Paginate';
import { trackPromise } from 'react-promise-tracker';
import Spinner from '../Spinner/Spinner';

function SearchResults({ searchTerms, repoCount }) {
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState();
  const [page, setPage] = useState(1);
  const REPO_PER_PAGE = 5;

  const updatePage = (page) => {
    setPage(page);
  }

  const setReposByTermsAndFilter = async _ => {
    try {
      setRepos(searchTerms.terms !== '' ? await searchRepos(searchTerms.terms, searchTerms.filter, page, REPO_PER_PAGE) : []);
    } catch (e) {
      setError(e.message);
    }
  }

  useEffect(() => {
    //console.log(searchTerms); 
    trackPromise(
      setReposByTermsAndFilter(),
      'repo-list'
    )
  }, [searchTerms, page]);

  return (
    <div className='search-results'>
      <div className="container">
        <Spinner area="repo-list" />
        {
          error ? <h3>{error}</h3> :
            (
              <ul className='repos'>{
                repos.map((repo) => {
                  return (
                    <li key={repo.id}>
                      <hr />
                      <RepoCard repo={repo} />
                    </li>
                  )
                })
              }</ul>
            )
        }
        <Paginate updatePage={updatePage} repoCount={repoCount} repoPerPage={REPO_PER_PAGE} />
      </div>
    </div>);
}

export default SearchResults;