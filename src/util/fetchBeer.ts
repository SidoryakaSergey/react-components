const fetchBeer = async (id: number) => {
  const url = `https://api.punkapi.com/v2/beers/${id}}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error when requesting:', error);
  }
};

export default fetchBeer;
