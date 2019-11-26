import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from './../config';
import './../css/main.css'
import 'mdbootstrap/css/mdb.min.css';
import jwt_decode from 'jwt-decode';
import Img from "react-exif-orientation-img";



export default function Main() {
  const [posts, setPosts] = useState([]);
  const [post_id, setPost_id] = useState(null);
  const [onClickLike, setOnClickLike] = useState(false);
  const [page, setPage] = useState(1);
  const [nextbtn, setNextbtn] = useState(true);
  const [comment, setComment] = useState("");
  const [commentFlag, setCommentFlag] = useState(false);
  const [commentID, setCommentID] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const handle = async () => {
    const { data } = await axios.get(`${baseURL}/api/main?page=${page}`);
    setIsLoading(false)
    if (data) {
      setPosts(data.result);
    }
    setPage(parseInt(page) + 1);
  };

  useEffect(() => {
    handle();
  }, []);

  const submitComment = async el => {
    const jwt = document.cookie;
    const token = jwt.split(" ")[1];
    const { email } = jwt_decode(token);
    const res = await axios.post(`${baseURL}/api/comment`, {
      email: email,
      contents: comment,
      post_id: el
    });
    setComment("");
    window.location.reload();
  };

  const onClickPost = async e => {
    const jwt = document.cookie;
    const token = jwt.split(" ")[1];
    const { email } = jwt_decode(token);
    const { data } = await axios.post(`${baseURL}/api/like`, {
      _id: e,
      email
    });
    if (data.result) {
      setPost_id(e);
      setOnClickLike(data.result);
      setTimeout(() => {
        setPost_id(null);
        setOnClickLike(false);
      }, 1000);
    } else {
      setOnClickLike(data.result);
      alert("취소되었습니다.");
    }
  };

  const NextPage = async () => {
    const { data } = await axios.get(`${baseURL}/api/main?page=${page}`);
    if (data.result) {
      setPosts(data.result);
      setPage(parseInt(page) + 1);
    } else {
      setNextbtn(false);
    }
  };

  const onClickComment = (e) => {
    setCommentID(e)
    setCommentFlag(!commentFlag)
  }

  return (
    <div className="flex">
      <header className="masthead">
        {isLoading ?
          (<i className="fas fa-spinner fa-spin fa-5x"></i>) :
          (
            <div>
              {posts.map((post, i) => (
                <div key={i} className="image-size">
                  <div className='image-box'>
                    <Img
                      id={post._id}
                      className={
                        onClickLike && post_id === post._id
                          ? "animated heartBeat slow"
                          : null
                      }
                      src={
                        onClickLike && post_id === post._id
                          ? `../images/like.png`
                          : `${baseURL}/${post.image}`
                      }
                      alt=""
                      onClick={document.cookie ? e => onClickPost(e.target.id) : null}
                    />
                  </div>
                  <div className='text-box'>
                    <div style={{ color: "white" }}>{post.contents}</div>
                    <i
                      className="far fa-comment fa-2x white-text"
                      onClick={e =>
                        onClickComment(post._id)
                      }
                    ></i>
                    {post.comments.map((e, i) => (
                      <div key={i} style={{ color: "white" }}>{e}</div>
                    ))}
                  </div>
                  {commentFlag && commentID === post._id ? (
                    <div>
                      <input
                        type="text"
                        style={{ color: "black" }}
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                      ></input>
                      <button
                        className="btn"
                        onClick={() => submitComment(post._id)}
                      >
                        게시
                  </button>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          )} {
          nextbtn ? (
            <button
              type="button"
              className="btn btn-primary btn-block"
              onClick={e => NextPage()}
            >
              {" "}
              더보기
          </button>
          ) : null}
      </header>
    </div >
  );
}
