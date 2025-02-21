import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { InputCustom, SelectOption } from "../common/SelectOption";

enum ContactMethods {
    Email = "Email",
    Phone = "Phone",
    Telegram = "Telegram",
    Other = "Other",
}

const contactMethods = Object.entries(ContactMethods).map(([key, value]) => ({
    value: key, // Use key as value
    label: value, // Use value as label
}));

const schema = z.object({
    name: z.string().min(2, "This field is required"),
    company_name: z.string(),
    email: z.string().email("Invalid email").min(1, "This field is required"),
    phone: z.string().min(1, "This field is required"),
    contact_method: z.string().min(1, "This field is required"),
});

export default function Step1({ onNext }: { onNext: () => void }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: zodResolver(schema) });

    return (
        <form onSubmit={handleSubmit(onNext)} className="flex flex-col h-full">
            <div className="flex-1 space-y-4">
                <h2 className="text-2xl font-bold">Contact Info</h2>
                <p className="text-gray-500">Please provide your name, email address, and phone number.</p>

                <InputCustom label="Full Name" errors={errors} name="name" register={register} placeholder="Your full name"></InputCustom>

                <InputCustom label="Company Name" errors={errors} name="company_name" register={register} placeholder="Your full name"></InputCustom>

                <InputCustom label="Email Address" errors={errors} name="email" register={register} placeholder="Your full name"></InputCustom>

                <InputCustom label="Phone Number" errors={errors} name="phone" register={register} placeholder="Your full name"></InputCustom>

                <SelectOption label="Preferred Contact Method" errors={errors} name="contact_method" choosenTitle="Choose a Contact Method" options={contactMethods} register={register}></SelectOption>
            </div>

            <div className="flex justify-end mt-6">
                <button type="submit" className="bg-[#2083a0] text-white px-4 py-2 rounded-md">
                    Next Step
                </button>
            </div>
        </form>
    );
}
