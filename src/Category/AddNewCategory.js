import React from 'react'
import axios from 'axios';
// import {Link} from 'react-router-dom'
class AddNewCategory extends React.Component {
    state = {
        CategoryName: ''
    }
    handleChange = event => {
        this.setState({ CategoryName: event.target.value });
    }
    handleSubmit = event => {
        event.preventDefault();

        const category = {
            CategoryName: this.state.CategoryName
        };

        axios.post(`http://localhost:5000/categories`, category)
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
    }
    render() {
        return (
            <React.Fragment>
                <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#insertModal">
                    Thêm loại hoa
                </button>
                <div className="modal fade" id="insertModal" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalToggleLabel">Thêm loại hoa</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <form onSubmit={this.handleSubmit}>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label htmlFor="CategoryName" className="col-form-label">Tên loại hoa:</label>
                                        <input type="text" className="form-control" id="CategoryName" onChange={this.handleChange} />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                                    <button type="submit" className="btn btn-primary" onClick={()=>window.location.reload(false)}>Lưu</button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}


export default AddNewCategory