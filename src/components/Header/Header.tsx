import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

export const Header = () => {
  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem('savedSearchBeers') || ''
  );

  const [searchParams] = useSearchParams();
  const beer_name = searchParams.get('beer_name');
  const pageParam = searchParams.get('page');
  const initialPage = pageParam ? parseInt(pageParam) : 1;
  const [page, setPage] = useState(initialPage);
  const [pageSizeInput, setPageSizeInput] = useState('10');
  const page_size = searchParams.get('page_size');

  const navigate = useNavigate();

  useEffect(() => {
    const defaultBeerName = localStorage.getItem('savedSearchBeers') || '';
    const defaultPage = 1;
    const defaultPageSize = '10';

    if (!beer_name || !pageParam || !page_size) {
      navigate(
        `?beer_name=${defaultBeerName}&page=${defaultPage}&page_size=${defaultPageSize}`
      );
    }
  }, [beer_name, pageParam, page_size, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    setPageSizeInput('10');
    navigate(
      `?beer_name=${searchTerm}&page=${page}&page_size=${pageSizeInput}`
    );
    localStorage.setItem('savedSearchBeers', searchTerm);
  };

  const handleClickNext = () => {
    setPage((prevPage) => prevPage + 1);
    navigate(`?beer_name=${beer_name}&page=${page + 1}&page_size=${page_size}`);
  };

  const handleClickPrev = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
      navigate(
        `?beer_name=${beer_name}&page=${page - 1}&page_size=${page_size}`
      );
    }
  };

  const handleUpdatePageSize = () => {
    const newSize = parseInt(pageSizeInput);
    if (!isNaN(newSize) && newSize > 0) {
      navigate(`?beer_name=${beer_name}&page=${page}&page_size=${newSize}`);
    }
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageSizeInput(e.target.value);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          value={searchTerm}
          onChange={handleInputChange}
          type="search"
          name="search"
          placeholder="Enter your search term"
        />
        <button type="submit">Search</button>
      </form>
      <div className="pagination">
        <button onClick={handleClickPrev}>Prev</button> {page}{' '}
        <button onClick={handleClickNext}>Next</button>
        <div className="item-page">
          <p>Item on page</p>
          <input
            className="item"
            type="text"
            value={pageSizeInput}
            onChange={handlePageSizeChange}
          />
          <button onClick={handleUpdatePageSize}>Update</button>
        </div>
      </div>
    </div>
  );
};
