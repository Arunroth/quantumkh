import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {InputCustom, SelectOption, TextAreaCustom} from "../common/SelectOption";
import {RequestProjectFormData} from "../../utils/contentManager.ts";
import {getOptions, PreferDelivery} from "../../utils/serviceManageer.ts";

const schema = z.object({
    capacity: z.string(),
    budgetRange: z.string(),
    preferredDeliveryTimeline: z.string().min(1, "Please choose a prefer delivery time"),
    exampleLink: z.string(),
});

type StepData = z.infer<typeof schema>;

export default function Step3B({onNext, onBack, formData}: {
    onNext: (data: StepData) => void;
    onBack: () => void;
    formData: Partial<RequestProjectFormData>;
}) {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<StepData>({
        resolver: zodResolver(schema),
        defaultValues: formData, // Pre-populate with existing data
    });

    const onSubmit = (data: StepData) => {
        onNext(data); // Pass form data to parent
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
            <div className="flex-1 space-y-4">

                <h2 className="text-2xl font-bold">Technical Specifications</h2>
                <p className="text-gray-500 dark:text-gray-300">Select any additional features you need.</p>

                <InputCustom label="Capacity" errors={errors} name="capacity" register={register}
                             placeholder="Capacity"></InputCustom>

                <InputCustom label="Budget Range (USD)" errors={errors} name="budgetRange" register={register}
                             placeholder="1000.00 USD"></InputCustom>

                <SelectOption isRequired label="Preferred Delivery Timeline" errors={errors}
                              name="preferredDeliveryTimeline"
                              chosenTitle="Select a Preferred Delivery Timeline" options={getOptions(PreferDelivery)}
                              register={register}></SelectOption>

                <TextAreaCustom row={11} label="Link to example Video/Website" errors={errors} name="exampleLink"
                                register={register}
                                placeholder="You can the links of sample Video/Website here..."></TextAreaCustom>

            </div>

            {/* Buttons */}
            <div className="flex justify-between mt-4">
                <button onClick={onBack}
                        className="text-gray-500 dark:text-gray-300 font-semibold px-4 py-2 rounded-md">
                    Go Back
                </button>
                <button type={"submit"} className="bg-[#2083a0] text-white font-semibold px-4 py-2 rounded-md">
                    Next Step
                </button>
            </div>
        </form>
    );
}
