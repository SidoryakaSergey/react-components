const searchByName = async (
  beerName: string,
  per_page: number,
  page: number
) => {
  try {
    const response = await fetch(
      `https://api.punkapi.com/v2/beers?beer_name=${beerName}&page=${page}&per_page=${
        per_page || 0
      }`
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Не удалось получить данные');
    }
  } catch (error) {
    console.error('Произошла ошибка:', error);
  }
};

export default searchByName;
