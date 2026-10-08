import {useState} from "react";
import {Api, type StolenArtifact} from "@/api/Api.ts";

const api = new Api();

export function AddStolenArtifact(){

    const [stolenArtifactName, setStolenArtifactName] = useState("");
    const [stolenArtifactPrice, setStolenArtifactPrice] = useState("");
    // const [sellerId, setSellerId] = useState("");
    // const [sellerName, setSellerName] = useState("");
    const sellerId = "wskdikadi";
    const sellerName = "James";


    return(
        <div className="AddPageDiv">

        <>
            <h1>Add a stolen artifact</h1>
            <hr/>
            <br/>
            <label>Stolen artifact name</label>
            <br/>
            <input className="inputFieldOnAddPage" value={stolenArtifactName} onChange={(e)=> setStolenArtifactName(e.target.value)}/>
            <br/>
            <br/>
            <label>Price</label>
            <br/>
            <input className="inputFieldOnAddPage" value={stolenArtifactPrice} onChange={e => setStolenArtifactPrice(e.target.value)}/>
            <br/>
            <br/>
            <br></br>
            <button className="btnAdd" onClick={() => api.postStolenArtifact.stolenArtifactQueriesPostStolenArtifact({
                name: stolenArtifactName,
                price: Number(stolenArtifactPrice),
                sellerId: sellerId,
                sellerName: sellerName,
                isListed: true
                
            })
                .then(() => {
                    setStolenArtifactName("");
                    setStolenArtifactPrice("");
                })}>Add stolen artifact</button>


        </>
        </div>
    )
}
            