import React, {useEffect, useState} from "react";
import {contentManager, ResponseProject} from "../../utils/contentManager.ts";
import ProjectDetails from "./requestproject/ProejectDetails.tsx";
import {Link, useParams} from "react-router-dom"; // Adjust path

const ProjectPage: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const [project, serProject] = useState<ResponseProject | null>(null)
    useEffect(() => {
        const fetch = async () => {
            try {
                if (id)
                    serProject(await contentManager.getRequestProjectById(id));
            } catch (error) {
                console.error('Error fetching service:', error);
            }
        };

        fetch();
    }, []);
    return (
        <div className="p-6">
            <div className="flex justify-between mb-4">
                <h1 className="text-3xl font-bold ">Project Details</h1>
                <Link to={"/admin/projects"} className="btn-primary text-white font-semibold px-4 py-2 rounded-md">
                    Go Project List
                </Link>
            </div>
            {
                project && <ProjectDetails project={project!}/>
            }

        </div>
    );
};

export default ProjectPage;