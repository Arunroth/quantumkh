import React from "react";
import {Link} from "react-router-dom";
import {ResponseProject} from "../../../utils/contentManager.ts";

interface ProjectListTableProps {
    projects: ResponseProject[];
}

const ProjectListTable: React.FC<ProjectListTableProps> = ({projects}) => {
    return (
        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden px-4 pb-4">
            <div
                className="flex flex-col md:flex-row items-center py-3 justify-between space-y-3 md:space-y-0 md:space-x-4">
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Requested Projects Management</h1>
            </div>
            <div className="relative overflow-x-auto">
                <table
                    className="w-full min-h-[180px] text-md  text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead
                        className="  py-4 text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-400">
                    <tr>
                        <th className="py-4">No.</th>
                        <th className="py-4">Name</th>
                        <th className="py-4">Phone</th>
                        <th className="py-4">Email</th>
                        <th className="py-4">Contact Method</th>
                        <th className="">Project Name</th>
                        <th className="">Requested At</th>
                        <th className="">Status</th>
                        <th scope="col" className="px-4 py-3 text-right">
                            <span className="">Actions</span>
                        </th>

                    </tr>
                    </thead>
                    <tbody>
                    {projects.length === 0 ? (
                        <tr>
                            <td colSpan={9} className="px-4 py-2 text-center text-gray-500">
                                No projects found.
                            </td>
                        </tr>
                    ) : (
                        projects.map((project, index) => (
                            <tr key={project.id} className="hover:bg-gray-50">
                                <td className="">{index + 1}</td>
                                <td className="">{project.name}</td>
                                <td className="">{project.phone}</td>
                                <td className="">{project.email}</td>
                                <td className="">{project.contactMethod}</td>
                                <td className="">{project.projectName}</td>
                                <td className="">{project.createdAt}</td>
                                <td className="font-bold">{project.projectStatus}</td>
                                <td className="px-4 py-3 text-right">
                                    <Link className="text-green-600 font-bold"
                                          to={`/admin/projects/${project.id}`}>View</Link>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProjectListTable;