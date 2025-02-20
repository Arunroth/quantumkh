import {useState} from "react";
import Step1 from "./projectformsteps/Step1.tsx";
import Step2 from "./projectformsteps/Step2.tsx";
import Step3 from "./projectformsteps/Step3.tsx";
import Step4 from "./projectformsteps/Step4.tsx";

const steps = ["Contact Info", "Project Type", "Technical Specifications", "Additional Requests"];

export default function MultiStepForm() {
    const [step, setStep] = useState(1);

    const nextStep = () => setStep((prev) => (prev < steps.length ? prev + 1 : prev));
    const prevStep = () => setStep((prev) => (prev > 1 ? prev - 1 : prev));



    return (
        <div>
            <div className="bg-white dark:bg-dark-900wb py-24 transition-shadow">
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
                        <div className="bg-white  shadow-lg rounded-lg p-4 max-w-4xl min-h-[36rem] w-full flex ">
                            {/* Sidebar */}
                            <div className="w-1/3  Steps bg-[#00477f] text-white p-6 rounded-lg">
                                {steps.map((label, index) => (
                                    <div key={index} className="flex items-center  font-semibold mb-4">
                                        <div
                                            className={`w-8 h-8 flex items-center justify-center rounded-full ${
                                                step === index + 1 ? "bg-blue-300" : "border border-white"
                                            }`}
                                        >
                                            {index + 1}
                                        </div>
                                        <p className="ml-4">{label}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Form Content */}
                            <div className="w-2/3 px-6">
                                {step === 1 && <Step1 onNext={nextStep}/>}
                                {step === 2 && <Step2 onNext={nextStep} onBack={prevStep}/>}
                                {step === 3 && <Step3 onNext={nextStep} onBack={prevStep}/>}
                                {step === 4 && <Step4 onBack={prevStep}/>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

