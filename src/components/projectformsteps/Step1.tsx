import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {InputCustom, SelectOption} from "../common/SelectOption"; // Adjust path
import {RequestProjectFormData} from "../../utils/contentManager.ts"; // Adjust path
import {ContactMethods, getOptions} from "../../utils/serviceManageer.ts"; // Adjust path

const schema = z.object({
    name: z.string().min(2, "Please input your full name"),
    companyName: z.string().optional(),
    email: z.string().email("Please input the valid email").min(1, "Please input the email address"),
    phone: z.string()
        .min(1, "Please input the phone number")
        .regex(
            /^(\+855|0)[0-9]{7,9}$/,
            "Please enter a valid phone number (e.g., +85512345678 or 012345678)"
        ),
    contactMethod: z.string().min(1, "Please choose a contact method"),
});

type StepData = z.infer<typeof schema>;

export default function Step1({onNext, formData}: {
    onNext: (data: StepData) => void;
    formData: Partial<RequestProjectFormData>;
}) {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<StepData>({
        resolver: zodResolver(schema),
        defaultValues: formData,
    });

    const onSubmit = (data: StepData) => {
        console.log("Submitted Data:", data); // For debugging
        onNext(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
            <div className="flex-1 space-y-4">
                <h2 className="text-2xl font-bold">Contact Info</h2>
                <p className="text-gray-500 dark:text-gray-300">Please provide your name, email address, and phone number.</p>

                <InputCustom
                    isRequired
                    label="Full Name"
                    errors={errors}
                    name="name"
                    register={register}
                    placeholder="Full name"
                />
                <InputCustom
                    label="Company Name"
                    errors={errors}
                    name="companyName"
                    register={register}
                    placeholder="Company name"
                />
                <InputCustom
                    isRequired
                    label="Email Address"
                    errors={errors}
                    name="email"
                    register={register}
                    placeholder="Email"
                />
                <InputCustom
                    isRequired
                    label="Phone Number"
                    errors={errors}
                    name="phone"
                    register={register}
                    placeholder="Phone number"
                />
                <SelectOption
                    isRequired
                    label="Preferred Contact Method"
                    errors={errors}
                    name="contactMethod"
                    chosenTitle="Choose a Contact Method" // Corrected typo from "chosenTitle"
                    options={getOptions(ContactMethods)}
                    register={register}
                />
            </div>
            <div className="flex justify-end mt-6">
                <button type="submit" className="bg-[#2083a0] text-white px-4 py-2 rounded-md">
                    Next Step
                </button>
            </div>
        </form>
    );
}