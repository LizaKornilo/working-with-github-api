
export async function searchRepos(terms, filter, page = 1, itemsPerPage = 30) {
  const url = encodeURI(`https://api.github.com/search/repositories?page=${page}&per_page=${itemsPerPage}&q=${terms}${filter !== "no filter" ? ("&sort=" + filter) : ""}`);
  //console.log(url);
  const response = await fetch(url);
  const data = await response.json();

  if (response.status === 422) throw new Error('Validation Failed :(');
  else if (response.status === 403) throw new Error('API rate limit exceeded :(');
  else if (response.status !== 200) throw new Error(':(');

  //console.log(data);
  return data.items.map(item => ({
    id: item.id,
    fullName: item.full_name,
    description: item.description,
    updatedAt: item.updated_at,
    language: item.language,
    stargazersCount: item.stargazers_count,
    forksCount: item.forks_count
  }));
}

export async function searchRepoById(repoId) {
  const url = encodeURI(`https://api.github.com/repositories/${repoId}`);

  const response = await fetch(url);
  const data = await response.json();

  if (response.status === 403) throw new Error('API rate limit exceeded :(');
  else if (response.status === 404) throw new Error('Not Found :(');
  else if (response.status !== 200) throw new Error(':(');

  //console.log(data);
  const langsUrl = data.languages_url;
  const langsResponse = await fetch(langsUrl);
  const langs = await langsResponse.json();

  return {
    id: data.id,
    name: data.name,
    fullName: data.full_name,
    private: data.private,
    owner: {
      login: data.owner.login,
      id: data.owner.id,
      avatarUrl: data.owner.avatar_url,
      htmlUrl: data.owner.html_url,
    },
    htmlUrl: data.html_url,
    description: data.description,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
    pushedAt: data.pushed_at,
    languages: langs, //object
    stargazersCount: data.stargazers_count,
    watchersCount: data.watchers_count,
    forksCount: data.forks_count,
    topics: data.topics, //array
    visibility: data.visibility,
  };
} 