import { useCallback, useEffect, useRef, useState } from "react";
import Step1 from "./projectformsteps/Step1.tsx";
import Step2 from "./projectformsteps/Step2.tsx";
import Step3A from "./projectformsteps/Step3A.tsx";
import Step3B from "./projectformsteps/Step3B.tsx";
import Step4 from "./projectformsteps/Step4.tsx";
import SuccessMessage from "./projectformsteps/Step5.tsx";
import { createRequestProject } from "../lib/api/requestProjects.ts";
import {
    RequestProjectCreatedResponse,
    RequestProjectFormData,
} from "../lib/types/requestProjects.ts";
import { isContainInEnum, ServiceTypes } from "../utils/serviceManageer.ts";

const steps = [
    "Contact Info",
    "Project Type",
    "Technical Specifications",
    "Additional Requests",
    "Successfully request!",
];

// ── Leave-page confirmation modal ─────────────────────────────────────────────

interface LeaveModalProps {
    onStay: () => void;
    onLeave: () => void;
}

function LeaveModal({ onStay, onLeave }: LeaveModalProps): React.ReactElement {
    const stayRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        stayRef.current?.focus();
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onStay();
        };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [onStay]);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="leave-modal-title"
        >
            <div
                className="w-full max-w-sm rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900/30">
                    <svg
                        className="h-7 w-7 text-yellow-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                        />
                    </svg>
                </div>

                <h2
                    id="leave-modal-title"
                    className="text-center text-lg font-semibold text-gray-900 dark:text-white"
                >
                    Leave this page?
                </h2>
                <p className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
                    Your progress will be lost if you leave now. Are you sure you want to
                    continue?
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row-reverse">
                    
                    <button
                        ref={stayRef}
                        onClick={onStay}
                        className="flex-1 rounded-lg bg-[#00477f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#003a6a] transition-colors focus:outline-none focus:ring-2 focus:ring-[#00477f] focus:ring-offset-2"
                    >
                        Stay on page
                    </button>
                    <button
                        onClick={onLeave}
                        className="flex-1 rounded-lg border border-red-300 dark:border-red-700 bg-white dark:bg-gray-700 px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                        Leave anyway
                    </button>
                </div>
            </div>
        </div>
    );
}

// ── Main form ─────────────────────────────────────────────────────────────────

