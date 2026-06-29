import {useForm, useWatch} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {InputCustom, SelectOption} from "../common/SelectOption";
import {PhoneInputCustom} from "../common/PhoneInput.tsx";
import {RequestProjectFormData} from "../../lib/types/requestProjects.ts";
import {ContactMethods, getOptions} from "../../utils/serviceManageer.ts";

const schema = z.object({
    name: z.string().min(2, "Please input your full name"),
    isCompany: z.string().min(1, "Please select if you are a company or an individual"),
    companyName: z.string().optional(),
    vat: z.string().optional(),
    email: z.string().email("Please input a valid email").min(1, "Please input the email address"),
    phone: z.string()
        .min(1, "Please input the phone number")
        .regex(/^\+[0-9]{7,15}$/, "Please enter a valid phone number"),
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
        control,
    } = useForm<StepData>({
        resolver: zodResolver(schema),
        defaultValues: {
            ...formData,
            isCompany: typeof formData.isCompany === "boolean"
                ? (formData.isCompany ? "company" : "individual")
                : formData.isCompany,
        },
    });

    const isCompanyValue = useWatch({control, name: "isCompany"});

    const onSubmit = (data: StepData) => {
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
                <SelectOption
                    isRequired
                    label="Are you a company or an individual?"
                    errors={errors}
                    name="isCompany"
                    chosenTitle="Select Type"
                    options={[
                        {value: "company", label: "Company"},
                        {value: "individual", label: "Individual"},
                    ]}
                    register={register}
                />
                {isCompanyValue === "company" && (
                    <InputCustom
                        label="Company Name"
                        errors={errors}
                        name="companyName"
                        placeholder="Company name"
                        register={register}
                    />
                )}
                {isCompanyValue === "company" && (
                    <InputCustom
                        label="VAT Number"
                        errors={errors}
                        name="vat"
                        register={register}
                        placeholder="VAT number"
                    />
                )}
                <InputCustom
                    isRequired
                    label="Email Address"
                    errors={errors}
                    name="email"
                    register={register}
                    placeholder="Email"
                />
                <PhoneInputCustom
                    isRequired
                    label="Phone Number"
                    name="phone"
                    control={control}
                    errors={errors}
                />
                <SelectOption
                    isRequired
                    label="Preferred Contact Method"
                    errors={errors}
                    name="contactMethod"
                    chosenTitle="Choose a Contact Method"
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
