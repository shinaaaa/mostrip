import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../config";
import { Redirect } from "react-router-dom";
import jwt_decode from 'jwt-decode';

export default function Write() {
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);
  const [tagNames, setTagNames] = useState([]);
  const [contents, setContents] = useState("");
  const [upload, setupload] = useState(false);
  const [image, setImage] = useState(null)

  const exp = document.cookie.split(" ")[1];
  var result = jwt_decode(exp);
  const clAss = result.clAss;
  const email = result.email;

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("contents", contents);
    console.log(tags);
    if (tags.length === 0) {
      formData.append("tags", [{}]);
    } else {
      formData.append("tags", tags);
    }
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

  const uploadImage = (e) => {
    if (e.type === 'image/png' || e.type === 'image/jpeg' || e.type === 'image/jpg') {
      setImage(e);
      return
    } else {
      alert('이미지 형식만 가능합니다.');
      return
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", padding: '20px' }}>
      {document.cookie ? null : <Redirect to="/Login" />}
      {clAss ? null : <Redirect to='/' />}
      {upload ? <Redirect to='/' /> : null}
      <label>태그 추가</label>
      <input type="text" value={tag} onChange={e => setTag(e.target.value)} />
      <button type="button" className="btn btn-success" onClick={addTag} style={{ marginBottom: '20px ' }}>
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

        <div className="custom-file" style={{ marginTop: '20px' }}>
          <input type="file" name="file" className="custom-file-input" id="validatedCustomFile"
            onChange={e => uploadImage(e.target.files[0])} required />
          <label className="custom-file-label" for="validatedCustomFile" data-browse="Image File">{image ? image.name : 'Choose file...'}</label>
        </div>
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
