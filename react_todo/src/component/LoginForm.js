import React from 'react';
import axios from 'axios';

const LoginForm = () =>{

    const OnSubmitHandler = async (event) =>{
        event.preventDefault();

        try{
            const csrf_res = await fetch('/csrf_token');
            const csrf_data = await csrf_res.json();

            const formData = new FormData(event.target);
            
            const email  = formData.get('email');
            const password = formData.get('password');

            const res = await axios.post('/login_user/', {
                'email': email,
                'password': password
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrf_data.csrfToken,
                }
            });

            if(res.status === 200){
                window.location = '/';
            }

        }catch(err){
            console.log(err)
        }
    }

    return (
        <>
            <div className='mx-auto w-[40%] mt-[100px] bg-gray-100 px-6 pt-[60px] pb-[35px] rounded'>
                <h1 className='text-center text-3xl mb-[25px]'>Login</h1>
                <form className='flex flex-col gap-y-4' onSubmit={OnSubmitHandler} autoComplete="off">
                    <div className='flex flex-col'>
                        <label>Email</label>
                        <input type="text" id='email_id' name='email' 
                        className='border border-gray-400 rounded  focus:outline-none p-1'
                        autoComplete='off' required={false} />
                    </div>
                    <div className='flex flex-col'>
                        <label>Password</label>
                        <input type="password" id='password_id' name='password' 
                        className='border border-gray-400 focus:outline-none rounded p-1' 
                        autoComplete="new-password" />
                    </div>
                    <input type="submit" value='Login' className='border border-gray-400 rounded py-1 hover:bg-gray-50'/>
                </form>

                <div className='mt-[20px] text-right'>
                    <a href="/register_page/" className='hover:text-gray-600'>Not register yet?</a>
                </div>
            </div> 
        </>
    );
}

export default LoginForm;