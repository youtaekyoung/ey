import React, { useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppContext } from '../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCaretDown } from "@fortawesome/free-solid-svg-icons";

const CompHeader = () => {
  const { _isLogin, _setIsLogin, _setLoginId, _loginId } = useContext(AppContext)
  const location = useLocation()

  function fnClickHander() {
    document.querySelector(`.Board_main`).classList.toggle('active')
  }
  function fnCancleHander(e) {
    document.querySelector(`.Board_main`).classList.remove('active')
  }
  function fnLogOut() {
    _setIsLogin(false)
    _setLoginId()
    window.localStorage.setItem('UserStorage', '')
  }

  useEffect(() => {
    console.log(location.pathname)
    if (location.pathname === '/') {
      document.querySelectorAll('.nav > li > a').forEach(v => { v.classList.remove('active') })
      document.querySelector('.Board_main >span').classList.remove('active')
      document.querySelector('.logo >a').classList.add('active')
    }
    else if (location.pathname === '/Login') {
      document.querySelectorAll('.nav > li > a').forEach(v => { v.classList.remove('active') });
      document.querySelector('.Board_main >span').classList.remove('active')
      document.querySelector('.nav > .login-l >a').classList.add('active')
    }
    else if (location.pathname === '/Member') {
      document.querySelectorAll('.nav > li > a').forEach(v => { v.classList.remove('active') });
      document.querySelector('.Board_main >span').classList.remove('active')
      document.querySelector('.nav > .login-r >a').classList.add('active')
    }
    else if (location.pathname === '/YouPort') {
      document.querySelectorAll('.nav > li > a').forEach(v => { v.classList.remove('active') });
      document.querySelector('.Board_main >span').classList.remove('active')
      document.querySelector('.You >a').classList.add('active')
    }
    else if (location.pathname === '/EasyPort') {
      document.querySelectorAll('.nav > li > a').forEach(v => { v.classList.remove('active') });
      document.querySelector('.Board_main >span').classList.remove('active')
      document.querySelector('.Easy >a').classList.add('active')
    }
    else {
      document.querySelectorAll('.nav > li > a').forEach(v => { v.classList.remove('active') });
      document.querySelector('.Board_main >span').classList.add('active')
     }
  }, [location])

  return (
    <div className='header'>
      <div className='header-m'>
        <ul className='nav'>
          <li className='logo' onClick={fnCancleHander}><Link to="/">EASY-YOU</Link></li>
          <li className='Board_main'>
            <span onClick={fnClickHander}>
              게시판<FontAwesomeIcon icon={faSquareCaretDown} />
            </span>

            <ul className='Board_aco'>
              <li onClick={fnCancleHander}><Link to="/BoardD">댓글게시판</Link></li>
              <li onClick={fnCancleHander}><Link to="/BoardF">파일게시판</Link></li>
            </ul>
          </li>
          <li className='You' onClick={fnCancleHander}><Link to="/YouPort">유태경의 포트폴리오</Link></li>
          <li className='Easy' onClick={fnCancleHander}><Link to="/EasyPort">이지원의 포트폴리오</Link></li>
          {
            (_isLogin === true) ? <li className='login-l'>{_loginId}님 안녕하세요 </li> : <li onClick={fnCancleHander} className='login-l'><Link to="/Login">로그인</Link></li>
          }
          {
            (_isLogin === true) ? <li onClick={fnCancleHander} className='login-r'><Link to="/" onClick={fnLogOut}>로그아웃</Link></li> : <li onClick={fnCancleHander} className='login-r'><Link to="/Member">회원가입</Link></li>
          }

        </ul>
      </div>
    </div>
  );
};

export default CompHeader;