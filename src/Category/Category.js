import React from 'react'
import axios from 'axios';
import AddNewCategory from './AddNewCategory';
import EditCategory from './EditCategory';

class Category extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: [],
            DataisLoaded: false
        };
    }
    componentDidMount() {
        const getAllCategory = async () => {
            try {
                const res = await axios.get("http://localhost:5000/categories")
                this.setState({
                    item: res.data,
                    DataisLoaded: true
                })
            } catch (error) {
                console.log(error);
            }
        }
        getAllCategory()
    }
    deleteCategory(id, name) {
        const deleteById = async (categoryID) => {
            try {
                await axios.delete("http://localhost:5000/categories/"+categoryID)
            } catch (error) {
                console.log(error);
            }
        }
        if (window.confirm("Bạn có muốn xóa loại hoa: "+ name)) {
            deleteById(id)
            window.location.reload(false)
        };
    }
    render() {
        const { DataisLoaded, item } = this.state;
        if (!DataisLoaded) return (<div><h1> Pleses wait some time.... </h1> </div>);
        return (
            <React.Fragment>
                <div className="alert alert-info mt-3">
                    <strong>Danh sách loại hoa</strong>
                </div><div className="row">
                    <div className="col-xs-12">
                        <AddNewCategory />
                    </div>
                </div><br /><div className="table-responsive-md" style={{'box-shadow': '0px 10px 10px rgb(0 0 0 / 15%)', 'border-radius': '15px', 'padding': '40px 40px 40px 40px'}}>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Mã loại hoa</th>
                                <th>Tên loại hoa</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {item.map(data => (
                                
                                <tr key={data.CategoryID}>
                                    <td>{data.CategoryID}</td>
                                    <td>{data.CategoryName}</td>
                                    <td >
                                        {/* <button type="button" className="btn btn-primary"><i className="far fa-eye"></i></button> */}
                                        {/* <button type="button" className="btn btn-success"><i className="fas fa-edit"></i></button> */}
                                        <EditCategory categoryId={data.CategoryID}/>
                                        <button type="button" className="btn btn-danger"  onClick={()=>this.deleteCategory(data.CategoryID, data.CategoryName)}><i className="far fa-trash-alt"></i></button>
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


export default Category