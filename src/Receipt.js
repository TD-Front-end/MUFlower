import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';

const ReceiptDetail = () => {
    const [item, setItem] = useState([]);
    const [total, setTotal] = useState(0);
    const id = useParams();
    const getFlower = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/receiptDetail/${id.ReceiptID}`)
            setItem(
                res.data,
            )
            var total = 0;
            res.data.forEach(element => {
                console.log(element.Price);
                total = total + element.Price;
            })
            setTotal(total)
        } catch (error) {
            console.log(error);
        }
    }
    getFlower();
    return (
        <React.Fragment>
            <div className="alert alert-success mt-3">
                <strong>Cảm ơn vì đã mua hàng</strong>
            </div>
            <div className="alert alert-info mt-3">
                <strong>Chi tiết Hóa đơn (Số hóa đơn: {id.ReceiptID})</strong>
            </div>
            <div className="row">
            </div><br /><div className="table-responsive-md">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên hoa</th>
                            <th>Giá tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        {item.map((data, index) => (

                            <tr key={index + 1}>
                                <td>{index + 1}</td>
                                <td>{data.FlowerName}</td>
                                <td>{data.Price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="d-flex mt-3 justify-content-around">
                    <Link className='btn btn-primary' to={'/home'}>Về trang chủ</Link>
                    <div>Tổng Cộng: {new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'VND' }).format(total)}</div>

                </div>
            </div>
        </React.Fragment>
    )
}


export default ReceiptDetail