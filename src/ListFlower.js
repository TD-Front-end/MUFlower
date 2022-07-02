import React from 'react'
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';


class ListFlower extends React.Component {

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
                const res = await axios.get("http://localhost:5000/flowers")
                this.setState({
                    item: res.data,
                    DataisLoaded: true
                })
            } catch (error) {
                console.log(error);
            }
        }
        getAllCategory()
    };
    
    render() {

        const { DataisLoaded, item } = this.state;
        if (!DataisLoaded) return (<div><h1> Pleses wait some time.... </h1> </div>);
        return (
            <React.Fragment>
               
                <div className="alert alert-info mt-3">
                    <strong>Danh sách hoa</strong>
                </div>
                <div className="row">
                    {item.map(data => (
                        <div className="card mb-4 border-0 col-lg-3 bg-transparent" key={data.FlowerID}>
                            <img src={data.imgeFlower} className="card-img-top" alt="Ảnh hoa" style={{ width: '90%', height: '350px', 'border-radius': '15px' }} />
                            <div className="card-body">
                                <h5 className="card-title">{data.FlowerName}</h5>
                                <p className="card-text">{data.Price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</p>
                                <Link to={'/FlowerDetail/' + data.FlowerID} className="btn btn-primary">Xem chi tiết</Link>
                            </div>
                        </div>
                    ))}

                </div>


            </React.Fragment >
        )
    }
}


export default ListFlower