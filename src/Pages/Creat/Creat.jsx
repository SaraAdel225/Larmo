import React, { useEffect, useState } from 'react';
import './Creat.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Nav from '../../components/Nav/Nav';

const Creat = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');

  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;

  // Filter and paginate data
  const filteredData = data.filter(item => {
    const searchTerm = search.toLowerCase();
    return Object.values(item).some(value =>
      value && value.toString().toLowerCase().includes(searchTerm)
    );
  });

  const records = filteredData.slice(firstIndex, lastIndex);
  const npage = Math.ceil(filteredData.length / recordsPerPage);
  const numbers = [...Array(npage).keys()].map(n => n + 1);

  const prePage = (e) => {
    e.preventDefault();
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = (e) => {
    e.preventDefault();
    if (currentPage < npage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const changeCPage = (id, e) => {
    e.preventDefault();
    setCurrentPage(id);
  };

  useEffect(() => {
    axios.get('http://larmo.tryasp.net/api/Operations?PagingOptions.PageSize=50000000')
      .then(res => {
        setData(res.data.items);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return (
    <>
      <Nav />
      <div className='creat'>
        <h1>انشاء</h1>
        <div className="container">
          <form className="search" role="search">
            <div className="search-creat">
              <input
                onChange={(e) => setSearch(e.target.value)}
                className="form-control me-2"
                type="search"
                placeholder="ابحث بالعملية"
                aria-label="Search"
              />
            </div>
            <div className="create-creat">
              <button className="btn btn-outline-primary" type="button" onClick={() => window.location.reload()}>تحديث</button>
              <Link to="/created">
                <button className="btn btn-primary" type="button">انشاء جديد</button>
              </Link>
            </div>
          </form>
        </div>
        <div className="form-ap">
          <table>
            <thead>
              <tr>
                <th>المعرف</th>
                <th>نوع العملية</th>
                <th>المبلغ</th>
                <th>نوع العملة</th>
                <th>التاريخ</th>
                <th>أيبان</th>
                <th>إسم المستفيد</th>
                <th>البلد المستفيد</th>
                <th>المدينة المستفيدة</th>
                <th>المنطقة المستفيدة</th>
                <th>أقرب معلم للمستفيد</th>
                <th>مصدر الأموال</th>
                <th>إرسال الطرف</th>
                <th>الطرف المتلقي</th>
                <th>مهنة العميل</th>
                <th>رقم هوية العميل</th>
                <th>بلد العميل</th>
                <th>مدينة العميل</th>
                <th>منطقة العميل</th>
                <th>أقرب نقطة مهمة للعميل</th>
                <th>علاقة العميل المستفيد</th>
                <th>نشاط المستفيد</th>
              </tr>
            </thead>
            <tbody>
              {records.length > 0 ? (
                records.map((item, index) => (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.operationType}</td>
                    <td>{item.amount}</td>
                    <td>{item.currencyType}</td>
                    <td>{item.date}</td>
                    <td>{item.iban}</td>
                    <td>{item.beneficiaryName}</td>
                    <td>{item.beneficiaryCountry}</td>
                    <td>{item.beneficiaryCity}</td>
                    <td>{item.beneficiaryArea}</td>
                    <td>{item.beneficiaryNearestMilestone}</td>
                    <td>{item.sourceOfFunds}</td>
                    <td>{item.sendingParty}</td>
                    <td>{item.receivingParty}</td>
                    <td>{item.clientProfession}</td>
                    <td>{item.clientIdentityNumber}</td>
                    <td>{item.clientCountry}</td>
                    <td>{item.clientCity}</td>
                    <td>{item.clientArea}</td>
                    <td>{item.clientNearestMilestone}</td>
                    <td>{item.beneficiaryClientRelationship}</td>
                    <td>{item.beneficiaryActivity}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="21">No data available</td>
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
                {numbers.map(n => (
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
};

export default Creat;

