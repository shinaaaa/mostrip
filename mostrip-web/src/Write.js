import React, { useState } from "react";
import axios from "axios";
import { baseURL } from "../common/config";

export default function Write() {
  const [selectedFile, setSelectedFile] = useState("");
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);
  const [contents, setContents] = useState("");

  const addTag = async () => {
    const res = await axios.get(`${baseURL}/api/tag/${tag}`);
    if (res.data.error) {
      const { data } = await axios.post(`${baseURL}/api/tag`, {
        name: tag
      });
      setTags([...tags, data.tag]);
      setTag("");
    } else {
      setTags([...tags, res.data.tag]);
      setTag("");
    }
  };
  const deleteTag = i => {
    const newTags = [...tags];
    newTags.splice(i, 1);
    setTags(newTags);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
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
            {name}
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
          onClick={() => {
            const formData = new FormData();
            formData.append("file", selectedFile);
            formData.append("contents", contents);
            formData.append("tags", tags);

            return axios.post(`http://${baseURL}:3000/api/post`, formData);
          }}
        >
          upload
        </button>
      </div>
    </div>
  );
}
