import React, { useState, useEffect } from 'react';
import { baseURL } from '../config';
import jwt_decode from 'jwt-decode';
import { Link } from "react-router-dom";

export default function Header() {
  const [image, setImage] = useState(null)
  const [clAss, setClAss] = useState('')

  useEffect(() => {
    if (document.cookie) {
      const exp = document.cookie.split(' ')[1];
      const result = jwt_decode(exp);
      setImage(result.image)
      setClAss(result.clAss)
    }
  }, [])
  return (
    <div id="wrapper">
      <header id="header">
        <div className="avatar">
          <img src={image ? `${baseURL}/${image}` : `../images/avatar.jpg`} alt="" />
        </div>
        {clAss ? <ul class="icons" style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
          <Link to="/Nonops"><img style={{ width: '50px', height: '50px' }} src="../images/nono-icon.png" alt="" /></Link>
        </ul> : null}
      </header>
    </div >
  )
}