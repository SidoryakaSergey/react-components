import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import CardBeer from '../../components/CardBeer/CardBeer';

import fetchBeers from '../../util/fetchBeers';
import searchByName from '../../util/searchByName';

interface Beer {
  id: number;
  name: string;
  image_url: string;
}

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const beer_name = searchParams.get('beer_name') || '';
  const page = searchParams.get('page') || '1';
  const page_size = searchParams.get('page_size') || '10';

  const [dataBeers, setDataBeers] = useState<Beer[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    if (beer_name.length > 0) {
      searchByName(beer_name, parseInt(page_size), parseInt(page))
        .then((data: Beer[]) => {
          setDataBeers(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching beers:', error);
          setLoading(false);
        });
    } else {
      fetchBeers(parseInt(page_size), parseInt(page))
        .then((data: Beer[]) => {
          setDataBeers(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching beers:', error);
          setLoading(false);
        });
    }
  }, [beer_name, page_size, page]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="list-beers">
          {dataBeers.map((el: Beer) => {
            return (
              <CardBeer
                key={el.id}
                nameBeer={el.name}
                imageURL={el.image_url}
                id={el.id}
                page={page}
                page_size={page_size}
                searchBeer={beer_name}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;
