import React, { useEffect, useState } from 'react';
import CompDHpost from './DFpost/CompDHpost';
import CompDNpost from './DFpost/CompDNpost';
import CompFHpost from './DFpost/CompFHpost';
import CompFNpost from './DFpost/CompFNpost';
import BoardService from '../service/BoardService';


const CompMain = () => {
  const [_DGarr, _setDGarr] = useState([])
  const [_DCarr, _setDCarr] = useState([])
  const [_FGarr, _setFGarr] = useState([])
  const [_FCarr, _setFCarr] = useState([])


  useEffect(() => {
    BoardService.mainReplyBoard().then(res => {
      _setDGarr(res.data.like)
      _setDCarr(res.data.latest)
    })
    BoardService.mainFileBoard().then(res => {
      _setFGarr(res.data.like)
      _setFCarr(res.data.latest)
    })
  }, [])

  function fnMail (e){
    window.open(`mailto:${e.target.innerText}`)
  }

  function fnTel (e){
    window.open(`tel:${e.target.innerText}`)
  }




  return (
    <>
      <div className='Main-h'>
        <div className='board-d'>
          <h2>댓글 게시판</h2>
          <div className='board-d-h'>
            {
              _DGarr.map(v => <CompDHpost data={v} key={v.boardseq} />)
            }
          </div>

          <div className='board-d-c'>
            {
              _DCarr.map(v => <CompDNpost data={v} key={v.boardseq} />)
            }
          </div>
          
        </div>
        <div className='board-f'>
          <h2>파일 게시판</h2>
          <div className='board-f-h'>
            {
              _FGarr.map(v => <CompFHpost data={v} key={v.boardseq} />)
            }
          </div>
          <div className='board-f-c'>
            {
              _FCarr.map(v => <CompFNpost data={v} key={v.boardseq} />)
            }
          </div>
        </div>
      </div>
      <div className='Main-b'>
        <div className='card-y'>
          <h3>유태경</h3>
          <p>&#91;FrontEnd Developer&#93;</p>
          <p onClick={fnMail}>bsxorud@naver.com</p>
          <p onClick={fnTel}>010-5157-4711</p>
        </div>
        <div className='card-y'>
          <h3>이지원</h3>
          <p>&#91;BackEnd Developer&#93;</p>
          <p onClick={fnMail}>2jiwons2@naver.com</p>
          <p onClick={fnTel}>010-7420-4290</p>
        </div>
      </div>
    </>
  );
};

export default CompMain;