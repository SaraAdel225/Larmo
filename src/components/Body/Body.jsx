import React from 'react'
import './Body.css'
import Img from '../../aasset/1.jpg'
const Body = () => {
    return (
        <section class="featured-section">
            <div class="container">
                <div class="row justify-content-center">

                    <div class="col-lg-4 col-12 mb-4 mb-lg-0"
                        data-aos="fade-left"
                        data-aos-easing="ease-out"
                        data-aos-duration="1300"
                        data-aos-once="true"
                    >
                        <div class="custom-block bg-white shadow-lg"
                        >
                            <a >
                                <div class="d-flex"



                                >
                                    <div>
                                        <h5 class="mb-2"> مكافحة تمويل الأرهاب</h5>

                                        <p class="mb-0">تعطيل شبكات الدعم المالي التي تدعم الأنشطة الإرهابية. </p>
                                    </div>

                                </div>

                            </a>
                        </div>
                    </div>

                    <div class="col-lg-6 col-12"
                        data-aos="fade-up"
                        data-aos-easing="ease-out"
                        data-aos-duration="1300"
                        data-aos-once="true"
                        data-aos-delay="400">
                        <div class="custom-block custom-block-overlay">
                            <div class="d-flex flex-column h-100">
                                <img src={Img} className="custom-block-image img-fluid" alt="" />

                                <div class="custom-block-overlay-text d-flex">
                                    <div>
                                        <h5 class="text-white mb-2">مكافحة غسل الأموال</h5>

                                        <p class="text-white">اكتشاف الأنشطة المشبوهة التي قد تشير إلى غسل الأموال أو تمويل الإرهاب والإبلاغ عنها. ويشمل ذلك مراقبة المعاملات والاحتفاظ بسجلات للأنشطة المالية.</p>

                                    </div>
                                </div>

                                <div class="section-overlay"></div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Body