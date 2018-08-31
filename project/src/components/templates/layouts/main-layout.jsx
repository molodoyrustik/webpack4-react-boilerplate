import React from 'react';

const MainLayout = (props) => {
  return (
    <div>
      <div className='wrapper'>
        <div className="main-content">
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
