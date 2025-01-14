// ./src/App.tsx

import React, { useState } from 'react';
import Path from 'path';
import uploadFileToBlob, { isStorageConfigured} from './azure-storage-blob';
import {sasToken, containerName, storageAccountName} from './azure-storage-blob';
//import listFileInBlob from './azure-storage-blob';
//import { BlobServiceClient, ContainerClient} from '@azure/storage-blob';
const storageConfigured = isStorageConfigured();


const App = (): JSX.Element => {
  // all blobs in container
  const [blobList, setBlobList] = useState<string[]>([]);

  // current file to upload into container
  const [fileSelected, setFileSelected] = useState(null);

  // UI/form management
  const [uploading, setUploading] = useState(false);
  const [inputKey, setInputKey] = useState(Math.random().toString(36));

  const onFileChange = (event: any) => {
    // capture file into state
    setFileSelected(event.target.files[0]);
  };

  const onFileUpload = async () => {
    // prepare UI
    setUploading(true);

    // *** UPLOAD TO AZURE STORAGE ***
    const blobsInContainer: string[] = await uploadFileToBlob(fileSelected);

    // prepare UI for results
    setBlobList(blobsInContainer);

    // reset state/form
    setFileSelected(null);
    setUploading(false);
    setInputKey(Math.random().toString(36));
  };

  
//  const bsc = listFileInBlob();
//  const containerClient: ContainerClient = bsc.getContainerClient(containerName);

/*
  const listFiles = async () => {
    // prepare UI
//    setUploading(true);

    // *** UPLOAD TO AZURE STORAGE ***
    const bsc = await listFileInBlob();
    const containerClient: ContainerClient = bsc.getContainerClient(containerName);
    return containerClient;
  }
   const blobsInContainer: string[] = await listFileInBlob();

    // prepare UI for results
    setBlobList(blobsInContainer);

    // reset state/form
    //setFileSelected(null);
    //setUploading(false);
    setInputKey(Math.random().toString(36));
  };
*/  
  // display form
  const DisplayForm = () => (
    <div>
      <input type="file" onChange={onFileChange} key={inputKey || ''} />
      <p />
      <button type="submit" onClick={onFileUpload}>
        Upload!
          </button>
    </div>
  )

  /*
  // display file name and image
  const DisplayImagesFromContainer = () => (
    <div>
      <h2>Container items!!!!</h2>
      <p> SAS token: {sasToken}</p>
      <p> Container Name: {containerName}</p>
      <p> Storage Account Name: {storageAccountName} </p>
      <p>{listFiles} </p>
    </div>
  );
*/
  
    // display file name and image
    const DisplayImagesFromContainer = () => (
      <div>
        <h2>Container items</h2>
        <ul>
          {blobList.map((item) => {
            return (
              <li key={item}>
                <div>
                  {Path.basename(item)}
                  <br />
                  <img src={item} alt={item} height="200" />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );

    
  
  const DisplaySuccessMessage = () => (
    <div>
      <h2>Upload Successfull!!</h2>
    </div>
  );

  return (
    <div>
      <p> SAS token: {sasToken}</p>
      <p> Container Name: {containerName}</p>
      <p> Storage Account Name: {storageAccountName} </p>

      <h1>Upload file to Azure Blob Storage</h1>
      {storageConfigured && !uploading && DisplayForm()}
      {storageConfigured && uploading && <div>Uploading</div>}
      <hr />
      {storageConfigured && blobList.length > 0 && DisplaySuccessMessage()}
      {storageConfigured && blobList.length > 0 && DisplayImagesFromContainer()}
      {!storageConfigured && <div>Storage is not configured.</div>}
    </div>
  );
};

//      {storageConfigured && !uploading && DisplayForm()}

export default App;


