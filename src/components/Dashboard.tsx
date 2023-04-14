import React from 'react'
import { $user, login } from '../states/user'
import { navigate } from '../states/routes'
import  useGlobal  from '../hooks/useGlobal'
import { createRequest } from '../api/requests'

export const Dashboard = () => {

    const user = useGlobal($user, null)
    console.log(user)

  return (
    <div>
        <button onClick={createRequest}>Create</button>
        {user?.display_name}
        
    </div>

  )
}
