import React from 'react';
import styled from 'styled-components';
import Card from './Card';

const CardListLayout = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-conent: center;
  width: 500px;

  > * {
      margin: 5px;
  } 
`;

const CardList = ({coins}) => { 
  const cards = coins.map(coin => (<Card key={coin.id} {...coin} />));

  return (
    <CardListLayout>
      {cards}
    </CardListLayout>
  );
};

export default CardList;
