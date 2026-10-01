import {Api, type Weaponry} from "@/api/Api.ts";
import {useEffect, useState} from "react";

const api = new Api();
export function Weaponry(){

    const [weaponry, setWeaponry] = useState<Weaponry[]>([])
    const [fbiWeaponryId, setFbiWeaponryId] = useState<string>()

    useEffect(() => {
        api.getAllMyWeaponry.weaponryQueriesGetAllMyWeaponry()
            .then(r => {
                setWeaponry(r);
            })
    }, []);
    return (
        <>
            <h1>All Weaponry</h1>
            {weaponry.map((w) => (
                <>
                    <h3>Weaponry name: {w.name}</h3>
                    <h3>Weaponry price: {w.price}</h3>
                    <h3>Seller name: {w.sellerName}</h3>
                    <button onClick={() => 
                    api.addWeaponryToInventory.inventoryQueriesAddWeaponryToInventory({
                        weaponryId: w.id
                    }).then((result) => {
                        if (result == "FBI"){
                            setFbiWeaponryId(w.id)
                            api.deleteVendorAndVendorProducts.fbiQueriesDeleteVendorAndVendorProducts({
                                sellerId: w.sellerId
                            })
                        }
                        
                    })}
                    >Buy weaponry</button>
                    {fbiWeaponryId == w.id && <h1 style={{color: 'red'}}>WARNING! The buyer is the FBI! The seller and their products have been removed</h1>}

                    <br/>
                    <br/>
                    <br/>
                </>
            ))}

        </>
    )
}