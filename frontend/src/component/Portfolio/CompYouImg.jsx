import React from 'react';

const CompYouImg = ({num}) => {
  return (
    <figure className={`img img${num}`}>
      <img src={`/img/Yportfolio${num}.png`} alt='' />
    </figure>
  );
};

export default CompYouImg;