import React, { useEffect } from 'react'
import './Report.css'
import { Link } from 'react-router-dom'
import AOS from 'aos'

/* import axios from 'axios' */
export const Report = () => {
    /*   const fe = async () => {
        const c = await axios.get('http://larmo.tryasp.net/api/Operations');
        console.log(c.data)
      } 
      fe() */
    useEffect(() => {
        AOS.init()
    }, [])
    return (
        <>
            <section id='Report'>
                <div className='report'>
                    <div className="rep">
                        <div className="text-rep">
                            <h1
                                data-aos="fade-in"
                                data-aos-easing="ease-out"
                                data-aos-duration="1000"
                                data-aos-once="true"
                                data-aos-delay="200"
                            >تقديم بلاغ</h1>
                            <p
                                data-aos="fade-in"
                                data-aos-easing="ease-out"
                                data-aos-duration="1000"
                                data-aos-once="true"
                                data-aos-delay="200"
                            >سننظر لشكواك ونتواصل معك في أقرب وقت ممكن</p>
                            <div className='Iq'>
                                <Link to="reportPage">

                                    <i className="fa-solid fa-angle-left"></i>
                                </Link>
                                <Link to="reportPage">قدم هنا</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="create">
                    <div className="container">
                        <div className="row">

                            <div className="col-lg-4 col-12 mb-4 mb-lg-0"
                                data-aos="fade-down"
                                data-aos-easing="ease-out"
                                data-aos-duration="1000"
                                data-aos-once="true"

                            >
                                <div className="create-block shadow-lg">
                                    <div className="d-flex">
                                        <div>
                                            <h5 className="mb-2">عرض البلاغات المرسلة </h5>
                                            <Link to="/viewreport">  عرض جميع البلاغات
                                                <i className="fa-solid fa-arrow-left"></i>
                                            </Link>
                                        </div>

                                    </div>



                                </div>
                            </div>
                            <div className="col-lg-4 col-12 mb-4 mb-lg-0"
                                data-aos="fade-up"
                                data-aos-easing="ease-out"
                                data-aos-duration="1300"
                                data-aos-once="true"
                                data-aos-delay="400"
                            >
                                <div className="create-anoth  shadow-lg">
                                    <div className="d-flex">
                                        <div>
                                            <h5 className="mb-2"> تقديم شكوي</h5>
                                            <Link to="/created">تسجيل الأن

                                                <i className="fa-solid fa-arrow-left"></i>
                                            </Link>
                                        </div>

                                    </div>


                                </div>
                            </div>
                            <div className="col-lg-4 col-12 mb-4 mb-lg-0"
                                data-aos="fade-down"
                                data-aos-easing="ease-out"
                                data-aos-duration="1500"
                                data-aos-once="true"
                                data-aos-delay="500"
                            >
                                <div className="create-block shadow-lg">
                                    <div className="d-flex">
                                        <div>
                                            <h5 className="mb-2"> عرض الشكاوي المرسلة</h5>
                                            <Link to="/creat"> عرض الشكاوي
                                                <i className="fa-solid fa-arrow-left"></i>
                                            </Link>
                                        </div>

                                    </div>

                                </div>
                            </div>


                        </div>
                    </div>
                </div>

            </section>
        </>

    )
}
