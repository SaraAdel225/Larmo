import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Nav from '../../components/Nav/Nav';
import Footer from '../../components/Footer/Footer';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [acsept, setAcsept] = useState(false);
    const [flag, setFlag] = useState(false);

    // Load saved data from localStorage when component mounts
    useEffect(() => {
        const savedEmail = localStorage.getItem('email');
        if (savedEmail) {
            setEmail(savedEmail);
        }
    }, []);

    const Submit = (e) => {
        e.preventDefault();
        let reg = { email, password };
        axios.post('http://larmo.tryasp.net/api/Users/login', reg, {
            headers: { 'content-type': 'application/json' },
        }).then((res) => {
            alert('login successfully');
            localStorage.setItem('email', email); // Save email to localStorage
            
            navigate('/');
        }).catch((err) => {
            alert('تحقق من الإيميل والباسوورد الخاص بك');
            console.log(err);
        });
        setAcsept(true);

        if (password.length < 8 || !/[A-Z]/.test(password) || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            setFlag(true);
        }
        if (flag) {
            //send data
        }
    };

    return (
        <>
            <Nav />
            <div className='sign'>
                <div className="img-sign">
                    <div className="text-sign">
                        <h1>اشتراك</h1>
                    </div>
                </div>
            </div>
            <div className="sign-up">
                <div className="left-sign col-6">
                    <div className="text-left">
                    </div>
                    <div className="icon-sign">
                        <div className='back-icon'>
                            <i className="fa-solid fa-phone-volume"></i>
                            <div className="ic">
                                <p dir='ltr'>+218 91-4710685</p>
                                <h1>رقم الهاتف</h1>
                            </div>
                        </div>
                        <div className='back-icon'>
                            <i className="fa-solid fa-envelope"></i>
                            <div className="ic">
                                <p dir='ltr'>larmo@gmail.com</p>
                                <h1>الايميل</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="right-sign col-6">
                    <form onSubmit={Submit} action="">
                        <div className='col'>
                            <label> الإيميل</label>
                            <input type="email" placeholder='إيميلك.. ' required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className='col'>
                            <label> باسوورد</label>
                            <input type="password" placeholder='الباسوورد الخاص بك.. ' required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                            {(password.length < 6 || !/[A-Z]/.test(password) || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) && acsept && (
                                <p className='required'>يجب أن تتكون كلمة المرور من 6 أحرف على الأقل وحرف كبير ورمز</p>
                            )}
                        </div>

                        <button type="submit" className='logs'> تسجيل الدخول</button>
                    </form>
                </div>
            </div>
            <div className="map-sign">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3877.854672612199!2d13.176856076060888!3d32.896907577848744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13a892b42c9db315%3A0x51c3d2c3de36ee08!2sCentral%20Bank%20Of%20Libya!5e1!3m2!1sen!2sth!4v1721489791852!5m2!1sen!2sth" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
            <Footer />
        </>
    );
}

export default Login;


