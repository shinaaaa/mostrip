import React, { useState, useEffect } from 'react';
import { baseURL } from '../config';
import jwt_decode from 'jwt-decode';

export default function Header() {
  const [image, setImage] = useState(null)

  useEffect(() => {
    if (document.cookie) {
      const exp = document.cookie.split(' ')[1];
      const result = jwt_decode(exp);

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