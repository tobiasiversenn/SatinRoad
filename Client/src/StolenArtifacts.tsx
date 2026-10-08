import {Api, type StolenArtifact} from "@/api/Api.ts";
import {useEffect, useState} from "react";

const api = new Api();
export function StolenArtifacts(){

    const [stolenartifact, setStolenArtifacts] = useState<StolenArtifact[]>([])
    const [fbiStolenartifactId, setFbiStolenArtifactId] = useState<string>()

    const [fbiWarning, setFbiWarning] = useState<boolean>(false)


    useEffect(() => {
        api.getAllMyStolenArtifacts.stolenArtifactQueriesGetAllMyStolenArtifacts()
            .then(r => {
                setStolenArtifacts(r);
            })
    }, []);
    return (
        <>
            <h1>All Stolen Artifacts</h1>
            {fbiWarning == true && <h1 style={{color: 'red'}}>WARNING! The buyer is the FBI! The seller and their products have been removed</h1>}

            <div className="ProductsContainer">
            {stolenartifact.map((sa) => (
                <>
                <div className="Products">

                <h3>{sa.name}</h3>
                    <h3>{sa.price}$</h3>
                    <h3>Seller: {sa.sellerName}</h3>
                    <button className="btnAdd" onClick={() => 
                    api.addStolenArtifactToInventory.inventoryQueriesAddStolenArtifactToInventory({
                        stolenArtifactId: sa.id
                    })
                        
                        .then((result) => {
                            setStolenArtifacts(currentStolenArtifacts => currentStolenArtifacts.filter(StolenArtifact => StolenArtifact.id != sa.id));

                            api.createNewOrder.orderQueriesCreateNewOrder({
                                buyerId: "James",
                                vendorId: sa.sellerName
                            })
                        if (result == "FBI"){
                            setFbiWarning(true);

                            api.deleteVendorAndVendorProducts.fbiQueriesDeleteVendorAndVendorProducts({
                                sellerId: sa.sellerId
                            })
                            setTimeout(() => {
                                setFbiWarning(false)
                            }, 20000)
                        }
                    })}
                    >Buy stolen artifact</button>

                    <br/>
                    <br/>
                    <br/>
                </div>

                    </>
            ))}
            </div>
        </>
    )
}