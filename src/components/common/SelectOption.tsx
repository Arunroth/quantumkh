import React, {useEffect, useState} from "react";

interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps extends InputProps {
    options: SelectOption[];
    register?: any; // For use with react-hook-form
    chosenTitle?: string;
    otherOption?: string;
}

interface SelectCustomProps extends SelectProps {
    value?: string
}

export interface SelectMultiCustomProps extends SelectProps {
    value?: string[]
}

const SelectOptionCustom: React.FC<SelectCustomProps> = ({
                                                             name,
                                                             label,
                                                             options,
                                                             register,
                                                             errors,
                                                             chosenTitle,
                                                             isRequired,
                                                             value,
                                                         }) => {
    const [selectedValue, setSelectedValue] = useState<string>('');
    const [otherValue, setOtherValue] = useState<string>('');

    // Sync local state with form value when it changes (e.g., on navigation)
    useEffect(() => {
        if (value) {
            const lowercaseValue = value.toLowerCase();
            const isStaticOption = options.some((option) => option.value === lowercaseValue);
            if (isStaticOption) {
                setSelectedValue(lowercaseValue);
                setOtherValue('');
            } else {
                setSelectedValue('other'); // Use lowercase 'other' to match option value
                setOtherValue(value); // Show custom value in input
            }
        } else {
            setSelectedValue('');
            setOtherValue('');
        }
    }, [value, options]);

    // Update form value when "Other" input changes
    useEffect(() => {
        if (selectedValue === 'other' && otherValue && register) {
            const event = {
                target: {value: otherValue, name},
            } as React.ChangeEvent<HTMLSelectElement>;
            register(name).onChange(event);
        }
    }, [otherValue, selectedValue, name, register]);

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newValue = e.target.value;
        setSelectedValue(newValue);
        if (newValue !== 'other' && register) {
            register(name).onChange(e); // Update form for static options
        }
        if (newValue !== 'other') {
            setOtherValue(''); // Clear "Other" input when switching away
        }
    };

    const handleOtherInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOtherValue(e.target.value);
    };

    return (
        <div>
            <div className="mb-1 text-gray-500 flex justify-between">
                <label className="block text-sm font-medium">
                    {label}{' '}
                    <span className="text-red-500 font-bold">{isRequired ? '*' : ''}</span>
                </label>
                {errors?.[name] && <p className="text-red-500 text-sm">{errors[name]?.message}</p>}
            </div>

            <div className="relative">
                <select
                    {...(register ? register(name) : {})}
                    onChange={handleSelectChange}
                    value={selectedValue} // Controlled by local state
                    className="w-full rounded-md focus:outline-yellow-300 focus:shadow-outline bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border pl-3 pr-8 py-2 transition duration-300 ease focus:shadow-md appearance-none cursor-pointer"
                >
                    {chosenTitle ? (
                        <option value="" disabled>
                            {chosenTitle}
                        </option>
                    ) : null}

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

            {selectedValue === 'other' && (
                <div className="mt-2">
                    <input
                        type="text"
                        value={otherValue}
                        onChange={handleOtherInputChange}
                        placeholder="Please specify"
                        className="w-full rounded-md focus:outline-yellow-300 focus:shadow-outline bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border pl-3 pr-3 py-2 transition duration-300 ease focus:shadow-md"
                    />
                </div>
            )}
        </div>
    );
};


const SelectOption: React.FC<SelectProps> = ({
                                                 name,
                                                 label,
                                                 options,
                                                 register,
                                                 errors,
                                                 chosenTitle,
                                                 isRequired
                                             }) => {

    return (
        <div>
            <div className="mb-1 text-gray-500 flex justify-between">
                <label className="block text-sm font-medium">
                    {label}{' '}
                    <span className="text-red-500 font-bold">{isRequired ? '*' : ''}</span>
                </label>
                {errors?.[name] && <p className="text-red-500 text-sm">{errors[name]?.message}</p>}
            </div>

            <div className="relative">
                <select
                    {...(register ? register(name) : {})}
                    className="w-full rounded-md focus:outline-yellow-300 focus:shadow-outline bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border pl-3 pr-8 py-2 transition duration-300 ease focus:shadow-md appearance-none cursor-pointer"
                >
                    {chosenTitle ? (
                        <option value="" selected disabled>
                            {chosenTitle}
                        </option>
                    ) : null}

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
    isRequired?: boolean
}

const InputCustom: React.FC<InputProps> = ({
                                               name,
                                               label,
                                               type = "text",
                                               register,
                                               errors,
                                               placeholder,
                                               isRequired
                                           }) => {
    return (
        <div>
            <div className="mb-1 text-gray-500 flex justify-between">
                <label className="block text-sm font-medium">{label} <span
                    className="text-red-500 font-bold">{isRequired ? '*' : ''}</span></label>
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

interface TextAreaProps extends InputProps {
    row: number
}

const TextAreaCustom: React.FC<TextAreaProps> = ({
                                                     name,
                                                     label,
                                                     row,
                                                     register,
                                                     errors,
                                                     placeholder,
                                                     isRequired
                                                 }) => {
    return (
        <div>
            <div className="mb-1 text-gray-500 flex justify-between">
                <label className="block text-sm font-medium">{label} <span
                    className="text-red-500 font-bold">{isRequired ? '*' : ''}</span></label>
                {errors?.[name] && <p className="text-red-500 text-sm">{errors[name].message}</p>}
            </div>
            <textarea rows={row} {...(register ? register(name) : {})}
                      className="block p-2.5 w-full text-sm text-gray-900 border rounded-md focus:outline-yellow-300 focus:shadow-outline dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder={placeholder}></textarea>
        </div>
    );
};

export {SelectOption, SelectOptionCustom, InputCustom, TextAreaCustom};
