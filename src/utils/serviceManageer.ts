export enum MaterialPreferences {
    Aluminum = "Aluminum",
    StainlessSteel = "Stainless Steel",
    MildSteel = "Mild Steel",
    Brass = "Brass",
    Copper = "Copper",
    Other = "Custom",
}

export enum ToleranceRequirements {
    Standard = "Standard",
    HighPrecision = "High Precision",
    Other = "Custom" // text field
}

export enum FinishSurfaces {
    Polishing = "Polishing",
    Painting = "Painting",
    PowderCoating = "Powder Coating",
    Anodizing = "Anodizing",
    Other = "Custom" // text field
}

export enum PreferDelivery {
    Urgent = "Urgent (1-2 weeks)",
    Standard = "Standard (3-6 weeks)",
    Flexible = "Flexible"
}

export enum ServiceTypes {
    CncMachining = "CNC Machining Service",
    MetalFabrication = "Metal Fabrication & Manufacturing",
    DesignPrototyping = "Custom Machine Design & Prototyping",
    Other = "Custom",
}

export enum ContactMethods {
    Email = "Email",
    Phone = "Phone",
    Telegram = "Telegram",
    Other = "Other",
}

export function getOptions<T>(o: { [s: string]: T; }) {
    return Object.entries(o).map(([key, value]) => ({
        value: key, // Use key as value
        label: value, // Use value as label
    }));
}

export function isContainInEnum<T>(o: { [s: string]: T; }, str?: string) {
    if (!str) return false;
    const enumValues = Object.keys(o)
        .filter((key) => isNaN(Number(key))) // Filter out numeric reverse mappings
        .map((key) => key.toLowerCase());
    return enumValues.includes(str.toLowerCase());
}

export function getEnumValue<T extends Record<string, string>>(enumObj: T, key?: string): string | undefined {
    if (!key) return 'N/A';
    return enumObj[key as keyof T] ?? key;
}

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://quantumkh-api.fifty-point.com';

// Username (without "@") of the Telegram bot customers connect to for project
// update notifications. Leave VITE_TELEGRAM_BOT_USERNAME unset to hide the
// "Connect Telegram" opt-in on the request-success screen.
export const TELEGRAM_BOT_USERNAME = import.meta.env.VITE_TELEGRAM_BOT_USERNAME || '';