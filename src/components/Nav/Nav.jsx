import React from 'react';
import './Nav.css';
import Logo from '../../aasset/Logo.png';
import { Link, useNavigate } from 'react-router-dom';

const Nav = () => {
    const navigate = useNavigate();

    function handle() {
        window.localStorage.removeItem('email');
        window.location.pathname = "/";
    }

    function scrollToSection(id) {
        // Navigate to home page and scroll to section
        navigate('/', { replace: true });
        window.location.hash = id;
    }

    return (
        <>
            <div className="main">
                <nav className="navbar navbar-expand-lg">                   
                    <div className="container">
                        <Link className="navbar-brand" to="/">
                            <img src={Logo} alt="" />
                            <span>لارمو</span>
                        </Link>

                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav ms-lg-5 me-lg-auto">
                                <li className="nav-item">
                                    <Link className="nav-link click-scroll" to="/">الرئيسية</Link>
                                </li>

                                <li className="nav-item">
                                    <a className="nav-link click-scroll" href="#Report" onClick={() => scrollToSection('Report')}>المعاملات المالية</a>
                                </li>

                                <li className="nav-item">
                                    <a className="nav-link click-scroll" href="#Report" onClick={() => scrollToSection('Report')}>تسجيل بلاغ</a>
                                </li>

                                <div className="dropdown pt-2">
                                    <a className="navbar-icon bi-person smoothscroll" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    </a>
                                    <ul className="dropdown-menu">
                                        {!window.localStorage.getItem('email') ? (
                                            <>
                                                <li><a className="dropdown-item link-info" href="/login">تسجيل الدخول</a></li>
                                                <li><a className="dropdown-item link-info" href="/sign">تسجيل حساب</a></li>
                                            </>
                                        ) : (
                                            <>
                                                <li><a className="dropdown-item link-info" href="/sign">تسجيل حساب</a></li>
                                                <li onClick={handle}><a className="dropdown-item link-danger" href='/'>تسجيل خروج</a></li>
                                            </>
                                        )}
                                    </ul>
                                </div>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    );
};

export default Nav;
