import React from 'react';
import { Unity, useUnityContext } from "react-unity-webgl";

const FindItem = () => {
  const { unityProvider } = useUnityContext({
    loaderUrl: "/Build/final-1.loader.js",
    dataUrl: "/Build/final-1.data.unityweb",
    frameworkUrl: "/Build/final-1.framework.js.unityweb",
    codeUrl: "/Build/final-1.wasm.unityweb",
  });
  return (
    
    <div className='find'>
      <Unity unityProvider={unityProvider} />
    </div>
  )
}

export default FindItem;