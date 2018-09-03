import React from 'react';
import './AlertInfo.css';

const AlertInfo = ({alertInfo, passed}) => {
  return(
    <div className={`alertinfo ${passed ? 'success' : ''}`}>
      {alertInfo}
    </div>
  )
}

export default AlertInfo;