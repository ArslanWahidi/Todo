import React from "react";
import axios from "axios";
import { useQuery } from '@tanstack/react-query';


export function Navbar() {

  const onLogOutHandler = async () =>{
    try{
      const csrf_res = await fetch('/csrf_token');
      const csrf_data = await csrf_res.json();

      const res = await axios.post('/log_out_user/', {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrf_data.csrfToken,
        }
      });

      if(res.status == 200){
        window.location = '/login_page/';
      }

    }catch(err){
      if(err.response.status === 401){
        window.location = '/login_page/'
      }
    }
  }

  const { data: authFlag, isLoading, isRefetching, isError, isSuccess } = useQuery({
    queryKey: ['check_auth'],
    queryFn: async () => {
      try{
        const res = await axios.get('/check_auth', 
        {
          headers: {
            "Content-Type": "application/json",
          }
        })
        return res.data.data;
      }catch(err){
        console.log(err)
      }

    },
    refetchOnWindowFocus: false
  });


  return (
    <>
      <nav className="mb-3 bg-blue-500 px-8">
        <div className="mx-auto flex items-center justify-between">
          <div className="flex relative justify-between">
            <a
              className="text-md font-bold leading-relaxed inline-block py-2 whitespace-nowrap uppercase text-white"
              href="http://127.0.0.1:8000"
            >
              Add Task
            </a>
            <a
              className="text-md font-bold leading-relaxed inline-block ml-[20px] py-2 whitespace-nowrap uppercase text-white"
              href="http://127.0.0.1:8000/completed"
            >
              Completed Task
            </a>
          </div>
          <div
            id="example-navbar-danger"
          >
            <ul className="flex list-none ml-auto">
              {authFlag ?
                <li className="nav-item">
                  <div className="cursor-default px-3 py-2 flex items-center text-md uppercase font-bold leading-snug text-white hover:opacity-75"
                    onClick={onLogOutHandler}
                    >
                    Log out
                  </div>
                </li> 
                  : 
                <>
                  <li className="nav-item">
                    <a className="px-3 py-2 flex items-center text-md uppercase font-bold leading-snug text-white hover:opacity-75"
                      href="/register_page"
                      >
                      Register
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="px-3 py-2 flex items-center text-md uppercase font-bold leading-snug text-white hover:opacity-75"
                      href="/login_page"
                      >
                      Login
                    </a>
                  </li>
                </>
              }
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
