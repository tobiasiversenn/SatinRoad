import {useState} from "react";
import {Api, type Weaponry} from "@/api/Api.ts";

const api = new Api();

export function AddWeaponry(){

    const [weaponryName, setWeaponryName] = useState("");
    const [weaponryPrice, setWeaponryPrice] = useState("");
    // const [sellerId, setSellerId] = useState("");
    // const [sellerName, setSellerName] = useState("");
    const sellerId = "wskdikadi";
    const sellerName = "James";


    return(
        <>
            <input placeholder="Weaponry name" value={weaponryName} onChange={(e)=> setWeaponryName(e.target.value)}/>
            <input placeholder="Weaponry price" value={weaponryPrice} onChange={e => setWeaponryPrice(e.target.value)}/>
            

            <br></br>
            <button onClick={() => api.postWeaponry.weaponryQueriesPostWeaponry({
                name: weaponryName,
                price: Number(weaponryPrice),
                sellerId: sellerId,
                sellerName: sellerName,
                isListed: true

            })}>Add weaponry</button>
        </>
    )
}
            