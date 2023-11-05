import React from 'react';
import { useParams } from 'react-router-dom';

function CardsPage() {
  const { id } = useParams();
  return <div>CardsPage - {id}</div>;
}

export default CardsPage;
