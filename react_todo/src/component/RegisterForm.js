import React from 'react';
import axios from 'axios';

const Register = () =>{

    const OnSubmitHandler = async (event) =>{
        event.preventDefault();

        const formData = new FormData(event.target);

        const name = formData.get('name');
        const email = formData.get('email');
        const password = formData.get('password');
        const confirmation = formData.get('confirmation');

        try{
            const csrf_res = await fetch('/csrf_token');
            const csrf_data = await csrf_res.json();

            const res = await axios.post('/register_new_user/',
            {
                'name': name,
                'email': email,
                'password': password,
                'confirmation': confirmation,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrf_data.csrfToken,
                }
            })

            if(res.status == 201){
                window.location = '/login_page/';
            }
            
        }catch(err){
            console.log(err);
        }

    }

return (
    <>
        <div className='mx-auto w-[40%] mt-[100px] px-6 py-[60px] rounded bg-gray-100'>
            <h1 className='text-center text-3xl mb-[25px]'>Register Yourself</h1>
            <form className='flex flex-col gap-y-4' onSubmit={OnSubmitHandler} autoComplete="off">
                <div className='flex flex-col'>
                    <label>Name</label>
                    <input type="text" id='name_id' name='name' 
                        className='border border-gray-400 rounded autofill:bg-white backdrop-blur-none focus:outline-none p-1' 
                        autoComplete='off' />
                </div>
                <div className='flex flex-col'>
                    <label>Email</label>
                    <input type="text" id='email_id' name='email' 
                        className='border border-gray-400 rounded autofill:bg-white backdrop-blur-none focus:outline-none p-1'
                        autoComplete='off' required={false} />
                </div>
                <div className='flex flex-col'>
                    <label>Password</label>
                    <input type="password" id='password_id' name='password' 
                        className='border border-gray-400 rounded focus:outline-none autofill:bg-white backdrop-blur-none p-1' 
                        autoComplete="new-password" />
                </div>
                <div className='flex flex-col'>
                    <label>Confirmation</label>
                    <input type="password" id='confirmation_id' name='confirmation' 
                        className='border border-gray-400 rounded autofill:bg-white backdrop-blur-none focus:outline-none p-1' 
                        autoComplete="new-password" />
                </div>
                <input type="submit" value='Register' className='border border-gray-400 rounded py-1 hover:bg-gray-50'/>
            </form>
        </div> 
    </>
    );
}

export default Register;