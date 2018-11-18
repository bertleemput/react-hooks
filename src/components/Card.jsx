import React from 'react';
import styled from 'styled-components';

const round = (num) => {
  return Math.round(num * 100) / 100;
};

const CardLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 150px;
  height: 150px;
  background-color: #BEE9E8;
  box-shadow: 10px 10px 8px #888888;
  border-radius: 2px;
`;

const CardImage = styled.img`
  display: block;
  margin: 10px auto;
  height: 60px;
`;

const CardPrice = styled.div`
  margin: 5px;
  text-align: center;
`;

const CardQuotes = styled.div`
  display: flex;   
  flex-direction: row;
  flex: auto;
  align-items: center;
  justify-content: space-around;
`;

const CardQuote = styled.span`
  display: block;
  flex: 0 0 auto;
  padding: 4px;
  font-size: 11px;
  text-align: center; 
  background-color: #62B6CB;
  border: 0px;
  border-radius: 8px;
`;

const getImgSrc = (symbol) => {
  return `/icons/${symbol.toLowerCase()}@2x.png`;
};

const Card = ({title, symbol, price, hourlyChange, dailyChange, weeklychange}) => (
  <CardLayout>
    <CardImage src={getImgSrc(symbol)} title={title} />
    <CardPrice>{`$ ${round(price)}`}</CardPrice>
    <CardQuotes>
      <CardQuote>{`${weeklychange}%`}</CardQuote>
      <CardQuote>{`${dailyChange}%`}</CardQuote>
      <CardQuote>{`${hourlyChange}%`}</CardQuote>
    </CardQuotes>
  </CardLayout>
);

export default Card;
