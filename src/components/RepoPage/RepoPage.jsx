import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import { searchRepoById } from "../../api";

function RepoPage() {
  let params = useParams();
  const currentRepoId = params.repoId;

  const [repo, setRepo] = useState({});
  const [error, setError] = useState();

  const setRepoById = async _ => {
    try {
      setRepo(currentRepoId ? await searchRepoById(currentRepoId) : {});
    } catch (e) {
      setError(e.message);
    }
  }

  useEffect(() => {
    setRepoById();
  }, [currentRepoId]);

  return (
    <div className='repo-page'>
      {error ?
        (<h3>{error}</h3>) :
        (<div>This is {repo.name} repo page</div>)
      }
    </div>
  );
}

export default RepoPage;