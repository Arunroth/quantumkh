import React, {useEffect, useState} from "react";

interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps extends InputProps {
    options: SelectOption[];
    register?: any;
    chosenTitle?: string;
    otherOption?: string;
}

interface SelectCustomProps extends SelectProps {
    value?: string;
}

export interface SelectMultiCustomProps extends SelectProps {
    value?: string[];
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

    useEffect(() => {
        if (value) {
            const lowercaseValue = value;
            const isStaticOption = options.some((option) => option.value === lowercaseValue);
            if (isStaticOption) {
                setSelectedValue(lowercaseValue);
                setOtherValue('');
            } else {
                setSelectedValue('Other');
                setOtherValue(value);
            }
        } else {
            setSelectedValue('');
            setOtherValue('');
        }
    }, [value, options]);

    useEffect(() => {
        if (selectedValue === 'Other' && otherValue && register) {
            const event = {
                target: {value: otherValue, name},
            } as React.ChangeEvent<HTMLSelectElement>;
            register(name).onChange(event);
        }
    }, [otherValue, selectedValue, name, register]);

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newValue = e.target.value;
        setSelectedValue(newValue);
        if (newValue !== 'Other' && register) {
            register(name).onChange(e);
        }
        if (newValue !== 'Other') {
            setOtherValue('');
        }
    };

    const handleOtherInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOtherValue(e.target.value);
    };

    return (
        <div>
            <div className="mb-1 text-gray-500 dark:text-gray-300 flex justify-between">
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
                    value={selectedValue}
                    className="w-full rounded-md focus:outline-yellow-300 focus:shadow-outline bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 placeholder:text-slate-400 text-gray-900 dark:text-gray-100 text-sm pl-3 pr-8 py-2 transition duration-300 ease focus:shadow-md appearance-none cursor-pointer"
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
                    className="h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-gray-700 dark:text-gray-300"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    />
                </svg>
            </div>

            {selectedValue === 'Other' && (
                <div className="mt-2">
                    <input
                        type="text"
                        value={otherValue}
                        onChange={handleOtherInputChange}
                        placeholder="Please specify"
                        className="w-full rounded-md focus:outline-yellow-300 focus:shadow-outline bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-500 text-gray-900 dark:text-gray-100 text-sm pl-3 pr-3 py-2 transition duration-300 ease focus:shadow-md"
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
                                                 isRequired,
                                             }) => {
    return (
        <div>
            <div className="mb-1 text-gray-500 dark:text-gray-300 flex justify-between">
                <label className="block text-sm font-medium">
                    {label}{' '}
                    <span className="text-red-500 font-bold">{isRequired ? '*' : ''}</span>
                </label>
                {errors?.[name] && <p className="text-red-500 text-sm">{errors[name]?.message}</p>}
            </div>

            <div className="relative">
                <select
                    {...(register ? register(name) : {})}
                    className="w-full rounded-md focus:outline-yellow-300 focus:shadow-outline bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 placeholder:text-slate-400 text-gray-900 dark:text-gray-100 text-sm pl-3 pr-8 py-2 transition duration-300 ease focus:shadow-md appearance-none cursor-pointer"
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
                    className="h-5 w-5 ml-1 absolute top-2.5 right-2.5 text-gray-700 dark:text-gray-300"
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
    isRequired?: boolean;
}

const InputCustom: React.FC<InputProps> = ({
                                               name,
                                               label,
                                               type = "text",
                                               register,
                                               errors,
                                               placeholder,
                                               isRequired,
                                           }) => {
    return (
        <div>
            <div className="mb-1 text-gray-500 dark:text-gray-300 flex justify-between">
                <label className="block text-sm font-medium">
                    {label}{' '}
                    <span className="text-red-500 font-bold">{isRequired ? '*' : ''}</span>
                </label>
                {errors?.[name] && <p className="text-red-500 text-sm">{errors[name].message}</p>}
            </div>
            <input
                {...(register ? register(name) : {})}
                className="w-full rounded-md focus:outline-yellow-300 focus:shadow-outline bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 placeholder:text-gray-400 dark:focus:border-0  dark:placeholder:text-gray-500 text-gray-900 dark:text-gray-100 text-sm pl-3 pr-3 py-2 transition duration-300 ease focus:shadow-md autofill:bg-white dark:autofill:bg-gray-700"
                type={type}
                placeholder={placeholder}
            />
        </div>
    );
};

interface TextAreaProps extends InputProps {
    row: number;
}

const TextAreaCustom: React.FC<TextAreaProps> = ({
                                                     name,
                                                     label,
                                                     row,
                                                     register,
                                                     errors,
                                                     placeholder,
                                                     isRequired,
                                                 }) => {
    return (
        <div>
            <div className="mb-1 text-gray-500 dark:text-gray-300 flex justify-between">
                <label className="block text-sm font-medium">
                    {label}{' '}
                    <span className="text-red-500 font-bold">{isRequired ? '*' : ''}</span>
                </label>
                {errors?.[name] && <p className="text-red-500 text-sm">{errors[name].message}</p>}
            </div>
            <textarea
                rows={row}
                {...(register ? register(name) : {})}
                className="block p-2.5 w-full text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-yellow-300 focus:shadow-outline placeholder:text-gray-400 dark:placeholder:text-gray-500 text-gray-900 dark:text-gray-100 transition duration-300 ease focus:shadow-md"
                placeholder={placeholder}
            />
        </div>
    );
};

export {SelectOption, SelectOptionCustom, InputCustom, TextAreaCustom};