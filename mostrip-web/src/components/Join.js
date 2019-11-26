import React, { useState } from 'react';
import axois from 'axios';
import { Redirect } from 'react-router-dom';
import { baseURL } from '../config';
import "./../css/Join.css";
import Joi from '@hapi/joi';

export default function Join() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [isEmailChecked, setIsEmailChecked] = useState('yet');
    const [isPasswordSame, setIsPasswordSame] = useState(false);
    const [joinResult, setJoinResult] = useState(false);
    const [image, setImage] = useState(null);

    const validate = (user) => {
        const emailValidate = Joi.object({
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        })
        return emailValidate.validate(user);
    }

    const checkEmail = async () => {
        if (email === '') {
            alert('이메일을 입력해주세요.');
            return;
        }

        if (validate({ email }).error) {
            alert('올바른 이메일 형식이 아님니다.');
            return;
        }

        const { data } = await axois.get(`${baseURL}/auth/email?email=${email}`);
        setIsEmailChecked(data.result);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isEmailChecked || isEmailChecked === 'yet') {
            alert('이메일 중복을 확인하세요.');
            return;
        }
        if (!e.target.name.value || email === '' || password === '' || name === '' || password2 === '') {
            alert('모든 값을 입력해주세요');
            return;
        }

        const formData = new FormData();
        formData.append('file', image);
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);

        const { data } = await axois.post(`${baseURL}/auth/join`, formData);
        if (data.result) {
            setJoinResult(true);
        } else {
            alert('회원 가입 실패 관리자에게 문의하세요.');
        }
    };

    const uploadImage = (e) => {
        if (e.type === 'image/png' || e.type === 'image/jpeg' || e.type === 'image/jpg') {
            setImage(e);
            console.log(e);





            return
        } else {
            alert('이미지 형식만 가능합니다.');
            return
        }
    }

    return (
        <div className='div-box'>
            {document.cookie ? <Redirect to='/' /> : null}
            {joinResult && <Redirect to='/Login' />}
            <form className='form-row' onSubmit={handleSubmit} >
                <div className="custom-file">
                    <input type="file" name="file" className="custom-file-input" id="validatedCustomFile"
                        onChange={e => uploadImage(e.target.files[0])} required />
                    <label className="custom-file-label" for="validatedCustomFile" data-browse="Image File">{image ? image.name : 'Choose file...'}</label>
                </div>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" name='name' className="form-control" placeholder="Name" value={name}
                        onChange={e => { setName(e.target.value) }} required />
                </div>
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" value={email}
                        onChange={e => {
                            setIsEmailChecked("yet");
                            setEmail(e.target.value);
                        }} required
                    />
                    <button type="button" className="btn btn-primary" onClick={checkEmail}>Check</button>
                    {isEmailChecked === 'yet' ? '중복확인 버튼을 클릭해 주세요.' : isEmailChecked ? '사용 가능한 이메일입니다.' : '이미 사용 중인 이메일입니다.'}
                </div>
                <div className="form-group">
                    <label>password</label>
                    <input type="password" className="form-control" placeholder="Password" value={password}
                        onChange={e => {
                            setPassword(e.target.value);
                            setIsPasswordSame(e.target.value === password2);
                        }} required
                    />
                </div>
                <div className="form-group">
                    <label>confirm password</label>
                    <input type="password" className="form-control" placeholder="Password" value={password2}
                        onChange={e => {
                            setPassword2(e.target.value);
                            setIsPasswordSame(e.target.value === password);
                        }}
                    />
                </div>
                <small>{isPasswordSame ? null : '비밀번호가 동일하지 않습니다.'}</small>
                <button type="submit" className="btn btn-primary">Join</button>
            </form>
        </div >
    )
}
