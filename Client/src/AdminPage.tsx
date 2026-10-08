import {useEffect, useState} from "react";
import {Api, type Category} from "@/api/Api.ts"
import "./index.css"
const api = new Api();

export function AdminPage(){
    const [categories, setCategories] = useState<Category[]>([])
    const [categoryNameToCreate, setCategoryNameToCreate] = useState("");
    
    useEffect(() => {
        api.getAllCategories.categoryQueriesGetAllCategories()
            .then(r => {
                setCategories(r)
            })
    }, [])
    return ( 
        <>
            <h1>All categories</h1>
            <div className="ProductsContainer">
            {categories.map((c) => (
                <>
                    <div className="Products">
                    <h2>{c.categoryName}</h2>
                    <button className="DeleteCategoryButton" onClick={() => {
                        api.deleteCategory.categoryQueriesDeleteCategory({
                            categoryId: c.id
                        }).then(() => {
                            setCategories(currentCategories => currentCategories.filter(Category => Category.id != c.id))
                        })
                        
                    }}>Delete category</button>
                        <br/>
                        <br/>
                        <br/>
                    </div>
                </>
                
            )) }
            </div>
            
            <h1>Add a new category</h1>
            <div className="Products">
                <>
                    <br/>
                    <label>Category name</label>
                    <br/>
                    <input className="InputFieldAddCategory" onChange={(e) => setCategoryNameToCreate(e.target.value)} value={categoryNameToCreate} />
                    <br/>
                    <br/>
                    <button className="btnAddCategory" onClick={() => {
                        api.postCategory.categoryQueriesPostCategory({
                            categoryName: categoryNameToCreate
                        })
                            .then(() => {
                                api.getAllCategories.categoryQueriesGetAllCategories()
                                    .then(r => {
                                    setCategories(r)
                                })
                                setCategoryNameToCreate("");
                            })
                    }}>Add category</button>
                    <br/>
                    <br/>
                    <br/>
                </>
            </div>
        </>
    )
}