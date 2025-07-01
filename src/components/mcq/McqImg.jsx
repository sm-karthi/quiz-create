import React from 'react';
import { useDropzone } from 'react-dropzone';

function McqImg({ formik, optionRow, setOptionRow, removeOptions }) {


    let handleOptionsChange = (index, field, value) => {
        let updated = [...optionRow];

        if (field === "isCorrect") {

            if (updated[index].isCorrect) {

                updated[index].isCorrect = false

            } else {
                updated.forEach((opt, i) => {

                    opt.isCorrect = false;

                    if (i === index) {
                        opt.isCorrect = true;
                    }

                });
            }
        } else if (field === "option") {
            let imageUrl = URL.createObjectURL(value);
            updated[index].option = imageUrl;
        } else {
            updated[index][field] = value;
        }

        setOptionRow(updated);
    };

    let DropzoneInput = ({ index, group }) => {
        
        let { getRootProps, getInputProps, isDragActive } = useDropzone({
            onDrop: (acceptedFiles) => handleOptionsChange(index, "option", acceptedFiles[0]),
            accept: { 'image/*': [] }
        });

        return (
            <div className="flex flex-col w-full">
                <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-md p-4 text-center cursor-pointer ${isDragActive ? 'border-blue-500 bg-blue-100' : 'border-gray-300 hover:bg-gray-50'
                        }`}
                >
                    <input {...getInputProps()} />
                    {group.option ? (
                        <img
                            src={group.option}
                            alt={`Option ${index + 1}`}
                            className="h-24 mx-auto object-contain"
                        />
                    ) : (
                        <p className="text-gray-400">Click or drag to upload image</p>
                    )}
                </div>

                {formik.touched.options &&
                    formik.touched.options[index] &&
                    formik.errors.options &&
                    formik.errors.options[index] &&
                    formik.errors.options[index].option ? (
                    <span className="text-red-500 font-semibold mt-1">
                        {formik.errors.options[index].option}
                    </span>
                ) : null}
            </div>
        );
    };

    return (
        <div className="flex justify-between flex-col md:flex-row w-full flex-wrap">

            {optionRow.map((group, index) => (

                <div key={index} className="flex flex-col mt-4 w-full md:w-[49%]">

                    <div className="flex gap-3">

                        <label className="font-semibold text-lg text-gray-600">Option {index + 1}</label>

                        {
                            optionRow.length > 2 ? (

                                <button
                                    type="button"
                                    onClick={() => removeOptions(index)}
                                    className="text-red-500 font-bold cursor-pointer" >
                                    x
                                </button>

                            ) : null
                        }
                        
                    </div>

                    <div className="flex gap-3 items-center mt-2">

                        <label className="flex items-center cursor-pointer">

                            <div className="relative">

                                <input
                                    type="checkbox"
                                    checked={group.isCorrect}
                                    onChange={() => handleOptionsChange(index, 'isCorrect')}
                                    className="sr-only" />

                                <div
                                    className={`w-10 h-5 rounded-full transition ${group.isCorrect ? 'bg-blue-500' : 'bg-gray-300'
                                        }`}>
                                </div>

                                <div
                                    className={`absolute left-1 top-1 w-3 h-3 rounded-full bg-white transition ${group.isCorrect ? 'translate-x-5' : ''
                                        }`}>

                                </div>

                            </div>

                        </label>


                        <DropzoneInput index={index} group={group} />


                        <div className="flex flex-col w-16">

                            <input
                                type="text"
                                name={`options[${index}].mark`}
                                value={group.mark}
                                onChange={(e) => handleOptionsChange(index, "mark", e.target.value)}
                                onBlur={formik.handleBlur}
                                className="border-2 border-gray-200 bg-white rounded-md h-10 focus:outline-none px-2 focus:border-blue-500 mt-2" />

                            {
                                formik.touched.options &&
                                    formik.touched.options[index] &&
                                    formik.errors.options &&
                                    formik.errors.options[index] &&
                                    formik.errors.options[index].mark ?
                                    (
                                        <span className="text-red-500 font-semibold mt-1">
                                            {formik.errors.options[index].mark}
                                        </span>

                                    ) : null
                            }

                        </div>

                    </div>

                </div>

            ))}

        </div>

    );
}

export default McqImg;
