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
        
        <div className="AddPageDiv">
        <>
            <h1>Add a weaponry</h1>
            <hr/>
            <br/>
            <label>Weaponry name</label>
            <br/>
            <input className="inputFieldOnAddPage" value={weaponryName} onChange={(e)=> setWeaponryName(e.target.value)}/>
            <br/>
            <br/>
            <label>Price</label>
            <br/>
            <input className="inputFieldOnAddPage" value={weaponryPrice} onChange={e => setWeaponryPrice(e.target.value)}/>
            <br/>
            <br/>

            <br></br>
            <button className="btnAdd" onClick={() => api.postWeaponry.weaponryQueriesPostWeaponry({
                name: weaponryName,
                price: Number(weaponryPrice),
                sellerId: sellerId,
                sellerName: sellerName,
                isListed: true

            })
                .then(() => {
                    setWeaponryName("");
                    setWeaponryPrice("");
                })}>Add weaponry</button>
        </>
        </div>
    )
}
            