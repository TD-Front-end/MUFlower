import axios from 'axios';
import React, { useEffect, useReducer} from 'react'
import logger from 'use-reducer-logger';
import AddNewFlower from './AddNewFlower';
import EditFlower from './EditFlower';
import { Link } from 'react-router-dom';
const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, flowers: action.payload, loading: false };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

function Flower() {
    const [{ flowers }, dispatch] = useReducer(logger(reducer), {
        flowers: [],
    });
    //
    // const [flowers, setFlowers] = userState([]);
    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get('http://localhost:5000/flowers');
                dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
            } catch (err) {
                dispatch({ type: 'FETCH_FAIL', payload: err.message });

            }
        };
        fetchData();
    }, []);
    const deleteFlower= (id, name) =>{
        const deleteById = async (flowerID) => {
            try {
                await axios.delete("http://localhost:5000/flowers/"+flowerID)
            } catch (error) {
                console.log(error);
            }
        }
        if (window.confirm("Bạn có muốn xóa hoa: "+ name)) {
            deleteById(id)
            window.location.reload(false)
        };
    }
    return (
        <React.Fragment>
            <div className="alert alert-info mt-3">
                <strong>Danh sách loại hoa</strong>
            </div>
            <div className="row">
                <div className="col-xs-12">
                    <AddNewFlower />
                </div>
            </div><br />
            <div className="table-responsive-md">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Mã hoa</th>
                            <th>Tên hoa</th>
                            <th>Màu hoa</th>
                            <th>Đơn vị tính</th>
                            <th>Giá thành</th>
                            <th>Hình ảnh</th>
                            <th>Loại hoa</th>
                            <th>Nhà cung cấp</th>
                            <th></th>
                        </tr>
                    </thead>{
                        flowers.map((flower) => (
                            <tbody key={flower.FlowerID}>
                                <tr>
                                    <td>{flower.FlowerID}</td>
                                    <td>{flower.FlowerName}</td>
                                    <td>{flower.Color}</td>
                                    <td>{flower.Unit}</td>
                                    <td>{flower.Price}</td>
                                    <td><img height='130'  src={flower.imgeFlower} className="card-img-top" alt={flower.FlowerName} /></td>
                                    <td>{flower.CategoryName}</td>
                                    <td>{flower.SupplierName}</td>

                                    <td>
                                        <Link to={"/FlowerDetail/" + flower.FlowerID}  className="btn btn-primary"><i className="far fa-eye"></i></Link>
                                        <EditFlower flowerId={flower.FlowerID}/>
                                        <button type="button" className="btn btn-danger" onClick={()=>deleteFlower(flower.FlowerID, flower.FlowerName)}><i className="far fa-trash-alt"></i></button>
                                    </td>
                                </tr>

                            </tbody>
                        ))}
                </table>

            </div>
        </React.Fragment >
    )
}

export default Flower;