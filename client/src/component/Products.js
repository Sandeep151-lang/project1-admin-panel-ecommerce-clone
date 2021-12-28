import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button } from 'reactstrap'
import { useHistory } from 'react-router-dom'
import LoadingSpinners from './LoadingSpinners';

const Products = () => {
    const history = useHistory()

    const [data, setdata] = useState([]);
    const [loading, setloading] = useState(true);


    const userdata = async () => {
        try {
            const res = await axios.create({

                withCredentials: true,
                credentials: "include",
            }).get('/about')
            // console.log(res.data.message)
            if (res.status === 200) {
                localStorage.getItem('jwt');
                setloading(false);
            }
        } catch (err) {
            history.push('/admin/login')
        }
    }

    const url = `/getproduct`;
    const list = async () => {
        const token = window.localStorage.getItem('jwt')
        try {
            const res = await axios.get(url, { headers: { "Authorization": `Bearer ${token}` } });
            if (res.status === 200) {
                setdata(res.data.message);

            }
        } catch (err) {
            window.alert(`error`)
        }
    }
    const remove = async (_id) => {
        try {
            await axios.delete(`/item/${_id}`)
            list()
        } catch {
            console.log('error')
        }

    }



    useEffect(() => {
        userdata()
        list()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (loading) {
        return <LoadingSpinners />
    } else {
        return (
            <div className='container mt-5'>
                <table className="table caption-top">
                    <caption>Product List</caption>
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">ID</th>
                            <th scope="col">Product-Name</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((item, key) => {
                                return (
                                    <tr key={key}>
                                        <th scope="row">{key + 1}</th>
                                        <td>{item._id}</td>
                                        <td>{item.product_name}</td>

                                        <td><Button className='btn btn-danger' onClick={(e) => remove(item._id)}><i className="fas fa-trash-alt"></i></Button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Products
