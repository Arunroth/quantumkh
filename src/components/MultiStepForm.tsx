import {useState} from "react";
import Step1 from "./projectformsteps/Step1.tsx";
import Step2 from "./projectformsteps/Step2.tsx";
import Step3A from "./projectformsteps/Step3A.tsx";
import Step3B from "./projectformsteps/Step3B.tsx";
import Step4 from "./projectformsteps/Step4.tsx";
import {RequestProjectFormData} from "../utils/contentManager.ts";
import SuccessMessage from "./projectformsteps/Step5.tsx";
import {API_BASE_URL, isContainInEnum, ServiceTypes} from "../utils/serviceManageer.ts";

const steps = ["Contact Info", "Project Type", "Technical Specifications", "Additional Requests", "Successfully request!"];

export default function MultiStepForm() {
    const [step, setStep] = useState(1);
    const [isDesignPrototype, setIsDesignPrototype] = useState(false);
    const [formData, setFormData] = useState<Partial<RequestProjectFormData>>({});

    const nextStep = (data: Partial<RequestProjectFormData>) => {
        setFormData((prev) => ({...prev, ...data}));
        setStep((prev) => (prev < steps.length ? prev + 1 : prev));
        if (step == 2 && !isContainInEnum(ServiceTypes, data.projectType) || data.projectType == 'Other') {
            setStep(4);
        } else if (data.projectType) {
            if (data.projectType === "DesignPrototyping") {
                setIsDesignPrototype(true);
            } else {
                setIsDesignPrototype(false);
            }
        }
        console.log("on next", data.projectType, isDesignPrototype, formData.projectType);
    };

    const prevStep = () => {
        console.log("on back", isDesignPrototype, formData.projectType);
        if (step == 4 && !isContainInEnum(ServiceTypes, formData.projectType) || formData.projectType == 'Other') {
            setStep(2);
        } else {
            setStep((prev) => (prev > 1 ? prev - 1 : prev));
        }
    }

    const handleSubmit = async (data: Partial<RequestProjectFormData>) => {
        try {
            setFormData((prev) => ({...prev, ...data}));
            console.log(formData, data)
            const response = await fetch(`${API_BASE_URL}/request-projects`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(formData),
            });
            if (!response.ok) throw new Error("Failed to submit form");
            setFormData({});
            setStep(5)
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    const handleReset = () => {
        setFormData({});
        setStep(1);
        setIsDesignPrototype(false);
    };

    return (
        <div>
            <div className="bg-gray-50 dark:bg-dark-900 py-24 transition-shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-dark-900 dark:text-white sm:text-4xl">
                            Start Your Project
                        </h2>
                        <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
                            Contact us today to discuss your manufacturing needs and get a custom quote
                        </p>
                    </div>
                    <div className="flex justify-center items-center mt-10">
                        <div className="bg-white shadow-lg rounded-lg p-4 max-w-6xl min-h-[43rem] w-full flex">
                            <div className="w-1/3 Steps bg-[#00477f] text-white p-6 rounded-lg">
                                {steps.map((label, index) => (
                                    <div key={index} className="flex items-center font-semibold mb-4">
                                        <div
                                            className={`w-8 h-8 min-h-8 min-w-8 flex items-center justify-center rounded-full ${
                                                step === index + 1 ? "bg-[#eab308]" : "border border-white"
                                            }`}
                                        >
                                            {index + 1}
                                        </div>
                                        <p className="ml-4 text-nowrap truncate">{label}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="w-2/3 px-6">
                                {step === 1 && <Step1 onNext={nextStep} formData={formData}/>}
                                {step === 2 && <Step2 onNext={nextStep} onBack={prevStep} formData={formData}/>}
                                {step === 3 && !isDesignPrototype && (
                                    <Step3A onNext={nextStep} onBack={prevStep} formData={formData}/>
                                )}
                                {step === 3 && isDesignPrototype && (
                                    <Step3B onNext={nextStep} onBack={prevStep} formData={formData}/>
                                )}
                                {step === 4 && (
                                    <Step4 onBack={prevStep} onSubmit={handleSubmit} formData={formData}/>
                                )}
                                {step === 5 && (
                                    <SuccessMessage onReset={handleReset}/>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}