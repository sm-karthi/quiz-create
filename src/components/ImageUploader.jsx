import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

function ImageUploader({ images, setImages, onClose }) {


    const onDrop = useCallback((acceptedFiles) => {

        const imageList = acceptedFiles.map((file) => ({
            image: URL.createObjectURL(file),
        }));

        setImages(imageList);
    }, []);


    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <section className="p-2">

            {images.length === 0 ? (

                <div
                    {...getRootProps()}
                    className={`border-2 p-8 rounded-lg text-center cursor-pointer transition 
                           ${isDragActive ? 'border-blue-500 bg-blue-50' :
                            'border-dashed border-gray-400 hover:bg-gray-100'}`}>

                    <input {...getInputProps()} />

                    <p className="text-gray-700">
                        {isDragActive
                            ? 'Drop the files here ...'
                            : "Drag 'n' drop some files here, or click to select files"}
                    </p>

                </div>

            ) : (

                <div className="flex justify-center">

                    <div className="flex gap-3">

                        <img
                            src={images[0].image}
                            alt="uploaded preview"
                            className="max-h-64 rounded object-cover shadow-md" />

                        <button
                            onClick={onClose}
                            className="bg-red-500 text-sm rounded-full w-6 h-6 text-white hover:bg-red-700 font-bold cursor-pointer shadow-md">
                            X
                        </button>

                    </div>

                </div>

            )}

        </section>

    );
}

export default ImageUploader;
