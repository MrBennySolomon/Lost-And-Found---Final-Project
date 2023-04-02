import React from 'react';
import { Unity, useUnityContext } from "react-unity-webgl";
import './FindItem.css';

const FindItem = () => {
  const { unload, unityProvider } = useUnityContext({
    loaderUrl: "/Build/final-1.loader.js",
    dataUrl: "/Build/final-1.data.unityweb",
    frameworkUrl: "/Build/final-1.framework.js.unityweb",
    codeUrl: "/Build/final-1.wasm.unityweb",
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