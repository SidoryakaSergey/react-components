const fetchBeers = async (per_page: number, page: number) => {
  const url = `https://api.punkapi.com/v2/beers?page=${page}&per_page=${
    per_page || 0
  }`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error when requesting:', error);
  }
};

export default fetchBeers;
