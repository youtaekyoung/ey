import axios from "axios";

//const USER_API_BASE_URL = 'https://183.101.134.54:8073/api/v1';
//const USER_API_BASE_URL = 'https://14.54.176.241:8073/api/v1';

const USER_API_BASE_URL = 'https://a323-183-101-134-54.ngrok-free.app/api/v1';

class UserService{
    /* 
    TestComponent.jsx - 테스트를 위한 회원 전체 조회
    getUsers(){
        return axios.get(USER_API_BASE_URL+"/users");
    }
    */

   //아이디 중복 체크 : 결과값은 0 혹은 1
   idCheck(id){
    return axios.get(USER_API_BASE_URL+"/idCheck/"+id,{headers : {'ngrok-skip-browser-warning':'69420'}});
   }

   //로그인
   //loginVo에는 id와 password를 json 형태로 담아주세요
   login(loginVo){
    return axios.post(USER_API_BASE_URL+"/login", loginVo,{headers : {'ngrok-skip-browser-warning':'69420'}});
   }

   //회원가입
   //joinVo는 id와 password, auth를 json 형태로 담아주세요
   //id는 중복검사가 완료되어야 하고, auth는 유태경일경우 U, 이지원일경우 L
   join(joinVo){
    return axios.post(USER_API_BASE_URL+"/join", joinVo,{headers : {'ngrok-skip-browser-warning':'69420'}});
   }
}

export default new UserService();