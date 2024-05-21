import React, { useEffect, useState } from 'react';
import BoardService from '../../service/BoardService';


const CompBoardFDF = ({ data }) => {
  const { filename, filesize, file, fileseq } = data
  const [_form, _setForm] = useState()

  useEffect(() => {
    _setForm(data.filename.split('.')[data.filename.split('.').length - 1])
  }, [_form, data])

  const fnDownload = () => {

    if(window.confirm('다운받으시겠습니까?')===true){
      BoardService.downloadFile(fileseq).then(res => {
        window.open(res.config.url)
      })
    }

  };

  return (
    <div>
      <div className='main-img'  >
        {(_form) && (_form === 'jpg' || _form === 'png' || _form === 'jpeg') && <img src={`data:image/${_form};base64,${file}`} alt="" />}
      </div>
      <div className='main-file'>
        <span className='name'>{(data) && filename}</span>
        <span className='size'>[{(data) && filesize}] byte </span>
      </div>
      <button onClick={fnDownload} >다운로드</button>
    </div>
  );
};

export default CompBoardFDF;