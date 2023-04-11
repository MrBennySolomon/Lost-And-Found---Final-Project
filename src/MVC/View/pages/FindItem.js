/* eslint-disable react-hooks/exhaustive-deps */
import                                 '../../../css/FindItem.css';
import React, { useEffect }                      from 'react';
import { Unity, useUnityContext } from "react-unity-webgl";
import { useParams }              from 'react-router-dom';

const FindItem                    = () => {
  const params                    = useParams();
  
  const { unload, unityProvider } = useUnityContext({
    loaderUrl:    `https://lost-and-found-server-5v26.onrender.com/${params.name}.loader.js`,
    dataUrl:      `https://lost-and-found-server-5v26.onrender.com/${params.name}.data.unityweb`,
    frameworkUrl: `https://lost-and-found-server-5v26.onrender.com/${params.name}.framework.js.unityweb`,
    codeUrl:      `https://lost-and-found-server-5v26.onrender.com/${params.name}.wasm.unityweb`,
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
      <button onClick={handleClickBack}>Press To Unload Unity Before Leaving This Page</button>
    </>
  )
}

export default FindItem;