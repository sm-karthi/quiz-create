import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState, useEffect } from 'react'
import Mcq from './mcq/Mcq'
import HandleIcon from './HandleIcon'
import Msq from './msq/Msq'
import Ntq from './ntq/Ntq'
import ImageUploader from './ImageUploader'

import McqImg from './mcq/McqImg'
import MsqImg from './msq/MsqImg';
import CodeEditor from './CodeEditor'

function Question() {

    let [selectedComponent, setSelectComponent] = useState('Mcq')
    let [uploadedImages, setUploadedImages] = useState([]);
    let [showImageUploader, setShowImageUploader] = useState(false);

    let [isCodeOpen, setCodeOpen] = useState(false);


    let handleImageClose = () => {
        setUploadedImages([]);
        setShowImageUploader(false);
    };

    let handleCodeClose = () => {
        setCodeOpen(false)
    }



    let subjects = {
        Programming: ["JavaScript", "Java", "Python"],
        Science: ["Physics", "Chemistry", "Biology"],
        Maths: ["Algebra", "Geometry", "Probability"],
    };



    let defaultValues = {
        question: "",
        subject: "",
        topic: "",
        explanation: "",
        tags: [],
        code: "// Write your code here",
        image: "",
        type: selectedComponent
    }

    let getInitialValues = () => {
        if (selectedComponent === "Ntq") {
            return {
                ...defaultValues,
                min: "",
                max: "",
            };
        } else {
            return {
                ...defaultValues,
                options: [
                    { option: "", mark: 0, isCorrect: false },
                    { option: "", mark: 0, isCorrect: false },
                    { option: "", mark: 0, isCorrect: false },
                    { option: "", mark: 0, isCorrect: false },
                ],
            };
        }
    };



    let formik = useFormik({
        initialValues: getInitialValues(),

        validate: (values) => {
            let errors = {};


            if (!values.question) {
                errors.question = "Please enter the Question";
            } else if (values.question.length < 5) {
                errors.question = "Please enter valid Question";
            }

            if (!values.subject) {
                errors.subject = "Please select the Subject";
            }

            if (!values.topic) {
                errors.topic = "Please select the Topic";
            }

            if (!values.explanation) {
                errors.explanation = "Please enter the Explanation";
            } else if (values.explanation.length < 10) {
                errors.explanation = "Please enter valid Explanation";
            }

            if (values.tags.length === 0) {
                errors.tags = "Please enter the Tags";
            }


            if (selectedComponent === "Ntq") {
                if (!values.min) {
                    errors.min = "Please enter minimum value";
                } else if (isNaN(values.min)) {
                    errors.min = "Min should be a number";
                }

                if (!values.max) {
                    errors.max = "Please enter maximum value";
                } else if (isNaN(values.max)) {
                    errors.max = "Max should be a number";
                }
            }


            if (selectedComponent !== "Ntq") {
                let optionsErrors = values.options.map((item) => {
                    let err = {};

                    if (!item.option) {
                        err.option = "Please enter the answer";
                    }


                    return err;
                });

                if (optionsErrors.some((err) => Object.keys(err).length > 0)) {
                    errors.options = optionsErrors;
                }
            }

            return errors;
        },

        onSubmit: async (values, { resetForm }) => {

            if (selectedComponent !== "Ntq") {
                values.options.forEach(opt => {
                    opt.mark = opt.isCorrect ? 10 : 0;
                });
            }

            if (selectedComponent === "Ntq" || values.options.some((obj) => obj.isCorrect === true)) {
                try {
                    await axios.post(
                        "https://6850f0628612b47a2c07fce0.mockapi.io/questions",
                        values
                    );

                    alert("Form submitted successfully");
                    resetForm();
                    console.log(values);
                } catch (error) {
                    alert("Something went wrong");
                }
            } else {
                alert("Please choose correct answer");
            }
        },
    });

    useEffect(() => {
        let newValues = getInitialValues();
        formik.setValues(newValues);
    }, [selectedComponent]);



    let optionRow = formik.values.options;

    let addOptions = () => {
        formik.setFieldValue('options', [...optionRow, { option: "", mark: 0, isCorrect: false }]);
    };

    let removeOptions = (index) => {
        let updated = [...optionRow];
        updated.splice(index, 1);
        formik.setFieldValue('options', updated);
    };


    let setOptionRow = (newOptions) => {
        formik.setFieldValue('options', newOptions);
    };


    function updateCode(value) {
        formik.setFieldValue('code', value);
    }



    let quesName = "";

    if (selectedComponent === "McqImg") {
        quesName = "Mcq";
    }
    else if (selectedComponent === "MsqImg") {
        quesName = "Msq";
    }
    else {
        quesName = selectedComponent;
    }



    return (

        <form key={selectedComponent} className='w-full py-10 px-6 lg:px-48' onSubmit={formik.handleSubmit}>

            <HandleIcon selectedComponent={selectedComponent} setComponent={setSelectComponent} formik={formik} />

            <div className='flex flex-col space-y-5 '>

                <div className="flex flex-col">

                    <label className='font-semibold text-lg text-gray-600'>Question</label>

                    <textarea
                        name="question"
                        value={formik.values.question}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className='border-2 border-gray-200 bg-white rounded-md w-full h-24 p-2 focus:outline-none focus:border-blue-500 mt-2'></textarea>

                    {
                        formik.touched.question && formik.errors.question ? (
                            <span className='text-red-500 font-semibold mt-1'>{formik.errors.question}</span>
                        ) : null
                    }

                </div>

                <div className="flex flex-col space-y-3">

                    {
                        !showImageUploader && uploadedImages.length === 0 ? (

                            <button
                                type="button"
                                onClick={() => setShowImageUploader(true)}
                                className="border-2 border-gray-400 rounded py-1 font-semibold text-gray-600 hover:bg-gray-100">
                                Add image +
                            </button>

                        ) : null
                    }


                    {showImageUploader ? (
                        <ImageUploader images={uploadedImages} setImages={setUploadedImages}
                            onClose={handleImageClose} setFieldValue={formik.setFieldValue} />
                    ) : null}


                    {
                        !isCodeOpen ? (

                            <button
                                type="button"
                                onClick={() => setCodeOpen(true)}
                                className="border-2 border-gray-400 rounded py-1 font-semibold 
                              text-gray-600 hover:bg-gray-100">
                                Add code +
                            </button>

                        ) : null
                    }


                    {
                        isCodeOpen ? (
                            <CodeEditor isOpen={isCodeOpen} onClose={handleCodeClose} code={formik.values.code} setCode={updateCode} />
                        ) : null
                    }



                </div>


                <div className="flex md:gap-5 gap-2 flex-col md:flex-row">

                    <div className="flex flex-col md:w-[50%]">

                        <label className='font-semibold text-lg text-gray-600'>Subject</label>

                        <select
                            name="subject"
                            value={formik.values.subject}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className='border-2 mt-2 border-gray-200 bg-white rounded-md h-10 focus:outline-none px-2 focus:border-blue-500 w-full'>

                            <option value="" disabled>Select Subject</option>

                            {Object.keys(subjects).map((sub, index) => (

                                <option key={index} value={sub} >{sub}</option>

                            ))}
                        </select>


                        {
                            formik.touched.subject && formik.errors.subject ? (
                                <span className='text-red-500 font-semibold mt-1'>{formik.errors.subject}</span>
                            ) : null
                        }

                    </div>

                    <div className="flex flex-col md:w-[50%]">

                        <label className='font-semibold text-lg text-gray-600'>Topic</label>

                        <select
                            name="topic"
                            value={formik.values.topic}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className='border-2 mt-2 border-gray-200 bg-white rounded-md h-10 focus:outline-none px-2 focus:border-blue-500 w-full'>

                            <option value="" disabled>Select Topic</option>

                            {(subjects[formik.values.subject] || []).map((topic, index) => (

                                <option key={index} value={topic} >{topic}</option>

                            ))}

                        </select>

                        {
                            formik.touched.topic && formik.errors.topic ? (
                                <span className='text-red-500 font-semibold mt-1'>{formik.errors.topic}</span>
                            ) : null
                        }

                    </div>

                </div>

                <div className="flex justify-between">

                    <h2 className='text-2xl font-bold text-gray-500'>{quesName}</h2>

                    {
                        selectedComponent === 'Ntq' ? null : (
                            <span onClick={addOptions} className='bg-blue-500 font-semibold px-2 py-1 text-white text-lg rounded shadow-md cursor-pointer hover:bg-blue-700 transition duration-150'>+</span>
                        )
                    }

                </div>



                {
                    selectedComponent === 'Mcq' ? (
                        <Mcq formik={formik} setOptionRow={setOptionRow} removeOptions={removeOptions} />
                    ) : null
                }

                {
                    selectedComponent === 'Msq' ? (
                        <Msq formik={formik} setOptionRow={setOptionRow} removeOptions={removeOptions} />
                    ) : null
                }

                {
                    selectedComponent === 'Ntq' ? (
                        <Ntq formik={formik} />
                    ) : null
                }

                {
                    selectedComponent === 'McqImg' ? (
                        <McqImg formik={formik} setOptionRow={setOptionRow} removeOptions={removeOptions} />
                    ) : null
                }

                {
                    selectedComponent === 'MsqImg' ? (
                        <MsqImg formik={formik} setOptionRow={setOptionRow} removeOptions={removeOptions} />
                    ) : null
                }


                <div className="flex flex-col">

                    <label className='font-semibold text-lg text-gray-600'>Explanation</label>

                    <textarea
                        name="explanation"
                        value={formik.values.explanation}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className='border-2 border-gray-200 bg-white rounded-md w-full h-24 p-2 focus:outline-none focus:border-blue-500 mt-2'></textarea>

                    {
                        formik.touched.explanation && formik.errors.explanation ? (
                            <span className='text-red-500 font-semibold mt-1'>{formik.errors.explanation}</span>
                        ) : null
                    }

                </div>

                <div className="flex flex-col">

                    <label className='font-semibold text-lg text-gray-600'>Tags</label>

                    <input
                        type="text"
                        name="tags"
                        value={formik.values.tags}
                        onChange={(e) => {
                            let tagArray = e.target.value.split(',')
                            formik.setFieldValue('tags', tagArray);
                        }}
                        onBlur={formik.handleBlur}
                        className='border-2 border-gray-200 bg-white rounded-md h-10 focus:outline-none px-2 focus:border-blue-500 w-full mt-2' />


                    {
                        formik.touched.tags && formik.errors.tags ? (
                            <span className='text-red-500 font-semibold mt-1'>{formik.errors.tags}</span>
                        ) : null
                    }

                </div>

                <button type="submit" className='bg-blue-500 px-3 py-1 text-sm rounded shadow-md text-white font-semibold hover:bg-blue-700 transition duration-150 w-fit cursor-pointer' >Submit</button>

            </div>

        </form>
    )
}

export default Question