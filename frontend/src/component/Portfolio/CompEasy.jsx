import React, {useContext, useEffect, useState} from 'react';
import { AppContext } from '../../App';

const CompEasy = () => {
  const [_auth, _setAuth] = useState();
  const { _isLogin } = useContext(AppContext)
  useEffect(() => {
    let user
    if(_isLogin){
      user = JSON.parse(window.localStorage.getItem('UserStorage'))
      _setAuth(user.auth)
    }
  }, [])
  const checkAuth = () =>{
    if(_isLogin === false){
      alert('로그인후 이용해주세요');
    }else if(_auth === 'L'){
      window.open('https://www.notion.so/463df3f37ab5421bb5371ad1a8ac0955');
    }else{
      alert('회원가입시 선택했던 사람의 포트폴리오만 볼 수 있습니다.\n추가로 보시려면 회원가입해주세요.');
    }
    
  }

  return (
    <div className='portpolio-j'>
      <h2>이지원의 포트폴리오</h2>
      <div>
        <div className='imageZone'>
          <img src='/img/main2_jiwon.png' alt='' />
          <img src='/img/thumb1_jiwon.png' alt='' />
          <img src='/img/thumb2_jiwon.png' alt='' />
          <img src='/img/thumb3_jiwon.png' alt='' />
        </div>
        <div className='plusBtn' onClick={checkAuth}>+더보기</div>
        <p>*더 많은 포트폴리오를 보고 싶으시면 로그인 후 이용바랍니다.</p>
      </div>
    </div>
  );
};

export default CompEasy;