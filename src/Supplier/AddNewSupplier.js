import React from 'react'
import axios from 'axios';
// import {Link} from 'react-router-dom'
class AddNewSupplier extends React.Component {
    state = {
        SupplierName: '',
        NumPhone: '',
        Address: ''
    }
    handleSupplierName = event => {
        this.setState({ SupplierName: event.target.value });
    }
    handleAddress = event => {
        this.setState({ Address: event.target.value });
    }
    handleNumPhone = event => {
        this.setState({ NumPhone: event.target.value });
    }
    handleSubmit = event => {
        event.preventDefault();

        const supplier = {
            SupplierName: this.state.SupplierName,
            Address: this.state.Address,
            NumPhone: this.state.NumPhone
        };

        axios.post(`http://localhost:5000/suppliers/`, supplier)
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
    }
    render() {
        return (
            <React.Fragment>
                <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#insertModal">
                    Thêm nhà cung cấp
                </button>
                <div className="modal fade" id="insertModal" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalToggleLabel">Thêm nhà cung cấp</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <form onSubmit={this.handleSubmit}>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label htmlFor="SupllierName" className="col-form-label">Tên nhà cung cấp:</label>
                                        <input type="text" className="form-control" id="SupllierName" onChange={this.handleSupplierName} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="Address" className="col-form-label">Địa chỉ:</label>
                                        <input type="text" className="form-control" id="Address"  onChange={this.handleAddress} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="NumPhone" className="col-form-label">Số điện thoại:</label>
                                        <input type="text" className="form-control" id="NumPhone" onChange={this.handleNumPhone} />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                                    <button type="submit" className="btn btn-primary" onClick={() => window.location.reload(false)}>Lưu</button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}


export default AddNewSupplier