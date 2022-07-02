import React, { useState } from 'react'
import './FlowerDetail.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FlowerDetail = () => {
    const navigate = useNavigate();
    const { search } = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';
    //
    const [item, setItem] = useState({});
    const id = useParams();
    const getFlower = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/flowers/${id.FlowerID}`)
            setItem(
                res.data,
            )
        } catch (error) {
            console.log(error);
        }
    }
    const notify = () => {
        toast('Add to cart success!');
    }
    const addToCart = ()=>{
        try {
            const cart = {
                FlowerID: item.FlowerID, 
                UserID: 1
                
            }
            axios.post(`http://localhost:5000/cart`, cart)
            .then(res => {
                console.log(res);
                console.log(res.data);
                notify();
            })
            window.alert('Thêm vào giỏ hàng thành công');
            navigate(redirect || '/');
        } catch (error) {
            toast.error('You must Login');
            console.log(error);
        }
    }
    getFlower();
    return (
        <React.Fragment>
            <div className="card">
                <div className="card-body">
                    <h3 className="card-title">{item.FlowerName}</h3>
                    <div className="row">
                        <div className="col-lg-5 col-md-5 col-sm-6">
                            <div className="white-box text-center"><img src={item.imgeFlower} width={'100%'} className="img-responsive" alt='Ảnh hoa' /></div>
                        </div>
                        <div className="col-lg-7 col-md-7 col-sm-6">
                            <h4 className="box-title mt-5">Mô tả sản phẩm</h4>
                            <p>Giá trị của hoa càng được khẳng định hơn, qua quá trình con người tinh chế và chế biến thành các loại sản phẩm khác nhau. Hoa không chỉ mang lại vẻ đẹp về thẩm mỹ, mà còn có hương thơm dịu dàng và quý phái.</p>
                            <h2 className="mt-5">
                                {new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'VND' }).format(item.Price)}
                            </h2>
                            <button className="btn btn-success btn-rounded mr-1" data-toggle="tooltip" title="" data-original-title="Add to cart" onClick={addToCart} >
                                Thêm vào giỏ hàng
                            </button>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <h3 className="box-title mt-5">Thông tin sản phẩm</h3>
                            <div className="table-responsive">
                                <table className="table table-striped table-product">
                                    <tbody>
                                        <tr>
                                            <td width="390">Màu hoa</td>
                                            <td>{item.Color}</td>
                                        </tr>
                                        <tr>
                                            <td>Đơn vị tính</td>
                                            <td>{item.Unit}</td>
                                        </tr>
                                        <tr>
                                            <td>Loại hoa</td>
                                            <td>{item.CategoryName}</td>
                                        </tr>
                                        <tr>
                                            <td>Nhà cung cấp</td>
                                            <td>{item.SupplierName}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default FlowerDetail