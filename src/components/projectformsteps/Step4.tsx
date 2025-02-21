export default function Step4({ onBack }: { onBack: () => void }) {
    return (
        <div className="flex flex-col h-full">
            <div className="flex-1">
                <h2 className="text-2xl font-bold">Customization & Additional Requests</h2>
                <p className="text-gray-500">Review your details before submitting.</p>
            </div>

            {/* Buttons */}
            <div className="flex justify-between mt-4">
                <button onClick={onBack} className="text-gray-500 font-semibold px-4 py-2 rounded-md">
                    Go Back
                </button>
                <button className="bg-[#eab308]  text-white px-12 py-2 rounded-3xl">Submit Form</button>
            </div>
        </div>
    );
}
