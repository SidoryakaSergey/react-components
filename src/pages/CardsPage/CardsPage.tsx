import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SearchResultsPage from '../SearchResultsPage/SearchResultsPage';
import BigCardPage from '../BigCardPage/BigCardPage';

function CardsPage() {
  const { id } = useParams();
  const parsedId = id ? parseInt(id, 10) : undefined;
  const navigate = useNavigate();
  const handlePageClick = () => navigate(-1);

  return (
    <>
      <div className="wrapp">
        <div onClick={handlePageClick}>
          <SearchResultsPage />
        </div>
        {parsedId !== undefined ? <BigCardPage id={parsedId} /> : null}
      </div>
    </>
  );
}

export default CardsPage;
