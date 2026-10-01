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
        <h1>My inventory</h1>
        <h1>My drug products: </h1>

            {drug.map((d) => (
                <>
                <h3>Drug name: {d.drugName}</h3>
                    <h3>Drug price: {d.price}</h3>
                    <br></br>
                </>
            ))}

                <h1>My stolen artifact products: </h1>
            {stolenartifacts.map((sa) => (
                <>
                    <h3>Stolen artifact name: {sa.name}</h3>
                    <h3>Stolen artifact price: {sa.price}</h3>
                    <br></br>

                </>
            ))}
            
            <h1>My weaponry products: </h1>
            {weaponry.map((w) => (
                <>
                <h3>Weaponry name: {w.name}</h3>
                    <h3>Weaponry price: {w.price}</h3>
                    <br></br>

                </>
            ))}
        </>
    )
}