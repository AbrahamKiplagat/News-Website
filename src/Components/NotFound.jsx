import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css'; 
function NotFound() {
  return (
    <div className="not-found">
      <h1 className="not-found-header animated">404</h1>
      <h5 className="not-found-message">Sorry!!..the page you are looking for is not found...</h5>
      <Link to="/">
        <button className="btn btn-primary not-found-button">Go back to the home page</button>
      </Link>
    </div>
  );
}

export default NotFound;
