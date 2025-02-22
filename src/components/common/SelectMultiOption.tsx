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
            <div className="mb-1 text-gray-500 flex justify-between">
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
                className="basic-multi-select "
                classNamePrefix="select"
                styles={{
                    control: (base) => ({
                        ...base,
                        borderRadius: '0.375rem',
                        borderColor: '#e2e8f0',
                        padding: '0.1rem',
                        '&:hover': {borderColor: '#d1d5db'},
                        boxShadow: 'none',
                        '&:focus': {
                            outline: '2px solid #facc15',
                            outlineOffset: '2px',
                        },
                    }),
                    multiValue: (base) => ({
                        ...base,
                        backgroundColor: '#e5e7eb',
                        borderRadius: '0.25rem',
                    }),
                    multiValueLabel: (base) => ({
                        ...base,
                        color: '#1f2937',
                    }),
                    multiValueRemove: (base) => ({
                        ...base,
                        color: '#6b7280',
                        '&:hover': {
                            backgroundColor: '#d1d5db',
                            color: '#374151',
                        },
                    }),
                }}
            />

            {selectedOptions.some((opt) => opt.value === 'Other') && (
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

export default SelectOptionReactSelect;