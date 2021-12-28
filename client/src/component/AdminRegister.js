import React, { useState } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import axios from 'axios'
import { useHistory } from 'react-router'

const AdminRegister = () => {
    const history = useHistory();
    const [register, setregister] = useState({
        name: '',
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
            const url = `/admin/register`;
            const d = await axios.post(url, register);
            setregister(d.data);
            window.alert('user registerd');
            history.push('/admin/login')
        } catch {
            window.alert('invalid')
        }
    }

    return (
        <div className="container">
            <h2 className="text-center mt-5">Admin Register</h2>
            <Form inline className="mt-5 ml-5">
                <FormGroup className="mb-3 mr-sm-2 mb-sm-0">
                    <Label for="examplePassword" className="mr-sm-2">Enter Name</Label>
                    <Input type="text" id="name" placeholder='Enter name' value={register.name} onChange={onchange} />
                </FormGroup>
                <FormGroup className="mb-3 mr-sm-2 mb-sm-0">
                    <Label for="examplePassword" className="mr-sm-2">Enter email</Label>
                    <Input type="email" id="email" placeholder="Enter email" value={register.email} onChange={onchange} />
                </FormGroup>
                <FormGroup className="mb-3 mr-sm-2 mb-sm-0">
                    <Label for="exampleEmail" className="mr-sm-2">Enter Password</Label>
                    <Input type="password" id="password" placeholder="Enter password" value={register.password} onChange={onchange} />
                </FormGroup>

                <Button className='btn my-2  btn-success' onClick={onclick}>submit</Button>
            </Form >
        </div>
    )
}

export default AdminRegister;
