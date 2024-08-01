import React, { useState, useEffect } from 'react';

const RecipeHowto = ({ order, text, handlePreviousStep, handleNextStep}) => {

    return (
        <div className="flex flex-col items-center">
            <span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-white/10 dark:text-white">
                {order}
            </span>
            <p>
                {text}
            </p>
            <button onClick={handlePreviousStep} type="button" className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
              前の工程へ
            </button>
            <button onClick={handleNextStep} type="button" className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
              次の工程へ
            </button>
        </div>
    )
}

export default RecipeHowto;