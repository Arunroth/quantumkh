import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

const schema = z.object({
    project_name: z.string(),
    project_type: z.string(),
    project_description: z.string().min(1, "This field is required"),
});

export default function Step2({onNext, onBack}: { onNext: () => void; onBack: () => void }) {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({resolver: zodResolver(schema)});
    return (
        <form onSubmit={handleSubmit(onNext)} className="flex flex-col h-full">
            <div className="flex-1  space-y-4">
                <h2 className="text-2xl font-bold">Project Type</h2>
                <p className="text-gray-500">Choose a project type that suits your needs.</p>


                <div>
                    <div className="flex justify-between">
                        <label className="block text-sm font-medium">Name</label>
                        {errors.project_name && <p className="text-red-500 text-sm">{errors.project_name.message}</p>}
                    </div>
                    <input {...register("project_name")}
                           className="w-full p-2 border rounded-md focus:outline-yellow-300 focus:shadow-outline"
                           placeholder="e.g. Stephen King"/>
                </div>

                <div>
                    <div className="flex justify-between">
                        <label className="block text-sm font-medium">Name</label>
                        {errors.project_type && <p className="text-red-500 text-sm">{errors.project_type.message}</p>}
                    </div>
                    <input {...register("project_type")}
                           className="w-full p-2 border rounded-md focus:outline-yellow-300 focus:shadow-outline"
                           placeholder="e.g. Stephen King"/>
                </div>

                <div>
                    <div className="flex justify-between">
                        <label className="block text-sm font-medium">Name</label>
                        {errors.project_description &&
                            <p className="text-red-500 text-sm">{errors.project_description.message}</p>}
                    </div>
                    <input {...register("project_description")}
                           className="w-full p-2 border rounded-md focus:outline-yellow-300 focus:shadow-outline"
                           placeholder="e.g. Stephen King"/>
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
