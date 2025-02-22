import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Services from './components/Services';
import ServicesPage from './components/ServicesPage';
import Machines from './components/Machines';
import Projects from './components/Projects';
import ProjectTracking from './components/ProjectTracking';
import Clients from './components/Clients';
import AdminLayout from './components/admin/AdminLayout';
import Login from './components/admin/Login';
import Dashboard from './components/admin/Dashboard';
import ContentManager from './components/admin/ContentManager';
import ServicesManager from './components/admin/ServicesManager';
import {ThemeProvider} from './context/ThemeContext';
import {ContentProvider} from './context/ContentContext';
import {AuthProvider, RequireAuth} from './context/AuthContext';
import NotImplemented from './components/NotImplemented';
import PageNotFound from './components/PageNotFound';
import MultiStepForm from "./components/MultiStepForm.tsx";
import ProjectManager from "./components/admin/ProjectManager.tsx";
import ProjectDetail from "./components/admin/ProjectDetailsManager.tsx";

function HomePage() {
    return (
        <>
            <Navbar/>
            <main>
                <Hero/>
                <Features/>
                <Services/>
                <Projects/>
                <Clients/>
            </main>
        </>
    );
}

function PageNotFoundPage() {
    return (
        <>
            <Navbar/>
            <PageNotFound/>
        </>
    );
}

function NotImplementedPage() {
    return (
        <>
            <Navbar/>
            <NotImplemented/>
        </>
    );
}

function ServicesPageWrapper() {
    return (
        <>
            <Navbar/>
            <ServicesPage/>
        </>
    );
}

function MachinePage() {
    return (
        <>
            <Navbar/>
            <Machines/>
        </>
    );
}

function ProjectsPage() {
    return (
        <>
            <Navbar/>
            <Projects/>
        </>
    );
}

function MultiStepFormPage() {
    return (
        <>
            <Navbar/>
            <MultiStepForm/>
        </>
    );
}

function TrackingPage() {
    return (
        <>
            <Navbar/>
            <ProjectTracking/>
        </>
    );
}

export default function App() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <ContentProvider>
                    <Router>
                        <div className="min-h-screen bg-white dark:bg-dark-900 transition-colors">
                            <Routes>
                                <Route path="/" element={<HomePage/>}/>
                                <Route path="/services" element={<ServicesPageWrapper/>}/>
                                <Route path="/machines" element={<MachinePage/>}/>
                                <Route path="/projects" element={<ProjectsPage/>}/>
                                <Route path="/track" element={<TrackingPage/>}/>
                                <Route path="/request-project" element={<MultiStepFormPage/>}/>
                                <Route path="/admin/login" element={<Login/>}/>
                                <Route
                                    path="/admin"
                                    element={
                                        <RequireAuth>
                                            <AdminLayout/>
                                        </RequireAuth>
                                    }
                                >
                                    <Route index element={<Dashboard/>}/>
                                    <Route path="content" element={<ContentManager/>}/>
                                    <Route path="projects" element={<ProjectManager/>}/>
                                    <Route path="projects/:id" element={<ProjectDetail/>}/>
                                    <Route path="services" element={<ServicesManager/>}/>
                                </Route>
                                {/* Not Implemented Example */}
                                <Route path="/not-implemented" element={<NotImplementedPage/>}/>

                                {/* Catch-all route for 404 */}
                                <Route path="*" element={<PageNotFoundPage/>}/>
                            </Routes>
                        </div>
                    </Router>
                </ContentProvider>
            </AuthProvider>
        </ThemeProvider>
    );
}