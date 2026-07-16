import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import FloatingAI from "../AI/FloatingAI";

function Layout({ children }) {

    return (

        <div className="flex bg-slate-100 min-h-screen">

            <Sidebar />

            <div className="flex-1">

                <Topbar />

                <div className="p-8">

                    {children}

                </div>
                <FloatingAI />

            </div>

        </div>

    );

}

export default Layout;