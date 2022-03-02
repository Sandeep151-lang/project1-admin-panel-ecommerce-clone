import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button } from 'reactstrap'
import { useHistory } from 'react-router-dom'
import LoadingSpinners from './LoadingSpinners';

const AdminDashboard = () => {
    const history = useHistory()
    const [lis, setlist] = useState([])
    const [loading, setloading] = useState(true);
    const [pageNumbers, setPageNumber] = useState(0);
    const [numberofPages, setnumberofPages] = useState(0)
    const pages = new Array(pageNumbers + 1).fill(null).map((v, i) => i)

    const gotoPrevious = () => {
        setPageNumber(Math.max(0, pageNumbers - 1));
    };

    const gotoNext = () => {
        setPageNumber(Math.min(numberofPages - 1, pageNumbers + 1));
    };
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

    const list = async () => {
        try {
            const res = await axios.get(`/list?page=${pageNumbers}`);
            setlist(res.data.item)
            setnumberofPages(res.data.totalPages);
        } catch {
            window.alert('error')
        }
    }
    const remove = async (_id) => {
        try {
            await axios.delete(`/list/${_id}`)
            list()
        } catch {
            console.log('error')
        }

    }

    const edit = async (_id) => {
        try {
            await axios.get(`/product/${_id}`)
            history.push(`/product/${_id}`)
        } catch {
            console.log('error')
        }

    }

    useEffect(() => {
        userdata()
        list()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageNumbers])


    if (loading) {
        return <LoadingSpinners />
    } else {

        return (
            <>
                <div className='container mt-5'>
                    <table className="table caption-top">
                        <caption>List of Orders</caption>
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Status</th>
                                <th scope="col">View</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                lis.map((item, key) => {
                                    console.log(item)
                                    return (
                                        <tr key={key}>
                                            <th scope="row">{key + 1}</th>
                                            <td>{item._id}</td>
                                            <td>{item.shippingAddress.name.toUpperCase()}</td>
                                            <td style={{ 'fontWeight': 'bold', 'color': '#a9559b' }}>{item.status}</td>
                                            <td><Button className='btn btn-success' onClick={(e) => { edit(item._id) }}><i className="fal fa-edit"></i></Button></td>
                                            <td><Button className='btn btn-danger' onClick={(e) => remove(item._id)}><i className="fas fa-trash-alt"></i></Button></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    <div className='pagination my-2'>

                        <button onClick={gotoPrevious} className='prv-button btn-primary btn'>Previous</button>
                        {pages.map((index, key) => (

                            <button key={key} onClick={() => setPageNumber(index)} className='btn-button btn-success btn'>{index + 1}</button>
                        ))}
                        <button onClick={gotoNext} className='next-button btn-primary btn'>Next</button>
                    </div>

                </div>

            </>
        )
    }
}

export default AdminDashboard
