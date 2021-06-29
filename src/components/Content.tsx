import React from 'react';

type props = {
  additionalClass?: string;
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
