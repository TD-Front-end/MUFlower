import React from 'react'
import axios from 'axios';

class AddNewFlower extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            FlowerID: '',
            FlowerName: '',
            Color: '' ,
            imgeFlower: '',
            Unit: '',
            Price: '',
            CategoryID: '',
            SupplierID: '',
            category: [],
            supplier: []
        }
        this.handleName = this.handleName.bind(this);
        this.handleColor = this.handleColor.bind(this);
        this.handleUnit = this.handleUnit.bind(this);
        this.handlePrice = this.handlePrice.bind(this);
        this.handleimg = this.handleimg.bind(this);
        this.handleCategoryID = this.handleCategoryID.bind(this);
        this.handleSupplierID = this.handleSupplierID.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    handleName = event => {
        this.setState({ FlowerName: event.target.value });
    }
    handleColor = event => {
        this.setState({ Color: event.target.value });
    }
    handleUnit = event => {
        this.setState({ Unit: event.target.value });
    }
    handlePrice = event => {
        this.setState({ Price: event.target.value });
    }
    handleimg = event => {
        this.setState({ imgeFlower: event.target.value });
    }
    handleCategoryID = event => {
        this.setState({ CategoryID: event.target.value });
    }
    handleSupplierID = event => {
        this.setState({ SupplierID: event.target.value });
    }
    handleSubmit = event => {
        event.preventDefault();

        const flower = {
            FlowerName: this.state.FlowerName,
            Color: this.state.Color,
            Unit: this.state.Unit,
            Price: this.state.Price,
            imgeFlower: this.state.imgeFlower,
            CategoryID: this.state.CategoryID,
            SupplierID: this.state.SupplierID
        };

        axios.post(`http://localhost:5000/flowers`, flower)
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
    };
    componentDidMount() {
        const getAllCategory = async () => {
            try {
                const res = await axios.get("http://localhost:5000/categories")
                this.setState({
                    category: res.data,
                })
            } catch (error) {
                console.log(error);
            }
        }
        const getAllSupllier = async () => {
            try {
                const res = await axios.get("http://localhost:5000/suppliers")
                this.setState({
                    supplier: res.data,
                })
            } catch (error) {
                console.log(error);
            }
        }
        getAllCategory()
        getAllSupllier()
    }
    render() {
        return (
            <React.Fragment>
                <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#insertModal">
                    Thêm hoa
                </button>
                <div className="modal fade" id="insertModal" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalToggleLabel">Thêm hoa</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <form onSubmit={this.handleSubmit}>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label htmlFor="FlowerName" className="col-form-label">Tên hoa:</label>
                                        <input type="text" className="form-control" id="FlowerName" onChange={this.handleName} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="Color" className="col-form-label">Màu hoa:</label>
                                        <input type="text" className="form-control" id="Color" onChange={this.handleColor} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="Unit" className="col-form-label">Đơn vị tính:</label>
                                        <input type="text" className="form-control" id="Unit" onChange={this.handleUnit} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="Price" className="col-form-label">Giá hoa:</label>
                                        <input type="text" className="form-control" id="Price" onChange={this.handlePrice} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="Color" className="col-form-label">Ảnh hoa:</label>
                                        <input type="text" className="form-control" id="Color" value={this.state.imgeFlower} onChange={this.handleimg} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="CategoryID" className="col-form-label">Loại hoa:</label>
                                        <select className='form-select' value={this.state.CategoryID} onChange={this.handleCategoryID}>
                                            <option value="0">Chọn loại hoa</option>
                                            {
                                                this.state.category.map(item => (
                                                    <option value={item.CategoryID} key={item.CategoryID}>{item.CategoryName}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="SupplierID" className="col-form-label">Nhà cung cấp:</label>
                                        <select className='form-select' value={this.state.SupplierID} onChange={this.handleSupplierID}>
                                            <option value="0">Chọn nhà cung cấp</option>
                                            {
                                                this.state.supplier.map(item => (
                                                    <option value={item.SupplierID} key={item.SupplierID}>{item.SupplierName}</option>
                                                ))
                                            }
                                        </select>
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


export default AddNewFlower;