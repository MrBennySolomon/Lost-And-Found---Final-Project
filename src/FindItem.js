import React from 'react';
import { Unity, useUnityContext } from "react-unity-webgl";
import { useParams } from 'react-router-dom';
import './FindItem.css';

const FindItem = () => {
  const params = useParams();
  const { unload, unityProvider } = useUnityContext({
    loaderUrl: `/Build/${params.location}.loader.js`,
    dataUrl: `/Build/${params.location}.data.unityweb`,
    frameworkUrl: `/Build/${params.location}.framework.js.unityweb`,
    codeUrl: `/Build/${params.location}.wasm.unityweb`,
  });

  async function handleClickBack() {
    await unload();
  }

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