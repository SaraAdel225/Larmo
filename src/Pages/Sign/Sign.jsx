import React, { useState, useEffect } from 'react';
import './Sign.css';
import Nav from '../../components/Nav/Nav';
import Footer from '../../components/Footer/Footer';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal'; 

Modal.setAppElement('#root'); 

const Sign = () => {
    const [userName, setUserName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [accept, setAccept] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [permissions, setPermissions] = useState([]); 
    const [selectedPermissions, setSelectedPermissions] = useState([]); 
    const [isModalOpen, setIsModalOpen] = useState(false); 

    const navigate = useNavigate();
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiJlOTNiZWZjYWI3OGM0NDczYWZhYWU1MDBjZTY1MmJmNiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwibmFtZSI6ImFkbWluIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJleHAiOjE3MjY0NzU4ODEsImlzcyI6Imxhcm1vIiwiYXVkIjoibGFybW8ifQ.PqvUPE7QOPGmb2L8O7Xka6K5IL8gArj6t5YXkQCEqR0";

    const validatePassword = (password) => {
        if (password.length < 6 || !/[A-Z]/.test(password) || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            return "يجب أن تتكون كلمة المرور من 6 أحرف على الأقل، وتتضمن حرفًا كبيرًا ورمزًا خاصًا.";
        }
        return "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setAccept(true);

        const validationError = validatePassword(password);
        if (validationError) {
            setPasswordError(validationError);
            return;
        }
        setPasswordError("");
        setEmailError("");

        try {
            const response = await axios.post('http://larmo.tryasp.net/api/Users', {
                userName,
                phoneNumber,
                email,
                password,
                isAdmin,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });

            if (response.status === 200) {
                localStorage.setItem('email', email);
                localStorage.setItem('userId', response.data.refreshToken.userId); 
                if (!isAdmin) {
                    await fetchPermissions(); 
                    setIsModalOpen(true); 
                } else {
                    navigate('/'); 
                }
            }
        } catch (err) {
            if (err.response) {
                setEmailError(err.response.status === 422 ? 'البريد الإلكتروني موجود بالفعل' : 'حدث خطأ أثناء التسجيل');
            } else {
                setEmailError('حدث خطأ أثناء التسجيل');
            }
        }
    };

    const fetchPermissions = async () => {
        try {
            const response = await axios.get('http://larmo.tryasp.net/api/Permissions', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            if (response.status === 200) {
                console.log(response.data);
                setPermissions(response.data);
            }
        } catch (error) {
            console.error('Error fetching permissions:', error);
        }
    };

    const handlePermissionChange = (permission) => {
        const permissionId = permission.id; 
        if (selectedPermissions.includes(permissionId)) {
            setSelectedPermissions(selectedPermissions.filter(p => p !== permissionId));
        } else {
            setSelectedPermissions([...selectedPermissions, permissionId]);
        }
    };

    const handleModalSubmit = async () => {
        try {
            const userId = localStorage.getItem('userId');

            const response = await axios.put('http://larmo.tryasp.net/api/Permissions', {
                userId: userId, 
                permissionsIds: selectedPermissions 
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/json',
                }
            });

            if (response.status === 200) {
                console.log('Permissions updated successfully');
                setIsModalOpen(false); 
                navigate('/'); 
            }
        } catch (error) {
            console.error('Error updating permissions:', error);
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
                        <h4>اتصل بنا</h4>
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
                    <form onSubmit={handleSubmit}>
                        <div className='col'>
                            <label htmlFor="userName">اسم المستخدم</label>
                            <input
                                id="userName"
                                type="text"
                                placeholder='ادخل اسم المستخدم..'
                                required
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </div>

                        <div className="col">
                            <label htmlFor="phoneNumber">رقم الهاتف</label>
                            <input
                                id="phoneNumber"
                                type="text"
                                placeholder='ادخل رقم هاتفك..'
                                required
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>

                        <div className='col'>
                            <label htmlFor="email">الإيميل</label>
                            <input
                                id="email"
                                type="email"
                                placeholder='إيميلك..'
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {accept && emailError && <p className='required'>{emailError}</p>}
                        </div>

                        <div className='col'>
                            <label htmlFor="password">باسوورد</label>
                            <input
                                id="password"
                                type="password"
                                placeholder='الباسوورد الخاص بك..'
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {passwordError && accept && (
                                <p className='required'>{passwordError}</p>
                            )}
                        </div>

                        <div className="row mb-3">
                            <div className="row">
                                <div className="form-check">
                                    <label className="form-check-label" htmlFor="isAdmin">أدمن</label>
                                    <input
                                        id="isAdmin"
                                        type="radio"
                                        name="isAdmin"
                                        className="form-check-input"
                                        checked={isAdmin}
                                        onChange={() => setIsAdmin(true)}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="form-check">
                                    <label className="form-check-label" htmlFor="isRegular">مستخدم</label>
                                    <input
                                        id="isRegular"
                                        type="radio"
                                        name="isAdmin"
                                        className="form-check-input"
                                        checked={!isAdmin}
                                        onChange={() => setIsAdmin(false)}
                                    />
                                </div>
                            </div>
                        </div>
                            <button type="submit" className='logs'>تسجيل</button>
                        <div className='col'>
                            <Link to='/login' className='new-account'>هل لديك حساب ؟</Link>
                        </div>
                    </form>
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                contentLabel="Select Permissions"
            >
                <h3>اختر الصلاحيات للمستخدم الجديد:</h3>
                <form className='Permissions'>
                    {permissions.map((permission) => (
                        <div key={permission.id}>
                            <label class="form-check-label">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value={permission.id} 
                                    checked={selectedPermissions.includes(permission.id)}
                                    onChange={() => handlePermissionChange(permission)}
                                />
                                {permission.name} 
                            </label>
                        </div>
                    ))}
                    <button className="btn btn-primary" type="button" onClick={handleModalSubmit}>تأكيد</button>
                </form>
            </Modal>

            <Footer />
        </>
    );
};

export default Sign;
