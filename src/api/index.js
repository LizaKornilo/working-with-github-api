
export async function searchRepos(terms, page = 1, itemsPerPage = 30) {
  const url = encodeURI(`https://api.github.com/search/repositories?page=${page}&per_page=${itemsPerPage}&q=${terms}`);

  const response = await fetch(url);
  const data = await response.json();  

  if (response.status === 422) throw new Error('Validation Failed :(');
  else if(response.status === 403) throw new Error('API rate limit exceeded :(');
  else if (response.status !== 200) throw new Error(':(');
    
  return data.items.map(item => ({
    id: item.id,
    fullName: item.full_name,
    description: item.description,
    updatedAt: item.updated_at,
    language: item.language,
    owner: {
      avatarUrl: item.owner.avatar_url,
      id: item.owner.id,
      login: item.owner.login,
      htmlUrl: item.owner.html_url
    },
    private: item.private,
    htmlUrl: item.html_url
  }));
} 