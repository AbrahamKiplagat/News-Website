import React, { useEffect, useState } from 'react';
// ... (previous imports and code)

const CryptoTable = () => {
    const [cryptoData, setCryptoData] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://api.coinlayer.com/live?access_key=db270025346f6bf6f739ec2b8fa60795');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          const filteredData = filterCryptoData(data.rates);
          setCryptoData(Object.entries(filteredData));
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);
  
    const filterCryptoData = (rates) => {
      const filteredCurrencies = ['BTC', 'ETH', 'XRP', 'LTC', 'ADA', 'DOT', 'LINK', 'SOL'];
      const filteredData = {};
      filteredCurrencies.forEach((currency) => {
        if (rates[currency]) {
          filteredData[currency] = rates[currency];
        }
      });
      return filteredData;
    };
  
    const currencyImages = {
      BTC: 'https://via.placeholder.com/20x20?text=BTC',
      ETH: 'https://via.placeholder.com/20x20?text=ETH',
      XRP: 'https://via.placeholder.com/20x20?text=XRP',
      LTC: 'https://via.placeholder.com/20x20?text=LTC',
      ADA: 'https://via.placeholder.com/20x20?text=ADA',
      DOT: 'https://via.placeholder.com/20x20?text=DOT',
      LINK: 'https://via.placeholder.com/20x20?text=LINK',
      SOL: 'https://via.placeholder.com/20x20?text=SOL',
      // Add image URLs for each cryptocurrency
    };
  
    return (
      <div>
        <h2>Selected Cryptocurrency Rates</h2>
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #ccc' }}>
              <th>Currency</th>
              <th>Rate</th>
              <th>Icon</th>
            </tr>
          </thead>
          <tbody>
            {cryptoData.map(([currency, rate]) => (
              <tr key={currency} style={{ borderBottom: '1px solid #ccc' }}>
                <td>{currency}</td>
                <td>{rate}</td>
                <td>
                  <img src={currencyImages[currency]} alt={currency} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default CryptoTable;
  