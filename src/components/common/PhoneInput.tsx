import {useEffect, useRef, useState} from "react";
import type {Control, FieldValues, Path} from "react-hook-form";
import {useController} from "react-hook-form";

interface CountryCode {
    code: string;
    name: string;
    dial: string;
}

const COUNTRY_CODES: CountryCode[] = [
    {code: "KH", name: "Cambodia", dial: "+855"},
    {code: "TH", name: "Thailand", dial: "+66"},
    {code: "VN", name: "Vietnam", dial: "+84"},
    {code: "MM", name: "Myanmar", dial: "+95"},
    {code: "LA", name: "Laos", dial: "+856"},
    {code: "MY", name: "Malaysia", dial: "+60"},
    {code: "SG", name: "Singapore", dial: "+65"},
    {code: "ID", name: "Indonesia", dial: "+62"},
    {code: "PH", name: "Philippines", dial: "+63"},
    {code: "CN", name: "China", dial: "+86"},
    {code: "JP", name: "Japan", dial: "+81"},
    {code: "KR", name: "South Korea", dial: "+82"},
    {code: "IN", name: "India", dial: "+91"},
    {code: "AU", name: "Australia", dial: "+61"},
    {code: "NZ", name: "New Zealand", dial: "+64"},
    {code: "GB", name: "United Kingdom", dial: "+44"},
    {code: "US", name: "United States", dial: "+1"},
    {code: "CA", name: "Canada", dial: "+1"},
    {code: "FR", name: "France", dial: "+33"},
    {code: "DE", name: "Germany", dial: "+49"},
    {code: "AE", name: "UAE", dial: "+971"},
];

function FlagIcon({code, className = ""}: {code: string; className?: string}) {
    return (
        <span
            className={`fi fi-${code.toLowerCase()} ${className}`}
            style={{backgroundSize: "cover"}}
        />
    );
}

export interface PhoneInputProps<T extends FieldValues> {
    name: Path<T>;
    label: string;
    control: Control<T>;
    errors?: Record<string, {message?: string}>;
    isRequired?: boolean;
}

export function PhoneInputCustom<T extends FieldValues>({
    name,
    label,
    control,
    errors,
    isRequired,
}: PhoneInputProps<T>) {
    const {field} = useController({name, control});

    const [selectedCountry, setSelectedCountry] = useState<CountryCode>(COUNTRY_CODES[0]);
    const [localNumber, setLocalNumber] = useState("");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [search, setSearch] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);
    const initialized = useRef(false);

    // Parse existing value into dial code + local number on first render
    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;
        if (field.value) {
            const match = COUNTRY_CODES.find(c => (field.value as string).startsWith(c.dial));
            if (match) {
                setSelectedCountry(match);
                setLocalNumber((field.value as string).slice(match.dial.length));
            } else {
                setLocalNumber(field.value as string);
            }
        }
    }, [field.value]);

    // Close dropdown on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownOpen(false);
                setSearch("");
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const handleCountrySelect = (country: CountryCode) => {
        setSelectedCountry(country);
        setDropdownOpen(false);
        setSearch("");
        field.onChange(country.dial + localNumber);
    };

    const handleLocalNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const digits = e.target.value.replace(/\D/g, "");
        setLocalNumber(digits);
        field.onChange(selectedCountry.dial + digits);
    };

    const filteredCountries = search.trim()
        ? COUNTRY_CODES.filter(
              c =>
                  c.name.toLowerCase().includes(search.toLowerCase()) ||
                  c.dial.includes(search)
          )
        : COUNTRY_CODES;

    const hasError = !!(errors?.[name as string]);

    return (
        <div>
            <div className="mb-1 text-gray-500 dark:text-gray-300 flex justify-between">
                <label className="block text-sm font-medium">
                    {label}{" "}
                    <span className="text-red-500 font-bold">{isRequired ? "*" : ""}</span>
                </label>
                {hasError && (
                    <p className="text-red-500 text-sm">{errors![name as string]?.message}</p>
                )}
            </div>

            <div className="flex" ref={dropdownRef}>
                {/* Country code button */}
                <div className="relative">
                    <button
                        type="button"
                        onClick={() => setDropdownOpen(prev => !prev)}
                        className={`flex items-center gap-1.5 h-full px-3 py-2 text-sm bg-white dark:bg-gray-700 border rounded-l-md border-r-0 transition duration-300 ease cursor-pointer whitespace-nowrap ${
                            hasError
                                ? "border-red-500"
                                : "border-gray-300 dark:border-gray-600"
                        } text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-600`}
                    >
                        <FlagIcon code={selectedCountry.code} className="w-5 h-4 rounded-sm" />
                        <span className="font-medium">{selectedCountry.dial}</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-3.5 h-3.5 text-gray-400 dark:text-gray-300"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>

                    {dropdownOpen && (
                        <div className="absolute z-50 mt-1 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-md shadow-lg">
                            <div className="p-2 border-b border-gray-100 dark:border-gray-700">
                                <input
                                    type="text"
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    placeholder="Search country..."
                                    autoFocus
                                    className="w-full text-sm px-2 py-1.5 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-yellow-400"
                                />
                            </div>
                            <ul className="max-h-52 overflow-y-auto">
                                {filteredCountries.map(country => (
                                    <li key={country.code}>
                                        <button
                                            type="button"
                                            onClick={() => handleCountrySelect(country)}
                                            className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                                                selectedCountry.code === country.code
                                                    ? "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400"
                                                    : "text-gray-800 dark:text-gray-200"
                                            }`}
                                        >
                                            <FlagIcon code={country.code} className="w-5 h-4 rounded-sm flex-shrink-0" />
                                            <span className="flex-1 truncate">{country.name}</span>
                                            <span className="text-gray-400 dark:text-gray-500 font-mono text-xs">
                                                {country.dial}
                                            </span>
                                        </button>
                                    </li>
                                ))}
                                {filteredCountries.length === 0 && (
                                    <li className="px-3 py-3 text-sm text-gray-400 dark:text-gray-500 text-center">
                                        No results
                                    </li>
                                )}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Local number input */}
                <input
                    type="tel"
                    value={localNumber}
                    name="phone"
                    onChange={handleLocalNumberChange}
                    onBlur={field.onBlur}
                    placeholder="Phone number"
                    inputMode="numeric"
                    className={`flex-1 min-w-0 rounded-r-md text-sm px-3 py-2 bg-white dark:bg-gray-700 border transition duration-300 ease focus:outline-none focus:shadow-md ${
                        hasError
                            ? "border-red-500 focus:outline-red-400"
                            : "border-gray-300 dark:border-gray-600 focus:outline-yellow-300"
                    } text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500`}
                />
            </div>
        </div>
    );
}
