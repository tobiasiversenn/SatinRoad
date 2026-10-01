import {Api, type Drug} from "@/api/Api.ts";
import {useEffect, useState} from "react";


const api = new Api();

export function Drugs(){

    const [drug, setDrugs] = useState<Drug[]>([])
    const [fbiDrugId, setfbiDrugId] = useState<string>();
    
    useEffect(() => {
        api.getAllMyDrugs.drugControllerQueriesGetAllMyDrugs()
            .then(r => {
                setDrugs(r);
            })
    }, []);
    return (
        <>
        <h1>All drug products</h1>
            {drug.map((d) => (
                <>
                <h3>Drug name: {d.drugName}</h3>
                    <h3>Drug price: {d.price}</h3>
                    <h3>Drug seller Name: {d.sellerName}</h3>
                    <button onClick={() => {
                        api.addDrugToInventory.inventoryQueriesAddDrugToInventory({
                        drugId: d.id
                    }).then((result) => {
                        if (result == "FBI"){
                            setfbiDrugId(d.id)
                            api.deleteVendorAndVendorProducts.fbiQueriesDeleteVendorAndVendorProducts({
                                sellerId: d.sellerId
                            })
                            
                        } 
                        
                        })
                    }}
                    >Buy drug</button>
                    {fbiDrugId == d.id && <h1 style={{color: 'red'}}>WARNING! The buyer is the FBI! The seller and their products have been removed</h1>}

                    <br/>
                    <br/>
                    <br/>
                </>
            ))}
            
        </>
    )
}