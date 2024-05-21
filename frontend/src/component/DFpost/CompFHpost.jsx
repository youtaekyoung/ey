import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';

const CompFHpost = ({ data }) => {
  const { title, user, regdate, file } = data
  const [_form, _setForm] = useState()
  const navigate = useNavigate()

  useEffect(() => {
  
    (data.filename!==null)&& _setForm(data.filename.split('.')[data.filename.split('.').length - 1])
  }, [_form, data])

  function fnClickhandler() {
    navigate("/BoardFD", { state: { data } })
  }


  return (
    <div className='Fpost' onClick={fnClickhandler}>
      <span className='Hot'><FontAwesomeIcon icon={faFire} /></span>
      <p className='Mimg'>
        {(_form) && (_form === 'jpg' || _form === 'png' || _form === 'jpeg')? <img src={`data:image/${_form};base64,${file}`} alt="" />:<img src='/img/NoPreview.png' alt=''/>}
      </p>
      <p className='Text'>{title}</p>
      <p className='Person'>{user.id}</p>
      <p className='Day'>{regdate.split('T', 1)}</p>
    </div>
  );
};

export default CompFHpost;