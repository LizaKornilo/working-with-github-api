import { useState } from 'react';
import './App.css';
import SearchPanel from './components/SearchPanel/SearchPanel';
import SearchResults from './components/SearchResults/SearchResults';

function App() {
  const [repos, setRepos] = useState([
    {
      id: 1,
      full_name: "First repo",
      description: "Tutorial for Swift iOS App w/ Page View Controller",
      updated_at: "2021-03-14T11:05:00Z",
      language: "Swift"
    },
    {
      id: 2,
      full_name: "Second repo",
      description: "Some description",
      updated_at: "2021-03-14T11:05:00Z",
      language: "Java"
    }]);

  return (
    <div className="App">
      <SearchPanel />
      <SearchResults repos={repos} />
    </div>
  );
}

export default App;
