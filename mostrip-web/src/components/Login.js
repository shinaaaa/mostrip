import React, { useState } from "react";
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { baseURL } from './../config';
import "./../css/Login.css";
import jwt_decode from 'jwt-decode';
import Joi from '@hapi/joi';


export default function Login({ history }) {
  const [loginState, setLoginState] = useState('init');

  const validate = (user) => {
    const emailValidate = Joi.object({
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    })
    return emailValidate.validate(user);
  }


  /* 로그인 버튼 클릭 시 실행 */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    if (validate({ email }).error) {
      alert('올바른 이메일 형식이 아닙니다.');
      return;
    }
    const { data } = await axios.post(`${baseURL}/auth/login`, {
      email: e.target.email.value,
      password: e.target.password.value,
    });
    if (!data.result) {
      setLoginState('failed');
    } else {
      const { exp } = jwt_decode(data.token);

      const exprires = new Date(exp * 1000).toUTCString();

      document.cookie = `Authorization=JWT ${data.token}; exprires=${exprires}`;
      setLoginState('success');
    };
  };
  return (
    <div className='div-box'>
      {document.cookie ? <Redirect to='/' /> : null}
      {loginState === 'success' ? (window.location.replace('/')) : null}
      <form className='form-row' onSubmit={handleSubmit}>
        {loginState === 'failed' ? '이메일 혹은 비밀번호가 틀렸습니다.' : null}
        <div className="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input type="email" name='email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input type="password" name='password' className="form-control" id="exampleInputPassword1" placeholder="Password" />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
        <button type="button" className="btn btn-secondary" onClick={() => history.push('/Join')}>Join</button>
      </form>
    </div>
  )
}
