import React from 'react';
interface IPropsCard {
  nameBeer: string;
  imageURL: string;
}

function CardBeer(props: IPropsCard) {
  const { nameBeer, imageURL } = props;
  return (
    <div className="card">
      <img className="img-beer" src={imageURL} alt={nameBeer} />
      <p className="name">{nameBeer}</p>
    </div>
  );
}

export default CardBeer;
