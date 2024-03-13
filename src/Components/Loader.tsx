import React from 'react';
import { Spinner } from '@vkontakte/vkui';

const Loader: React.FC = () => {
  return (
    <div className='loader'>
        <div style={{textAlign: 'center'}}> 
            <Spinner size="large" />
        </div>
    </div>
  );
}

export default Loader;
