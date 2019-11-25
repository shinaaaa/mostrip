import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../config";
import { Redirect } from "react-router-dom";
import jwt_decode from 'jwt-decode';

export default function Write() {
  const [selectedFile, setSelectedFile] = useState("");
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);
  const [tagNames, setTagNames] = useState([]);
  const [contents, setContents] = useState("");
  const [upload, setupload] = useState(false);

  const exp = document.cookie.split(" ")[1];
  var result = jwt_decode(exp);
  const clAss = result.clAss;
  const email = result.email;

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("contents", contents);
    formData.append("tags", tags);
    formData.append("email", email);

    const { data } = await axios.post(`${baseURL}/api/post`, formData);
    if (data.result) {
      alert('게시글이 등록되었습니다.')
      setupload(true);
    } else {
      alert('게시글 등록에 실패했습니다. 관리자에게 문의해 주세요.')
    }
  };

  const addTag = async () => {
    if (!tag) {
      alert("태그를 입력해주세요")
      return
    }
    const res = await axios.get(`${baseURL}/api/tag/${tag}`);
    setTagNames([...tagNames, tag]);
    if (res.data.error) {
      const { data } = await axios.post(`${baseURL}/api/tag`, {
        name: tag
      });
      setTags([...tags, data.tag._id]);
      setTag("");
    } else {
      setTags([...tags, res.data.tag._id]);
      setTag("");
    }
  };
  const deleteTag = i => {
    const newTags = [...tags];
    const newTagNames = [...tagNames];
    newTags.splice(i, 1);
    newTagNames.splice(i, 1);
    setTags(newTags);
    setTagNames(newTagNames);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {document.cookie ? null : <Redirect to="/Login" />}
      {clAss ? null : <Redirect to='/' />}
      {upload ? <Redirect to='/' /> : null}
      <label>태그 추가</label>
      <input type="text" value={tag} onChange={e => setTag(e.target.value)} />
      <button type="button" className="btn btn-success" onClick={addTag}>
        태그 추가
      </button>

      <div>
        {tags.map(({ name }, i) => (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => deleteTag(i)}
          >
            {tagNames[i]}
          </button>
        ))}
      </div>
      <label>내용</label>
      <textarea
        value={contents}
        onChange={e => {
          setContents(e.target.value);
        }}
      />

      <div>
        <input
          type="file"
          name="file"
          onChange={e => {
            setSelectedFile(e.target.files[0]);
          }}
        />
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleSubmit}
        >
          upload
        </button>
      </div>
    </div>
  );
}
