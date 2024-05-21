import React, { useEffect, useState } from 'react';
import UserService from '../service/UserSerive';
import { useNavigate } from 'react-router-dom';

const CompMember = () => {
  const [_id, _setId] = useState()
  const [_pw, _setPw] = useState()
  const [_sel, _setSel] = useState('U')
  const navigate = useNavigate()
  function fnIdCheck(e) {
    e.preventDefault();
    UserService.idCheck(_id).then(res => {
      return (res.data === 0) ? fnAvailableId() : fnOverlapId()
    })
  }
  function fnAvailableId() {
    if (_id === undefined) {
      alert('아이디를 입력해 주세요')
      document.querySelector('.Member_id > input').focus()
    }
    else {
      if (window.confirm('사용하시겠습니까?') === true) {
        document.querySelector('.Member_id > input').setAttribute('readonly', true)
        document.querySelector('.Member_id > input').style.color = "#CCC"
        document.querySelector('.Member_id > button').setAttribute('disabled', true)
        document.querySelector('.Member_pw > input').removeAttribute('disabled')
        document.querySelector('.Member_pw > input').focus()
      }
      else {
        document.querySelector('.Member_id > input').focus()
        _setId()
      }
    }
  }
  function fnOverlapId() {
    alert('중복입니다')
    _setId()
    document.querySelector('.Member_id > input').focus()
  }
  function fnComplete(e) {
    e.preventDefault()

    const data = {
      id: _id,
      password: _pw,
      auth: _sel
    }
    UserService.join(data);
    alert('회원가입완료')
    navigate('/Login')
  }

  useEffect(() => {
    if (_pw !== undefined && _pw !== '') {
      document.querySelector('.Member_btn').removeAttribute('disabled')
    }
    else {
      document.querySelector('.Member_btn').setAttribute('disabled', true)
    }
  })
  return (
    <div className='Member_main'>
      <form onSubmit={fnComplete} className='Member_box'>
        <h3>회원가입</h3>
        <div className='Member_id'>
          <span>아이디*</span>
          <input type="text" value={_id || ''} onChange={e => _setId(e.target.value)} placeholder='아이디를 입력해 주세요' minLength='4' maxLength='12' required />
          <button onClick={fnIdCheck}>중복검사</button>
        </div>
        <div className='Member_pw'>
          <span>비밀번호*</span>
          <input type="password" value={_pw || ''} onChange={e => _setPw(e.target.value)} placeholder='비밀번호를 입력해 주세요' minLength='4' maxLength='12' disabled required />
        </div>
        <div className='port_se'>
          <span>누구의 포트폴리오를 보고 싶으십니까?</span>
          <select name="portfolio" onClick={(e) => { _setSel(e.target.value) }} >
            <option value="U">유태경</option>
            <option value="L">이지원</option>
          </select>
        </div>
        <button className='Member_btn' disabled>회원가입</button>
      </form>
    </div>
  );
};

export default CompMember;