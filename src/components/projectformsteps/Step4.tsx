import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {InputCustom, TextAreaCustom} from "../common/SelectOption";
import {RequestProjectFormData} from "../../utils/contentManager.ts";

const schema = z.object({
    shoppingLocation: z.string().optional(),
    specialRequirements: z.string().optional(),
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

    const onFinalSubmit = (data: StepData) => {
        onSubmit(data);
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
                <button onClick={onBack} className="text-gray-500 font-semibold px-4 py-2 rounded-md">
                    Go Back
                </button>
                <button type="submit" className="bg-[#eab308] text-white px-12 py-2 rounded-3xl">
                    Submit Form
                </button>
            </div>
        </form>
    );
}