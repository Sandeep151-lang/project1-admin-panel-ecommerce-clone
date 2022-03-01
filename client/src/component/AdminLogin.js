import React, { useState, useContext } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import axios from 'axios'
import { useHistory } from 'react-router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MyContext } from '../App';

const AdminLogin = () => {
    const { dispatch } = useContext(MyContext)

    const toke = localStorage.getItem('jwt')
    const history = useHistory();
    const [register, setregister] = useState({
        email: '',
        password: ''
    })

    const onchange = (e) => {
        const name = e.target.id;
        setregister({ ...register, [name]: e.target.value });
    }

    const onclick = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.create({

                withCredentials: true,
                credentials: "include",
            }).post('/admin/login', register, { headers: { "Authorization": `Bearer ${toke}` } })

            setregister(res.data)
            const { jwt } = res.data;
            if (res.status === 200) {
                dispatch({ type: 'USER', payload: true })
                localStorage.setItem('jwt', jwt)
                window.alert('login successfull')
                history.push('/create')
                toast("login success");

            }
        } catch {
            window.alert('invalid')
        }
    }


    return (
        <div className="container">
            <h2 className="text-center mt-5">Admin Login</h2>
            <Form inline className="mt-5 ml-5">
                <FormGroup className="mb-3 mr-sm-2 mb-sm-0">
                    <Label for="examplePassword" className="mr-sm-2">Enter email</Label>
                    <Input type="email" id="email" placeholder="Enter email" value={register.email} onChange={onchange} />
                </FormGroup>
                <FormGroup className="mb-3 mr-sm-2 mb-sm-0">
                    <Label for="exampleEmail" className="mr-sm-2">Enter Password</Label>
                    <Input type="password" id="password" placeholder="Enter password" value={register.password} onChange={onchange} />
                </FormGroup>
                <Button className='btn my-2  btn-success login-button' onClick={onclick}>submit</Button>
                <ToastContainer />
            </Form >
        </div>
    )
}

export default AdminLogin;
