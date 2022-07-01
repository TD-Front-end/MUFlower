import React from 'react'
import axios from 'axios';
// import {Link} from 'react-router-dom'
class EditSupplier extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: {},
            DataisLoaded: false,
            SupplierID: '',
            SupplierName: '',
            NumPhone: '',
            Address: ''
            //id: this.props.SupplierId
        };
        this.handleSupplierName = this.handleSupplierName.bind(this)
        this.handleAddress = this.handleAddress.bind(this)
        this.handleNumPhone = this.handleNumPhone.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
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
    componentDidMount() {
        var supplier = {}
        const getSupplier = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/suppliers/${this.props.supplierId}`)
                this.setState({
                    //item: res.data,
                    DataisLoaded: true,
                    SupplierID: res.data.SupplierID,
                    SupplierName: res.data.SupplierName,
                    Address: res.data.Address,
                    NumPhone: res.data.NumPhone
                })
            } catch (error) {
                console.log(error);
            }
        }
        getSupplier();
        return supplier;
    }
    handleUpdate = event => {
        event.preventDefault();

        const supplier = {
            SupplierName: this.state.SupplierName,
            Address: this.state.Address,
            NumPhone: this.state.NumPhone
        };

        (async () => {
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(supplier)
            };
            await fetch(`http://localhost:5000/suppliers/${this.props.supplierId}`, requestOptions);
        })();
        // .then(res => {
        //     console.log(this.props.categoryId);
        //     console.log(res);
        //     console.log(res.data);
        // })
    }
    render() {
        return (
            <React.Fragment>
                <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target={'#editModal' + this.state.SupplierID}>
                    <i className="fas fa-edit"></i>
                </button>

                <div className="modal fade" id={'editModal' + this.state.SupplierID} aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalToggleLabel">Thêm nhà cung cấp</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <form onSubmit={this.handleUpdate}>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label htmlFor="SupplierName" className="col-form-label">Tên nhà cung cấp:</label>
                                        <input type="text" className="form-control" id="SupplierName" value={this.state.SupplierName} onChange={this.handleSupplierName} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="Address" className="col-form-label">Địa chỉ:</label>
                                        <input type="text" className="form-control" id="Address" value={this.state.Address} onChange={this.handleAddress} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="NumPhone" className="col-form-label">Số điện thoại:</label>
                                        <input type="text" className="form-control" id="NumPhone" value={this.state.NumPhone} onChange={this.handleNumPhone} />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                                    <button type="submit" className="btn btn-primary" onClick={() => window.location.reload(false)}>Lưu thay đổi</button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}


export default EditSupplier