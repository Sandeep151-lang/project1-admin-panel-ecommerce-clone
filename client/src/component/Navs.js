import React, { useContext, useEffect } from 'react'
import { MyContext } from '../App';
import { NavLink } from 'react-router-dom';
import axios from 'axios';



const Navs = () => {
    const { dispatch } = useContext(MyContext)


    const userdata = async () => {
        // const token = window.localStorage.getItem('jwt')
        try {

            const res = await axios.create({

                withCredentials: true,
                credentials: "include",
            }).get('/about')
            // console.log(res.data.message)
            if (res.status === 200) {
                dispatch({ type: 'USER', payload: true })
                localStorage.getItem('jwt');


            }
        } catch (err) {
            console.log('error')
            // window.alert(`please login`)
        }
    }
    useEffect(() => {

        userdata()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const { state } = useContext(MyContext);
    if (state) {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light w3-card-4">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <NavLink className="navbar-brand" to='/'>Home</NavLink>

                        </ul>
                        <span className="navbar-text">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <NavLink className='nav-link' to="/About">About</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className='nav-link' to="/Products">Product-List</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className='nav-link' to="/Create">Create-Product</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className='nav-link' to="/Admin/dashboard">Order-List</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className='nav-link' to="/Logout">Logout</NavLink>
                                </li>
                            </ul>

                        </span>
                    </div>

                </div>
            </nav>
        )
    } else {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light w3-card-4">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <NavLink className="navbar-brand" to="/">Home</NavLink>

                        </ul>
                        <span className="navbar-text">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <NavLink className='nav-link' to="/Admin/login">Login</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className='nav-link' to="/Admin/register">Register</NavLink>
                                </li>

                            </ul>

                        </span>
                    </div>

                </div>
            </nav>
        )
    }
}

export default Navs
