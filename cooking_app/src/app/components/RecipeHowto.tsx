import React, { useState, useEffect } from 'react';

const RecipeHowto = ({
    howtoSize,
    order,
    text,
    handlePreviousStep,
    handleNextStep
}: { 
    howtoSize: number,
    order: number, 
    text: string,
    handlePreviousStep: any,
    handleNextStep: any
}) => {

    return (
        <div className="relative flex flex-col items-center mt-4">
            <span className="inline-flex items-center gap-x-1.5 py-1.5 px-4 rounded-full text-lg font-medium bg-xanthous text-princetonorange">
                {order}
            </span>
            <p className="text-lg mx-8 my-4 text-smokyblack">
                {text}
            </p>
            <div className="absolute bottom-0 mb-4 flex">
                <button onClick={handlePreviousStep} type="button" className="mx-6 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-full border border-babypowder bg-princetonorange text-babypowder shadow-sm hover:bg-orangewheel focus:outline-none focus:bg-orangewheel disabled:opacity-50 disabled:pointer-events-none">
                前の工程へ
                </button>
                <button onClick={handleNextStep} type="button" className="mx-6 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-full border border-babypowder bg-princetonorange text-babypowder shadow-sm hover:bg-orangewheel focus:outline-none focus:orangewheel disabled:opacity-50 disabled:pointer-events-none">
                次の工程へ
                </button>
            </div>
        </div>
    )
}

export default RecipeHowto;