import { useState, useEffect } from 'react'
import { login } from '../states/user'


export const Login = () =>{

    useEffect(() => {
        const urlSearchParams = new URLSearchParams(window.location.search)
        const code = urlSearchParams.get("code") 
        if (code) login(code)
        console.log(code)
      }, [])

    return ( <div> 
        Login
         </div>
        )   
}