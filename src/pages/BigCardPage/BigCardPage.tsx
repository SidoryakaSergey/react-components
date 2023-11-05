import React, { useState, useEffect } from 'react';
import fetchBeer from '../../util/fetchBeer';
import { useNavigate } from 'react-router-dom';

interface IPropsCard {
  id: string;
  name: string;
  image_url: string;
}

function BigCardPage(props: { id: number }) {
  const { id } = props;
  const [data, setData] = useState<IPropsCard[] | []>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleCloseClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    setLoading(true);

    fetchBeer(id)
      .then((beerData) => {
        setData(beerData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching beer:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return null;
  }

  return (
    <div className="big-card">
      <button className="close-btn" onClick={handleCloseClick}>
        close
      </button>
      <img src={data[0].image_url} className="img-beer" alt={data[0].name} />{' '}
      <h1>{data[0].name}</h1>
    </div>
  );
}

export default BigCardPage;
