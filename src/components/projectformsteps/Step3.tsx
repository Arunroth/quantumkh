import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";

const schema = z.object({
    material_preferences: z.string().min(2, "This field is required"),
    tolerance_requirement: z.string().min(1, "This field is required"),
    estimated_quantity: z.number().min(1, "This field is required"),
    have_file: z.boolean().default(false),
    files: z.string(),
});


export default function Step3({onNext, onBack}: { onNext: () => void; onBack: () => void }) {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({resolver: zodResolver(schema)});

    return (
        <form onSubmit={handleSubmit(onNext)} className="flex flex-col h-full">
            <div className="flex-1 space-y-4">
                <h2 className="text-2xl font-bold">Technical Specifications</h2>
                <p className="text-gray-500">Select any additional features you need.</p>

                <div>
                    <div className="flex justify-between">
                        <label className="block text-sm font-medium">Name</label>
                        {errors.material_preferences &&
                            <p className="text-red-500 text-sm">{errors.material_preferences.message}</p>}
                    </div>
                    <input {...register("material_preferences")}
                           className="w-full p-2 border rounded-md focus:outline-yellow-300 focus:shadow-outline"
                           placeholder="e.g. Stephen King"/>
                </div>

                <div>
                    <div className="flex justify-between">
                        <label className="block text-sm font-medium">Company Name</label>
                        {errors.tolerance_requirement &&
                            <p className="text-red-500 text-sm">{errors.tolerance_requirement.message}</p>}
                    </div>
                    <input {...register("tolerance_requirement")}
                           className="w-full p-2 border rounded-md focus:outline-yellow-300 focus:shadow-outline"
                           placeholder="Company Name"/>
                </div>

                <div>
                    <div className="flex justify-between">
                        <label className="block text-sm font-medium">Email Address</label>
                        {errors.estimated_quantity &&
                            <p className="text-red-500 text-sm">{errors.estimated_quantity.message}</p>}
                    </div>
                    <input {...register("estimated_quantity")}
                           className="w-full p-2 border rounded-md focus:outline-yellow-300 focus:shadow-outline"
                           type={"number"}
                           placeholder="1"/>
                </div>

                <div>
                    <div className="flex justify-between">
                        <label className="block text-sm font-medium">Phone Number</label>
                        {errors.have_file && <p className="text-red-500 text-sm">{errors.have_file.message}</p>}
                    </div>
                    <input {...register("have_file")}
                           className="w-full p-2 border rounded-md focus:outline-yellow-300 focus:shadow-outline"
                           placeholder="e.g. +855 12345678"/>
                </div>

                <div>
                    <div className="flex justify-between">
                        <label className="block text-sm font-medium">Phone Number</label>
                        {errors.files && <p className="text-red-500 text-sm">{errors.files.message}</p>}
                    </div>
                    <input {...register("files")}
                           className="w-full p-2 border rounded-md focus:outline-yellow-300 focus:shadow-outline"
                           placeholder="e.g. +855 12345678"/>
                </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-between mt-4">
                <button onClick={onBack} className=" text-white px-4 py-2 rounded-md">
                    Back
                </button>
                <button type={"submit"} className="bg-[#2083a0] text-white px-4 py-2 rounded-md">
                    Next Step
                </button>
            </div>
        </form>
    );
}
