import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {InputCustom, SelectOptionCustom, TextAreaCustom} from "../common/SelectOption";
import {RequestProjectFormData} from "../../utils/contentManager.ts";
import {getOptions, ServiceTypes} from "../../utils/serviceManageer.ts";

const schema = z.object({
    projectName: z.string(),
    projectType: z.string().min(1, "Please select a project type"),
    projectDescription: z.string().min(1, "Please input the description for more details"),
});

type StepData = z.infer<typeof schema>;

export default function Step2({onNext, onBack, formData}: {
    onNext: (data: StepData) => void;
    onBack: () => void;
    formData: Partial<RequestProjectFormData>;
}) {
    const {
        register,
        handleSubmit,
        formState: {errors},
        watch,
    } = useForm<StepData>({
        resolver: zodResolver(schema),
        defaultValues: formData, // Pre-populate with existing data
    })

    const ProjectTypeValue = watch("projectType");

    const onSubmit = (data: StepData) => {
        onNext(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
            <div className="flex-1 space-y-4">
                <h2 className="text-2xl font-bold">Project Type</h2>
                <p className="text-gray-500 dark:text-gray-300">Choose a project type that suits your needs.</p>

                <InputCustom
                    label="Project Name / Reference"
                    errors={errors}
                    name="projectName"
                    register={register}
                    placeholder="Name or Reference"
                />
                <SelectOptionCustom
                    isRequired
                    label="Select Service Type"
                    errors={errors}
                    name="projectType"
                    chosenTitle="Choose a Service Type"
                    options={getOptions(ServiceTypes)}
                    register={register}
                    value={ProjectTypeValue}
                />
                <TextAreaCustom
                    isRequired
                    row={15}
                    label="Project Description"
                    errors={errors}
                    name="projectDescription"
                    register={register}
                    placeholder="Write your thoughts here..."
                />
            </div>
            <div className="flex justify-between mt-4">
                <button onClick={onBack} className="text-gray-500 dark:text-gray-300 font-semibold px-4 py-2 rounded-md">
                    Go Back
                </button>
                <button type="submit" className="bg-[#2083a0] text-white font-semibold px-4 py-2 rounded-md">
                    Next Step
                </button>
            </div>
        </form>
    );
}