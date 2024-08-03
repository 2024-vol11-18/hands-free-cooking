import React, { useState, useEffect } from 'react';


const RecipeMaterials = ({ materials }: {
    materials: Array<{
        item: string,
        serving: string
    }>
}) => {
    return (
        <div className="w-full">
            <div className="flex flex-col max-h-[270px] overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-xanthous [&::-webkit-scrollbar-thumb]:bg-xanthoussaturated">
                <div className="m-5">
                    <div className="p-2 min-w-full inline-block align-middle rounded-xl bg-babypowder">
                        <div className="overflow-hidden">
                            <table className="w-full min-w-full divide-y devide-princetonorangej">
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