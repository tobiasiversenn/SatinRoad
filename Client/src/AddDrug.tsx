import {useState} from "react";
import {Api, type Drug} from "@/api/Api.ts";

const api = new Api();
export function AddDrug(){
    
    const [drugName, setDrugName] = useState("");
    const [drugPrice, setDrugPrice] = useState("");
    // const [sellerId, setSellerId] = useState("");
    // const [sellerName, setSellerName] = useState("");
    const sellerId= "wskdikadi";
    const sellerName= "James";
    
    
    return(
        <>
            <input placeholder="Drug name" value={drugName} onChange={(e)=> setDrugName(e.target.value)}/>
            <input placeholder="Drug price" value={drugPrice} onChange={e => setDrugPrice(e.target.value)}/>
            
            
            <br></br>
            <button onClick={() => api.postDrug.drugControllerQueriesPostDrug({
                drugName: drugName,
                price: Number(drugPrice), 
                sellerId: sellerId, 
                sellerName: sellerName,
                isListed: true
                
            })}>Add drug</button>
            
        </>
    )
            }
            