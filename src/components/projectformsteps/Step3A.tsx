import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {InputCustom, SelectOptionCustom} from "../common/SelectOption";
import {fetchFinishOptions, fetchMaterialOptions, uploadRequestProjectFiles} from "../../lib/api/requestProjects.ts";
import {
    RequestProjectFileReference,
    RequestProjectFormData
} from "../../lib/types/requestProjects.ts";
import {
    FinishSurfaces,
    getOptions,
    MaterialPreferences,
    ToleranceRequirements
} from "../../utils/serviceManageer.ts";
import SelectOptionReactSelect from "../common/SelectMultiOption.tsx";

const schema = z.object({
    materialPreferences: z.array(z.string())
        .min(1, "Please choose some material(s)")
        .refine(
            (values) => !values.includes("Other"),
            {message: "Please specify your custom material in the text field"}
        ),
    toleranceRequirement: z.string().min(1, "Please choose a tolerance requirement"),
    estimatedQuantity: z.string().min(1, "Please input the estimated quantity"),
    requiredSurfaceFinish: z.string().optional(),
    fileNames: z.array(
        z.object({
            original_filename: z.string().min(1, "Original filename is required"),
            filename: z.string().min(1, "Filename is required"),
        })
    ).optional(),
});

type StepData = z.infer<typeof schema>;

