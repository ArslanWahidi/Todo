import React from "react";  
import { Navbar } from "./component/Navbar";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CompletedTask } from "./component/CompletedTask";

const Completed = () => {
  const client = new QueryClient();

  return (
    <QueryClientProvider client={client}>
      <Navbar />
      <div>
        <CompletedTask />
      </div>
    </QueryClientProvider>
  );
};

export default Completed;
