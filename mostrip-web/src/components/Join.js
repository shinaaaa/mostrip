import React, { useState } from 'react';
import axois from 'axios';
import { Redirect } from 'react-router-dom';
import { baseURL } from '../config';
import "./../css/Join.css";

export default function Join() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [isEmailChecked, setIsEmailChecked] = useState('yet');
    const [isPasswordSame, setIsPasswordSame] = useState(false);
    const [joinResult, setJoinResult] = useState(false);
    const checkEmail = async () => {
        const { data } = await axois.get(`${baseURL}/auth/email?email=${email}`);
        setIsEmailChecked(data.result);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isEmailChecked || isEmailChecked === 'yet') {
            alert('이메일 중복을 확인하세요');
            return;
        }
        if (!e.target.name.value || !email || !password) {
            alert('모든 값을 입력해주세요');
            return;
        }
        const { data } = await axois.post(`${baseURL}/auth/join`, {
            name: e.target.name.value,
            email,
            password,
        });
        if (data.result) {
            setJoinResult(true);
        } else {
            alert('회원 가입 실패 관리자에게 문의하세요.');
        }
    };
    return (
        <div className='div-box'>
            {joinResult && <Redirect to='/Login' />}
            <form className='form-row' onSubmit={handleSubmit} >
                <div class="custom-file">
                    <input type="file" class="custom-file-input" id="validatedCustomFile" required />
                    <label class="custom-file-label" for="validatedCustomFile" data-browse="Image File">Choose file...</label>
                    <div class="invalid-feedback">Example invalid custom file feedback</div>
                </div>
                <div class="form-group">
                    <label>Name</label>
                    <input type="text" name='name' class="form-control" placeholder="Name" />
                </div>
                <div class="form-group">
                    <label>Email address</label>
                    <input type="email" class="form-control" placeholder="Enter email" value={email} onChange={e => {
                        setIsEmailChecked("yet");
                        setEmail(e.target.value);
                    }}
                    />
                    <button type="button" class="btn btn-primary" onClick={checkEmail}>Check</button>
                    {isEmailChecked === 'yet' ? 'Check for the availability of the email.' : isEmailChecked ? 'This email is available. Do you wish to use it?' : 'This email is already in use.'}
                </div>
                <div class="form-group">
                    <label>password</label>
                    <input type="password" class="form-control" placeholder="Password" value={password}
                        onChange={e => {
                            setPassword(e.target.value);
                            setIsPasswordSame(e.target.value === password2);
                        }}
                    />
                </div>
                <div class="form-group">
                    <label>confirm password</label>
                    <input type="password" class="form-control" placeholder="Password" value={password2}
                        onChange={e => {
                            setPassword2(e.target.value);
                            setIsPasswordSame(e.target.value === password);
                        }}
                    />
                </div>
                <small>{isPasswordSame ? null : 'The passowrd does not match. Try again.'}</small>
                <button type="submit" class="btn btn-primary">Join</button>
            </form>
        </div >
    )
}
