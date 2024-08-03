import React, { useState, useEffect } from 'react';


const RecipeMaterials = ({ materials }: {
    materials: Array<{
        item: string,
        serving: string
    }>
}) => {
    return (
        <div className="w-full">
            <div className="flex flex-col">
                <div className="m-5">
                    <div className="p-2 min-w-full inline-block align-middle rounded-xl">
                        <div className="max-h-[250px] overflow-x-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-peach [&::-webkit-scrollbar-thumb]:bg-xanthoussaturated bg-babypowder">
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
    )
}

export default RecipeMaterials;