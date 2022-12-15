




import React, { createContext } from 'react';



export const DBcontext =  createContext({} as any);



export const DBProvider = ({ children }: any) => {

    const dbConection = () => {
        
    }
  
    return (
        <DBcontext.Provider value={
            dbConection
        }>
            { children }
        </DBcontext.Provider>
  )
}
