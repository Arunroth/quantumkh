import {useRef, useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {InputCustom, TextAreaCustom} from "../common/SelectOption";
import {RequestProjectFormData} from "../../lib/types/requestProjects.ts";

const schema = z.object({
    shoppingLocation: z.string().optional(),
    specialRequirements: z.string().max(2000, "Special requirements is too long").optional(),
});

type StepData = z.infer<typeof schema>;

export default function Step4({onBack, onSubmit, formData}: {
    onBack: () => void; onSubmit: (data: StepData) => void; formData: Partial<RequestProjectFormData>;
}) {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<StepData>({
        resolver: zodResolver(schema),
        defaultValues: formData, // Pre-populate with existing data
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const submittingRef = useRef(false);

    const onFinalSubmit = async (data: StepData) => {
        // Guard against double submission
        if (submittingRef.current) return;
        submittingRef.current = true;
        setIsSubmitting(true);
        try {
            await onSubmit(data);
        } finally {
            submittingRef.current = false;
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onFinalSubmit)} className="flex flex-col h-full">
            <div className="flex-1">
                <h2 className="text-2xl font-bold">Customization & Additional Requests</h2>
                <p className="text-gray-500">Review your details before submitting.</p>

                <div className="space-y-4 mt-4">
                    <InputCustom
                        label="Shipping Location / Address"
                        name="shoppingLocation"
                        errors={errors}
                        register={register}
                        placeholder="Address No.1"
                    />
                    <TextAreaCustom
                        row={19}
                        label="Special Requirements"
                        name="specialRequirements"
                        errors={errors}
                        register={register}
                        placeholder="You put here for any special requirements..."
                    />
                </div>
            </div>
            <div className="flex justify-between mt-4">
                <button
                    type="button"
                    onClick={onBack}
                    disabled={isSubmitting}
                    className="text-gray-500 font-semibold px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Go Back
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2 bg-[#eab308] text-white px-12 py-2 rounded-3xl disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? (
                        <>
                            <svg
                                className="animate-spin h-4 w-4 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12" cy="12" r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                />
                            </svg>
                            Submitting...
                        </>
                    ) : (
                        "Submit Form"
                    )}
                </button>
            </div>
        </form>
    );
}