import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

// import { Container, Row, Col, Card } from "react-bootstrap";
import "./Prevew.css";
// import image1 from "../assets/img/images.jpeg"
import imageHome from "../assets/img/icons-home.png";
import image3 from "../assets/img/images (3).jpeg";
// import image4 from "../assets/img/images (4).jpeg"
// import image5 from "../assets/img/images (5).jpeg"
import "bootstrap-icons/font/bootstrap-icons.css";

function Prevew() {
  const [newsData, setNewsData] = useState([]);
  const [teslaNews, setTeslaNews] = useState([]);
  const [techCrunchNews, setTechCrunchNews] = useState([]);
  const [appleNews, setAppleNews] = useState([]);
  useEffect(() => {
    const apiUrl =
      "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=edb94fd84d57470eaa76753bd04eefbc";

    axios
      .get(apiUrl)
      .then((response) => {
        setNewsData(response.data.articles);
      })
      .catch((error) => {
        console.error("Error fetching news data: ", error);
      });
  }, []);

  useEffect(() => {
    const teslaApiUrl =
      "https://newsapi.org/v2/everything?q=tesla&from=2023-08-21&sortBy=publishedAt&apiKey=edb94fd84d57470eaa76753bd04eefbc";

    axios
      .get(teslaApiUrl)
      .then((response) => {
        setTeslaNews(response.data.articles);
      })
      .catch((error) => {
        console.error("Error fetching Tesla news data: ", error);
      });
  }, []);
  useEffect(() => {
    const techCrunchApiUrl =
      "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=edb94fd84d57470eaa76753bd04eefbc";

    axios
      .get(techCrunchApiUrl)
      .then((response) => {
        setTechCrunchNews(response.data.articles);
      })
      .catch((error) => {
        console.error("Error fetching TechCrunch news data: ", error);
      });
  }, []);
  useEffect(() => {
    const appleApiUrl =
      "https://newsapi.org/v2/everything?q=apple&from=2023-09-18&to=2023-09-18&sortBy=popularity&apiKey=edb94fd84d57470eaa76753bd04eefbc";

    axios
      .get(appleApiUrl)
      .then((response) => {
        setAppleNews(response.data.articles);
      })
      .catch((error) => {
        console.error("Error fetching Apple news data: ", error);
      });
  }, []);
  return (
    <>
      <div className="nav">
        <Link to="/quotes">
          <button style={{ margin: 0 }}>Quotes</button>
        </Link>
        <h1 style={{ margin: 0, textShadow: "2px 2px #ff7979" }}>News Today</h1>
        <div className="icon">
          <button className="btn btn-primary">
            <i className="bi bi-bell"></i> Subscribe
          </button>

          <Link to="/login">
  <button className="btn btn-success">
    <i className="bi bi-person-circle"></i> Login
  </button>
</Link>

        </div>
      </div>
      <hr />

      <hr />
      <div className="bellow">
        {appleNews.map((article, index) => (
          <div key={index} className="bellownavlink">
            <img style={{ margin: 0 }} src={article.urlToImage} alt="" />
            <div className="bellownavlinktxt">
              <h5>{article.source.name}</h5>
              <p>{article.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="scroll">
        <div className="leftside">
          <div className="theleftside">
            {teslaNews.map((article, index) => (
              <div key={index} className="left">
                <h2 style={{ color: "red", margin: "0" }}>
                  {article.source.name}
                </h2>
                <img
                  src={article.urlToImage || image3}
                  alt="error while loading image"
                />
                <p>
                  {article.title ||
                    "Reasons Why Men Love Football Than Their Wives"}
                </p>
                <h5>{article.source?.name || "Unknown"}</h5>
                <p>{article.content || ""}</p>
                <h5>{article.author || ""}</h5>
                <h5>{article.publishedAt || ""}</h5>
              </div>
            ))}
          </div>
        </div>
        {/**Right */}
        <div className="right">
          {techCrunchNews.map((article, index) => (
            <div className="rightside">
              <div key={index} className="theside">
                <h2 style={{ color: "red", margin: "0" }}>
                  {article.source.name}
                </h2>
                <p>{article.title}</p>
                <h6>{new Date(article.publishedAt).toLocaleDateString()}</h6>
              </div>
              <img src={article.urlToImage} alt="" />
            </div>
          ))}
          <p>{}</p>
        </div>

        {/**centre */}
        <div className="centre">
          {newsData.map((article, index) => (
            <div key={index} className="centeredside">
              <h2 style={{ color: "red" }}>{article.source.name}</h2>
              <img src={article.urlToImage} alt="" />
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <h5>{article.author}</h5>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Prevew;
