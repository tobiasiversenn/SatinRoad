import {useState} from "react";
import {Api, type Drug} from "@/api/Api.ts";
import "./index.css"

const api = new Api();
export function AddDrug(){
    
    const [drugName, setDrugName] = useState("");
    const [drugPrice, setDrugPrice] = useState("");
    // const [sellerId, setSellerId] = useState("");
    // const [sellerName, setSellerName] = useState("");
    const sellerId= "wskdikadi";
    const sellerName= "James";
    
    
    return(
        <div className="AddPageDiv">

        <>
            <h1>Add a drug</h1>
            <hr/>
            <br/>
            <label>Drug name</label>
            <br/>
            <input className="inputFieldOnAddPage" value={drugName} onChange={(e)=> setDrugName(e.target.value)}/>
            <br/>
            <br/>
            <label>Price</label>
            <br/>
            <input className="inputFieldOnAddPage" value={drugPrice} onChange={e => setDrugPrice(e.target.value)}/>
            <br/>
            <br/>
            <br></br>
            <button className="btnAdd" onClick={() => api.postDrug.drugControllerQueriesPostDrug({
                drugName: drugName,
                price: Number(drugPrice),
                sellerId: sellerId, 
                sellerName: sellerName,
                isListed: true
                
            })
                .then(() => {
                    setDrugName("");
                    setDrugPrice("");
                })
            }>Add drug</button>
        </>
        </div>

    )
            }
            