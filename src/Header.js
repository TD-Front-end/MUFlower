import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    const signoutHandler = () => {
        localStorage.removeItem('userInfo');
        window.location.href = '/login';
    };
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary" aria-label="Ninth navbar example">
            <div className="container-xl">
                <Link to={'/ListFlower'} className="navbar-brand">Hoa vui</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample07XL"
                    aria-controls="navbarsExample07XL" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarsExample07XL">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item mx-3">
                            {/* <a className="nav-link active" aria-current="page" href="/#">Trang chủ</a> */}
                            <Link to={'/home'} className="nav-link active">Trang chủ</Link>
                        </li>
                        <li className="nav-item mx-3">
                            <Link className="nav-link active" to={'/ListFlower'}>Sản phẩm</Link>
                        </li>

                        <li className="nav-item dropdown mx-3">
                            <a className="nav-link dropdown-toggle active" href="/#" id="dropdown07XL" data-bs-toggle="dropdown"
                                aria-expanded="false">Quản lý</a>
                            <ul className="dropdown-menu" aria-labelledby="dropdown07XL">
                                <li> <Link className="dropdown-item" to={'/category'}>Quản lý loại hoa</Link></li>
                                <li> <Link className="dropdown-item" to={'/supplier'}>Quản lý nhà cung cấp</Link></li>
                                <li> <Link className="dropdown-item" to={'/flower'}>Quản lý hoa</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item mx-3">
                            <a className="nav-link active" href="/#" tabIndex="-1" aria-disabled="true">Liên hệ</a>
                        </li>
                    </ul>
                    {/* <div>
                        <Link to="/login" style={{color: '#ffff',
                        'text-decoration': 'auto',
                        'padding-left': '15px',
                        'margin-right': '10px'}}>
                        Login In
                    </Link>


                    <Link
                        to="#signout" onClick={signoutHandler} style={{color: '#ffff',
                        'text-decoration': 'auto',
                        'padding-left': '15px',
                        'margin-right': '10px'}}>
                        LogOut
                    </Link>
                </div> */}


                <Link to={'/Cart'} className="btn btn-success"><i className="fas fa-shopping-cart"></i></Link>
            </div>
        </div>
        </nav >
    )
}

export default Header