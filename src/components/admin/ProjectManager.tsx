import {useEffect, useState} from 'react';
import ProjectListTable from "./requestproject/ProjectListTable.tsx";
import {contentManager, ResponseProject} from "../../utils/contentManager.ts";

export default function ProjectManager() {
    const [projects, serProjects] = useState<ResponseProject[]>([])
    useEffect(() => {
        const fetch = async () => {
            try {
                serProjects(await contentManager.getRequestProjects());
            } catch (error) {
                console.error('Error fetching service:', error);
            }
        };

        fetch();
    }, []);
    return (
        <div>
            <div className="w-full">
                <ProjectListTable projects={projects}></ProjectListTable>
            </div>
        </div>
    );
}