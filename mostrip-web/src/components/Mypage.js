import React, { useState, useEffect } from 'react'
import "./../css/Mypage.css";
import axois from 'axios';
import { baseURL } from '../config';

export default function Mypage() {
    const [email, setemail] = useState('')
    const [image, setImage] = useState(null)
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [isPasswordSame, setIsPasswordSame] = useState(false);

    useEffect(() => {
        const exp = document.cookie.split(' ')[1];
        const result = JSON.parse(atob(exp.split('.')[1]));
        setemail(result.email)
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isPasswordSame || (password === '' && password2 === '')) {
            const jwt = document.cookie;
            const token = jwt.split(" ")[1];
            const { email } = JSON.parse(atob(token.split(".")[1]));
            console.log(email);

            const formData = new FormData();
            formData.append('file', image);
            formData.append('email', email);
            formData.append('password', password);

            const { data } = await axois.post(`${baseURL}/auth/mypage`, formData);
            if (data.result === true) {
                alert('개인 정보가 수정되었습니다.')
                return
            } else {
                alert('오류 입니다. 관리자에게 문의해주세요.')
                return
            }
        } else {
            alert('비밀번호가 일치하지않습니다.')
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
            <form className="form-row" onSubmit={handleSubmit}>
                <div className="custom-file">
                    <input type="file" className="custom-file-input" id="validatedCustomFile" onChange={e => uploadImage(e.target.files[0])} />
                    <label className="custom-file-label" for="validatedCustomFile" data-browse="Image File">{image ? image.name : "Choose file..."}</label>
                </div>
                <div>
                    <div className="form-group">
                        <label for="inputEmail4">Email</label>
                        <input type="email" className="input-style" id="inputEmail4" placeholder={email} disabled />
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