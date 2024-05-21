import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowTurnUp } from "@fortawesome/free-solid-svg-icons";
import BoardService from '../../service/BoardService';
import { useLocation } from 'react-router-dom';
import { AppContext } from '../../App';

const CompBoardDDDDI = ({ id, seq }) => {
  const { _isLogin, _loginId } = useContext(AppContext)
  const [_input, _setInput] = useState()
  const location = useLocation()

  function fnChangeInput(e) {
    _setInput(e.target.value)
  }

  function fnInputBtn() {
    let arr = {
      content: _input,
      id: _loginId,
      replyseq: seq
    }

    if (_isLogin) {
      if (window.confirm('작성하시겠습니까?') === true) {
        BoardService.insertReplyReply(arr).then(res => {
          window.location.reload(location)
        })
      }
    }
    else {
      alert('로그인후 이용해 주세요')
    }
  }

  return (
    <div className='comment-comment-main'>
      <div className='comment-comment-id'>{id}</div>
      <textarea className='comment-comment-input' onChange={fnChangeInput} value={_input || ''}>

      </textarea>
      <button className='comment-comment-inputBtn' onClick={fnInputBtn}>작성</button>
      <span className='comment-comment-enter'>
        <FontAwesomeIcon icon={faArrowTurnUp} />
      </span>
    </div >
  );
};

export default CompBoardDDDDI;