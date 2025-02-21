import React from "react";

interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps extends InputProps {
    options: SelectOption[];
    register?: any; // For use with react-hook-form
    choosenTitle?: string
}

const SelectOption: React.FC<SelectProps> = ({ name, label, options, register, errors, choosenTitle }) => {
    return (
        <div>
            <div className="mb-1 text-gray-500 flex justify-between">
                <label className="block text-sm font-medium">{label}</label>
                {errors?.[name] && <p className="text-red-500 text-sm">{errors[name].message}</p>}
            </div>

            <div className="relative">
                <select
                    {...(register ? register(name) : {})}
                    className="w-full rounded-md focus:outline-yellow-300 focus:shadow-outline bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border pl-3 pr-8 py-2 transition duration-300 ease focus:shadow-md appearance-none cursor-pointer"
                >
                    {
                        choosenTitle ?
                            <option selected disabled>
                                {choosenTitle}
                            </option> : <></>
                    }

                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.2}
                    stroke="currentColor"
                    className="h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-slate-700"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    />
                </svg>
            </div>
        </div>
    );
};


interface InputProps {
    name: string;
    label: string;
    type?: string;
    register?: any;
    errors?: any;
    placeholder?: string;
}

const InputCustom: React.FC<InputProps> = ({ name, label, type = "text", register, errors, placeholder }) => {
    return (
        <div>
            <div className="mb-1 text-gray-500 flex justify-between">
                <label className="block text-sm font-medium">{label}</label>
                {errors?.[name] && <p className="text-red-500 text-sm">{errors[name].message}</p>}
            </div>
            <input
                {...(register ? register(name) : {})}
                className="w-full rounded-md focus:outline-yellow-300 focus:shadow-outline bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border pl-3 pr-8 py-2 transition duration-300 ease focus:shadow-md appearance-none cursor-pointer"
                type={type}
                placeholder={placeholder}
            />
        </div>
    );
};

export { SelectOption, InputCustom };
