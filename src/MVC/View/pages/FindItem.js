/* eslint-disable react-hooks/exhaustive-deps */
import                                 '../../../css/FindItem.css';
import React, { useEffect }                      from 'react';
import { Unity, useUnityContext } from "react-unity-webgl";
import { useParams }              from 'react-router-dom';
import axios from "axios";
import { saveAs } from "file-saver";

const FindItem                    = () => {
  const params                    = useParams();

  const downloadFile = async (url, fileName) => {
    try {
      const response = await axios.get(url, { responseType: 'blob' });
      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      saveAs(blob, fileName);
    } catch (error) {
      console.error("Error downloading the file:", error);
    }
  };

const onDownloadButtonClick = () => {
  const fileUrl = "https://firebasestorage.googleapis.com/v0/b/file-storage-8f772.appspot.com/o/gpu.framework.js.unityweb?alt=media&token=f7b11362-0241-428b-8f75-6fc85df365a7";
  const fileName = "gpu.framework.js.unityweb";

  downloadFile(fileUrl, fileName);
};
  
  const { unload, unityProvider } = useUnityContext({
    loaderUrl:    `/Build/${params.location}/${params.location}.loader.js`,
    dataUrl:      `/Build/${params.location}/${params.location}.data.unityweb`,
    frameworkUrl: `/Build/${params.location}/${params.location}.framework.js.unityweb`,
    codeUrl:      `/Build/${params.location}/${params.location}.wasm.unityweb`,
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
      <button onClick={onDownloadButtonClick}>Download File</button>
        <Unity unityProvider={unityProvider}/>      
      </div>
      <button onClick={handleClickBack}>Press To Unload Unity Before Leaving This Page</button>
    </>
  )
}

export default FindItem;