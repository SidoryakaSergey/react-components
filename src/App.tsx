import { Routes, Route } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import Layout from './components/Layout/Layout';
import SearchResultsPage from './pages/SearchResultsPage/SearchResultsPage';
import CardsPage from './pages/CardsPage/CardsPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<SearchResultsPage />} />
          <Route path="/:id" element={<CardsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
