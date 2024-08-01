import React, { useState, useEffect } from 'react';


const RecipeMaterials = ({ materials }: {materials: Array<{
    item: string,
    serving: string
}>}) => {
    return (
        <div>
        {
            materials?.map((material: {item: string, serving: string}, index: number) => 
                <div className="flex flex-col items-center" key={index}>
                材料: {material.item} {material.serving}
                </div>
            )
        }
        </div>
    )
}

export default RecipeMaterials;