export default function MultiStepForm() {
    const [step, setStep] = useState(1);
    const [isDesignPrototype, setIsDesignPrototype] = useState(false);
    const [formData, setFormData] = useState<Partial<RequestProjectFormData>>({});
    const [submission, setSubmission] = useState<RequestProjectCreatedResponse | null>(null);
    const [submittedContactMethod, setSubmittedContactMethod] = useState<string | undefined>();

    // Guard is active only while the form has unsaved progress (steps 2–4).
    const isDirty = step > 1 && step < 5;

    // Whether the keyboard-reload modal is open.
    const [keyReloadPending, setKeyReloadPending] = useState(false);

    // ── Block browser reload button / close tab (native browser prompt) ───────
    useEffect(() => {
        if (!isDirty) return;
        const onBeforeUnload = (e: BeforeUnloadEvent) => { e.preventDefault(); };
        window.addEventListener("beforeunload", onBeforeUnload);
        return () => window.removeEventListener("beforeunload", onBeforeUnload);
    }, [isDirty]);

    // ── Intercept keyboard reload shortcuts (F5 / Ctrl+R / Cmd+R) ────────────
    // Keyboard shortcuts fire keydown before beforeunload, so we can show our
    // custom modal instead of the browser's native reload dialog.
    useEffect(() => {
        if (!isDirty) return;
        const onKeyDown = (e: KeyboardEvent) => {
            const isReload =
                e.key === "F5" ||
                (e.ctrlKey && e.key === "r") ||
                (e.ctrlKey && e.shiftKey && e.key === "R") ||
                (e.metaKey && e.key === "r");
            if (isReload) {
                e.preventDefault();
                setKeyReloadPending(true);
            }
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [isDirty]);

    // ── Modal action handlers ─────────────────────────────────────────────────

    const handleStayReload = useCallback(() => setKeyReloadPending(false), []);
    const handleLeaveReload = useCallback(() => {
        setKeyReloadPending(false);
        window.location.reload();
    }, []);

    // ── Form logic ────────────────────────────────────────────────────────────

    const nextStep = (data: Partial<RequestProjectFormData>) => {
        setFormData((prev) => ({ ...prev, ...data }));
        setStep((prev) => (prev < steps.length ? prev + 1 : prev));
        if (step === 2 && (!isContainInEnum(ServiceTypes, data.projectType) || data.projectType === "Other")) {
            setStep(4);
        } else if (data.projectType) {
            setIsDesignPrototype(data.projectType === "DesignPrototyping");
        }
    };

    const prevStep = () => {
        if (step === 4 && (!isContainInEnum(ServiceTypes, formData.projectType) || formData.projectType === "Other")) {
            setStep(2);
        } else {
            setStep((prev) => (prev > 1 ? prev - 1 : prev));
        }
    };

    const handleSubmit = async (data: Partial<RequestProjectFormData>) => {
        try {
            const merged = { ...formData, ...data };
            const payload: Partial<RequestProjectFormData> = {
                ...merged,
                isCompany: merged.isCompany === "company",
            };
            const response = await createRequestProject(payload);
            setSubmission(response);
            setSubmittedContactMethod(merged.contactMethod);
            setFormData({});
            setStep(5);
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    const handleReset = () => {
        setFormData({});
        setSubmission(null);
        setSubmittedContactMethod(undefined);
        setStep(1);
        setIsDesignPrototype(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            <div className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl transition-colors duration-200">
                            Start Your Project
                        </h2>
                        <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 transition-colors duration-200">
                            Contact us today to discuss your manufacturing needs and get a custom quote
                        </p>
                    </div>
                    <div className="flex justify-center items-center mt-10">
                        <div className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-900 rounded-lg p-4 max-w-6xl min-h-[43rem] w-full flex transition-colors duration-200">
                            <div className="w-1/5 md:w-1/3 Steps bg-[#00477f] dark:bg-[#00477f] text-white py-6 px-4 md:px-6 rounded-lg transition-colors duration-200">
                                {steps.map((label, index) => (
                                    <div key={index} className="flex items-center font-semibold mb-4">
                                        <div
                                            className={`w-8 h-8 min-h-8 min-w-8 flex items-center justify-center rounded-full transition-colors duration-200 ${
                                                step === index + 1
                                                    ? "bg-[#eab308] dark:bg-[#facc15]"
                                                    : "border border-white dark:border-gray-300"
                                            }`}
                                        >
                                            {index + 1}
                                        </div>
                                        <p className="ml-4 text-nowrap truncate text-white dark:text-gray-100">
                                            {label}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            <div className="w-4/5 md:w-2/3 pl-4 md:pl-6 md:pr-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-200">
                                {step === 1 && <Step1 onNext={nextStep} formData={formData} />}
                                {step === 2 && <Step2 onNext={nextStep} onBack={prevStep} formData={formData} />}
                                {step === 3 && !isDesignPrototype && (
                                    <Step3A onNext={nextStep} onBack={prevStep} formData={formData} />
                                )}
                                {step === 3 && isDesignPrototype && (
                                    <Step3B onNext={nextStep} onBack={prevStep} formData={formData} />
                                )}
                                {step === 4 && (
                                    <Step4 onBack={prevStep} onSubmit={handleSubmit} formData={formData} />
                                )}
                                {step === 5 && (
                                    <SuccessMessage
                                        onReset={handleReset}
                                        submission={submission}
                                        contactMethod={submittedContactMethod}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal: keyboard reload shortcut (F5 / Ctrl+R / Cmd+R) */}
            {keyReloadPending && (
                <LeaveModal onStay={handleStayReload} onLeave={handleLeaveReload} />
            )}
        </div>
    );
}
