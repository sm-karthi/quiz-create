import React from 'react'
import Icons from './Icons'

function HandleIcon({ selectedComponent, setComponent }) {

    return (
        <div className="fixed right-2 top-[44%] bg-[#4d4d4d] shadow-md flex flex-col">

            <div
                onClick={() => setComponent('Mcq')}
                className={`${selectedComponent === 'Mcq' ? 'bg-blue-600' : 'bg-[#4d4d4d]'} hover:bg-blue-500 text-white transition duration-150 p-3 flex items-center justify-center cursor-pointer`}>

                <Icons />

            </div>


            <div
                onClick={() => setComponent('Msq')}
                className={`${selectedComponent === 'Msq' ? 'bg-blue-600' : 'bg-[#4d4d4d]'} hover:bg-blue-500 text-white transition duration-150 p-3 flex items-center justify-center cursor-pointer`}>

                <Icons />

            </div>


            <div
                onClick={() => setComponent('Ntq')}
                className={`${selectedComponent === 'Ntq' ? 'bg-blue-600' : 'bg-[#4d4d4d]'} hover:bg-blue-500 text-white transition duration-150 p-3 flex items-center justify-center cursor-pointer`}>

                <Icons />

            </div>

        </div>
    )
}

export default HandleIcon