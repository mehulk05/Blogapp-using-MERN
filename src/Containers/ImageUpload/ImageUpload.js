import React, { useRef, useState, useEffect } from 'react';


import './ImageUpload.css';

const ImageUpload = props => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);
  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = event => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    props.onInput(props.id, pickedFile, fileIsValid); return file

  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div className="">
      <input
        id={props.id}
        name={props.name}
        ref={filePickerRef}
        style={{ display: 'none' }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
      <div className={`image-upload ${props.center && 'center'}`}>

        {/* {!previewUrl && <p>Please pick an image.</p>} */}
        <button type="button" className="btn btn-outline-primary" onClick={pickImageHandler}>
          PICK IMAGE
        </button>
        {previewUrl && <div className="image-upload__preview">
          <img src={previewUrl} alt="Preview" />

        </div>}
        {!previewUrl && props.value && <div className="image-upload__preview">
          <img src={props.value} alt="Preview" />

        </div>}
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default ImageUpload;
