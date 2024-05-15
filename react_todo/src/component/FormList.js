import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import AccessTokenAPI from "../AccessTokenAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const FormList = () => {
  const [hideForm, setHideForm] = useState(true);
  function HideFormHandler() {
    setHideForm((preHideForm) => !preHideForm);
  }

  // Adding new to list by the Tanstack query.

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newData) =>{
      try{
        const csrf_res = await fetch("/csrf_token/");
        const csrf_data = await csrf_res.json();

        await AccessTokenAPI.post('/task_create/', newData, {
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrf_data.csrfToken,
          }
        })
      }catch(err){
        console.log(err)
        if(err.response.status === 401){
        }
      }
    },
    onSuccess: () =>{
      queryClient.invalidateQueries({queryKey: ['task_list']}, {exact: true})
    }
  })

  const { isPending } = mutation;

  const onSubmitNewTodoHandler = async (event) => {
    event.preventDefault();

    const formDatas = new FormData(event.target);
    const titleData = formDatas.get("title");
    const descriptionData = formDatas.get("description");

    // Data from input fields give to mutate as the object. 
    mutation.mutate({
      title: titleData,
      description: descriptionData
    })

    let formInputs = event.target;

    let titleInput = formInputs.elements.title;
    titleInput.value = "";

    let descriptionInput = formInputs.elements.description;
    descriptionInput.value = "";
  };

  return (
    <div className="bg-gray-50 p-3 shadow">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-4 text-left">Add New TODO</h2>
        <div>
          {isPending ? 
            <>
              <span>Adding New Todo</span> <FontAwesomeIcon spin icon={faSpinner} size='1x' /> 
            </>
            : null}
        </div>
        <button
          className="bg-blue-500 mb-4 hover:bg-blue-700 text-white px-4 rounded"
          onClick={HideFormHandler}
        >
          {hideForm ? "Hide Form" : "Show Form"}
        </button>
      </div>
      {hideForm && (
        <form className="mb-5" onSubmit={onSubmitNewTodoHandler}>
          <div className="mb-3">
            <input
              type="text"
              name="title"
              className="border border-gray-300 rounded p-2 w-full"
              placeholder="Title"
              required
            />
          </div>

          <div className="mb-3">
            <textarea
              name="description"
              className="border border-gray-300 rounded p-2 w-full"
              placeholder="Description"
              required
            ></textarea>
          </div>

          <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit">
            ADD
          </button>
        </form>
      )}
    </div>
  );
};

export default FormList;
