import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';



const Login = () => {
    const history = useHistory();

    const [initialValues, setinitialvalues] = useState({
        name: '',
        email: '',
        password: ''
    })

    //validation for adding users data 
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        password: Yup.string()
            .required('Please Enter your password'),
        email: Yup.string().matches(
            "^[a-z0-9](.?[a-z0-9]){5,}@g(oogle)?mail.com$",
            "At least five alphanumeric characters and Must contain @gmail.com"
        )
            .email('Email is invalid')
            .required('Email is required'),

    });



    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema}
            onSubmit={async (values) => {
                // same shape as initial values

                try {
                    const post = await axios.post(`/admin/register`, values)
                    alert(post.data.message)

                    setinitialvalues(post)
                    history.push("/Admin/login")

                } catch (error) {
                    alert(error.response.data.message)
                }
            }}>


            {({ errors, touched }) => {
                return (
                    <>
                        <div className="container text-center"><h1 className="font-weight-bold text-dark">Admin Register</h1></div>
                        <Form className="container w3-card-4 center register-form" style={{ 'width': '50%', 'marginBottom': '20px' }}>

                            <div className="form-row my-3">
                                <div className="form-group col-12 ">
                                    <label className='mt-4'>Name</label>
                                    <Field name="name" type="text" className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} />
                                    <ErrorMessage name="name" component="div" className="invalid-feedback" />
                                </div>
                            </div>
                            <div className="form-row my-3">
                                <div className="form-group col-12">
                                    <label>Email</label>
                                    <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                    <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                </div>
                            </div>
                            <div className="form-row my-3">
                                <div className="form-group col-12">
                                    <label>Password</label>
                                    <Field name="password" type="text" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                    <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                </div>
                            </div>
                            <div>
                                <button className="btn btn-primary my-3 mr-2" type="submit">Submit</button>
                                <button className="btn btn-success my-3 mx-2" type="reset">Reset</button>
                                <span>Already SingUp please <Link to='/admin/login'>LogIn</Link></span>
                            </div>
                        </Form>
                    </>
                );
            }}
        </Formik>

    );
}

export default Login
