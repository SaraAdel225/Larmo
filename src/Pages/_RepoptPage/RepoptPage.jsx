import React, {useState} from 'react'
import Nav from '../../components/Nav/Nav'
import { Link, useNavigate } from 'react-router-dom'
import './RepoptPage.css'
import axios from 'axios'
const RepoptPage = () => {

  const navigate = useNavigate();

  const initialStatea = {
    fullName: '',
    motherName: '',
    gender: 'Signle, Married',
    maritalStatus: 'Male, Female',
    profession: '',
    employer: '',
    startWorkDate: '',
    identityNumber: '',
    identityIssueDate: '',
    identityExpiryDate: '',
    isLibyanNationality: 'true,false',
    nationality: '',
    resident:'true,false',
    passportNumber: '',
    passportNumberIssueDate: '',
    passportNumberExpiryDate: '',
    phoneNumber: '',
    email: '',
    city: '',
    area: '',
    street: '',
    nearestMilestone: '',
  };


  const [reportInfo, setReportInfo] = useState(initialStatea);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setReportInfo(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setReportInfo(prevState => ({
      ...prevState,
      [name]: value === 'true' ? true : false,
    }));
  };

  const convertToUTC = (localDateTime) => {
    if (!localDateTime) return '';
    const localDate = new Date(localDateTime);
    return localDate.toISOString(); 
  };


  const AddNew = async (convertedReportInfo) => {
    try {
      const response = await axios.post('http://larmo.tryasp.net/api/Notifications', convertedReportInfo);
      if (response) {
        console.log(response.data);
        navigate('/viewreport');
      }
    } catch (e) {
      console.error('Error:', e.response ? e.response.data : e.message);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      const convertedReportInfo = {
        ...reportInfo,
        startWorkDate: convertToUTC(reportInfo.startWorkDate),
        identityIssueDate: convertToUTC(reportInfo.identityIssueDate),
        identityExpiryDate: convertToUTC(reportInfo.identityExpiryDate),
        passportNumberIssueDate: convertToUTC(reportInfo.passportNumberIssueDate),
        passportNumberExpiryDate: convertToUTC(reportInfo.passportNumberExpiryDate),
      };
      AddNew(convertedReportInfo);
    } else {
      alert("من فضلك ادخل جميع البيانات");
    }
  };

  const validateForm = () => {
    return Object.values(reportInfo).every(value => value !== '' && value !== null);
  };
  return (
<>
<Nav></Nav>
<div className="conta">
<h1 className='cliens-h1'>تسجيل بلاغ</h1>
<div className='form-cliens'>

      <form onSubmit={handleSubmit}>
  <div className="row mb-3">
    <label htmlFor="text"  className="col-sm-4 col-form-label">الاسم بالكامل </label>
    <div className="col-sm-8" >
      <input  type="text" name='fullName' className="form-control"
          onChange={e=>setReportInfo({...reportInfo,fullName:e.target.value}) }
          value={reportInfo.fullName}         
      />
    </div>
  </div>
  <div className="row mb-3" id='asa'>
    <label htmlFor="text"  className="col-sm-4 col-form-label"> أسم الأم ثلاثي</label>
    <div className="col-sm-8">
      <input  type="text" name='motherName' className="form-control"

            onChange={e=>setReportInfo({...reportInfo,motherName:e.target.value}) }
      value={reportInfo.motherName}

      />
    </div>
  </div>
  <div className="row mb-3">
              <div className="col-sm-8">
                <select
                  name="gender"
                  className="form-select form-select-lg mb-3"
                  aria-label="Large select example"
                  onChange={handleChange}
                  value={reportInfo.gender}
                >
                  <option value="">الجنس</option>
                  <option value="Male">ذكر</option>
                  <option value="Female">أنثي</option>
                </select>
              </div>
            </div>
  <div className="row mb-3">
              <div className="col-sm-8">
                <select
                  name="maritalStatus"
                  className="form-select form-select-lg mb-3"
                  aria-label="Large select example"
                  onChange={handleChange}
                  value={reportInfo.maritalStatus}
                >
                <option value=""> الحالة الأجتماعية</option>
                <option value="Married">متزوج</option>
                <option value="Single">أعزب</option>
                </select>
              </div>
            </div>
  <div className="row mb-3" id='asa'>
    <label htmlFor="text"  className="col-sm-4 col-form-label">  المهنة</label>
    <div className="col-sm-8">
      <input  type="text"  name='profession' className="form-control"
                  onChange={e=>setReportInfo({...reportInfo,profession:e.target.value}) }
      value={reportInfo.profession}

                 />
    </div>
  </div>
  <div className="row mb-3" id='asa'>
    <label htmlFor="text"  className="col-sm-4 col-form-label">  جهة العمل</label>
    <div className="col-sm-8">
      <input  type="text"  name='employer' className="form-control"
                  onChange={e=>setReportInfo({...reportInfo,employer:e.target.value}) }
      value={reportInfo.employer}

                 />
    </div>
  </div>

  <div className="row mb-3" id='asa'>
    <label htmlFor="text"  className="col-sm-4 col-form-label">  تاريخ بدأ علاقة العمل</label>
    <div className="col-sm-8">
      <input    type="datetime-local"
  name='startWorkDate' className="form-control"
                  onChange={handleChange}

  value={reportInfo.startWorkDate}

                 />
    </div>
  </div>

  <div className="row mb-3">
    <label htmlFor="text" className="col-sm-4 col-form-label">رقم الهوية  </label>
    <div className="col-sm-8">
      <input type="text" name="identityNumber" className="form-control"
                  onChange={e=>setReportInfo({...reportInfo,identityNumber:e.target.value}) }
      value={reportInfo.identityNumber}

                 />
    </div>
  </div>
  <div className="row mb-3">
    <label htmlFor="text" className="col-sm-4 col-form-label">تاريخ إصدارها </label>
    <div className="col-sm-8">
      <input   type="datetime-local"
 name="identityIssueDate" className="form-control"
                  onChange={handleChange}

 value={reportInfo.identityIssueDate}

                 />
    </div>
  </div>
  <div className="row mb-3">
    <label htmlFor="text" className="col-sm-4 col-form-label">تاريخ إنتهائها </label>
    <div className="col-sm-8">
      <input   type="datetime-local"
 name="identityExpiryDate" className="form-control"
                  onChange={handleChange}

 value={reportInfo.identityExpiryDate}

                 />
    </div>
  </div>
  <div className="row mb-3" >
  <div class="form-check">
    <label htmlFor="text"  className="col-sm-12 col-form-label"> ليبي الجنسية</label>
<div className='row'>
<label class="form-check-label " for="inlineRadio1">ليبي</label>
<input
                    type="radio"
                    name="isLibyanNationality"
                    className="form-check-input"
                    value={true}
                    onChange={handleRadioChange}
                    checked={reportInfo.isLibyanNationality === true}
                  />
</div>
</div>
<div class="form-check">
<div className="row">
<label class="form-check-label " for="inlineRadio2">غير ليبي</label>
<input
                    type="radio"
                    name="isLibyanNationality"
                    className="form-check-input"
                    value={false}
                    onChange={handleRadioChange}
                    checked={reportInfo.isLibyanNationality === false}
                  />
</div>
</div>
  </div>
  <div className="row mb-3">
    <label htmlFor="text" className="col-sm-4 col-form-label">  الجنسية</label>
    <div className="col-sm-8">
      <input type="text" name="nationality" className="form-control"
                  onChange={e=>setReportInfo({...reportInfo,nationality:e.target.value}) }
      value={reportInfo.nationality}

                 />
    </div>
  </div>
  <div className="row mb-3" >
  <div class="form-check">
    <label htmlFor="text"  className="col-sm-12 col-form-label">  الشخص مقيم؟ </label>
<div className='row'>
<label class="form-check-label " for="inlineRadio1">نعم</label>
<input
                    type="radio"
                    name="resident"
                    className="form-check-input"
                    value={true}
                    onChange={handleRadioChange}
                    checked={reportInfo.resident === true}
                  />
</div>
</div>
<div class="form-check">
<div className="row">
<label class="form-check-label " for="inlineRadio2"> لا</label>
<input
                    type="radio"
                    name="resident"
                    className="form-check-input"
                    value={false}
                    onChange={handleRadioChange}
                    checked={reportInfo.resident === false}
                  />
</div>
</div>
  </div>
  <div className="row mb-3">
    <label htmlFor="text" className="col-sm-4 col-form-label">رقم جواز السفر</label>
    <div className="col-sm-8">
      <input type="text" name="passportNumber" className="form-control"
                  onChange={e=>setReportInfo({...reportInfo,passportNumber:e.target.value}) }
      value={reportInfo.passportNumber}

                 />
    </div>
  </div>
  <div className="row mb-3">
    <label htmlFor="text" className="col-sm-4 col-form-label">تاريخ الإصدار</label>
    <div className="col-sm-8">
      <input   type="datetime-local"
 name="passportNumberIssueDate" className="form-control"
                  onChange={handleChange}

 value={reportInfo.passportNumberIssueDate}

                 />
    </div>
  </div>
  <div className="row mb-3">
    <label htmlFor="text" className="col-sm-4 col-form-label">تاريخ الإنتهاء</label>
    <div className="col-sm-8">
      <input   type="datetime-local"
 name="passportNumberExpiryDate" className="form-control"
                  onChange={handleChange}

 value={reportInfo.passportNumberExpiryDate}

                 />
    </div>
  </div>
  <div className="row mb-3">
    <label htmlFor="text" className="col-sm-4 col-form-label"> رقم الهاتف</label>
    <div className="col-sm-8">
      <input type="number" name="phoneNumber" className="form-control"
                  onChange={e=>setReportInfo({...reportInfo,phoneNumber:e.target.value}) }
      value={reportInfo.phoneNumber}

                 />
    </div>
  </div>
  <div className="row mb-3">
    <label htmlFor="text" className="col-sm-4 col-form-label"> البريد الألكتروني</label>
    <div className="col-sm-8">
      <input type="email" name="email" className="form-control"
                  onChange={e=>setReportInfo({...reportInfo,email:e.target.value}) }
      value={reportInfo.email}

                 />
    </div>
  </div>
  <div className="row mb-3">
    <label htmlFor="text" className="col-sm-4 col-form-label"> المدينة</label>
    <div className="col-sm-8">
      <input type="city" name="beneficiaryArea" className="form-control"
                  onChange={e=>setReportInfo({...reportInfo,city:e.target.value}) }
      value={reportInfo.city}

                 />
    </div>
  </div>
  <div className="row mb-3">
    <label htmlFor="text" className="col-sm-4 col-form-label"> المنطقة</label>
    <div className="col-sm-8">
      <input type="text" name="area" className="form-control"
                  onChange={e=>setReportInfo({...reportInfo,area:e.target.value}) }
      value={reportInfo.area}

                 />
    </div>
  </div>


  <div className="row mb-3">
    <label htmlFor="text" className="col-sm-4 col-form-label">الشارع </label>
    <div className="col-sm-8">
      <input type="text" name="street" className="form-control"
                  onChange={e=>setReportInfo({...reportInfo,street:e.target.value}) }
      value={reportInfo.street}

                 />
    </div>
  </div>
  <div className="row mb-3">
    <label htmlFor="text" className="col-sm-4 col-form-label"> أقرب نقطة دالة</label>
    <div className="col-sm-8">
      <input type="text" name="nearestMilestone" className="form-control"
                  onChange={e=>setReportInfo({...reportInfo,nearestMilestone:e.target.value}) }
      value={reportInfo.nearestMilestone}

                 />
    </div>
  </div>


  

<div className="btn-cliens">
    <button type="submit" className="btn btn-primary" 
  
    >تقديم</button>
    <Link to="/viewreport">
    
<button type="submit" className="btn btn-dark">ألغاء</button>
    </Link>
</div>
</form>


    </div>
</div>
    
    

    
    
    </>
  )
}

export default RepoptPage