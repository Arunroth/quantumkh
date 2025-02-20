import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";

const schema = z.object({
    name: z.string().min(2, "This field is required"),
    company_name: z.string(),
    email: z.string().email("Invalid email").min(1, "This field is required"),
    phone: z.string().min(1, "This field is required"),
    contact_method: z.string().min(1, "This field is required"),
});

export default function Step1({onNext}: { onNext: () => void }) {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({resolver: zodResolver(schema)});

    return (
        <form onSubmit={handleSubmit(onNext)} className="flex flex-col h-full">
            <div className="flex-1 space-y-4">
                <h2 className="text-2xl font-bold">Contact Info</h2>
                <p className="text-gray-500">Please provide your name, email address, and phone number.</p>

                <div>
                    <div className="flex justify-between">
                        <label className="block text-sm font-medium">Name</label>
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>
                    <input {...register("name")}
                           type={"text"}
                           className="w-full p-2 border rounded-md focus:outline-yellow-300 focus:shadow-outline"
                           placeholder="e.g. Stephen King"/>
                </div>

                <div>
                    <div className="flex justify-between">
                        <label className="block text-sm font-medium">Company Name</label>
                        {errors.company_name && <p className="text-red-500 text-sm">{errors.company_name.message}</p>}
                    </div>
                    <input {...register("company_name")}
                           className="w-full p-2 border rounded-md focus:outline-yellow-300 focus:shadow-outline"
                           placeholder="Company Name"/>
                </div>

                <div>
                    <div className="flex justify-between">
                        <label className="block text-sm font-medium">Email Address</label>
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>
                    <input {...register("email")}
                           className="w-full p-2 border rounded-md focus:outline-yellow-300 focus:shadow-outline"
                           placeholder="e.g. stephen@lorem.com"/>
                </div>

                <div>
                    <div className="flex justify-between">
                        <label className="block text-sm font-medium">Phone Number</label>
                        {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                    </div>
                    <input {...register("phone")} type={"number"}
                           className="w-full p-2 border rounded-md focus:outline-yellow-300 focus:shadow-outline"
                           placeholder="e.g. +855 12345678"/>
                </div>

                <div>
                    <div className="flex justify-between">
                        <label className="block text-sm font-medium">Preferred Contact Method</label>
                        {errors.contact_method &&
                            <p className="text-red-500 text-sm">{errors.contact_method.message}</p>}
                    </div>
                    <select id="countries" {...register("contact_method")}
                            className="block w-full p-2 border rounded-md focus:outline-yellow-300 focus:shadow-outline">
                        <option selected disabled={true}>Choose a country</option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="FR">France</option>
                        <option value="DE">Germany</option>
                    </select>
                </div>
            </div>

            <div className="flex justify-end mt-6">
                <button type="submit" className="bg-[#2083a0] text-white px-4 py-2 rounded-md">
                    Next Step
                </button>
            </div>
        </form>
    );
}
