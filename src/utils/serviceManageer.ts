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
    Polishing = "Urgent (1-2 weeks)",
    Painting = "Standard (3-6 weeks)",
    PowderCoating = "Flexible"
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
        value: key.toLowerCase(), // Use key as value
        label: value, // Use value as label
    }));
}

export function isContainInEnum<T>(o: { [s: string]: T; }, str?: string) {
    if (!str) return false;
    const enumValues = Object.keys(o)
        .filter((key) => isNaN(Number(key))) // Filter out numeric reverse mappings
        .map((key) => key.toLowerCase());
    console.log(enumValues, str.toLowerCase())
    return enumValues.includes(str.toLowerCase());
}