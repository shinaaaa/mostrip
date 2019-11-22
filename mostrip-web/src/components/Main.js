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

  const onClickPost = async e => {
    const jwt = document.cookie;
    const token = jwt.split(" ")[1];
    const { email } = JSON.parse(atob(token.split(".")[1]));
    const { data } = await axios.post(`${baseURL}/api/like`, {
      _id: e,
      email
    });
    alert(data)
  };

  return (
    <div className='flex'>
      <header className="masthead">
        <div >
          {posts.map((post, i) => (
            <div key={i} className="image-size">
              <img id={post._id} src={`${baseURL}/${post.image}`} alt="" onClick={e => onClickPost(e.target.id)} />
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}