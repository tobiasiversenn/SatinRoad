import {useEffect, useState} from "react";
import {Api, type User} from "@/api/Api.ts";

const api = new Api();
export function HomePage(){
    const [users, setUsers] = useState<User[]>([])
        
    useEffect(() => {
        api.getUsersWithMoreThan100Orders.orderQueriesGetUsersWithMoreThan100Orders()
            .then(r => setUsers(r))
    }, [])


    return (
        <>
        <h3>Feautered vendors who have sold more than 100 orders:</h3>
            <div className="ProductsContainer">

                {users.map((u) => (
                    <>
                        <div className="Products">
                            <h3>{u.username}</h3>
                        </div>
                    </>
                    
                    ))}

                
                
                
            <div className="Products">
                <h3>Martin</h3>
                <h3>Total orders: 213</h3>
            </div>

                <div className="Products">
                    <h3>Kimmy</h3>
                    <h3>Total orders: 192</h3>
                </div>

                <div className="Products">
                    <h3>Michael</h3>
                    <h3>Total orders: 149</h3>
                </div>

                <div className="Products">
                    <h3>Jimmy</h3>
                    <h3>Total orders: 122</h3>
                </div>

                <div className="Products">
                    <h3>Sophia</h3>
                    <h3>Total orders: 122</h3>
                </div>

                <div className="Products">
                    <h3>David</h3>
                    <h3>Total orders: 109</h3>
                </div>

                <div className="Products">
                    <h3>Mary</h3>
                    <h3>Total orders: 103</h3>
                </div>

                <div className="Products">
                    <h3>Anna</h3>
                    <h3>Total orders: 100</h3>
                    </div>
                
                
            </div>
        </>
            

    )
}