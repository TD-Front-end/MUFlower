import React from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';



class GetCart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: [],
            DataisLoaded: false,
            sum: 0,
            receiptID: 0
        };
    }
    componentDidMount() {
        const getCart = async () => {
            try {
                const res = await axios.get("http://localhost:5000/cart/1")
                var total = 0;
                res.data.forEach(element => {
                    console.log(element.Price);
                    total = total + element.Price;
                })
                console.log(total);
                this.setState({
                    item: res.data,
                    DataisLoaded: true,
                    sum: total
                })
            } catch (error) {
                console.log(error);
            }
        }
        getCart()
    }
    createReceipt() {
        const postReceipt = async () => {
            const receipt = {
                ExportDate: new Date().toJSON().slice(0, 10),
                DeliveryDate: new Date().toJSON().slice(0, 10),
                TotalPayMent: this.state.sum,
                Message: "Không có gì",
                UserID: 1
            }
            let id;
            try {
                const res = await axios.post("http://localhost:5000/receipt/", receipt)
                id = res.data.ReceiptID
                this.setState({ receiptID: id })
                const receiptDetail = this.state.item.map(data => ({ ReceiptID: id, FlowerID: data.FlowerID, Price: data.Price }))
                console.log(receiptDetail);
                await axios.post("http://localhost:5000/receiptDetail", receiptDetail)
                    .then(res => {
                        console.log(res);
                        console.log(res.data);
                    })
            }
            catch (err) {
                console.log(err);
            }
        }
        if (window.confirm("Bạn có chắc chắn muốn thanh toán ?")) {
            window.alert("Thanh toán thành công vui lòng xem hóa đơn của bạn")
            postReceipt()
        }
    }

    deleteCart(id, name) {
        const deleteById = async (cartID) => {
            try {
                await axios.delete("http://localhost:5000/cart/" + cartID)
            } catch (error) {
                console.log(error);
            }
        }
        deleteById(id)
        window.location.reload(false)

    }
    render() {
        const { DataisLoaded, item } = this.state;
        if (!DataisLoaded) return (<div><h1> Pleses wait some time.... </h1> </div>);
        return (
            <React.Fragment>
                <div className="alert alert-info mt-3">
                    <strong>Giỏ hàng</strong>
                </div><div className="row">
                    <div className="col-xs-12">
                    </div>
                </div><br /><div className="table-responsive-md">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tên hoa</th>
                                <th>Giá tiền</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {item.map((data, index) => (

                                <tr key={data.CartID}>
                                    <td>{index + 1}</td>
                                    <td>{data.FlowerName}</td>
                                    <td>{new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'VND' }).format(data.Price)}</td>
                                    <td >
                                        <button type="button" className="btn btn-close" onClick={() => this.deleteCart(data.CartID, data.FlowerName)}></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>


                    </table>
                    <div className="d-flex mt-3 justify-content-around">
                        <div>Tổng Cộng: {new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'VND' }).format(this.state.sum)}</div>
                        <button className='btn btn-success' onClick={() => this.createReceipt()}>Thanh toán</button>
                        <Link to={'/ReceiptDetail/' + this.state.receiptID} className='btn btn-primary'>Xem hóa đơn</Link>
                    </div>
                </div>
            </React.Fragment >
        )
    }
}


export default GetCart