import { useNavigate } from 'react-router-dom';

const NotImplemented = () => {
    const navigate = useNavigate();
    return (
        <div className="bg-gray-50 h-[98vh] dark:bg-dark-800 py-24 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center ">
                    <h2 className="text-3xl font-bold text-yellow-500 dark:text-white sm:text-4xl">
                        501 - Not Implemented
                    </h2>
                    <p className="my-4 text-xl text-gray-600 dark:text-gray-300">
                        Sorry, this feature is not yet implemented.
                    </p>
                    <button className="btn-primary" onClick={() => navigate(-1)} >Go Back</button>
                </div>
            </div>
        </div>
    );
};

export default NotImplemented;
