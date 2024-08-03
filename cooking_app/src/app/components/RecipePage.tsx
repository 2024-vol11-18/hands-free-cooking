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
        <div className="flex flex-col">
                <div className="-m-1.5 overflow-x-auto">
                    <div className="p-1.5 min-w-full inline-block align-middle">
                        <div className="border rounded-lg shadow overflow-hidden dark:border-neutral-700 dark:shadow-gray-900">
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
                        <div className="border rounded-lg shadow overflow-hidden dark:border-neutral-700 dark:shadow-gray-900">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                                <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                                    {howto?.map((howto: { order: number; text: string }, index: number) => (
                                        <tr key={index}>
                                            <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                                                {index + 1}
                                            </td>
                                            <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                                                {howto.text}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div> 
    )
}

export default RecipePage;