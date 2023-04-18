/* eslint-disable react-hooks/exhaustive-deps */
import                                 '../../../css/FindItem.css';
import React, { useEffect }       from 'react';
import { Unity, useUnityContext } from 'react-unity-webgl';
import { useParams }              from 'react-router-dom';

const FindItem = () => {
  const params = useParams();
  
  const { unload, unityProvider, loadingProgression  } = useUnityContext({
    loaderUrl:    `https://lost-and-found-server-5v26.onrender.com/uploads/${params.name}.loader.js`,
    dataUrl:      `https://lost-and-found-server-5v26.onrender.com/uploads/${params.name}.data.unityweb`,
    frameworkUrl: `https://lost-and-found-server-5v26.onrender.com/uploads/${params.name}.framework.js.unityweb`,
    codeUrl:      `https://lost-and-found-server-5v26.onrender.com/uploads/${params.name}.wasm.unityweb`,
  });

  async function handleClickBack() {
    await unload();
  }

  useEffect(() => {
    return () => {
      handleClickBack();
    };
  }, []);

  return (
    <>
      <div className='find'>
        <Unity unityProvider={unityProvider}/>   
      </div>
      <div className="progress mt-2"
        style={{margin: '0 auto', textAlign: 'center',border: '3px solid #2991EA', width: '60%', height: '2.6rem'}}
        >
          <div className="progress-bar" 
          role='progressbar'
          aria-valuenow={loadingProgression * 100}
          aria-valuemin='0'
          aria-valuemax='100'
          style={{height: '2rem', background: '#2991EA', color: 'white', width: `${loadingProgression * 100}%`}}>
            {`${loadingProgression * 100}%`}
          
          </div>

        </div>
      <button onClick={handleClickBack}>Press To Unload Unity Before Leaving This Page</button>
    </>
  )
}

export default FindItem;