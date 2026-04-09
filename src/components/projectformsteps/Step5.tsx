import React from "react";
import {RequestProjectCreatedResponse} from "../../lib/types/requestProjects.ts";

interface SuccessMessageProps {
    onReset: () => void; // Callback to reset the form or navigate
    submission: RequestProjectCreatedResponse | null;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({onReset, submission}) => {
    const reference = submission?.rfqId || submission?.id;

    return (
        <div
            className="flex flex-col h-full items-center justify-center">
            <div className="text-center">
                <svg
                    className="w-16 h-16 text-green-500 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Congratulations!</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Your project request has been submitted successfully. We’ll get back to you soon!
                </p>
                {reference && (
                    <p className="text-sm text-gray-500 dark:text-gray-300 mb-6">
                        Reference: <span className="font-semibold text-gray-700 dark:text-gray-100">{reference}</span>
                    </p>
                )}
                <button
                    onClick={onReset}
                    className="bg-[#2083a0] text-white font-semibold px-6 py-2 rounded-md hover:bg-[#1a6d87] transition duration-300"
                >
                    Start a New Project
                </button>
            </div>
        </div>
    );
};

export default SuccessMessage;