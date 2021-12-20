import './searchResults.css';
import RepoCard from '../RepoCard/RepoCard';

function SearchResults({ repos }) {
  return (
    <div className='search-results'>
      <div className="container">
        <ul className='repos'>{
          repos.map((repo) => {
            return <li>
              <hr />
              <RepoCard repo={repo} />
            </li>
          })
        }</ul>
      </div>
    </div>);
}

export default SearchResults;