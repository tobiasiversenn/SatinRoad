import {Api, type Drug} from "@/api/Api.ts";
import {useEffect, useState} from "react";


const api = new Api();

export function Drugs(){

    const [drug, setDrugs] = useState<Drug[]>([])
    const [fbiDrugId, setfbiDrugId] = useState<string>();

    const [fbiWarning, setFbiWarning] = useState<boolean>(false)
    const [isDiscount, setIsDiscout] = useState<boolean>(false)
    
    useEffect(() => {
        api.getAllMyDrugs.drugControllerQueriesGetAllMyDrugs()
            .then(r => {
                setDrugs(r);
            })
        
    }, []);
    return (
        <>
        <h1>All drug products</h1>
            {fbiWarning == true && <h1 style={{color: 'red'}}>WARNING! The buyer is the FBI! The seller and their products have been removed</h1>}

            <div className="ProductsContainer">
            {drug.map((d) => (
                <>
                <div className="Products">
                <h3>{d.drugName}</h3>
                    <h3>{d.price}$</h3>
                    <h3>Seller: {d.sellerName}</h3>
                    <button className="btnAdd" onClick={() => {
                        api.addDrugToInventory.inventoryQueriesAddDrugToInventory({
                        drugId: d.id
                    })
                            
                            .then((result) => {
                                setDrugs(currentDrugs => currentDrugs.filter(Drug => Drug.id != d.id));
                                
                            api.createNewOrder.orderQueriesCreateNewOrder({
                                buyerId: "James",
                                vendorId: d.sellerName
                            })
                        if (result == "FBI"){
                            setFbiWarning(true);
                            
                            api.deleteVendorAndVendorProducts.fbiQueriesDeleteVendorAndVendorProducts({
                                sellerId: d.sellerId
                            })
                            setTimeout(() => {
                                setFbiWarning(false)
                            }, 20000)
                            
                        } 
                        
                        })
                    }}
                    >Buy drug</button>

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