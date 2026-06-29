import React, {useState} from "react";
import {ResponseProject} from "../../../utils/contentManager.ts";
import {
    API_BASE_URL,
    FinishSurfaces,
    getEnumValue,
    PreferDelivery,
    ServiceTypes,
    ToleranceRequirements
} from "../../../utils/serviceManageer.ts";

interface ProjectDetailsProps {
    project: ResponseProject;
}

const handleDownload = async (filename: string) => {
    try {
        const response = await fetch(`${API_BASE_URL}/download/${filename}`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error('Failed to download file');
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename; // Use the original filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Download error:', error);
        alert('Failed to download file');
    }
};

const ProjectDetails: React.FC<ProjectDetailsProps> = ({project}) => {
    const [isStep1Open, setIsStep1Open] = useState(true);
    const [isStep2Open, setIsStep2Open] = useState(true);
    const [isStep3Open, setIsStep3Open] = useState(true);
    const [isStep4Open, setIsStep4Open] = useState(true);

    const toggleSection = (section: string) => {
        switch (section) {
            case "step1":
                setIsStep1Open(!isStep1Open);
                break;
            case "step2":
                setIsStep2Open(!isStep2Open);
                break;
            case "step3":
                setIsStep3Open(!isStep3Open);
                break;
            case "step4":
                setIsStep4Open(!isStep4Open);
                break;
        }
    };

    return (
        <div className="mx-auto w-full rounded-lg bg-white p-6 shadow-md dark:bg-dark-900">
            <h2 className="mb-4 text-2xl font-bold text-gray-800 dark:text-gray-100">
                Project ID: <span className="text-gray-400 dark:text-gray-500"> {project.id} </span> (<span
                className="italic text-gray-500 dark:text-gray-400">{project.projectStatus}</span>)
            </h2>
            <p className="mb-6 text-gray-600 dark:text-gray-300">Created At: {project.createdAt}</p>

            {/* Step 1: Contact Info */}
            <div className="mb-4">
                <button
                    onClick={() => toggleSection("step1")}
                    className="flex w-full items-center justify-between rounded-md bg-gray-100 p-3 text-left text-lg font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-300 dark:bg-dark-800 dark:text-gray-200"
                >
                    Contact Information
                    <svg
                        className={`w-5 h-5 transform transition-transform ${isStep1Open ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                    </svg>
                </button>
                {isStep1Open && (
                    <div className="mt-2 pl-4 text-gray-700 dark:text-gray-300">
                        <p><strong>Name:</strong> {project.name}</p>
                        <p><strong>Company Name:</strong> {project.companyName || "N/A"}</p>
                        <p><strong>Email:</strong> {project.email}</p>
                        <p><strong>Phone:</strong> {project.phone}</p>
                        <p><strong>Contact Method:</strong> {project.contactMethod}</p>
                    </div>
                )}
            </div>

            {/* Step 2: Project Details */}
            <div className="mb-4">
                <button
                    onClick={() => toggleSection("step2")}
                    className="flex w-full items-center justify-between rounded-md bg-gray-100 p-3 text-left text-lg font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-300 dark:bg-dark-800 dark:text-gray-200"
                >
                    Project Details
                    <svg
                        className={`w-5 h-5 transform transition-transform ${isStep2Open ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                    </svg>
                </button>
                {isStep2Open && (
                    <div className="mt-2 pl-4 text-gray-700 dark:text-gray-300">
                        <p><strong>Project Name:</strong> {project.projectName || "N/A"}</p>
                        <p><strong>Project Type:</strong> {getEnumValue(ServiceTypes, project.projectType)}</p>
                        <p><strong>Description:</strong> {project.projectDescription}</p>
                    </div>
                )}
            </div>

            {/* Step 3: Technical Specifications */}
            <div className="mb-4">
                <button
                    onClick={() => toggleSection("step3")}
                    className="flex w-full items-center justify-between rounded-md bg-gray-100 p-3 text-left text-lg font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-300 dark:bg-dark-800 dark:text-gray-200"
                >
                    Technical Specifications
                    <svg
                        className={`w-5 h-5 transform transition-transform ${isStep3Open ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                    </svg>
                </button>
                {isStep3Open && (
                    <div className="mt-2 pl-4 text-gray-700 dark:text-gray-300">
                        {project.projectType.toLowerCase() === "designprototyping" ? (
                            <>
                                <p><strong>Capacity:</strong> {project.capacity || "N/A"}</p>
                                <p><strong>Budget Range:</strong> {project.budgetRange || "N/A"}</p>
                                <p><strong>Preferred Delivery
                                    Timeline:</strong> {getEnumValue(PreferDelivery, project.preferredDeliveryTimeline)}
                                </p>
                                <p>
                                    <strong>Example Link:</strong>{" "}
                                    {project.exampleLink ? (
                                        <a href={project.exampleLink} className="text-blue-500 hover:underline dark:text-blue-400"
                                           target="_blank" rel="noopener noreferrer">
                                            {project.exampleLink}
                                        </a>
                                    ) : (
                                        "N/A"
                                    )}
                                </p>
                            </>
                        ) : (
                            <>
                                <p>
                                    <strong>Material Preferences:</strong>{" "}
                                    {project.materialPreferences ? project.materialPreferences?.join(", ") : "N/A"}
                                </p>
                                <p><strong>Tolerance
                                    Requirement:</strong> {getEnumValue(ToleranceRequirements, project.toleranceRequirement)}
                                </p>
                                <p><strong>Estimated Quantity:</strong> {project.estimatedQuantity || "N/A"}</p>
                                <p><strong>Required Surface
                                    Finish:</strong> {getEnumValue(FinishSurfaces, project.requiredSurfaceFinish)}
                                </p>
                                <p>
                                    <strong>Files:</strong>{" "}
                                    {project.fileNames && project.fileNames.length > 0 ? (
                                        <ul className="list-disc pl-5">
                                            {project.fileNames.map((file, index) => (
                                                <li key={index}>
                                                    <button
                                                        onClick={() => handleDownload(file.filename)} // Extract filename from path
                                                        className="text-blue-500 hover:underline dark:text-blue-400"
                                                    >
                                                        {file.originalFilename}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        "N/A"
                                    )}
                                </p>
                            </>
                        )}
                    </div>
                )}
            </div>

            {/* Step 4: Additional Details */}
            <div className="mb-4">
                <button
                    onClick={() => toggleSection("step4")}
                    className="flex w-full items-center justify-between rounded-md bg-gray-100 p-3 text-left text-lg font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-300 dark:bg-dark-800 dark:text-gray-200"
                >
                    Additional Details
                    <svg
                        className={`w-5 h-5 transform transition-transform ${isStep4Open ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                    </svg>
                </button>
                {isStep4Open && (
                    <div className="mt-2 pl-4 text-gray-700 dark:text-gray-300">
                        <p><strong>Shopping Location:</strong> {project.shoppingLocation || "N/A"}</p>
                        <p><strong>Special Requirements:</strong> {project.specialRequirements || "N/A"}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectDetails;