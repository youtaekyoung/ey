import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createContext,  useState } from 'react';
import CompFooter from "./component/CompFooter";
import CompHeader from "./component/CompHeader";
import CompMain from "./component/CompMain";
import CompBoardD from "./component/BoardD/CompBoardD"
import CompBoardF from "./component/BoardF/CompBoardF"
import CompYou from './component/Portfolio/CompYou';
import CompEasy from './component/Portfolio/CompEasy';
import CompLogin from './component/CompLogin';
import CompMember from './component/CompMember';
import CompBoardDI from './component/BoardD/CompBoardDI';
import CompBoardFI from './component/BoardF/CompBoardFI';
import CompBoardDD from './component/BoardD/CompBoardDD';
import CompBoardFD from './component/BoardF/CompBoardFD';
export const AppContext = createContext()

function UserId() {
  let user
  let userLogin
  if (window.localStorage.getItem('UserStorage')) {
    user = JSON.parse(window.localStorage.getItem('UserStorage'))
    userLogin = true
  }
  else {
    user = ''
    userLogin = false
  }
  return { user, userLogin }
}

function App() {
  const [_isLogin, _setIsLogin] = useState(UserId().userLogin)
  const [_loginId, _setLoginId] = useState(UserId().user.id)
  const [_loginAuth, _setLoginAuth] = useState(UserId().user.auth)

  
  return (
    <div className="App">
      <BrowserRouter>
        <AppContext.Provider value={{ _isLogin, _setIsLogin, _loginId, _setLoginId , _loginAuth, _setLoginAuth }}>
          <CompHeader></CompHeader>
          <Routes>
            <Route path='/' element={<CompMain />} />
            <Route path='/BoardD' element={<CompBoardD />} />
            <Route path='/BoardDI' element={<CompBoardDI/>}/>
            <Route path='/BoardDD' element={<CompBoardDD/>}/>
            <Route path='/BoardF' element={<CompBoardF />} />
            <Route path='/BoardFI' element={<CompBoardFI />} />
            <Route path='/BoardFD' element={<CompBoardFD />} />
            <Route path='/YouPort' element={<CompYou />} />
            <Route path='/EasyPort' element={<CompEasy />} />
            <Route path='/Login' element={<CompLogin />} />
            <Route path='/Member' element={<CompMember />} />
          </Routes>
        </AppContext.Provider>
        <CompFooter></CompFooter>
      </BrowserRouter>
    </div>
  );
}

export default App;
