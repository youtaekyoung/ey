import React, { useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowTurnUp,faThumbsUp,faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { AppContext } from '../../App';
import BoardService from '../../service/BoardService';
import { useLocation } from 'react-router-dom';


const CompBoardDDDD = ({ data ,index}) => {
  const { _isLogin, _loginId } = useContext(AppContext)
  const { id, content, regdate ,countLikes,countDislikes,replyLikes,replyDislikes} = data
  const location = useLocation()

  useEffect(() => {
    if(replyLikes==="Y"){
      document.querySelector(`.comment-comment-date >.like${index}`).classList.add('active')
    }
    else{
      document.querySelector(`.comment-comment-date >.like${index}`).classList.remove('active')
    }
    if(replyDislikes==="Y"){
      document.querySelector(`.comment-comment-date >.hate${index}`).classList.add('active')
    }
    else{
      document.querySelector(`.comment-comment-date >.hate${index}`).classList.remove('active')
    }



    if (!_isLogin) {
      document.querySelectorAll('.comment-comment-delete > button').forEach(v => {
        v.disabled = "true"
      })
    }
  }, [_isLogin,replyLikes,replyDislikes,index])



  function fnCommentDelect() {
    if (_isLogin) {
      if (_loginId === id) {
        if (window.confirm('삭제하시겠습니까?') === true) {
          BoardService.deleteReply(data.replyseq).then(res => {
            window.location.reload(location);
          })
        }
      } else {
        alert('본인것만 가능합니다.')

      }//not equal id
    }
    else {
      alert('로그인 후 이용 가능합니다.')
    }//not login


  }
  function fnClicklikeBtn(e) {
    if (_isLogin) {
      let seq = data.replyseq
      let userId = _loginId
      if (data.replyLikes === "Y") {
        BoardService.cancelReplyLikes(seq, userId).then(res => {
          window.location.reload(location)
        })
      }
      else {
        BoardService.replyLikes(seq, userId).then(res => {
          window.location.reload(location)
        })
      }
      e.currentTarget.classList.toggle('active')
    }
    else {
      alert('로그인후 이용가능합니다.')
    }

  }
  function fnClickdisLikeBtn(e) {
    if (_isLogin) {
      let seq = data.replyseq
      let userId = _loginId
      if (data.replyDislikes === "Y") {
        BoardService.cancelReplyDislikes(seq, userId).then(res => {
          window.location.reload(location)
        })
      }
      else {
        BoardService.replyDislikes(seq, userId).then(res => {
          window.location.reload(location)
        })
      }
      e.currentTarget.classList.toggle('active')
    }
    else {
      alert('로그인후 이용가능합니다.')
    }
  }

  return (
    <div className='comment-comment-main'>
      <div className='comment-comment-id'> {id}</div>
      <div className='comment-comment-content'> {content}</div>
      <div className='comment-comment-date'>
        {regdate.slice(0, 10)} {regdate.slice(11, 19)}
        <button onClick={fnClicklikeBtn} className={`btn-like like${index}`}><FontAwesomeIcon icon={faThumbsUp} /> {countLikes}</button>
        <button onClick={fnClickdisLikeBtn} className={`btn-hate hate${index}`}><FontAwesomeIcon icon={faThumbsDown} /> {countDislikes}</button>
      </div>
      <div className='comment-comment-delete' onClick={fnCommentDelect}>
        <button>삭제</button>
      </div>

      <span className='comment-comment-enter'>
        <FontAwesomeIcon icon={faArrowTurnUp} />
      </span>

    </div >
  );
};

export default CompBoardDDDD;