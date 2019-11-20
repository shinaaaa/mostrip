import React from 'react'
import "./../css/Mypage.css";

export default function Mypage() {
    return (
        <div className='div-box'>
            <form className="form-row">
                <div class="custom-file">
                    <input type="file" className="custom-file-input" id="validatedCustomFile" required />
                    <label className="custom-file-label" for="validatedCustomFile" data-browse="Image File">Choose file...</label>
                    <div className="invalid-feedback">Example invalid custom file feedback</div>
                </div>
                <div>
                    <div className="form-group">
                        <label for="inputEmail4">Email</label>
                        <input type="email" className="form-control" id="inputEmail4" placeholder="Email" />
                        <button type="button" className="btn btn-primary">check</button>
                    </div>
                    <div className="form-group">
                        <label for="inputPassword4">Password</label>
                        <input type="password" className="form-control" id="inputPassword4" placeholder="Password" />
                    </div>
                    <div className="form-group">
                        <label for="inputPassword4">Confirm Password</label>
                        <input type="password" className="form-control" id="inputPassword4" placeholder="Password" />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    )
}