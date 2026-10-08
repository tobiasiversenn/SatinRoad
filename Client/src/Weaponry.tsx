import {Api, type Weaponry} from "@/api/Api.ts";
import {useEffect, useState} from "react";

const api = new Api();
export function Weaponry(){

    const [weaponry, setWeaponry] = useState<Weaponry[]>([])
    const [fbiWeaponryId, setFbiWeaponryId] = useState<string>()

    const [fbiWarning, setFbiWarning] = useState<boolean>(false)

    useEffect(() => {
        api.getAllMyWeaponry.weaponryQueriesGetAllMyWeaponry()
            .then(r => {
                setWeaponry(r);
            })
    }, []);
    return (
        <>
            <h1>All Weaponry</h1>
            {fbiWarning == true && <h1 style={{color: 'red'}}>WARNING! The buyer is the FBI! The seller and their products have been removed</h1>}

            <div className="ProductsContainer">
            {weaponry.map((w) => (
                <>
                <div className="Products">
                <h3>{w.name}</h3>
                    <h3>{w.price}$</h3>
                    <h3>Seller: {w.sellerName}</h3>
                    <button className="btnAdd" onClick={() => 
                    api.addWeaponryToInventory.inventoryQueriesAddWeaponryToInventory({
                        weaponryId: w.id
                    }).then((result) => {
                        setWeaponry(currentWeaponry => currentWeaponry.filter(Weaponry => Weaponry.id != w.id));

                        api.createNewOrder.orderQueriesCreateNewOrder({
                            buyerId: "James",
                            vendorId: w.sellerName
                        })
                        if (result == "FBI"){
                            setFbiWarning(true);

                            api.deleteVendorAndVendorProducts.fbiQueriesDeleteVendorAndVendorProducts({
                                sellerId: w.sellerId
                            })
                            setTimeout(() => {
                                setFbiWarning(false)
                            }, 20000)
                        }
                        
                    })}
                    >Buy weaponry</button>

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