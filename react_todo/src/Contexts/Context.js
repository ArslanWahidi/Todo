import React, { createContext, useState } from "react";

const Context = createContext()


export const ContextProvider = ({children}) =>{

    return (
        <Context.Provider 
          value={
            {
            }
          }
        >
          {children}
        </Context.Provider>
    );
}

export default Context;