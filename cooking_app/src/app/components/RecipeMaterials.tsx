import React, { useState, useEffect } from 'react';


const RecipeMaterials = ({ materials }: {
    materials: Array<{
        item: string,
        serving: string
    }>
}) => {
    return (
        <div>
            <div className="flex flex-col h-full w-full overflow-y-auto">
                <div className="-m-1.5 overflow-x-auto h-full">
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