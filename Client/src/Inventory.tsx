import {Api, type Drug, type StolenArtifact, type Weaponry} from "@/api/Api.ts";
import {useEffect, useState} from "react";

const api = new Api();

export function Inventory(){
    const [drug, setDrugs] = useState<Drug[]>([])
    const [stolenartifacts, setStolenartifacts] = useState<StolenArtifact[]>([])
    const [weaponry, setWeaponry] = useState<Weaponry[]>([])

    useEffect(() => {
        api.getDrugsInInventory.inventoryQueriesGetDrugsInInventory()
            .then((r) => {
                setDrugs(r)
            })

        api.getStolenArtifactsInInventory.inventoryQueriesGetStolenArtifactsInInventory()
            .then((r) => {
                setStolenartifacts(r)
            })

        api.getWeaponryInInventory.inventoryQueriesGetWeaponryInInventory()
            .then((r) => {
                setWeaponry(r)
            })
    }, [])
    return (
        <>
        <h2>My inventory</h2>
        <h3>My drug products: </h3>
            <div className="ProductsContainer">
            
            {drug.map((d) => (
                <>
                <div className="Products">

                <h3>{d.drugName}</h3>
                </div>

                </>
            ))}
            </div>

                <h3>My stolen artifact products: </h3>
            <div className="ProductsContainer">
            {stolenartifacts.map((sa) => (
                <>
                <div className="Products">

                <h3>{sa.name}</h3>
                    <br></br>
                </div>

                </>
            ))}
            </div>
            
            <h3>My weaponry products: </h3>
            <div className="ProductsContainer">
            {weaponry.map((w) => (
                <>
                <div className="Products">
                <h3>{w.name}</h3>
                    <br></br>
                </div>
                    
                </>
            ))}
            </div>
        </>
    )
}