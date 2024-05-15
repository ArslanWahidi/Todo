import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AccessTokenAPI from "../AccessTokenAPI";


const DeleteModal = ({ onCloseModel, id }) => {

  const CancelClickHandler = () => {
    onCloseModel(false);
  };

  // Deleting an item by the Tanstack query.

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () =>{
      const csrf_res = await fetch("/csrf_token/");
      const csrf_data = await csrf_res.json();

      try{
        await AccessTokenAPI.post(`/task_delete/${id}/`, null, {
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrf_data.csrfToken,
          }
        });
      }catch(err){
        
      }

    },
    onSuccess: () =>{
      queryClient.invalidateQueries({queryKey: ['task_list']}, {exact: true})
      onCloseModel((preModalOn) => !preModalOn);
    }
  })

  const { isPending } = mutation;

  const OKClickHandler = async () => {
    mutation.mutate();
  };

  return (
    <div className="bg-zinc-200 bg-opacity-80 fixed inset-0 z-50">
      <div className="flex h-screen justify-center items-center">
        <div className="flex-col justify-center bg-white py-9 px-24 border-4 border-sky-600 rounded-xl z-[999]">
          <div className="my-[10px] h-[20px] text-center text-xs">
            {isPending ? 
              <>
                Deleting Todo <FontAwesomeIcon spin icon={faSpinner} size="1x" />
              </>
             : null}
          </div> 
          <div className="flex  text-lg text-zinc-600 mb-10">
            Are you sure you want to delete item ?
          </div>
          <div className="flex justify-center">
            <button
              onClick={OKClickHandler}
              className="rounded px-4 py-2 text-red-500 hover:bg-gray-300"
            >
              Yes
            </button>
            <button
              onClick={CancelClickHandler}
              className="rounded px-4 py-2 ml-4 text-white bg-blue-500 hover:bg-blue-700"
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
