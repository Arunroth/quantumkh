import React, {useEffect, useState} from "react";
import Select, {MultiValue} from "react-select";
import {SelectMultiCustomProps} from "./SelectOption.tsx";

interface SelectOption {
    value: string;
    label: string;
}

const SelectOptionReactSelect: React.FC<SelectMultiCustomProps> = ({
                                                                       name,
                                                                       label,
                                                                       options,
                                                                       register,
                                                                       errors,
                                                                       placeholder = "Select options...",
                                                                       isRequired,
                                                                       value,
                                                                   }) => {
    const [selectedOptions, setSelectedOptions] = useState<MultiValue<SelectOption>>([]);
    const [otherValue, setOtherValue] = useState<string>('');
    const [otherTouched, setOtherTouched] = useState(false);

    // Sync local state with form value when it changes
    useEffect(() => {
        if (value) {
            const valuesArray = Array.isArray(value) ? value : [value];
            const staticOptions = options.map((o) => o.value);

            const selectedStaticOptions = options.filter((opt) =>
                valuesArray.some((v) => v === opt.value)
            );
            const customValue = valuesArray.find((v) => !staticOptions.includes(v));

            setSelectedOptions(
                customValue
                    ? [...selectedStaticOptions, {value: "Other", label: "Other"}]
                    : selectedStaticOptions
            );
            setOtherValue(customValue || '');
        } else {
            setSelectedOptions([]);
            setOtherValue('');
        }
    }, [value, options]);

    const handleSelectChange = (
        newValue: MultiValue<SelectOption>
    ) => {
        setSelectedOptions(newValue);

        if (register) {
            const values = newValue.map((opt) => opt.value);
            const finalValues = values.includes('Other') && otherValue
                ? [...values.filter((v) => v !== 'Other'), otherValue]
                : values;
            register(name).onChange({target: {value: finalValues, name}});
        }

        if (!newValue.some((opt) => opt.value === 'Other')) {
            setOtherValue('');
            setOtherTouched(false);
        }
    };

    const handleOtherInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newOtherValue = e.target.value;
        setOtherValue(newOtherValue);

        if (register && selectedOptions.some((opt) => opt.value === 'Other')) {
            const staticValues = selectedOptions
                .filter((opt) => opt.value !== 'Other')
                .map((opt) => opt.value);
            const finalValues = [...staticValues, newOtherValue];
            register(name).onChange({target: {value: finalValues, name}});
        }
    };

    return (
        <div>
            <div className="mb-1 text-gray-500 dark:text-gray-300 flex justify-between">
                <label className="block text-sm font-medium">
                    {label} <span className="text-red-500 font-bold">{isRequired ? '*' : ''}</span>
                </label>
                {errors?.[name] && <p className="text-red-500 text-sm">{errors[name]?.message}</p>}
            </div>

            <Select
                isMulti
                name={name}
                options={options}
                value={selectedOptions}
                onChange={handleSelectChange}
                placeholder={placeholder}
                className="basic-multi-select  "
                classNamePrefix="select my-selection"
                styles={{
                    control: (base, state) => ({
                        ...base,
                        borderRadius: '0.375rem',
                        borderColor: state.isFocused
                            ? '#facc15'
                            : document.documentElement.classList.contains('dark')
                                ? '#4b5563' // gray-600
                                : '#e2e8f0', // slate-200
                        backgroundColor: document.documentElement.classList.contains('dark')
                            ? '#374151' // gray-700
                            : 'white',
                        padding: '0.1rem',
                        '&:hover': {
                            borderColor: document.documentElement.classList.contains('dark')
                                ? '#6b7280' // gray-500
                                : '#d1d5db', // gray-300
                        },
                        boxShadow: state.isFocused ? '0 0 0 2px #facc15' : 'none',
                        color: document.documentElement.classList.contains('dark')
                            ? '#d1d5db' // gray-300
                            : '#1f2937', // gray-800
                    }),
                    menu: (base) => ({
                        ...base,
                        backgroundColor: document.documentElement.classList.contains('dark')
                            ? '#374151' // gray-700
                            : 'white',
                        color: document.documentElement.classList.contains('dark')
                            ? '#d1d5db' // gray-300
                            : '#1f2937', // gray-800
                    }),
                    option: (base, state) => ({
                        ...base,
                        backgroundColor: state.isSelected
                            ? document.documentElement.classList.contains('dark')
                                ? '#4b5563' // gray-600
                                : '#e5e7eb' // gray-200
                            : state.isFocused
                                ? document.documentElement.classList.contains('dark')
                                    ? '#4b5563' // gray-600
                                    : '#f3f4f6' // gray-100
                                : 'transparent',
                        color: document.documentElement.classList.contains('dark')
                            ? '#d1d5db' // gray-300
                            : '#1f2937', // gray-800
                        '&:hover': {
                            backgroundColor: document.documentElement.classList.contains('dark')
                                ? '#4b5563' // gray-600
                                : '#f3f4f6', // gray-100
                        },
                    }),
                    multiValue: (base) => ({
                        ...base,
                        backgroundColor: document.documentElement.classList.contains('dark')
                            ? '#4b5563' // gray-600
                            : '#e5e7eb', // gray-200
                        borderRadius: '0.25rem',
                    }),
                    multiValueLabel: (base) => ({
                        ...base,
                        color: document.documentElement.classList.contains('dark')
                            ? '#d1d5db' // gray-300
                            : '#1f2937', // gray-800
                    }),
                    multiValueRemove: (base) => ({
                        ...base,
                        color: document.documentElement.classList.contains('dark')
                            ? '#9ca3af' // gray-400
                            : '#6b7280', // gray-500
                        '&:hover': {
                            backgroundColor: document.documentElement.classList.contains('dark')
                                ? '#6b7280' // gray-500
                                : '#d1d5db', // gray-300
                            color: document.documentElement.classList.contains('dark')
                                ? '#d1d5db' // gray-300
                                : '#374151', // gray-700
                        },
                    }),
                    placeholder: (base) => ({
                        ...base,
                        color: document.documentElement.classList.contains('dark')
                            ? '#6b7280' // gray-500
                            : '#9ca3af', // gray-400
                    }),
                    input: (base) => ({
                        ...base,
                        color: document.documentElement.classList.contains('dark')
                            ? '#d1d5db' // gray-300
                            : '#1f2937', // gray-800
                    }),
                }}
            />

            {selectedOptions.some((opt) => opt.value === 'Other') && (
                <div className="mt-2">
                    <input
                        type="text"
                        value={otherValue}
                        onChange={handleOtherInputChange}
                        onBlur={() => setOtherTouched(true)}
                        placeholder="Please specify *"
                        className={`block p-2.5 w-full text-sm bg-white dark:bg-gray-700 border rounded-md focus:outline-yellow-300 focus:shadow-outline placeholder:text-gray-400 dark:placeholder:text-gray-500 text-gray-900 dark:text-gray-100 transition duration-300 ease focus:shadow-md ${
                            otherTouched && !otherValue
                                ? 'border-red-500 dark:border-red-500'
                                : 'border-gray-300 dark:border-gray-600'
                        }`}
                    />
                    {otherTouched && !otherValue && (
                        <p className="mt-1 text-red-500 text-xs">Please specify your custom material</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default SelectOptionReactSelect;