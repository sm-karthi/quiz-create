import { useFormik } from 'formik'
import React from 'react'

function Mcq() {

    let subjects = {
        Programming: ["JavaScript", "Java", "Python"],
        Science: ["Physics", "Chemistry", "Biology"],
        Math: ["Algebra", "Geometry", "Calculus"]
    }


    let formik = useFormik({
        initialValues: {
            question: "",
            subject: "",
            topic: "",
            options: [
                {
                    option: "",
                    mark: 0,
                    isCorrect: false
                },
                {
                    option: "",
                    mark: 0,
                    isCorrect: false
                },
                {
                    option: "",
                    mark: 0,
                    isCorrect: false
                },
                {
                    option: "",
                    mark: 0,
                    isCorrect: false
                }
            ],
            explanation: "",
            tags: []
        },
        validate: (values) => {
            let errors = {}

            if (!values.question) {
                errors.question = "Please enter the Question"
            }
            else if (values.question.length < 5) {
                errors.question = "Please enter valid Question"
            }

            if (!values.subject) {
                errors.subject = "Please enter the Subject"
            }

            if (!values.topic) {
                errors.topic = "Please enter the Topic"
            }

            if (!values.explanation) {
                errors.explanation = "Please enter the Explanation"
            }
            else if (values.explanation.length < 10) {
                errors.explanation = "Please enter valid Explanation"
            }

            if (values.tags.length === 0) {
                errors.tags = "Please enter the Tags";
            }

            let optionsErrors = values.options.map((item) => {
                let err = {};

                if (!item.option) {
                    err.option = "Please enter ther answer"
                }

                if (!item.mark) {
                    err.mark = "Required"
                }

                return err
            });

            if (optionsErrors.some(err => Object.keys(err).length > 0)) {
                errors.options = optionsErrors;
            }

            return errors;
        },
        onSubmit: (values) => {

            if (values.options.some(obj => obj.isCorrect === true)) {
                console.log(values);
            }
            else {
                alert("Please choose correct answer")
            }

        }
    })

    let optionRow = formik.values.options

    let addOptions = () => {
        formik.setFieldValue("options", [...optionRow, { option: "", mark: 0, isCorrect: false }])
    }



    let removeOptions = ((index) => {
        let updatedOption = [...optionRow];
        updatedOption.splice(index, 1);
        formik.setFieldValue("options", updatedOption)
    })



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
        } else {
            updated[index][field] = value;
        }

        formik.setFieldValue("options", updated);
    };




    return (
        <form className='w-full py-10 px-6 lg:px-48' onSubmit={formik.handleSubmit}>

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

                    <button className='border-2 border-gray-400 rounded py-1 font-semibold text-gray-600 hover:bg-gray-100'>Add image +</button>

                    <button className='border-2 border-gray-400 rounded py-1 font-semibold text-gray-600 hover:bg-gray-100'>Add code +</button>
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

                            <option value="">Select Subject</option>

                            {Object.keys(subjects).map((sub) => (

                                <option>{sub}</option>

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

                            <option value="">Select Topic</option>

                            {(subjects[formik.values.subject] || []).map((topic) => (

                                <option>{topic}</option>

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

                    <h2 className='text-2xl font-bold text-gray-500'>Mcq</h2>

                    <span onClick={addOptions} className='bg-blue-500 font-semibold px-2 py-1 text-white text-lg rounded shadow-md cursor-pointer hover:bg-blue-700 transition duration-150'>+</span>

                </div>


                <div className="flex justify-between flex-col md:flex-row w-full flex-wrap">

                    {
                        optionRow.map((group, index) => (

                            <div className="flex flex-col mt-4 w-full md:w-[49%]">



                                <div className="flex gap-3">

                                    <label className='font-semibold text-lg text-gray-600'>Option {index + 1}</label>

                                    {
                                        optionRow.length > 2 ? (
                                            <button
                                                onClick={() => removeOptions(index)}
                                                className='text-red-500 font-bold cursor-pointer'>x</button>
                                        ) : null
                                    }

                                </div>


                                <div className="flex gap-3 items-center">

                                    <label className="flex items-center cursor-pointer">
                                        <div className="relative">
                                            <input
                                                type="checkbox"
                                                checked={group.isCorrect}
                                                onChange={(e) => handleOptionsChange(index, 'isCorrect', e.target.checked)}
                                                className="sr-only"
                                            />
                                            <div className={`w-10 h-5 rounded-full transition ${group.isCorrect ? 'bg-blue-500' : 'bg-gray-300'}`}></div>

                                            <div className={`absolute left-1 top-1 w-3 h-3 rounded-full bg-white transition ${group.isCorrect ? 'translate-x-5' : ''}`}></div>
                                        </div>
                                    </label>


                                    <div className="flex flex-col w-full">
                                        <input
                                            type="text"
                                            name={`options[${index}].option`}
                                            value={group.option}
                                            onChange={(e) => handleOptionsChange(index, 'option', e.target.value)}
                                            onBlur={formik.handleBlur}
                                            className='border-2 border-gray-200 bg-white rounded-md h-10 focus:outline-none px-2 focus:border-blue-500 mt-2'
                                        />
                                        {formik.touched.options &&
                                            formik.touched.options[index] &&
                                            formik.touched.options[index].option &&
                                            formik.errors.options &&
                                            formik.errors.options[index] &&
                                            formik.errors.options[index].option && (
                                                <span className='text-red-500 font-semibold mt-1'>{formik.errors.options[index].option}</span>
                                            )}
                                    </div>

                                    <div className="flex flex-col w-16">
                                        <input
                                            type="text"
                                            name={`options[${index}].mark`}
                                            value={group.mark}
                                            onChange={(e) => handleOptionsChange(index, 'mark', e.target.value)}
                                            onBlur={formik.handleBlur}
                                            className='border-2 border-gray-200 bg-white rounded-md h-10 focus:outline-none px-2 focus:border-blue-500 mt-2'
                                        />
                                        {formik.touched.options &&
                                            formik.touched.options[index] &&
                                            formik.touched.options[index].mark &&
                                            formik.errors.options &&
                                            formik.errors.options[index] &&
                                            formik.errors.options[index].mark && (
                                                <span className='text-red-500 font-semibold mt-1'>{formik.errors.options[index].mark}</span>
                                            )}
                                    </div>
                                </div>


                            </div>


                        ))
                    }

                </div>


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
                        className='border-2 border-gray-200 bg-white rounded-md h-10 focus:outline-none px-2 focus:border-blue-500 w-full mt-2'
                    />


                    {
                        formik.touched.tags && formik.errors.tags ? (
                            <span className='text-red-500 font-semibold mt-1'>{formik.errors.tags}</span>
                        ) : null
                    }

                </div>

                <button type='submit' className='bg-blue-500 px-3 py-1 text-sm rounded shadow-md text-white font-semibold hover:bg-blue-700 transition duration-150 w-fit cursor-pointer'>Submit</button>

            </div>

        </form>
    )
}

export default Mcq
