"use client";
import React from "react";
import { RecipeGetResponseType } from "../api/apiType";

const RecipePage = (data: { data: RecipeGetResponseType }) => {
    return (
        <div className="flex flex-col justify-center items-center align-middle text-smokyblack">
            <div className="mx-auto">
                <ul className="p-3 max-w-xs flex flex-col divide-y divide-gray-200">
                    <li className="inline-flex items-center gap-x-2 py-3 px-4 text-md font-medium text-gray-800">
                        {data.data.title}
                    </li>
                    <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-medium text-gray-800">
                        時間: {data.data.time}
                    </li>
                    <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-medium text-gray-800">
                        費用: {data.data.cost}
                    </li>
                    <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-medium text-gray-800">
                        {data.data.comment}
                    </li>
                </ul>
            </div>
            <div className="mx-auto">
                <div className="">材料</div>
                <div className="w-full align-middle overflow-y-visible bg-babypowder">
                    <table className="w-full divide-y devide-princetonorange">
                        <tbody className="divide-y divide-princetonorange">
                            {data.data.materials?.map((material: { item: string, serving: string }, index: number) => (
                                <tr key={index}>
                                    <td className="p-2 whitespace-normal break-words text-sm font-medium text-smokyblack">
                                        {material.item}
                                    </td>
                                    <td className="p-4 whitespace-normal break-words text-sm text-smokyblack">
                                        {material.serving}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center text-align">
                <div className="">作り方</div>
                <div className="w-full">
                    <table className="w-full divide-y divide-gray-200">
                        <tbody className="divide-y divide-gray-200">
                            {data.data.howto?.map((howto: { order: number; text: string }, index: number) => (
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
        </div>
    )
}

export default RecipePage;