import React, { useState, useEffect } from 'react';
import { baseURL } from '../config';

export default function Header() {
  const [image, setImage] = useState(null)

  useEffect(() => {
    if (document.cookie) {
      const exp = document.cookie.split(' ')[1];
      const result = JSON.parse(atob(exp.split('.')[1]))
      console.log(result.image);
      setImage(result.image)
    }
  }, [])
  return (
    <div id="wrapper">
      <header id="header">
        <div className="avatar">
          <img src={image ? `${baseURL}/${image}` : `../images/avatar.jpg`} alt="" />
        </div>
        <h1>毛stagram</h1>
      </header>
    </div>
  )
}