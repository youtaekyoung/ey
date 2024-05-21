import React from 'react';
import { useNavigate } from 'react-router-dom';

const CompBoardDT = ({ data, num }) => {
  const { countLikes, countViews, regdate, title, user} = data
  const navigate = useNavigate()
  function fnDetailPage(e) {
    navigate("/BoardDD", {state:{data}})
  }


  return (
    
      <tr onClick={fnDetailPage}>
        <td>{num}</td>
        <td className='Board-title'>{title}</td>
        <td>{user.id}</td>
        <td>{regdate.split('T', 1)}</td>
        <td>{countLikes}</td>
        <td>{countViews}</td>
      </tr >
    
  );
};

export default CompBoardDT;