import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

import "./Prevew.css";

import "bootstrap-icons/font/bootstrap-icons.css";
import { Nav, NavDropdown, Navbar } from "react-bootstrap";

function Prevew() {
  const [newsData, setNewsData] = useState([]);
  const [teslaNews, setTeslaNews] = useState([]);
  const [techCrunchNews, setTechCrunchNews] = useState([]);
  const [appleNews, setAppleNews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const apiUrl = "http://localhost:3001/api/news/business-news";

    axios
      .get(apiUrl)
      .then((response) => {
        setNewsData(response.data.data); // Access the 'data' array from the response
      })
      .catch((error) => {
        console.error("Error fetching news data: ", error);
      });
  }, []);

  useEffect(() => {
    const teslaApiUrl = "http://localhost:3001/api/news/tesla-news";

    axios
      .get(teslaApiUrl)
      .then((response) => {
        setTeslaNews(response.data.data); // Access the 'data' array from the response
      })
      .catch((error) => {
        console.error("Error fetching Tesla news data: ", error);
      });
  }, []);
  useEffect(() => {
    const techCrunchApiUrl = "http://localhost:3001/api/news/techcrunch-news";

    axios
      .get(techCrunchApiUrl)
      .then((response) => {
        setTechCrunchNews(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching TechCrunch news data: ", error);
      });
  }, []);
  useEffect(() => {
    const appleApiUrl = "http://localhost:3001/api/news/apple-news";

    axios
      .get(appleApiUrl)
      .then((response) => {
        setAppleNews(response.data.data); // Access the 'data' array from the response
      })
      .catch((error) => {
        console.error("Error fetching Apple news data: ", error);
      });
  }, []);
  const [showQuotes, setShowQuotes] = useState(false); // State to control visibility of Quotes section
  const [showMKT, setShowMKT] = useState(false); // State to control visibility of MKT-Trend section

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredAppleNews = appleNews.filter((article) =>
    article.sourceName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTeslaNews = teslaNews.filter((article) =>
    article.sourceName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTechCrunchNews = techCrunchNews.filter((article) =>
    article.sourceName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredNewsData = newsData.filter((article) =>
    article.sourceName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  useEffect(() => {
    // Check if there is an access token in the session storage
    const accessToken = sessionStorage.getItem("access_token");
    setIsLoggedIn(accessToken !== null);

    // Set visibility based on login status
    setShowQuotes(accessToken !== null);
    setShowMKT(accessToken !== null);
  }, []);
  const handleLogout = () => {
    // Clear access and refresh tokens from session storage
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("refresh_token");
    setIsLoggedIn(false);
    // Update visibility on logout
    setShowMKT(false);
    setShowQuotes(false);
    
  };
  const handleReadMore = (url) => {
    if (isLoggedIn) {
      window.location.href = url;
    } else {
      alert("Login to read more!");
    }
  };
  const inputStyles = {
    width: "300px",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "16px",
    color: "#333", // Text color
    // Add more styles as needed
  };
  return (
    <>
      <Navbar expand="lg" className="nav">
      <Link to="/quotes" className="nav-link">
        <button style={{ margin: 0 }} disabled={!showQuotes}>
          Quotes
        </button>
      </Link>
      {/* <Navbar.Brand> */}
      <h1 style={{margin: 0, textShadow: "2px 2px #ff7979" }}>News Today</h1>
      {/* </Navbar.Brand> */}
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        {/* <Nav className="me-auto">
          {/* You can add additional Nav.Link items here if needed */}
        {/* </Nav> */}
        <div style={{marginLeft: "auto",} } className="icon d-flex">
          {isLoggedIn ? (
            <button className="btn btn-success" onClick={handleLogout}>
              <i className="bi bi-person-circle"></i> Logout
            </button>
          ) : (
            <>
              <Link to="/login">
                <button className="btn btn-success">
                  <i className="bi bi-person-circle"></i> Login
                </button>
              </Link>
            </>
          )}
          <input
            type="text"
            placeholder="Search news..."
            value={searchTerm}
            onChange={handleSearch}
            style={inputStyles}
          />
          <Link to="/live">
            <button className="btn btn-success" disabled={!showMKT}>
              <i className="bi bi-person-circle"></i> MKT-Trend
            </button>
          </Link>
        </div>
      </Navbar.Collapse>
    </Navbar>
      <hr />

      <hr />
      <div className="bellow">
        {filteredAppleNews.map((article, index) => (
          <div key={index} className="bellownavlink">
            <img style={{ margin: 0 }} src={article.urlToImage} alt="" />
            <div className="bellownavlinktxt">
              <h5 style={{ color: "red" }}>{article.sourceName}</h5>
              <p>{article.title}</p>
              <button onClick={() => handleReadMore(article.url)}>
                Read more
              </button>
            </div>
          </div>
        ))}
      </div>
<div>
      <div className="scroll">
        <div className="leftside">
          <div className="theleftside">
            {filteredTeslaNews.map((article, index) => (
              <div key={index} className="left">
                <h2 style={{ color: "red", margin: "0" }}>
                  {article.sourceName}
                </h2>
                <img src={article.urlToImage} alt="error while loading image" />
                <p>{article.title}</p>
                <h5>{article.sourceName}</h5>
                <p>{article.description}</p>
                <h5>{article.author}</h5>
                <h5>{article.publishedAt}</h5>
                <button onClick={() => handleReadMore(article.url)}>
                  Read more
                </button>
              </div>
            ))}
          </div>
        </div>
        {/**Right */}
        <div className="right">
          {filteredTechCrunchNews.map((article, index) => (
            <div className="rightside">
              <div key={index} className="theside">
                <h2 style={{ color: "red", margin: "0" }}>
                  {article.sourceName}
                </h2>
                <p>{article.title}</p>
                <h6>{new Date(article.publishedAt).toLocaleDateString()}</h6>
                <button onClick={() => handleReadMore(article.url)}>
                  Read more
                </button>
              </div>
              <img src={article.urlToImage} alt="" />
            </div>
          ))}
          <p>{}</p>
        </div>

        {/**centre */}
        <div className="centre">
          {filteredNewsData.map((article, index) => (
            <div key={index} className="centeredside">
              <h2 style={{ color: "red" }}>{article.sourceName}</h2>
              <img src={article.urlToImage} alt="" />
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <h5>{article.author}</h5>
              <button onClick={() => handleReadMore(article.url)}>
                Read more
              </button>
            </div>
          ))}
        </div>
        
      </div>
      </div>
    </>
  );
}

export default Prevew;
