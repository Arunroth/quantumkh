import {BrowserRouter as Router, Route, Routes, useLocation} from 'react-router-dom';
import Navbar from './components/Navbar';
import LoadingScreen from './components/common/LoadingScreen';
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
import {ContentProvider, useContent} from './context/ContentContext';
import {AuthProvider, RequireAuth} from './context/AuthContext';
import {ClientPortalAuthProvider} from './context/ClientPortalAuthProvider';
import NotImplemented from './components/NotImplemented';
import PageNotFound from './components/PageNotFound';
import MultiStepForm from "./components/MultiStepForm.tsx";
import ProjectManager from "./components/admin/ProjectManager.tsx";
import ProjectDetail from "./components/admin/ProjectDetailsManager.tsx";
import RequireClientPortalAuth from './components/clientportal/RequireClientPortalAuth';
import ClientPortalLayout from './components/clientportal/ClientPortalLayout';
import ClientPortalLanding from './components/clientportal/ClientPortalLanding';
import ClientPortalLogin from './components/clientportal/ClientPortalLogin';
import ClientPortalReviewExchange from './components/clientportal/ClientPortalReviewExchange';
import ClientPortalProjects from './components/clientportal/ClientPortalProjects';
import ClientPortalProjectDetail from './components/clientportal/ClientPortalProjectDetail';
import ClientPortalQuotes from './components/clientportal/ClientPortalQuotes';
import ClientPortalQuoteDetail from './components/clientportal/ClientPortalQuoteDetail';
import ClientPortalInvoices from './components/clientportal/ClientPortalInvoices';

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

function AppRoutes() {
    const { isLoading } = useContent();
    const location = useLocation();
    const isClientPortalRoute = location.pathname.startsWith('/client');

    if (isLoading && !isClientPortalRoute) {
        return <LoadingScreen />;
    }

    return (
        <div className="min-h-screen bg-white dark:bg-dark-900 transition-colors">
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/services" element={<ServicesPageWrapper/>}/>
                <Route path="/machines" element={<MachinePage/>}/>
                <Route path="/projects" element={<ProjectsPage/>}/>
                <Route path="/track" element={<TrackingPage/>}/>
                <Route path="/request-project" element={<MultiStepFormPage/>}/>
                <Route path="/client/login" element={<ClientPortalLogin/>}/>
                <Route path="/client/review" element={<ClientPortalReviewExchange/>}/>
                <Route
                    path="/client"
                    element={
                        <RequireClientPortalAuth>
                            <ClientPortalLayout/>
                        </RequireClientPortalAuth>
                    }
                >
                    <Route index element={<ClientPortalLanding/>}/>
                    <Route path="projects" element={<ClientPortalProjects/>}/>
                    <Route path="projects/:projectId" element={<ClientPortalProjectDetail/>}/>
                    <Route path="quotes" element={<ClientPortalQuotes/>}/>
                    <Route path="quotes/:quoteId" element={<ClientPortalQuoteDetail/>}/>
                    <Route path="invoices" element={<ClientPortalInvoices/>}/>
                </Route>
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
    );
}

export default function App() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <ClientPortalAuthProvider>
                    <ContentProvider>
                        <Router>
                            <AppRoutes />
                        </Router>
                    </ContentProvider>
                </ClientPortalAuthProvider>
            </AuthProvider>
        </ThemeProvider>
    );
}