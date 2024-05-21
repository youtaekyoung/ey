import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BoardService from '../../service/BoardService';
import CompBoardDT from './CompBoardDT';

const CompBoardD = () => {
  const [_numScreen, _setNumScreen] = useState(5)
  const [_currentPage, _setCurrentPage] = useState(1)
  const [_totalPage, _setTotalPage] = useState()
  const [_totalData, _setTotalData] = useState()
  const [_btnArr, _setBtnArr] = useState()
  const [_searchData, _setSearchData] = useState()
  const [_search, _setSearch] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    BoardService.getReplyBoardAll().then(res => { 
      let All = res.data.map((v, index) => <CompBoardDT data={v} key={index} num={index + 1} />)
      let Data = (_search) ? All.filter(v => v.props.data.title.toLowerCase().includes(_search)) : All
      let totalPage = Math.ceil(Data.length / _numScreen)

      let num = _currentPage
      _setBtnArr(Array.from({ "length": totalPage }, (v, i) => i + 1))
      _setTotalData(Data)
      _setTotalPage(totalPage)
      _setSearchData(Data.slice((_currentPage - 1) * _numScreen, _numScreen * _currentPage))
      if (num >= totalPage) { num = totalPage }
      else { num = _currentPage }
      _setSearchData(Data.slice((num - 1) * _numScreen, _numScreen * num))

      document.querySelectorAll('.page-nav > button').forEach(v => {
        v.classList.remove('active')
        if (num === parseInt(v.value)) {
          v.classList.add('active')
        }
      })


      if (_currentPage >= _totalPage) {
        if (((res.data.length) % _numScreen) === 0) {
          document.querySelector('.BoardD-table').style.height = "100%"
        }
        else {
          document.querySelector('.BoardD-table').style.height = (100 / _numScreen) * ((res.data.length) % _numScreen) + '%'
        }
      }
      else {
        document.querySelector('.BoardD-table').style.height = "100%"
      }

    })

  }, [_search, _numScreen, _currentPage, _totalPage])

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
  function fnSearch(e) {
    _setCurrentPage(_currentPage)
    _setSearch((e.target.value.toLowerCase()))


    document.querySelectorAll('.page-nav > button').forEach(v => {
      v.classList.remove('active')
      if (_currentPage === parseInt(v.value)) {
        v.classList.add('active')
      }
    })
    if (_currentPage >= _totalPage) {
      if (((_totalData.length) % _numScreen) === 0) {
        document.querySelector('.BoardD-table').style.height = "100%"
      }
      else {
        document.querySelector('.BoardD-table').style.height = (100 / _numScreen) * ((_totalData.length) % _numScreen) + '%'
      }
    }
    else {
      document.querySelector('.BoardD-table').style.height = "100%"
    }

  }

  function fnSelect(e) {
    if (e.target.value === '10') {
      _setCurrentPage(1)
    }
    _setNumScreen(e.target.value)
  }


  return (
    <div className='BoardD'>
      <div className='BoardD-t'>
        <h3>댓글게시판</h3>
        <button onClick={() => { navigate('/BoardDI') }}>글작성</button>
      </div>
      <div className='BoardD-m'>
        <select onClick={fnSelect}>
          <option value="5">5</option>
          <option value="10">10</option>
        </select>
        <span>검색:</span>
        <input type="text" value={_search || ''} onChange={fnSearch} />

      </div>
      <div className='BoardD-b'>
        <table className="BoardD-table">
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
              _searchData
            }
          </tbody>
        </table>
      </div>
      <div className='page-nav'>
        <button onClick={fnClickPrev} className='page-prev'>이전</button>
        {
          (_btnArr) && _btnArr.map((v, index) => <button onClick={fnClickBtn} key={index} value={v}>{v}</button>)
        }
        <button onClick={fnClickNext} className='page-next'>다음</button>
      </div>
    </div>
  );
};

export default CompBoardD;