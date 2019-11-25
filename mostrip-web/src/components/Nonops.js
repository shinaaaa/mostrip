import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from './../config';
import './../css/main.css'
import 'mdbootstrap/css/mdb.min.css';


export default function Nonops() {
  const [posts, setPosts] = useState([]);
  const [post_id, setPost_id] = useState(null)
  const [onClickLike, setOnClickLike] = useState(false);
  const [page, setPage] = useState(1);
  const [nextbtn, setNextbtn] = useState(true);

  const handle = async () => {
    const { data } = await axios.get(`${baseURL}/api/nonops?page=${page}`);
    if (data) {
      setPosts(data.result);
    };
    setPage(parseInt(page) + 1);
  };

  useEffect(() => {
    handle();
  }, []);

  const onClickPost = async e => {
    const jwt = document.cookie;
    const token = jwt.split(" ")[1];
    const userData = JSON.parse(atob(token.split(".")[1]));
    console.log(userData);

    const { data } = await axios.post(`${baseURL}/api/nonops_like`, {
      _id: e,
      email: userData._id
    });
    if (data.result) {
      console.log(data.result);

      setPost_id(e);
      setOnClickLike(data.result);
      setTimeout(() => {
        setPost_id(null);
        setOnClickLike(false);
      }, 1000);
    } else {
      console.log(data.result);
      setOnClickLike(data.result);
      alert('취소되었습니다.');
    }
  };

  const NextPage = async () => {
    const { data } = await axios.get(`${baseURL}/api/nonops?page=${page}`);
    if (data.result) {
      setPosts(data.result);
      setPage(parseInt(page) + 1);
    } else {
      setNextbtn(false);
    }
  }

  return (
    <div className='flex'>
      <header className="masthead">
        <div >
          {posts.map((post, i) => (
            <div key={i} className="image-size">
              <img id={post._id}
                className={onClickLike && post_id === post._id ? 'animated heartBeat slow' : null}
                src={onClickLike && post_id === post._id ? `../images/like.png` : `${baseURL}/${post.image}`}
                alt=""
                onClick={document.cookie ? e => onClickPost(e.target.id) : null} />
            </div>
          ))}
        </div>
        {nextbtn ? <button type="button" class="btn btn-primary btn-lg btn-block" onClick={e => NextPage()}> 더보기</button> : null}
      </header>
    </div>
  );
}