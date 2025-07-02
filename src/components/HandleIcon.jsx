import React from 'react'
import Icons from './Icons'

function HandleIcon({ selectedComponent, setComponent, formik }) {

    let handleQuesTypeSwitch = (type) => {
        let options = formik.values.options;

        let hasCorrect = Array.isArray(options) && options.some(group => group.isCorrect);

        if (hasCorrect) {
            let confirmSwitch = confirm("Are you sure you want to switch the question type?");
            if (!confirmSwitch) return;

            options.forEach(group => group.isCorrect = false);
        }

        setComponent(type);
    };




    return (
        <div className="fixed right-2 top-[39%] bg-[#4d4d4d] shadow-md flex flex-col">

            <div
                onClick={() => handleQuesTypeSwitch('Mcq')}
                className={`${selectedComponent === 'Mcq' ? 'bg-blue-600' : 'bg-[#4d4d4d]'} hover:bg-blue-500 text-white transition duration-150 p-3 flex items-center justify-center cursor-pointer`}>

                <Icons />

            </div>



            <div
                onClick={() => handleQuesTypeSwitch('Msq')}
                className={`${selectedComponent === 'Msq' ? 'bg-blue-600' : 'bg-[#4d4d4d]'} hover:bg-blue-500 text-white transition duration-150 p-3 flex items-center justify-center cursor-pointer`}>

                <Icons />

            </div>


            <div
                onClick={() => handleQuesTypeSwitch('Ntq')}
                className={`${selectedComponent === 'Ntq' ? 'bg-blue-600' : 'bg-[#4d4d4d]'} hover:bg-blue-500 text-white transition duration-150 p-3 flex items-center justify-center cursor-pointer`}>

                <Icons />

            </div>


            <div
                onClick={() => handleQuesTypeSwitch('McqImg')}
                className={`${selectedComponent === 'McqImg' ? 'bg-blue-600' : 'bg-[#4d4d4d]'} hover:bg-blue-500 text-white transition duration-150 p-3 flex items-center justify-center cursor-pointer`}>

                <Icons />

            </div>


            <div
                onClick={() => handleQuesTypeSwitch('MsqImg')}
                className={`${selectedComponent === 'MsqImg' ? 'bg-blue-600' : 'bg-[#4d4d4d]'} hover:bg-blue-500 text-white transition duration-150 p-3 flex items-center justify-center cursor-pointer`}>

                <Icons />

            </div>

        </div>
    )
}

export default HandleIcon