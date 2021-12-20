import './repoCard.css';

function RepoCard({ repo }) {
  return (
    <div className='repo-card'>
      <div className="full-name">{repo.full_name}</div>
      <div className="description">{repo.description}</div>
      <div className="small-text-wrapper">
        <div className="language">{repo.language}</div>
        <div className="updated_at">Updated on {repo.updated_at}</div>
      </div>
    </div>
  );
}

export default RepoCard;