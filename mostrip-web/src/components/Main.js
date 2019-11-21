import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from './../config';
import './../css/main.css'

export default function Main() {
  const [posts, setPosts] = useState([]);

  const handle = async () => {
    const { data } = await axios.get(`${baseURL}/api/main`);
    console.log(data.result);
    if (data) {
      setPosts(data.result);
    };
  };

  useEffect(() => {
    handle();
  }, []);

  /*   const { data } = axios.get(`${baseURL}/api/main`);
    console.log(data);
    if (data) {
      console.log(data);
  
      setPosts(data);
    } */
  return (
    <header className="masthead">
      <div className="container">
        <div className="row">
          <div className="thumbnails">
            {posts.map(post => (
              <div className="image-size">
                <img src={`${baseURL}/${post.image}`} alt="" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}