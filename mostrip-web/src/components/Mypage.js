import React, { useState, useEffect } from 'react'
import "./../css/Mypage.css";
import axois from 'axios';
import { Redirect } from 'react-router-dom';
import { baseURL } from '../config';
import jwt_decode from 'jwt-decode';

export default function Mypage() {
    const [email, setemail] = useState('')
    const [image, setImage] = useState(null)
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [isPasswordSame, setIsPasswordSame] = useState(false);
    const [confirm, setConfirm] = useState(false);

    useEffect(() => {
        if (document.cookie) {
            const exp = document.cookie.split(' ')[1];
            var result = jwt_decode(exp);
            setemail(result.email)
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        if (isPasswordSame || image === null) {
            formData.append('password', password);
        }
        if ((password === '' && password2 === '') || image) {
            formData.append('file', image);
            return
        }
        if ((password === '' && password2 === '') && image === null) {
            alert('변경 사항을 기재해주세요.')
        }
        formData.append('email', email);
        const { data } = await axois.post(`${baseURL}/auth/mypage`, formData);
        if (data.result === true) {
            alert('개인 정보가 수정되었습니다.')
            setConfirm(true);
            return
        } else {
            alert('오류 입니다. 관리자에게 문의해주세요.')
            return
        }
    }

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
        <div className='div-box'>
            {document.cookie ? null : <Redirect to='/Login' />}
            {confirm ? <Redirect to='/' /> : null}
            <form className="form-row" onSubmit={handleSubmit}>
                <div className="custom-file">
                    <input type="file" className="custom-file-input" id="validatedCustomFile" onChange={e => uploadImage(e.target.files[0])} />
                    <label className="custom-file-label" for="validatedCustomFile" data-browse="Image File">{image ? image.name : "Choose file..."}</label>
                </div>
                <div>
                    <div className="form-group">
                        <label for="inputEmail4">Email</label>
                        <input type="email" className="input-style" id="inputEmail4" placeholder={email} required disabled />
                    </div>
                    <div className="form-group">
                        <label for="inputPassword4">Password</label>
                        <input type="password" className="form-control" id="inputPassword4" placeholder="Password"
                            onChange={e => {
                                setPassword(e.target.value);
                                setIsPasswordSame(e.target.value === password2);
                            }} />
                    </div>
                    <div className="form-group">
                        <label for="inputPassword1">Confirm Password</label>
                        <input type="password" className="form-control" id="inputPassword1" placeholder="Password"
                            onChange={e => {
                                setPassword2(e.target.value);
                                setIsPasswordSame(e.target.value === password);
                            }} />
                    </div>
                </div>
                <small>{isPasswordSame ? null : 'The passowrd does not match. Try again.'}</small>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    )
}