import React, { useState, useEffect } from 'react';

const RecipeHowto = ({
    order,
    text,
    handlePreviousStep,
    handleNextStep
}: { 
    order: number, 
    text: string,
    handlePreviousStep: any,
    handleNextStep: any
}) => {

    return (
        <div className="relative flex flex-col items-center mt-4">
            <span className="inline-flex items-center gap-x-1.5 py-1.5 px-4 rounded-full text-lg font-medium bg-gray-100 text-gray-800 dark:bg-white/10 dark:text-white">
                {order}
            </span>
            <p className="text-lg mx-8 my-4">
                {text}
            </p>
            <div className="absolute bottom-0 mb-4 flex">
                <button onClick={handlePreviousStep} type="button" className="mx-6 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">
                前の工程へ
                </button>
                <button onClick={handleNextStep} type="button" className="mx-6 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">
                次の工程へ
                </button>
            </div>
        </div>
    )
}

export default RecipeHowto;