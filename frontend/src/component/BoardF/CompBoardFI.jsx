import React, { useContext, useState } from 'react';
import { AppContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import BoardService from '../../service/BoardService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
const CompBoardFI = () => {
  const [_title, _setTitle] = useState('')
  const [_content, _setContent] = useState('')
  const [_file, _setFile] = useState()
  const { _loginId } = useContext(AppContext)
  const navigate = useNavigate()

  function fnSubmit(e) {
    e.preventDefault()
    let FD
    FD = new FormData(e.currentTarget)
    FD.append("id", _loginId)
    if (_file === undefined) {
      FD.delete('files')
    }
    BoardService.insertFileBoard(FD).then(res => {
      if (res) {
        alert('게시물이 등록되었습니다.')
        navigate('/BoardF')
      }

    }).catch((error) => {
      alert('로그인한 후에 다시시도해주세요')
      _setTitle()
      _setContent()

    });
    e.currentTarget.reset()
  }


  function fnCancle() {
    navigate('/BoardF')
  }

  function fnfileUpload(e) {
    const target = e.currentTarget
    const max = 10 * 1024 * 1024
    let arr = Array.from(target.files).filter(v => v.size < max)
    if (target.files.length > 5) {
      alert('5개까지만 가능합니다.')
    }
    else {
      if (arr.length === target.files.length) {
        _setFile(target.value)
      }
      else {
        alert('10MB넘으면 불가능 합니다.')
      }
    }
  }



  return (
    <form onSubmit={fnSubmit} encType="multipart/form-data" className='BoardFI'>
      <div className='BoardFI-t'>
        <h3>파일 게시판 작성 페이지</h3>
        <button onClick={(e) => {
          if (window.confirm('돌아가시겠습니까?') === true) { navigate('/BoardF') } else { e.preventDefault() }
        }
        }><FontAwesomeIcon icon={faArrowLeft} /></button>
      </div>
      <div className='BoardFI-b'>
        <div className='person'>
          <span>작성자</span>
          <span>{_loginId}</span>
        </div>
        <div className='title'>
          <span>제목</span>
          <input type="text" value={_title || ''} name='title' onChange={e => _setTitle(e.target.value)} />
        </div>
        <div className='content'>
          <span>내용</span>
          <textarea value={_content || ''} name='content' onChange={e => _setContent(e.target.value)}></textarea>
        </div>
        <div className='file'>
          <span>파일</span> <input type="file" name='files' onChange={fnfileUpload} value={_file || ''} multiple />
        </div>
      </div>
      <div className='btn'>
        <button className='Bbtn-u'>올리기</button>
        <button onClick={fnCancle} className='Bbtn-c'>취소</button>
      </div>
    </form>
  );
};

export default CompBoardFI;