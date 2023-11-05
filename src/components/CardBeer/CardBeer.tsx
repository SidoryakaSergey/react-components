import React from 'react';
import { Link } from 'react-router-dom';
interface IPropsCard {
  nameBeer: string;
  imageURL: string;
  id: number;
  page: string;
  page_size: string;
  searchBeer: string;
}

function CardBeer(props: IPropsCard) {
  const { searchBeer, nameBeer, imageURL, id, page, page_size } = props;
  return (
    <Link
      to={`/${id}?beer_name=${searchBeer}&page=${page}&page_size=${page_size}`}
    >
      <div className="card">
        <img className="img-beer" src={imageURL} alt={nameBeer} />
        <p className="name">{nameBeer}</p>
      </div>
    </Link>
  );
}

export default CardBeer;
