import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import AccessTokenAPI from "../AccessTokenAPI";

const EditModal = ({ onCloseModel, id, data }) =>{
  const queryClient = useQueryClient();

  const [ individualItem, setIndividualData ] = useState({
    title: data.title,
    description: data.description,
    completed: data.completed
  });
  
  const InputHandler = (event)=>{
    const {name, value} = event.target;
    setIndividualData((preIndividualItem) =>({
      ...preIndividualItem,
        [name]: value,
      }))
    }

    const mutation = useMutation({
      mutationFn: async (newData) =>{
        const csrf_res = await fetch('/csrf_token/');
        const csrf_data = await csrf_res.json();

        try{
          await AccessTokenAPI.post(`/task_update/${id}/`, newData, {
            headers: {
              'Content-Type': 'application/json',
              'X-CSRFToken': csrf_data.csrfToken,  
            }
          })
        }catch(err){
          if(err.response.status === 401){
            
          }
        }
        console.log(newData)
      },
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: ['task_list']}, {exact: true});
        onCloseModel(false)
      }
    })

    const { isPending } =  mutation;

    const OnSubmitEditItemhandler = async (event) =>{
      event.preventDefault();
      const formData = new FormData(event.target);
      const titleData = formData.get('title');
      const descriptionData = formData.get('description');
      const completedData = formData.get('completed');

      // Update the data of the list by the Tanstack Query.
      mutation.mutate({
        title: titleData,
        description: descriptionData,
        completed: completedData === 'on' ? 'true' : 'false',
      })

    }

    return (
        <div className="bg-zinc-300 bg-opacity-90 fixed inset-0 z-10">
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-1/2 my-2">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between py-2 px-4 border-b border-solid border-gray-300 rounded-t">
                  <h3 className="text-2xl font=semibold">Edit Task</h3>
                  <button>
                    <span className="bg-gray-300 rounded-full px-[0.65rem] pt-[0.05rem] pb-[0.35rem] h-7 w-2 text-1xl" onClick={() => onCloseModel(false)}>x</span>
                  </button>
                </div>
                <div className="relative opacity-80 flex-auto">
                  <div className="h-[24px] my-[5px] text-center text-xs">
                    {isPending ? 
                      <>
                        Updating Todo Changes <FontAwesomeIcon spin icon={faSpinner} size='1x' /> 
                      </>
                    : null}
                  </div>
                  <form onSubmit={OnSubmitEditItemhandler}>
                    <div className="bg-gray-200 z-10 bg-opacity-1000 shadow-md rounded px-6 pt-4 pb-6 w-5/6 mb-6 mx-auto">
                      <label className="block text-black text-sm font-bold mb-1">
                        Title
                      </label>
                      <input 
                        onChange={InputHandler} 
                        className="shadow border rounded w-full py-2 px-1 text-black" 
                        name="title" 
                        value={individualItem.title} />
                      <label className="block text-black text-sm font-bold mb-1">
                        Description
                      </label>
                      <textarea 
                        onChange={InputHandler} 
                        className="shadow border rounded w-full py-2 px-1 text-black" 
                        name='description' 
                        value={individualItem.description}></textarea>
                      <label className="block text-black text-sm font-bold mb-1">
                        Completed
                      </label>
                      <input 
                        onChange={InputHandler} 
                        type="checkbox" 
                        className="shadow border w-4 h-5" 
                        name="completed" /> 
                    </div>

                    <div className="flex items-center justify-end border-t border-solid border-gray-300 py-4 rounded-b">
                      <button
                        className="text-white bg-blue-500 active:bg-gray-700 font-bold uppercase text-sm px-6 py-3 mx-16 rounded shadow hover:shadow-lg outline-none focus:outline-none mb-1"
                        type="submit"
                      >Submit</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
}

export default EditModal;