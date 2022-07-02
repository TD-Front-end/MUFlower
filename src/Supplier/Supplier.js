import React from 'react'
import axios from 'axios';
import AddNewSupplier from './AddNewSupplier';
import EditSupplier from './EditSupplier';

class Supplier extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: [],
            DataisLoaded: false
        };
    }
    componentDidMount() {
        const getAllSupplier = async () => {
            try {
                const res = await axios.get("http://localhost:5000/suppliers")
                this.setState({
                    item: res.data,
                    DataisLoaded: true
                })
            } catch (error) {
                console.log(error);
            }
        }
        getAllSupplier()
        // 
    
 
    }
    deleteSupplier(id, name) {
        const deleteById = async (supplierID) => {
            try {
                await axios.delete("http://localhost:5000/suppliers/" + supplierID)
            } catch (error) {
                console.log(error);
            }
        }
        if (window.confirm("Bạn có muốn xóa nhà cung cấp: " + name)) {
            deleteById(id)
            window.location.reload(false)
        };
    }
  
    render() {
        //     set search query to empty string
        
        const { DataisLoaded, item } = this.state;
        if (!DataisLoaded) return (<div><h1> Pleses wait some time.... </h1> </div>);
        return (
            <React.Fragment>
                <div className="alert alert-info mt-3">
                    <strong>Danh sách nhà cung cấp</strong>
                </div><div className="row">
                    <div className="col-xs-12">
                        <AddNewSupplier />
                    </div>
                </div>

                <br />
                {/* search */}
                {/* <input type="text" id="myInput" onkeyup="myFunction()" placeholder="Search for names.." style={{ 'box-shadow': '0px 10px 10px rgb(0 0 0 / 12%)', 'border-radius': '10px', 'width': '40%', 'border': '0.5px', 'solid': '#00bdfe' }} /> */}
                {/*  end search  */}
                <div className="table-responsive-md" style={{ 'box-shadow': '0px 10px 10px rgb(0 0 0 / 15%)', 'border-radius': '15px', 'padding': '40px 40px 40px 40px' }}>
                    <table className="table table-striped">

                        <thead>
                            <tr>
                                <th>Mã nhà cung cấp</th>
                                <th>Tên nhà cung cấp</th>
                                <th>Địa chỉ</th>
                                <th>Số điện thoại</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {item.map(data => (
                                <tr key={data.SupplierID}>
                                    <td>{data.SupplierID}</td>
                                    <td>{data.SupplierName}</td>
                                    <td>{data.Address}</td>
                                    <td>{data.NumPhone}</td>
                                    <td >
                                        {/* <button type="button" className="btn btn-primary"><i className="far fa-eye"></i></button> */}
                                        {/* <button type="button" className="btn btn-success"><i className="fas fa-edit"></i></button> */}
                                        <EditSupplier supplierId={data.SupplierID} />
                                        <button type="button" className="btn btn-danger" onClick={() => this.deleteSupplier(data.SupplierID, data.SupplierName)}><i className="far fa-trash-alt"></i></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
               
            </React.Fragment >
        )
    }
}


export default Supplier