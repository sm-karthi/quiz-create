import React from 'react'

function Mcq() {
    return (
        <form className='w-full py-10 px-6 lg:px-48'>

            <div className='flex flex-col space-y-5 '>

                <div className="flex flex-col space-y-2">

                    <label className='font-semibold text-lg text-gray-600'>Question</label>

                    <textarea name="question" className='border-2 border-gray-200 bg-white rounded-md w-full h-24 p-2 focus:outline-none focus:border-blue-500'></textarea>

                </div>

                <div className="flex flex-col space-y-3">

                    <button className='border-2 border-gray-400 rounded py-1 font-semibold text-gray-600 hover:bg-gray-100'>Add image +</button>

                    <button className='border-2 border-gray-400 rounded py-1 font-semibold text-gray-600 hover:bg-gray-100'>Add code +</button>
                </div>

                <div className="flex md:gap-5 gap-2 flex-col md:flex-row">

                    <div className="flex flex-col space-y-2 md:w-[50%]">

                        <label className='font-semibold text-lg text-gray-600'>Subject</label>

                        <input type="text" name="subject" className='border-2 border-gray-200 bg-white rounded-md h-10 focus:outline-none px-2 focus:border-blue-500 w-full' />

                    </div>

                    <div className="flex flex-col space-y-2 md:w-[50%]">

                        <label className='font-semibold text-lg text-gray-600'>Topic</label>

                        <input type="text" name="topic" className='border-2 border-gray-200 bg-white rounded-md h-10 focus:outline-none px-2 focus:border-blue-500 w-full' />

                    </div>

                </div>

                <div className="flex justify-between">

                    <h2 className='text-2xl font-bold text-gray-500'>Mcq</h2>

                    <span className='bg-blue-500 font-semibold px-2 py-1 text-white text-lg rounded shadow-md cursor-pointer hover:bg-blue-700 transition duration-150'>+</span>

                </div>

                <div className="flex flex-col space-y-2">

                    <label className='font-semibold text-lg text-gray-600'>Explanation</label>

                    <textarea name="question" className='border-2 border-gray-200 bg-white rounded-md w-full h-24 p-2 focus:outline-none focus:border-blue-500'></textarea>

                </div>

                <div className="flex flex-col space-y-2">

                    <label className='font-semibold text-lg text-gray-600'>Tags</label>

                    <input type="text" name="tags" className='border-2 border-gray-200 bg-white rounded-md h-10 focus:outline-none px-2 focus:border-blue-500 w-full' />
                </div>

                <button type='submit' className='bg-blue-500 px-3 py-1 text-sm rounded shadow-md text-white font-semibold hover:bg-blue-700 transition duration-150 w-fit cursor-pointer'>Submit</button>

            </div>

        </form>
    )
}

export default Mcq
