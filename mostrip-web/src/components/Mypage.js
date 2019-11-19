import React from 'react'
import "./../css/Mypage.css";

export default function Mypage() {
    return (
        <div className='div-box'>
            <form class="form-row">
                <div class="custom-file">
                    <input type="file" class="custom-file-input" id="validatedCustomFile" required />
                    <label class="custom-file-label" for="validatedCustomFile" data-browse="Image File">Choose file...</label>
                    <div class="invalid-feedback">Example invalid custom file feedback</div>
                </div>
                <div>
                    <div class="form-group">
                        <label for="inputEmail4">Email</label>
                        <input type="email" class="form-control" id="inputEmail4" placeholder="Email" />
                        <button type="button" class="btn btn-primary">check</button>
                    </div>
                    <div class="form-group">
                        <label for="inputPassword4">Password</label>
                        <input type="password" class="form-control" id="inputPassword4" placeholder="Password" />
                    </div>
                    <div class="form-group">
                        <label for="inputPassword4">Confirm Password</label>
                        <input type="password" class="form-control" id="inputPassword4" placeholder="Password" />
                    </div>
                </div>
                <button type="submit" class="btn btn-primary">Update</button>
            </form>
        </div>
    )
}