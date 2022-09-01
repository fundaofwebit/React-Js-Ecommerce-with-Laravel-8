import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Order()
{
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);

    useEffect(() => {

        let isMounted = true;
        document.title = "Orders";

        axios.get(`/api/admin/orders`).then(res=>{
            if(isMounted)
            {
                if(res.data.status === 200)
                {
                    setOrders(res.data.orders);
                    setLoading(false);
                }
            }
        });
        return () => {
            isMounted = false
        };
    }, []);

   
    var display_orders = "";
    if(loading)
    {
        return <h4>Loading Orders...</h4>
    }
    else
    {
        display_orders = orders.map( (item) => {
            
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.tracking_no}</td>
                    <td>{item.phone}</td>
                    <td>{item.email}</td>
                    <td>
                        <Link to={`view-order/${item.id}`} className="btn btn-success btn-sm">View</Link>
                    </td>
                </tr>
            )
        });
    }

    return (
        <div className="container px-4 mt-3">
        <div className="card">
            <div className="card-header">
                <h4>Orders  </h4>
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tracking No.</th>
                                <th>Phone No.</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {display_orders}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </div>
    )

}

export default Order;