import React from "react";
import TaskList from "./component/TaskList";
import FormList from "./component/FormList";
import { Navbar } from "./component/Navbar";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


function App() {
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
        <>
          <Navbar />  
          <div className="mb-5">
            <FormList />
            <TaskList />
          </div>
        </>
    </QueryClientProvider>
  );
}

export default App;
