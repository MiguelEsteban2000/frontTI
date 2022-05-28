import { useState, useEffect } from "react"
const api=process.env.REACT_APP_URI;

export const Books=()=>{

    const[contacts,setcontacts]=useState([])

    const getUsers =async()=>
    {
        var res= await fetch(`${api}/libros`)
        var data =await res.json();
        console.log(data)
        setcontacts(data)
    }

    useEffect(()=>{
        getUsers();
    },[])

    console.log("Pruebita")
    return(
    <div>
                    <table className="table table-striped">
                <thead>
                    <tr >
                        <th>Nombre</th>
                        <th>publisher</th>
                        <th>autor</th>    
                        <th>pages</th>
                        <th>category</th>             
                    </tr>
                </thead>
                <tbody>
                {contacts.map((contact)=>
                    <tr key={contact.id} >
                        <td>{contact.name}</td>
                        <td>{contact.publisher}</td>
                        <td>{contact.autor}</td>
                        <td>{contact.pages}</td>
                        <td>{contact.category}</td>
                    </tr>
            )}
                </tbody>
            </table>
    </div> 
    )   
}