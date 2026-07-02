import React, { useState } from "react";
import { RequestProjectCreatedResponse } from "../../lib/types/requestProjects.ts";
import { ContactMethods } from "../../utils/serviceManageer.ts";
import { TelegramOptIn } from "./TelegramOptIn.tsx";

interface SuccessMessageProps {
    onReset: () => void;
    submission: RequestProjectCreatedResponse | null;
    contactMethod?: string;
}

function CopyButton({ value }: { value: string }): React.ReactElement {
    const [copied, setCopied] = useState(false);

    const handleCopy = (): void => {
        navigator.clipboard.writeText(value).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <button
            onClick={handleCopy}
            title="Copy to clipboard"
            className="ml-2 inline-flex items-center gap-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-2 py-0.5 text-xs text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
        >
            {copied ? (
                <>
                    <svg className="w-3.5 h-3.5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Copied
                </>
            ) : (
                <>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy
                </>
            )}
        </button>
    );
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ onReset, submission, contactMethod }) => {
    const reference = submission?.reference_no ?? submission?.rfqId ?? submission?.id;
    const vat = submission?.vat;

    return (
        <div className="flex flex-col h-full items-center justify-center">
            <div className="text-center w-full max-w-sm">
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

                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                    Request Submitted!
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Your project request has been submitted successfully. We'll get back to you soon!
                </p>

                {reference && (
                    <div className="mb-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-4 text-left">
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">
                            Tracking details — save these to follow your project
                        </p>

                        <div className="flex items-center justify-between mb-2">
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Reference No.</p>
                                <p className="font-mono font-semibold text-gray-800 dark:text-gray-100">
                                    {reference}
                                </p>
                            </div>
                            <CopyButton value={reference} />
                        </div>

                        {vat && (
                            <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">VAT Number</p>
                                    <p className="font-mono font-semibold text-gray-800 dark:text-gray-100">
                                        {vat}
                                    </p>
                                </div>
                                <CopyButton value={vat} />
                            </div>
                        )}
                    </div>
                )}

                {reference && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
                        Use your reference number{vat ? " and VAT number" : ""} on the{" "}
                        <strong>Project Tracking</strong> page to follow your project's progress.
                        {" "}A confirmation email has also been sent to you.
                    </p>
                )}

                {/* {contactMethod === ContactMethods.Telegram && submission?.id && (
                    <TelegramOptIn requestId={submission.id} />
                )} */}

                <button
                    onClick={onReset}
                    className="bg-white text-gray-700 font-semibold border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 px-6 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-300"
                >
                    Start a New Project
                </button>
            </div>
        </div>
    );
};

export default SuccessMessage;
