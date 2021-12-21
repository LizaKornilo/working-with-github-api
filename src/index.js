import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'normalize.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RepoPage from './components/RepoPage/RepoPage';

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/:repoId" element={<RepoPage />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);
