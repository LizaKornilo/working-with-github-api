import './repoContent.css';

function calcPercent(value, total) {
  return (100 * value / total).toFixed(1);
}

function RepoContent({ repo }) {
  return (
    <div className="repo-content">
      <div className="flex-wrapper">
        <div className="flex-wrapper">
          <a href={repo.htmlUrl} className="repo-name">{repo.name}</a>
          <div className="private-label">{repo.private ? "Private" : "Public"}</div>
        </div>
        <div className="rectangles">
          <div className="watch rectangle">
            Watch
            <div className="counter">{repo.watchersCount}</div>
          </div>
          <div className="fork rectangle">
            Fork
            <div className="counter"> {repo.forksCount}</div>
          </div>
          <div className="star rectangle">
            Star
            <div className="counter"> {repo.stargazersCount}</div>
          </div>
        </div>
      </div>

      <div className="details">
        <div className="description">
          {
            repo.description ?
              repo.description
              : "No description"
          }
        </div>
        <div className="created-at">
          <div className="created-at__label">Created at</div>
          <div className="created-at__date">{new Date(repo.createdAt).toLocaleDateString()}</div>
        </div>
        <div className="updated-at">
          <div className="updated-at__label">Updated at</div>
          <div className="updated-at__date"> {new Date(repo.updatedAt).toLocaleDateString()}</div>
        </div>
        <div className="pushed-at">
          <div className="pushed-at__label">Pushed at</div>
          <div className="pushed-at__date"> {new Date(repo.pushedAt).toLocaleDateString()}</div>
        </div>
      </div>

      <div className="user-info">
        {
          repo.owner ?
            (<>
              <img className="user-avatar" src={repo.owner.avatarUrl} alt="user_avatar" />
              <a href={repo.owner.htmlUrl} className="user-login">{repo.owner.login}</a>
            </>)
            : "No user"
        }
      </div>

      <div className="topics">
        {
          repo.topics && repo.topics.length > 0 ?
            (<>
              {repo.topics.map((topic, i) =>
                <div key={i} className="topic">
                  {topic}
                </div>)}
            </>)
            : "No topics"
        }
      </div>

      <div className="language-label">Langueges:</div>
      <div className="languages">
        {
          repo.languages ?
            Object.keys(repo.languages).map((lang, i) => (
              <div className="language" key={i} >
                <div className="language-name">{lang}</div>
                <div className="language-percent">{calcPercent(repo.languages[lang], Object.values(repo.languages).reduce((a, b) => a + b, 0))} %</div>
              </div>
            ))
            : "No languages"
        }
      </div>

    </div>);
}

export default RepoContent;