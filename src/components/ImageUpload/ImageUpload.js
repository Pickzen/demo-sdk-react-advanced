import React, { useState, useContext, useEffect } from 'react';
import CustomHTML from "../CustomHTML/CustomHTML";
import {SlideContext} from "../../context/SlideContext";
import './ImageUpload.scss'

function ImageUpload( {field,showErrors} ) {
    const { Engine } = useContext(SlideContext);
    const [uploading, setUploading] = useState(false);
    const [hasImage, setHasImage] = useState(false);

    let timer;

    useEffect(() => {
        if (!field.isEmpty()) {
            let b64 = getUploadPreview(field.getValue());
            if (b64) setImagePreview(field.getId(), b64);
            setHasImage(true);
        }

        return () => {
            clearInterval(timer);
        }
    }, []);

    const removeImage = (event) => {
        event.stopPropagation();
        updateImage( null, field.getValue());
    };

    const getBase64 = (file, onComplete) => {

        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            onComplete(true, reader.result);
        };
        reader.onerror = function (error) {
            onComplete(false, error);
        };
    };

    const setUploadPreview = (filePath, b64) => {
        let key = 'file-' + filePath;

        if (b64) {
            Engine.setLocalStorageItem(key, b64);
        } else {
            Engine.removeLocalStorageItem(key);
        }
    };

    const getUploadPreview = (filePath) => {
        return Engine.getLocalStorageItem("file-" + filePath);
    };

    const setImagePreview = (fieldId, b64) => {
        timer = setInterval(function(){
            const el = document.getElementById("preview-image-" + fieldId);

            if (el) {
                clearInterval(timer);
                timer=null;

                if (b64) {
                    el.src = b64;
                } else {
                    el.src = ''; // TODO
                }
            }
        }, 200);
    };

    const updateImage = (filePath, secureUrl, file, fieldId, onComplete) => {
        if (filePath) {
            // New image
            var key = '_pz_upload_image:'+secureUrl;

            getBase64(file, function (success, b64) {
                if (success) {
                    field.setValue(key);
                    setImagePreview(fieldId, b64);
                    setUploadPreview(key, b64);
                    setHasImage(true);

                    onComplete(true);
                } else {
                    onComplete(false);
                }
            });
        } else {
            // Removing image
            setUploadPreview(secureUrl, null);
            field.setValue(null);
            setImagePreview(field.getId());
            setHasImage(false);
        }
    };


    const getContent = () => {
        return hasImage?(
                <>
                    <img id={`preview-image-${field.getId()}`} alt="" />
                    <button className="delete" onClick={removeImage}>X</button>
                </>
            ):(
                <div className="file-chooser">
                    {!uploading?(
                            <svg aria-hidden="true" focusable="false" data-prefix="far"
                                 data-icon="cloud-upload-alt" role="img" xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 640 512" className="svg-inline--fa fa-cloud-upload-alt fa-w-20 fa-7x">
                                <path fill="currentColor"
                                      d="M395.5 267.5l-99-99c-4.7-4.7-12.3-4.7-17 0l-99 99c-7.6 7.6-2.2 20.5 8.5 20.5h67v84c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12v-84h67c10.7 0 16.1-12.9 8.5-20.5zm148.2-67.4C539.7 142.1 491.4 96 432 96c-7.6 0-15.1.8-22.4 2.3C377.7 58.3 328.1 32 272 32c-84.6 0-155.5 59.7-172.3 139.8C39.9 196.1 0 254.4 0 320c0 88.4 71.6 160 160 160h336c79.5 0 144-64.5 144-144 0-61.8-39.2-115.8-96.3-135.9zM496 432H160c-61.9 0-112-50.1-112-112 0-56.4 41.7-103.1 96-110.9V208c0-70.7 57.3-128 128-128 53.5 0 99.3 32.8 118.4 79.4 11.2-9.6 25.7-15.4 41.6-15.4 35.3 0 64 28.7 64 64 0 11.8-3.2 22.9-8.8 32.4 2.9-.3 5.9-.4 8.8-.4 53 0 96 43 96 96s-43 96-96 96z"
                                ></path>
                            </svg>
                        ):null
                    }

                    {uploading?<span>Uploading...</span>:null}

                    {!uploading?
                        (
                            <div className="info">
                                <p className="text">Choose file</p>
                                <p className="limit">Size limit: 10MB</p>
                            </div>
                        ):null
                    }
                </div>
            );
    };

    const showUploadError = () => {
        setUploading(false);
        alert('Error uploading image');
    };

    const onSelectedFile = (event) => {
        let file = event.target.files[0];

        if (file) {
            let code = Engine.getCode();
            let type = file.type;
            let filePath;
            let imageUrl;

            setUploading(true);

            Engine.httpGet(`/EQuiz/uploadRequest?code=${code}&type=${type}&public=${field.isPublic()?'1':'0'}`).then(
                data => {
                    filePath = data.filePath;
                    imageUrl = data.imageUrl;

                    Engine.httpUpload(data.uploadUrl, file, type, data.filePath, data.policy, field.isPublic(), data.signature, data.credential, data.expiration).then(
                        data => {
                            updateImage(filePath, imageUrl, file, field.getId(), function (success) {
                                if (success) {
                                    setUploading(false);
                                } else {
                                    showUploadError();
                                }

                                field.setValid(true);
                            });
                        },
                        error => {
                            showUploadError();
                        }
                    );
                },

                error => {
                    showUploadError();
                }
            );
        }
    };

    const getErrorClass = () => {
        return showErrors && !field.isValid()?'invalid':'';
    };

    const selectFile = (event) => {
        event.stopPropagation();

        let el = document.getElementById("file-selector");
        if (el) {
            el.click();
        }
    };

    return (
        <div className="image-upload">
            <CustomHTML className="label" html={field.getTitle()}/>

            <div className={'image-preview '+ getErrorClass()} onClick={selectFile}>
                {getContent()}
            </div>

            <input id="file-selector" type="file" name="file" onChange={onSelectedFile} accept="image/x-png,image/jpeg"/>
        </div>
    )
}

export default ImageUpload;