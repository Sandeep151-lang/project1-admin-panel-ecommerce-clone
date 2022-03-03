import React, { useEffect, useContext } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router'
import { MyContext } from '../App';

const Logout = () => {
    const { dispatch } = useContext(MyContext)
    const history = useHistory();
    useEffect(() => {
        axios.create({

            withCredentials: true,
            credentials: "include",
        }).get('/logout').then((res) => {
            dispatch({ type: 'USER', payload: false })
            history.push('/Admin/login', { replace: true })
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div>
            <h1 className='text-center'>Logout page</h1>
        </div>
    )
}

export default Logout
