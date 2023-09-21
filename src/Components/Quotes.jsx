import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';

function QuotesComponent() {
  const [quote, setQuote] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.quotable.io/random')
      .then((response) => response.json())
      .then((data) => {
        setQuote(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching random quote: ', error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card>
        <Card.Body>
          <Card.Title className="text-primary font-weight-bold mb-3">Quote of the Day</Card.Title>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <>
              <Card.Text>
                <div>
                  <p>Tags: {quote.tags.join(', ')}</p>
                  <em>
                    <h3>{quote.content}</h3>
                  </em>
                </div>
                <p>- {quote.author} </p>
              </Card.Text>
              <Button variant="primary" onClick={() => window.location.reload()}>
                New Quote
              </Button>
            </>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default QuotesComponent;
