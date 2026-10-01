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
        <>
            <input placeholder="Stolen artifact name" value={stolenArtifactName} onChange={(e)=> setStolenArtifactName(e.target.value)}/>
            <input placeholder="Stolen artifact price" value={stolenArtifactPrice} onChange={e => setStolenArtifactPrice(e.target.value)}/>

            <br></br>
            <button onClick={() => api.postStolenArtifact.stolenArtifactQueriesPostStolenArtifact({
                name: stolenArtifactName,
                price: Number(stolenArtifactPrice),
                sellerId: sellerId,
                sellerName: sellerName,
                isListed: true
                
            })}>Add stolen artifact</button>


        </>
    )
}
            