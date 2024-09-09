import React, { useState } from 'react';
import Nav from '../../components/Nav/Nav';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Created.css'
const Created = () => {
  const navigate = useNavigate();

  const initialState = {
    operationType: [ 'Deposit', 'Withwraw', 'Transfer'],
    amount: '',
    currencyType: '',
    date: '2024-07-29',
    iban: '',
    beneficiaryName: '',
    beneficiaryCountry: '',
    beneficiaryCity: '',
    beneficiaryArea: '',
    beneficiaryNearestMilestone: '',
    sourceOfFunds: '',
    sendingParty: '',
    receivingParty: '',
    clientProfession: '',
    clientIdentityNumber: '',
    clientCountry: '',
    clientCity: '',
    clientArea: '',
    clientNearestMilestone: '',
    beneficiaryClientRelationship: '',
    beneficiaryActivity: '',
  };

  const [userInfo, setUserInfo] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const AddNew = async () => {
    try {
      const response = await axios.post('http://larmo.tryasp.net/api/Operations', userInfo);
      if (response) {
        console.log(response.data);
        navigate('/creat');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      AddNew();
    } else {
      alert("من فضلك ادخل جميع البيانات");
    }
  };

  const validateForm = () => {
    // Basic validation
    return Object.values(userInfo).every(value => value !== '' && value !== '0.00000000000');
  };

  return (
    <>
      <Nav />
      <h1 className='cliens-h1'>أنشاء جديد</h1>
      <div className='form-cliens'>
        <form onSubmit={handleSubmit}>
          <div className="row mb-3" id='asa'>
            <div className="col-sm-8">
              <select
                name="operationType"
                className="form-select form-select-lg mb-3"
                aria-label="Large select example"
                onChange={handleChange}
                value={userInfo.operationType}
              >
                <option value="">نوع العملية</option>
                <option value="1">إيداع</option>
                <option value="2">سحب</option>
                <option value="3">تحويل</option>
              </select>
            </div>
          </div>

          {/* Repeated input fields */}
          <div className="row mb-3">
    <label htmlFor="text" className="col-sm-4 col-form-label">المبلغ</label>
    <div className="col-sm-8">
      <input type="number" name="amount" className="form-control"
            onChange={e=>setUserInfo({...userInfo,amount:e.target.value}) }
      value={userInfo.amount}
      />
    </div>
  </div>
  <div className="row mb-3">
    <label htmlFor="text" className="col-sm-4 col-form-label"> نوع العملة</label>
    <div className="col-sm-8">
      <input type="text" name="currencyType" className="form-control"
            onChange={e=>setUserInfo({...userInfo,currencyType:e.target.value}) }
      value={userInfo.currencyType}
      />
    </div>
  </div>
  <div className="row mb-3">
    <label htmlFor="text" className="col-sm-4 col-form-label">التاريخ</label>
    <div className="col-sm-8">

    <input
     className="form-control"
  type="datetime-local"
  id="meeting-time"
  name="date"
  onChange={e=>setUserInfo({...userInfo, date:e.target.value}) }
  value={userInfo.date}
  />
          
    </div>
  </div>
  <div className="row mb-3">
    <label htmlFor="text" className="col-sm-4 col-form-label">أيبان</label>
    <div className="col-sm-8">
      <input type="text" name="iban" className="form-control"
            onChange={e=>setUserInfo({...userInfo,iban:e.target.value}) }
      value={userInfo.iban}
      />
    </div>
  </div>
  <div className="row mb-3">
    <label htmlFor="text" className="col-sm-4 col-form-label">اسم المستفيد</label>
    <div className="col-sm-8">
      <input type="text" name="beneficiaryName" className="form-control"
            onChange={e=>setUserInfo({...userInfo,beneficiaryName:e.target.value}) }
      value={userInfo.beneficiaryName}
      />
    </div>
  </div>
  <div className="row mb-3">
    <label htmlFor="text" className="col-sm-4 col-form-label">البلد المستفيد</label>
    <div className="col-sm-8">
      <input type="text" name="beneficiaryCountry" className="form-control"
            onChange={e=>setUserInfo({...userInfo,beneficiaryCountry:e.target.value}) }
      value={userInfo.beneficiaryCountry}
      />
    </div>
  </div>
  <div className="row mb-3">
    <label htmlFor="text" className="col-sm-4 col-form-label">المدينة المستفيدة</label>
    <div className="col-sm-8">
      <input type="text" name="beneficiaryCity" className="form-control"
            onChange={e=>setUserInfo({...userInfo,beneficiaryCity:e.target.value}) }
      value={userInfo.beneficiaryCity}
      />
    </div>
  </div>
  <div className="row mb-3">
    <label htmlFor="text" className="col-sm-4 col-form-label">المنطقة المستفيدة</label>
    <div className="col-sm-8">
      <input type="text" name="beneficiaryArea" className="form-control"
            onChange={e=>setUserInfo({...userInfo,beneficiaryArea:e.target.value}) }
      value={userInfo.beneficiaryArea}
      />
    </div>
  </div>
  <div className="row mb-3">
    <label htmlFor="text" className="col-sm-4 col-form-label">أقرب معلم للمستفيد</label>
    <div className="col-sm-8">
      <input type="text" name="beneficiaryNearestMilestone" className="form-control"
            onChange={e=>setUserInfo({...userInfo,beneficiaryNearestMilestone:e.target.value}) }
      value={userInfo.beneficiaryNearestMilestone}
      />
    </div>
  </div>
  <div className="row mb-3">
    <label htmlFor="text" className="col-sm-4 col-form-label">مصدر الأموال</label>
    <div className="col-sm-8">
      <input type="text" name="sourceOfFunds" className="form-control"
            onChange={e=>setUserInfo({...userInfo,sourceOfFunds:e.target.value}) }
      value={userInfo.sourceOfFunds}
      />
    </div>
  </div>
  <div className="row mb-3">
    <label htmlFor="text" className="col-sm-4 col-form-label">أرسال الطرف</label>
    <div className="col-sm-8">
      <input type="text" name="sendingParty" className="form-control"
            onChange={e=>setUserInfo({...userInfo,sendingParty:e.target.value}) }
      value={userInfo.sendingParty}
      />
    </div>
  </div>
  <div className="row mb-3">
    <label htmlFor="text" className="col-sm-4 col-form-label">الطرف الملتقي</label>
    <div className="col-sm-8">
      <input type="text" name="receivingParty" className="form-control"
            onChange={e=>setUserInfo({...userInfo,receivingParty:e.target.value}) }
      value={userInfo.receivingParty}
      />
    </div>
  </div>
  <div className="row mb-3">
    <label htmlFor="text" className="col-sm-4 col-form-label">مهنة العميل</label>
    <div className="col-sm-8">
      <input type="text" name="clientProfession" className="form-control"
            onChange={e=>setUserInfo({...userInfo,clientProfession:e.target.value}) }
      value={userInfo.clientProfession}
      />
    </div>
  </div>
  <div className="row mb-3">
    <label htmlFor="text" className="col-sm-4 col-form-label">رقم هوية العميل</label>
    <div className="col-sm-8">
      <input type="text" name="clientIdentityNumber" className="form-control"
            onChange={e=>setUserInfo({...userInfo,clientIdentityNumber:e.target.value}) }
      value={userInfo.clientIdentityNumber}
      />
    </div>
  </div>
  <div className="row mb-3">
    <label htmlFor="text" className="col-sm-4 col-form-label">بلد العميل</label>
    <div className="col-sm-8">
      <input type="text" name="clientCountry" className="form-control"
            onChange={e=>setUserInfo({...userInfo,clientCountry:e.target.value}) }
      value={userInfo.clientCountry}
      />
    </div>
  </div>
  <div className="row mb-3">
    <label htmlFor="text" className="col-sm-4 col-form-label">مدينة العميل</label>
    <div className="col-sm-8">
      <input type="text" name="clientCity" className="form-control"
            onChange={e=>setUserInfo({...userInfo,clientCity:e.target.value}) }
      value={userInfo.clientCity}
      />
    </div>
  </div>
  <div className="row mb-3">
    <label htmlFor="text" className="col-sm-4 col-form-label">منطقة العميل</label>
    <div className="col-sm-8">
      <input type="text" name="clientArea" className="form-control"
            onChange={e=>setUserInfo({...userInfo,clientArea:e.target.value}) }
      value={userInfo.clientArea}
      />
    </div>
  </div>
  <div className="row mb-3">
    <label htmlFor="text" className="col-sm-4 col-form-label">أقرب نقطة مهمة للعميل</label>
    <div className="col-sm-8">
      <input type="text" name="clientNearestMilestone" className="form-control"
            onChange={e=>setUserInfo({...userInfo,clientNearestMilestone:e.target.value}) }
      value={userInfo.clientNearestMilestone}
      />
    </div>
  </div>
  <div className="row mb-3">
    <label htmlFor="text" className="col-sm-4 col-form-label">علاقة العميل المستفيد</label>
    <div className="col-sm-8">
      <input type="text" name="beneficiaryClientRelationship" className="form-control"
            onChange={e=>setUserInfo({...userInfo,beneficiaryClientRelationship:e.target.value}) }
      value={userInfo.beneficiaryClientRelationship}
      />
    </div>
  </div>
  <div className="row mb-3">
    <label htmlFor="text" className="col-sm-4 col-form-label">نشاط المستفيد</label>
    <div className="col-sm-8">
      <input type="text" name="beneficiaryActivity" className="form-control"
            onChange={e=>setUserInfo({...userInfo,beneficiaryActivity:e.target.value}) }
      value={userInfo.beneficiaryActivity}
      />
    </div>
  </div>

          <div className="btn-cliens">
            <button type="submit" className="btn btn-primary">تقديم</button>
            <Link to="/creat">
              <button type="button" className="btn btn-dark">ألغاء</button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Created;

