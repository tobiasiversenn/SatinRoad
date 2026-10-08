import {BrowserRouter, Routes, Route, Link, useLocation} from 'react-router-dom';
import {useNavigate} from 'react-router-dom'

import {Drugs} from "@/Drugs.tsx";
import {StolenArtifacts} from "@/StolenArtifacts.tsx";
import {Weaponry} from "@/Weaponry.tsx";
import {AddDrug} from "@/AddDrug.tsx";
import {AddStolenArtifact} from "@/AddStolenArtifact.tsx";
import {AddWeaponry} from "@/AddWeaponry.tsx";
import {Inventory} from "@/Inventory.tsx";
import "./index.css"
import {Loginpage} from "@/Loginpage.tsx";
import {HomePage} from "@/HomePage.tsx";
import {AdminPage} from "@/AdminPage.tsx";

export function App() {
    return (
        <BrowserRouter>
            <AppLayout/>

        </BrowserRouter>
    );
}
    
     function AppLayout() {
         const location = useLocation();
         const isLoginPage = location.pathname === "/login" || location.pathname === "/";
             return (
                 <>
                     {isLoginPage ? (
                         <Routes>
                             <Route path="/" element={<Loginpage/>}/>
                             <Route path="/login" element={<Loginpage/>}/>
                         </Routes>
                     ) : (

                         <>
                             <div className="Header">
                                 <h1 className="WebsiteNameText"> Satin Road</h1>
                                 <Link to="/login">
                                     <h3 className="LoggedInText">James ▾</h3>
                                 </Link>
                             </div>
                             <hr/>
                             <div className="PageLayout">

                                 <div className="NavigationBar">

                                     <Link to="/homepage">
                                         <button className="ButtonNavigationBar">Home page</button>
                                     </Link>

                                     <Link to="/inventory">
                                         <button className="ButtonNavigationBar">View my inventory</button>
                                     </Link>


                                     <nav>
                                         <Link to="/drugs">
                                             <button className="ButtonNavigationBar">Drugs</button>
                                         </Link>

                                         <Link to="/stolenartifacts">
                                             <button className="ButtonNavigationBar">Stolen Artifacts</button>
                                         </Link>


                                         <Link to="/weaponry">
                                             <button className="ButtonNavigationBar">Weaponry</button>
                                         </Link>

                                     </nav>


                                     <Link to="/adddrug">
                                         <button className="ButtonNavigationBar">Add a Drug</button>
                                     </Link>
                                     <Link to="/addstolenartifact">
                                         <button className="ButtonNavigationBar">Add a Stolen Artifact</button>
                                     </Link>
                                     <Link to="/addweaponry">
                                         <button className="ButtonNavigationBar">Add a Weaponry</button>
                                     </Link>
                                     <Link to="adminpage">
                                         <button className="ButtonNavigationBar">Admin Page</button>
                                     </Link>

                                 </div>

                                 <div className="ContentRightToNavigationBar">

                                     <Routes>
                                         <Route path="/" element={<Loginpage/>}/>
                                         <Route path="/homepage" element={<HomePage/>}/>
                                         <Route path="/login" element={<Loginpage/>}/>
                                         <Route path="/adddrug" element={<AddDrug/>}/>
                                         <Route path="/addstolenartifact" element={<AddStolenArtifact/>}/>
                                         <Route path="/addweaponry" element={<AddWeaponry/>}/>
                                         <Route path="/inventory" element={<Inventory/>}/>
                                         <Route path="/drugs" element={<Drugs/>}/>
                                         <Route path="/stolenartifacts" element={<StolenArtifacts/>}/>
                                         <Route path="/weaponry" element={<Weaponry/>}/>
                                         <Route path="/adminpage" element={<AdminPage/>}/>


                                     </Routes>


                                 </div>

                             </div>


                         </>

                     )}
                 </>
             );
     }

export default App;