export default function Step3A({onNext, onBack, formData}: {
    onNext: (data: StepData) => void;
    onBack: () => void;
    formData: Partial<RequestProjectFormData>;
}) {
    const {
        register,
        handleSubmit,
        formState: {errors},
        setValue,
        watch,
    } = useForm<StepData>({
        resolver: zodResolver(schema),
        defaultValues: formData, // Pre-populate with existing data
    });

    const MaterialValue = watch("materialPreferences");
    const ToleranceValue = watch("toleranceRequirement");
    const SurfaceValue = watch("requiredSurfaceFinish");

    const FALLBACK_MATERIAL_OPTIONS = getOptions(MaterialPreferences);
    const FALLBACK_FINISH_OPTIONS = getOptions(FinishSurfaces);

    const [materialOptions, setMaterialOptions] = useState(FALLBACK_MATERIAL_OPTIONS);
    const [finishOptions, setFinishOptions] = useState(FALLBACK_FINISH_OPTIONS);
    const [optionsLoading, setOptionsLoading] = useState(true);

    useEffect(() => {
        const loadOptions = async () => {
            try {
                const [materials, finishes] = await Promise.all([
                    fetchMaterialOptions(),
                    fetchFinishOptions(),
                ]);
                if (materials.length > 0) {
                    setMaterialOptions([
                        ...materials.map(m => ({value: m.name, label: m.name})),
                        {value: "Other", label: "Other (Custom)"},
                    ]);
                }
                if (finishes.length > 0) {
                    setFinishOptions([
                        ...finishes.map(f => ({value: f.name, label: f.name})),
                        {value: "Other", label: "Other (Custom)"},
                    ]);
                }
            } catch {
                // Keep hardcoded fallbacks on API failure
            } finally {
                setOptionsLoading(false);
            }
        };
        loadOptions();
    }, []);

    const fileNames: RequestProjectFileReference[] = watch("fileNames") || [];
    const [uploadProgress, setUploadProgress] = useState<
        { fileName: string; progress: number }[]
    >(fileNames.map((file) => ({fileName: file.original_filename, progress: 100})));

    // Handle file input change (Choose File button)
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            await uploadFiles(files);
        }
    };

    // Handle drag-and-drop
    const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const files = event.dataTransfer.files;
        if (files) {
            await uploadFiles(files);
        }
    };

    // Prevent default drag-over behavior
    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    // Upload files to API with progress tracking
    const uploadFiles = async (files: FileList) => {
        const fileArray = Array.from(files);

        // Initialize progress tracking for each file
        const appendUploadFiles = [
            ...uploadProgress,
            ...fileArray.map((file) => ({fileName: file.name, progress: 0}))
        ]
        setUploadProgress(appendUploadFiles);

        try {
            const uploadedFiles = await uploadRequestProjectFiles(fileArray);
            const updatedFileNames = [...fileNames, ...uploadedFiles];
            setUploadProgress((prev) =>
                prev.map((item) => ({
                    ...item,
                    progress: 100,
                }))
            );
            setValue("fileNames", updatedFileNames);
        } catch (error) {
            console.error("Error uploading files:", error);
            setUploadProgress([]); // Clear progress on error
        }
    };

    const onSubmit = (data: StepData) => {
        onNext(data); // Pass form data to parent
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
            <div className="flex-1 space-y-4">

                <h2 className="text-2xl font-bold">Technical Specifications</h2>
                <p className="text-gray-500 dark:text-gray-300">Select any additional features you need.</p>

                {optionsLoading ? (
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 py-2">
                        <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                        </svg>
                        Loading options...
                    </div>
                ) : (
                    <>
                        <SelectOptionReactSelect isRequired label="Material Preferences" errors={errors}
                                                 name="materialPreferences"
                                                 chosenTitle="Select Material Preferences"
                                                 options={materialOptions}
                                                 register={register} value={MaterialValue}/>

                        <SelectOptionCustom label="Required Surface Finish" errors={errors} name="requiredSurfaceFinish"
                                            chosenTitle="Choose a Required Surface Finish"
                                            options={finishOptions}
                                            register={register}
                                            value={SurfaceValue}/>
                    </>
                )}

                <SelectOptionCustom isRequired label="Tolerance Requirements" errors={errors}
                                    name="toleranceRequirement"
                                    chosenTitle="Choose a Tolerance Requirements"
                                    options={getOptions(ToleranceRequirements)}
                                    register={register}
                                    value={ToleranceValue}/>

                <InputCustom isRequired type={"number"} label="Estimated Quantity" errors={errors}
                             name="estimatedQuantity" register={register}
                             placeholder="0"/>

                <div >
                    <div className="mb-1 text-gray-500 dark:text-gray-300 flex justify-between">
                        <label className="block text-sm font-medium">Do You Have Technical Drawings or CAD
                            Files?</label>
                        {errors?.fileNames && <p className="text-red-500 text-sm">{errors.fileNames.message}</p>}
                    </div>
                    <div onDrop={handleDrop}
                         onDragOver={handleDragOver}
                         className="w-full py-9 bg-gray-50 dark:bg-gray-700 rounded-md border border-gray-300 gap-3 grid border-dashed transition duration-300 ease">
                        <div className="grid gap-1">
                            <h2 className="text-center text-gray-400 dark:text-gray-300  text-xs leading-4">PDF, STEP, IGES, DXF, AI, PSD,
                                PNG or JPG, smaller than
                                15MB</h2>
                        </div>
                        <div className="grid gap-2">
                            <h4 className="text-center text-gray-500 dark:text-gray-400 text-sm font-medium leading-snug">Drag and Drop
                                your file here or</h4>
                            <div className="flex items-center justify-center">
                                <label>
                                    <input type="file" multiple onChange={handleFileChange} hidden/>
                                    <div
                                        className="flex w-28 h-9 px-2 flex-col bg-[#eab308] rounded-full shadow text-white text-xs font-semibold leading-4 items-center justify-center cursor-pointer focus:outline-none">Choose
                                        File
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                    {/* Display upload progress */}
                    {uploadProgress.length > 0 && (
                        <div className="mt-2">
                            {uploadProgress.map((item, index) => (
                                <div key={index} className="mb-2">
                                    <div className="flex justify-between">
                                        <p className="text-sm text-gray-600 dark:text-gray-300">{item.fileName}</p>
                                        <span className="text-xs text-gray-500 dark:text-gray-300">{item.progress}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div
                                            className="bg-[#eab308] h-2.5 rounded-full "
                                            style={{width: `${item.progress}%`}}
                                        ></div>
                                    </div>

                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-between mt-4">
                <button onClick={onBack} className="text-gray-500 dark:text-gray-300 font-semibold px-4 py-2 rounded-md">
                    Go Back
                </button>
                <button type={"submit"} className="bg-[#2083a0] text-white font-semibold px-4 py-2 rounded-md">
                    Next Step
                </button>
            </div>
        </form>
    )
        ;
}
