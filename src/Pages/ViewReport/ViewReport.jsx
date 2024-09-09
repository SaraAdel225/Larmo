import React, { useEffect, useState, useMemo } from 'react';
import './ViewReport.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Nav from '../../components/Nav/Nav';

const ViewReport = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  // Fetch data from API
  useEffect(() => {
    axios.get('http://larmo.tryasp.nets/api/Notifications?PagingOptions.PageSize=50000000')
      .then(res => setData(res.data.items))
      .catch(err => {
        console.error("Failed to fetch data", err);
        // Consider showing a user-friendly error message
      });
  }, []);

  // Filter data based on search input
  const filteredData = useMemo(() => {
    const searchTerm = search.toLowerCase();
    return data.filter(item =>
      Object.values(item).some(value =>
        value && value.toString().toLowerCase().includes(searchTerm)
      )
    );
  }, [data, search]);

  // Pagination calculations
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = filteredData.slice(firstIndex, lastIndex);
  const npage = Math.ceil(filteredData.length / recordsPerPage);
  const numbers = [...Array(npage).keys()].map(n => n + 1);

  const prePage = (e) => {
    e.preventDefault();
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const nextPage = (e) => {
    e.preventDefault();
    if (currentPage < npage) setCurrentPage(currentPage + 1);
  };

  const changeCPage = (id, e) => {
    e.preventDefault();
    setCurrentPage(id);
  };

  return (
    <>
      <Nav />
      <div className='reportview'>
        <h1>البلاغات المسجلة</h1>
        <div className="container">
          <form className="search" role="search">
            <div className="search-creat">
              <input
                onChange={(e) => setSearch(e.target.value)}
                className="form-control me-2"
                type="search"
                placeholder="ابحث في جميع الأعمدة"
                aria-label="Search"
              />
            </div>
            <div className="create-creat">
              <Link to="/reportPage">
                <button className="btn btn-primary" type="button">
                  انشاء جديد
                </button>
              </Link>
            </div>
          </form>
        </div>
        <div className="form-ap">
          <table>
            <thead>
              <tr>
                <th>المعرف</th>
                <th>الاسم بالكامل</th>
                <th>أسم الأم ثلاثي</th>
                <th>الجنس</th>
                <th>الحالة الأجتماعية</th>
                <th>المهنة</th>
                <th>جهة العمل</th>
                <th>تاريخ بدأ علاقة العمل</th>
                <th>رقم الهوية</th>
                <th>تاريخ إصدارها</th>
                <th>تاريخ إنتهائها</th>
                <th>ليبي الجنسية</th>
                <th>الجنسية</th>
                <th>الشخص مقيم؟</th>
                <th>رقم جواز السفر</th>
                <th>تاريخ الإصدار</th>
                <th>تاريخ الإنتهاء</th>
                <th>رقم الهاتف</th>
                <th>الإيميل</th>
                <th>المدينة</th>
                <th>المنطقة</th>
                <th>الشارع</th>
                <th>أقرب نقطة دالة</th>
              </tr>
            </thead>
            <tbody>
              {records.length > 0 ? (
                records.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.fullName}</td>
                    <td>{item.motherName}</td>
                    <td>{item.gender}</td>
                    <td>{item.maritalStatus}</td>
                    <td>{item.profession}</td>
                    <td>{item.employer}</td>
                    <td>{item.startWorkDate}</td>
                    <td>{item.identityNumber}</td>
                    <td>{item.identityIssueDate}</td>
                    <td>{item.identityExpiryDate}</td>
                    <td>{item.isLibyanNationality ? 'نعم' : 'لا'}</td>
                    <td>{item.nationality}</td>
                    <td>{item.resident ? 'نعم' : 'لا'}</td>
                    <td>{item.passportNumber}</td>
                    <td>{item.passportNumberIssueDate}</td>
                    <td>{item.passportNumberExpiryDate}</td>
                    <td>{item.phoneNumber}</td>
                    <td>{item.email}</td>
                    <td>{item.city}</td>
                    <td>{item.area}</td>
                    <td>{item.street}</td>
                    <td>{item.nearestMilestone}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className='message' colSpan="22">لا توجد بيانات لعرضها</td>
                </tr>
              )}
            </tbody>
          </table>
          {npage > 1 && (
            <nav aria-label="Page navigation">
              <ul className="pagination">
                <li className="page-item">
                  <button className="page-link" onClick={prePage} disabled={currentPage === 1}>prev</button>
                </li>
                {numbers.map((n) => (
                  <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={n}>
                    <button className="page-link" onClick={(e) => changeCPage(n, e)}>{n}</button>
                  </li>
                ))}
                <li className="page-item">
                  <button className="page-link" onClick={nextPage} disabled={currentPage === npage}>next</button>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>
    </>
  );
}

export default ViewReport;
