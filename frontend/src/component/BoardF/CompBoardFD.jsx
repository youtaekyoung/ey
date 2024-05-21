import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../../App';
import BoardService from '../../service/BoardService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faEye } from "@fortawesome/free-solid-svg-icons";
import CompBoardFDF from './CompBoardFDF';
const CompBoardFD = () => {
  const { _isLogin, _loginId } = useContext(AppContext)
  const location = useLocation()
  const dataSeq = location.state.data.boardseq
  const navigate = useNavigate()
  const [_getData, _setGetData] = useState()

  useEffect(() => {
    let id
    if (_loginId === undefined) {
      id = null
    }
    else {
      id = _loginId
    }
    BoardService.getBoardOne(dataSeq, id).then(res => {
      let mainData = res.data
      _setGetData(mainData)
      if (mainData) {
        if (mainData.boardLikes === "Y") {
          document.querySelector('.like').classList.add('active')
        }
        else {
          document.querySelector('.like').classList.remove('active')
        }

        if (mainData.boardDislikes === "Y") {
          document.querySelector('.disLike').classList.add('active')
        }
        else {
          document.querySelector('.disLike').classList.remove('active')
        }

      }
    })

  }, [_isLogin, dataSeq, _loginId])


  function fnClicklikeBtn() {
    if (_isLogin) {
      let seq = _getData.boardVo.boardseq
      let id = _loginId
      if (_getData.boardLikes === "Y") {
        BoardService.cancelBoardLikes(seq, id).then(res => {
          window.location.reload(location)
        })
      }
      else {
        BoardService.boardLikes(seq, id).then(res => {
          window.location.reload(location)
        })
      }
      document.querySelector('.like').classList.toggle('active')

    }
    else {
      alert('로그인후 이용가능합니다.')
    }

  }
  function fnClickdisLikeBtn() {
    if (_isLogin) {
      let seq = _getData.boardVo.boardseq
      let id = _loginId
      if (_getData.boardDislikes === "Y") {
        BoardService.cancelboardDislikes(seq, id).then(res => {
          window.location.reload(location)
        })
      }
      else {
        BoardService.boardDislikes(seq, id).then(res => {
          window.location.reload(location)
        })
      }

      document.querySelector('.disLike').classList.toggle('active')
    }
    else {
      alert('로그인후 이용가능합니다.')
    }
  }
  function fnDelete() {
    let seq = _getData.boardVo.boardseq
    let id = _getData.boardVo.user.id
    if(_loginId===id){
      if (window.confirm('정말 삭제 하시겠습니까?') === true) {
        BoardService.deleteboard(seq).then(res => {
          navigate('/BoardF')
          alert('삭제되었습니다.')
        })
      }
    }
    else{
      alert('이용하실수 없습니다.')
    }

  }


  return (
    <div className='BoardFD'>
      <div className='BoardFD-btns'>
        <button className='back-btn' onClick={() => { navigate('/BoardF') }}>목록</button>
        <button className='delete-btn' onClick={ fnDelete }>삭제</button>
      </div>
      <div className='BoardFD-dataText'>
        <h4>{(_getData) && _getData.boardVo.title}</h4>
        <div>
          <span>{(_getData) && _getData.boardVo.user.id}</span>
          <span>{(_getData) && _getData.boardVo.regdate.split('T', 1)}</span>
          <span>{(_getData) && _getData.boardVo.countViews} <FontAwesomeIcon icon={faEye} /> </span>
        </div>

      </div>
      <div className='BoardFD-content'>
        <div className='content'>{(_getData) && _getData.boardVo.content}</div>
      </div>
      <div className='BoardFD-likeHate'>
        <button onClick={fnClicklikeBtn} className='like' ><FontAwesomeIcon icon={faThumbsUp} /> {(_getData) && _getData.boardVo.countLikes}</button>
        <button onClick={fnClickdisLikeBtn} className='disLike' ><FontAwesomeIcon icon={faThumbsDown} /> {(_getData) && _getData.boardVo.countDislikes}</button>
      </div>

      <div className='BoardFD-file'>
        <div className='file-title'>파일 ({(_getData) && _getData.fileVos.length})</div>
        <div className='file-main'>
          {(_getData) && _getData.fileVos.map(v => <CompBoardFDF key={v.fileseq} data={v} />)}
        </div>
      </div>
    </div>
  );
};

export default CompBoardFD;