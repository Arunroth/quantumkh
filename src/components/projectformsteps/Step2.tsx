import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputCustom, SelectOption } from "../common/SelectOption";

enum ServiceTypes {
    cnc_machining = "CNC Machining Service",
    metal_fabrication = "Metal Fabrication & Manufacturing",
    design_prototyping = "Custom Machine Design & Prototyping",
    Other = "Other",
}

const serviceTypes = Object.entries(ServiceTypes).map(([key, value]) => ({
    value: key, // Use key as value
    label: value, // Use value as label
}));

const schema = z.object({
    project_name: z.string(),
    project_type: z.string(),
    project_description: z.string().min(1, "This field is required"),
});

export default function Step2({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: zodResolver(schema) });
    return (
        <form onSubmit={handleSubmit(onNext)} className="flex flex-col h-full">
            <div className="flex-1  space-y-4">
                <h2 className="text-2xl font-bold">Project Type</h2>
                <p className="text-gray-500">Choose a project type that suits your needs.</p>

                <InputCustom label="Project Name / Reference" errors={errors} name="project_name" register={register} placeholder="Your full name"></InputCustom>

                <SelectOption label="Select Service Type" errors={errors} name="project_type" choosenTitle="Choose a Service Type" options={serviceTypes} register={register}></SelectOption>

                <div>
                    <div className="flex text-gray-500 mb-1 justify-between">
                        <label className="block text-sm font-medium">Project Description</label>
                        {errors.project_description &&
                            <p className="text-red-500 text-sm">{errors.project_description.message}</p>}
                    </div>
                    <textarea id="message" rows={12} {...register("project_description")} className="block p-2.5 w-full text-sm text-gray-900 border rounded-md focus:outline-yellow-300 focus:shadow-outline dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                </div>

            </div>
            {/* Buttons */}
            <div className="flex justify-between mt-4">
                <button onClick={onBack} className="text-gray-500 font-semibold px-4 py-2 rounded-md">
                    Go Back
                </button>
                <button type={"submit"} className="bg-[#2083a0] text-white font-semibold px-4 py-2 rounded-md">
                    Next Step
                </button>
            </div>

        </form>
    );
}
