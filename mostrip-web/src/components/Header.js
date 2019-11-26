import React, { useState, useEffect } from 'react';
import { baseURL } from '../config';
import jwt_decode from 'jwt-decode';
import { Link } from "react-router-dom";
import Img from "react-exif-orientation-img";

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
          <Img src={image ? `${baseURL}/${image}` : `../images/avatar.jpg`} alt="" />
        </div>
        {clAss ? <ul className="icons" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center' }}>
          <Link to="/Nonops"><Img style={{ width: '50px', height: '50px' }} src="../images/nono-icon.png" alt="" /></Link>
          <h2 style={{ color: 'white' }}>머머리 ㅇㅈ?</h2>
        </ul> : null}
      </header>
    </div >
  )
}