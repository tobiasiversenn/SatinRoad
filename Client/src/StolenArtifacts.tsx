import {Api, type StolenArtifact} from "@/api/Api.ts";
import {useEffect, useState} from "react";

const api = new Api();
export function StolenArtifacts(){

    const [stolenartifact, setStolenArtifacts] = useState<StolenArtifact[]>([])
    const [fbiStolenartifactId, setFbiStolenArtifactId] = useState<string>()

    useEffect(() => {
        api.getAllMyStolenArtifacts.stolenArtifactQueriesGetAllMyStolenArtifacts()
            .then(r => {
                setStolenArtifacts(r);
            })
    }, []);
    return (
        <>
            <h1>All Stolen Artifacts</h1>
            {stolenartifact.map((sa) => (
                <>
                    <h3>Stolen artifact name: {sa.name}</h3>
                    <h3>Stolen artifact price: {sa.price}</h3>
                    <h3>Seller Name: {sa.sellerName}</h3>
                    <button onClick={() => 
                    api.addStolenArtifactToInventory.inventoryQueriesAddStolenArtifactToInventory({
                        stolenArtifactId: sa.id
                    }).then((result) => {
                        if (result == "FBI"){
                            setFbiStolenArtifactId(sa.id)
                            api.deleteVendorAndVendorProducts.fbiQueriesDeleteVendorAndVendorProducts({
                                sellerId: sa.sellerId
                            })
                        }
                    })}
                    >Buy stolen artifact</button>
                    {fbiStolenartifactId == sa.id && <h1 style={{color: 'red'}}>WARNING! The buyer is the FBI! The seller and their products have been removed</h1>}

                    <br/>
                    <br/>
                    <br/>
                </>
            ))}

        </>
    )
}