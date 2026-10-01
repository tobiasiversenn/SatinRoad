import {BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import {Drugs} from "@/Drugs.tsx";
import {StolenArtifacts} from "@/StolenArtifacts.tsx";
import {Weaponry} from "@/Weaponry.tsx";
import {AddDrug} from "@/AddDrug.tsx";
import {AddStolenArtifact} from "@/AddStolenArtifact.tsx";
import {AddWeaponry} from "@/AddWeaponry.tsx";
import {Inventory} from "@/Inventory.tsx";

export function App() {
    return (
        <BrowserRouter>
            <>
                <h1> Satin Road - Logged in as James</h1>

                <h3>Vendors who has sold more than 100 orders: </h3>
                <br/>

                <Link to="/inventory"><button>View my inventory</button></Link>
                <br/>
                <br/>
                
                <Routes>
                    <Route path="/inventory" element={<Inventory/>}/>
                </Routes>
                
                <Link to="/adddrug">
                    <button>Add a Drug</button>
                </Link>
                <Link to="/addstolenartifact">
                    <button>Add a Stolen Artifact</button>
                </Link>
                <Link to="/addweaponry">
                    <button>Add a Weaponry</button>
                </Link>
                <br/>
                <br/>

                <Routes>
                <Route path="/adddrug" element={<AddDrug/>}/>
                <Route path="/addstolenartifact" element={<AddStolenArtifact/>}/>
                <Route path="/addweaponry" element={<AddWeaponry/>}/>
                </Routes>

                <h1>Products to buy</h1>
                <nav>
                    <Link to="/drugs">
                        <button>Drugs products</button>
                    </Link>

                    <Link to="/stolenartifacts">
                        <button>Stolen Artifacts</button>
                    </Link>


                    <Link to="/weaponry">
                        <button>Weaponry</button>
                    </Link>

                </nav>


                <Routes>
                    <Route path="/drugs" element={<Drugs/>}/>
                    <Route path="/stolenartifacts" element={<StolenArtifacts/>}/>
                    <Route path="/weaponry" element={<Weaponry/>}/>

                    
                </Routes>

            </>
        </BrowserRouter>

    );
}

export default App;
