import React from 'react';

type props = {
  additionalClass?: {};
};

const Content: React.FC<props> = ({ additionalClass }) => {
  return (
    <div className={[additionalClass].join(' ')}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Content;
