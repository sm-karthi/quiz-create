
function Mcq({ formik, optionRow, setOptionRow, removeOptions }) {


    let handleOptionsChange = (index, field, value) => {
        let updated = [...optionRow];

        if (field === "isCorrect") {

            if (updated[index].isCorrect) {

                updated[index].isCorrect = false

            } else {
                updated.forEach((opt, i) => {

                    if (i === index) {
                        opt.isCorrect = true;
                    }

                });
            }
        } else {
            updated[index][field] = value;
        }

        setOptionRow(updated);
    };



    return (

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
                                        className="sr-only" />

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
                                    className='border-2 border-gray-200 bg-white rounded-md h-10 focus:outline-none px-2 focus:border-blue-500 mt-2' />

                                {formik.touched.options &&
                                    formik.touched.options[index] &&
                                    formik.touched.options[index].option &&
                                    formik.errors.options &&
                                    formik.errors.options[index] &&
                                    formik.errors.options[index].option ? (
                                    <span className='text-red-500 font-semibold mt-1'>{formik.errors.options[index].option}</span>
                                ) : null

                                }

                            </div>


                            <div className="flex flex-col w-16">

                                <input
                                    type="text"
                                    name={`options[${index}].mark`}
                                    value={group.mark}
                                    onChange={(e) => handleOptionsChange(index, 'mark', e.target.value)}
                                    onBlur={formik.handleBlur}
                                    className='border-2 border-gray-200 bg-white rounded-md h-10 focus:outline-none px-2 focus:border-blue-500 mt-2' />

                                {formik.touched.options &&
                                    formik.touched.options[index] &&
                                    formik.touched.options[index].mark &&
                                    formik.errors.options &&
                                    formik.errors.options[index] &&
                                    formik.errors.options[index].mark ? (
                                    <span className='text-red-500 font-semibold mt-1'>{formik.errors.options[index].mark}</span>
                                ) : null

                                }

                            </div>

                        </div>

                    </div>

                ))
            }

        </div>

    )
}

export default Mcq