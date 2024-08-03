import React, { useState, useEffect } from 'react';


const RecipeMaterials = ({ materials }: {
    materials: Array<{
        item: string,
        serving: string
    }>
}) => {
    return (
        <div className="w-full">
            <div className="flex flex-col max-h-[250px] overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700">
                <div className="-m-1.5">
                    <div className="p-1.5 min-w-full inline-block align-middle">
                        <div className="overflow-hidden">
                            <table className="w-full min-w-full divide-y divide-gray-200">
                                <tbody className="divide-y divide-gray-200">
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
    )
}

export default RecipeMaterials;