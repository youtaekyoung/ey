import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import UserService from '../service/UserSerive';
import { AppContext } from '../App';
const CompLogin = () => {
  const {_setIsLogin, _loginId, _setLoginId } = useContext(AppContext)
  const [_type, _setType] = useState('password')
  const [_icon, _setIcon] = useState(faEyeSlash)
  const [_loginPw, _setLoginPw] = useState()
  const navigate = useNavigate()
  const log = {
    id: _loginId,
    password: _loginPw
  }
  function fnClickHander() {
    _setType(v => (v === 'password') ? 'text' : 'password')
    _setIcon(v => (v === faEyeSlash) ? faEye : faEyeSlash)
  }

  function fnLogin(e) {
    e.preventDefault()

    UserService.login(log).then(res => {
      if (log.id !== undefined && log.password !== undefined) {
        if (res.data.id === _loginId && res.data.password === _loginPw) {
          alert('로그인 확인되었습니다')
          _setIsLogin(true)
          const allLog = {
            id: _loginId,
            auth:res.data.auth
          }
          window.localStorage.setItem('UserStorage', JSON.stringify(allLog))
          navigate('/')
        }
        else {
          alert('아이디 혹은 비밀번호가 틀렸습니다.')
          _setLoginId()
          _setLoginPw()
        }
      }
      else{
        if(_loginId!==undefined){
          alert('비밀번호를 입력해주세요')
        }
        else if(_loginPw!==undefined){
          alert('아이디를 입력해 주세요')
        }
        else{
          alert('아이디와 비밀번호를 입력해주세요')
        }
      }
    })
  }

  return (
    <div className='Login_main'>
      <form className='Login_box'>
        <h3>로그인</h3>
        <div className='Login_id'>
          <span>아이디</span>
          <input type="text" value={_loginId || ''} onChange={e => { _setLoginId(e.target.value) }} maxLength='15' placeholder='아이디를 입력해 주세요' />
        </div>
        <div className='Login_pw'>
          <span>비밀번호</span>
          <input type={_type} value={_loginPw || ''} onChange={e => { _setLoginPw(e.target.value) }} maxLength='15' placeholder='비밀번호를 입력해 주세요.' autoComplete="off" />
          <FontAwesomeIcon icon={_icon} onClick={fnClickHander} className='eye_h' />
        </div>
        <button className='Login_btn' onClick={fnLogin}>로그인</button>
        <button className='Member_btn' onClick={(e) => { e.preventDefault(); navigate('/Member')}}>회원가입</button>
      </form>
    </div>
  );
};

export default CompLogin;