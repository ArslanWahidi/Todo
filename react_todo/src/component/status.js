import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import AccessTokenAPI from '../AccessTokenAPI';


const Status = ({children, flag, id}) =>{
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (newData) =>{
          const csrf_res = await fetch('/csrf_token/');
          const csrf_data = await csrf_res.json();
  
          try{
            await AccessTokenAPI.post(`/status_task_update/${id}/`, newData, {
              headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrf_data.csrfToken,  
              }
            })
          }catch(err){
            if(err.response.status === 401){
              
            }
          }
        },
        onSuccess: () => {
          queryClient.invalidateQueries({queryKey: ['task_list']}, {exact: true});
        }
      })

    const onChangeStatus = () =>{
        mutation.mutate({
            'completed': flag
        })
    }

    return(
        <div 
            onClick={onChangeStatus}  
            className='border border-gray rounded bg-blue-500 text-white px-[5px] text-[12px] inline-block max-w-none cursor-pointer'
        >
            {children}
        </div>
    )
}

export default Status;