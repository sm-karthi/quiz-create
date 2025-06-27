import React from 'react';

function Ntq({ formik }) {
  
  return (
    <div className="flex justify-between flex-col md:flex-row w-full flex-wrap gap-4">

      <div className="flex flex-col md:w-[49%]">

        <label className="font-semibold text-lg text-gray-600">Min</label>

        <input
          type="text"
          name="min"
          value={formik.values.min}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="border-2 border-gray-200 bg-white rounded-md h-10 focus:outline-none px-2 focus:border-blue-500 mt-2"
        />

        {
          formik.touched.min && formik.errors.min ? (
            <span className="text-red-500 font-semibold mt-1">
              {formik.errors.min}
            </span>

          ) : null
        }

      </div>


      <div className="flex flex-col md:w-[49%]">

        <label className="font-semibold text-lg text-gray-600">Max</label>

        <input
          type="text"
          name="max"
          value={formik.values.max}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="border-2 border-gray-200 bg-white rounded-md h-10 focus:outline-none px-2 focus:border-blue-500 mt-2"
        />

        {
          formik.touched.max && formik.errors.max ? (
            <span className="text-red-500 font-semibold mt-1">
              {formik.errors.max}
            </span>

          ) : null
        }

      </div>

    </div>

  );
}

export default Ntq;
