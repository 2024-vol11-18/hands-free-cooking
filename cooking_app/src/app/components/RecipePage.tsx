"use client";
import React from "react";

const RecipePage = ({ materials , howto }: {
    materials: Array<{
        item: string,
        serving: string
    }>
    howto: Array<{ 
        order: number, 
        text: string,
        handlePreviousStep?: any,
        handleNextStep?: any
    }>
}) => {
    return (
        <div className="p-1.5 align-middle text-smokyblack min-w-full">
            <div className="w-full">
                <div className="flex flex-col">
                    <div className="m-5">
                        <div className="p-2 min-w-full inline-block align-middle rounded-xl">
                            <div className="max-h-[250px] overflow-x-hidden overflow-y-auto bg-xanthoussaturated bg-babypowder">
                                <table className="w-full min-w-full divide-y devide-princetonorange">
                                    <tbody className="divide-y divide-princetonorange">
                                        {materials?.map((material: { item: string, serving: string }, index: number) => (
                                            <tr key={index}>
                                                <td className="px-6 py-2 whitespace-normal break-words text-sm font-medium text-smokyblack">
                                                    {material.item}
                                                </td>
                                                <td className="px-6 py-2 whitespace-normal break-words text-sm text-smokyblack">
                                                    {material.serving}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="">作り方</div>
            <div className="">
                <table className="w-full divide-y divide-gray-200">
                    <tbody className="divide-y divide-gray-200">
                        {howto?.map((howto: { order: number; text: string }, index: number) => (
                            <tr key={index}>
                                <td className="px-6 py-2 whitespace-normal break-words text-sm font-medium">
                                    {index + 1}
                                </td>
                                <td className="px-6 py-2 whitespace-normal break-words text-sm font-medium">
                                    {howto.text}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>                                                       
            </div>
        </div>
    )
}

export default RecipePage;