import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BoardService from '../../service/BoardService';
import { AppContext } from '../../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft} from "@fortawesome/free-solid-svg-icons";
const CompBoardDI = () => {
  const [_title, _setTitle] = useState('')
  const [_content, _setContent] = useState('')
  const { _loginId } = useContext(AppContext)
  const navigate = useNavigate()

  function fnUpdate() {
    let loginId = (_loginId) ? _loginId : 'Guest'
    let postArr = {
      title: _title,
      content: _content,
      id: loginId
    } 
    BoardService.insertReplyBoard(postArr).then(res => {
      if (res) {
        alert('게시물이 등록되었습니다.')
        navigate('/BoardD')
      }

    }).catch((error) => {
      alert('로그인한 후에 다시시도해주세요')
    });

  }
  function fnCancle() {
    if (window.confirm('돌아가시겠습니까?') === true) {
      navigate('/BoardD')
    }
  }

  return (
    <div className='BoardDI'>
      <div className='BoardDI-t'>
        <h3>댓글 게시판 작성 페이지</h3>
        <button onClick={() => {if(window.confirm('돌아가시겠습니까?')===true){navigate('/BoardD')}}}><FontAwesomeIcon icon={faArrowLeft} /></button>
      </div>
      <div className='BoardDI-b'>
        <div className='person'>
          <span>작성자</span>
          <span>{_loginId}</span>
        </div>
        <div className='title'>
          <span>제목</span>
          <input type="text" value={_title || ''} onChange={e => _setTitle(e.target.value)} />
        </div>
        <div className='content'>
          <span>내용</span>
          <textarea value={_content || ''} onChange={e => _setContent(e.target.value)}></textarea>
        </div>
      </div>
      <div className='btn'>
        <button onClick={fnUpdate} className='Bbtn-u'>올리기</button>
        <button onClick={fnCancle} className='Bbtn-c'>취소</button>
      </div>
    </div>
  );
};

export default CompBoardDI;