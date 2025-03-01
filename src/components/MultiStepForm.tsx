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
        console.log(data, formData)
        if (step == 2 && (!isContainInEnum(ServiceTypes, data.projectType) || data.projectType == 'Other')) {
            setStep(4);
        } else if (data.projectType) {
            if (data.projectType === "DesignPrototyping") {
                setIsDesignPrototype(true);
            } else {
                setIsDesignPrototype(false);
            }
        }
    };

    const prevStep = () => {
        if (step == 4 && (!isContainInEnum(ServiceTypes, formData.projectType) || formData.projectType == 'Other')) {
            setStep(2);
        } else {
            setStep((prev) => (prev > 1 ? prev - 1 : prev));
        }
    };

    const handleSubmit = async (data: Partial<RequestProjectFormData>) => {
        try {
            const updatedFormData = {...formData, ...data};
            const response = await fetch(`${API_BASE_URL}/request-projects`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(updatedFormData),
            });
            if (!response.ok) throw new Error("Failed to submit form");
            setFormData({});
            setStep(5);
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
                        <div
                            className="bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-900 rounded-lg p-4 max-w-6xl min-h-[43rem] w-full flex transition-colors duration-200">
                            <div
                                className="w-1/5 md:w-1/3 Steps bg-[#00477f] dark:bg-[#00477f] text-white py-6 px-4 md:px-6 rounded-lg transition-colors duration-200">
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
                            <div
                                className="w-4/5 md:w-2/3 pl-4 md:pl-6 md:pr-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-200">
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