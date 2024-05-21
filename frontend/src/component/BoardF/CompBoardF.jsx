import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BoardService from '../../service/BoardService';
import CompBoardFT from './CompBoardFT';

const CompBoardF = () => {
  const [_currentPage, _setCurrentPage] = useState(1)
  const [_totalPage, _setTotalPage] = useState()
  const [_btnArr, _setBtnArr] = useState()
  const [_Data, _setData] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    BoardService.getFileBoardAll().then(res => {
      let All = res.data.map((v, index) => <CompBoardFT data={v} key={index} num={index + 1} />)
      let totalPage = Math.ceil(All.length / 5)
      let num = _currentPage
      _setBtnArr(Array.from({ "length": totalPage }, (v, i) => i + 1))
      _setTotalPage(totalPage)
      _setData(All.slice((_currentPage - 1) * 5, 5 * _currentPage))

      document.querySelectorAll('.page-nav > button').forEach(v => {
        v.classList.remove('active')
        if (num === parseInt(v.value)) {
          v.classList.add('active')
        }
      })


      if (_currentPage >= _totalPage) {
        if (((res.data.length) % 5) === 0) {
          document.querySelector('.BoardF-table').style.height = "100%"
        }
        else {
          document.querySelector('.BoardF-table').style.height = (100 / 5) * ((res.data.length) % 5) + '%'
        }
      }
      else {
        document.querySelector('.BoardF-table').style.height = "100%"
      }
    })


  }, [_currentPage,_totalPage])



  function fnClickBtn(e) {
    _setCurrentPage(parseInt(e.target.value))
  }

  function fnClickPrev() {
    if (_currentPage > 1) {
      _setCurrentPage(v => v - 1)
    }
    else {
      alert('첫페이지')
    }

  }
  function fnClickNext() {
    if (_currentPage === _totalPage) {
      alert('마지막페이지')
    }
    else {
      _setCurrentPage(v => v + 1)
    }
  }





  return (
    <div className='BoardF'>
      <div className='BoardF-t'>
        <h3>파일게시판</h3>
        <button onClick={() => { navigate('/BoardFI') }}>글작성</button>
      </div>
      <div className='BoardF-b'>
        <table className="BoardF-table">
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>작성자</th>
              <th>작성일</th>
              <th>좋아요</th>
              <th>조회수</th>
            </tr>
          </thead>
          <tbody>
            {
              _Data
            }
          </tbody>
        </table>
      </div>
      <div className='page-nav' >
        <button onClick={fnClickPrev} className='page-prev'>이전</button>
        {
          (_btnArr) && _btnArr.map((v, index) => <button onClick={fnClickBtn} key={index} value={index + 1}>{index + 1}</button>
          )
        }
        <button onClick={fnClickNext} className='page-next'>다음</button>
      </div>
    </div>
  );
};

export default CompBoardF;