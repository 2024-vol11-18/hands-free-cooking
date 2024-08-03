import React, { useState, useEffect } from 'react';


const RecipeMaterials = ({ materials }: {
    materials: Array<{
        item: string,
        serving: string
    }>
}) => {
    return (
        <div>
            <div className="flex flex-col max-h-[250px] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
                <div className="-m-1.5">
                    <div className="p-1.5 min-w-full inline-block align-middle">
                        <div className="overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                                <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                                    {materials?.map((material: { item: string, serving: string }, index: number) => (
                                        <tr key={index}>
                                            <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                                                {material.item}
                                            </td>
                                            <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
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