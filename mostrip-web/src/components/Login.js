import React, { useState } from "react";
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { baseURL } from './../config';

export default function Login({ setIsLoggedIn, setIsAdmin, history }) {
  const [loginState, setLoginState] = useState('init');
  /* 로그인 버튼 클릭 시 실행 */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(`${baseURL}/auth/login`, {
      email: e.target.email.value,
      password: e.target.password.value,
    });
    if (!data.result) {
      setLoginState('failed');
    } else {
      const { exp } = JSON.parse(atob(data.token.split('.')[1])); /* base64 Decoding */
      const exprires = new Date(exp * 1000).toUTCString();
      document.cookie = `Authorization=JWT ${data.token}; exprires=${exprires}`;
      setIsAdmin(data.admin);
      setIsLoggedIn(true);
      setLoginState('success');
    };
  };
  return (
    <>
      {loginState === 'success' ? (<Redirect to="/" />) : null}
      <form onSubmit={handleSubmit}>
        {loginState === 'failed' ? '이메일 혹은 비밀번호를 추가해 주세요' : null}
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input type="email" name='email' class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input type="password" name='password' class="form-control" id="exampleInputPassword1" placeholder="Password" />
        </div>
        <button type="submit" class="btn btn-primary">Login</button>
        <button type="button" class="btn btn-secondary" onClick={() => history.push('/Join')}>Join</button>
      </form>
    </>
  )
}