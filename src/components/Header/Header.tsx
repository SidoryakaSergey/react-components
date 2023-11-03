import React from 'react';

const fetchCharacters = async () => {
  const limit = 10;
  const offset = 0;

  const url = `https://stapi.co/api/v2/rest/astronomicalObject/search?      
pageNumber=${offset || 0}&pageSize=${limit}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Ошибка при запросе:', error);
  }
};

fetchCharacters();

export const Header = () => {
  return <div>Header</div>;
};
