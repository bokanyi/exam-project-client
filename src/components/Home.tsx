import React, { useState, useEffect } from 'react'
import generateRandomString from 'generate-random-string'

const rootUrl = "https://accounts.spotify.com/authorize"
const client_id = "2c52ca5243d44c8aa54b4d26aacf8c30"
const redirect_uri = "http://localhost:5173/login"
const state = generateRandomString("16", false)
const scope = "streaming \
user-read-email \
user-read-private \
playlist-read-private \
playlist-modify-private \
playlist-modify-public"

const AUTH_URL = `${rootUrl}
?client_id=${client_id}
&response_type=code
&redirect_uri=${redirect_uri}
&state=${state}
&scope=${scope}`
  
export const Home = () =>{

    return ( <div> 
        <a href={AUTH_URL}>
            Login with spotify
        </a>
         </div>
        )   
}