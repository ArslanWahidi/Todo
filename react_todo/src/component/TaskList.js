import React from "react";
import List from "./List";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQuery } from '@tanstack/react-query';
import AccessTokenAPI from "../AccessTokenAPI";
import { toast } from "react-toastify";


const TaskList = () => {

  const { data, isLoading, isRefetching, isError, isSuccess } = useQuery({
    queryKey: ['task_list'],
    queryFn: async () => {
      try{
        const res = await AccessTokenAPI.get('/task_list', 
        {
          headers: {
            "Content-Type": "application/json",
          }
        })
        return res.data;
      }catch(err){
        if(err.response.status === 401){
          toast('You have to login in order to enable functinality.');
        }
      }
    },
  });


  return (
    <div className="p-3">
      <h2 className="text-lg font-bold mb-3">List of Task</h2>
      {isError ? 
        <div className="text-center">
          You have to login in order to see your TODO.
        </div>
        :
        isLoading || isRefetching ? 
        <div className="text-center mb-[5px]">
          Bring Latest Updates <FontAwesomeIcon spin icon={faSpinner} size='1x' /> 
        </div>
        : null
      }
      {isSuccess ? data?.map((item) => {
        if (item.completed === false) {
          return <List key={item.id} item={item} />
        }
      }) : null}
    </div>
  );
};

export default TaskList;
