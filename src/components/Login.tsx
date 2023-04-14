import { useState, useEffect } from 'react'
import { $user, login } from '../states/user'
import { navigate } from '../states/routes'
import  useGlobal  from '../hooks/useGlobal'


export const Login = () =>{

  const user = useGlobal($user, null)


    useEffect(() => {
        const urlSearchParams = new URLSearchParams(window.location.search)
        const code = urlSearchParams.get("code") 
        
        if (code) login(code)
        navigate("/dashboard")
        
      }, [])     


    return ( <div> 
        Login
         </div>
        )   
}