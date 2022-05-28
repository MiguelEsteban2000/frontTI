import { useState, useEffect } from "react"
const api=process.env.REACT_APP_URI;

export const Contacts=()=>{

    const[name,setName]=useState('')
    const[number,setNumber]=useState('')
    const[contacts,setcontacts]=useState([])
    const[edit,setEdit]=useState(false)
    const[id,setId]=useState(0)


    const handledSubmit=async(e)=>
    {
        e.preventDefault();
        
        if(!edit)
        {
            const res=await fetch(`${api}/autores`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    id,
                    name,
                    number,
                })
            })
            await getUsers();
        }
        else
        {
            const res=fetch(`${api}/autores`,{
                method:'PUT',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    id,
                    name,
                    number,
                })
            })
            setEdit(false);
            setId(0);
            await getUsers();
            
        }
        await getUsers();
        setName('');
        setNumber('');
    }

    const getUsers =async()=>
    {
        var res= await fetch(`${api}/autores`)
        var data =await res.json();
        console.log(data)
        data.shift()
        setcontacts(data)
    }

    const editContact=async(id)=>
    {
        const res =await fetch(`${api}/autores/${id}`)
        const data= await res.json();
        setId(id);
        setEdit(true);
        setName(data.name)
        setNumber(data.number)
    }

    const deleteContact= async (id)=>
    {
        const response =window.confirm('¿ Seguro ?')
        if(response)
        {
        const res=await fetch(`${api}/autores/${id}`,{
            method:'DELETE'
        });
        await res.json();
        console.log(res)
        await getUsers();
        }
    }

    useEffect(()=>{
        getUsers();
    },[])

    return(
    <div className="row">
        <div className="col-md-4">
            <form onSubmit={handledSubmit} className="card card-body">

                <div className="form-group">
                    <input 
                    type="text" 
                    onChange={e=>setName(e.target.value)} 
                    value={name}
                    className="form-control"
                    placeholder="Name"
                    autoFocus
                    />
                </div>

                <div className="form-group">
                    <input 
                    type="text" 
                    onChange={e=>setNumber(e.target.value)} 
                    value={number}
                    className="form-control"
                    placeholder="Number"
                    />
                </div>
                <button className="btn btn-primary btn-block">
                    {
                        edit ? 'Edit' :'Create'
                    }
                </button>
            </form>
        </div>
        <div className="col md-8">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Number</th>
                        <th>Operations</th>                  
                    </tr>
                </thead>
                <tbody>
                {contacts.map((contact)=>
                    <tr key={contact.id} >
                        <td>{contact.name}</td>
                        <td>{contact.number}</td>
                        <td>
                        <button className="btn btn-secondary btn-sm btn-block"
                        onClick={e=> editContact(contact.id)}
                        >Edit
                        </button>

                        <button className="btn btn-danger btn-sm btn-block"
                        onClick={()=>deleteContact(contact.id)}                   
                        >Delete
                        </button>
                        </td>
                    </tr>
            )}
                </tbody>
            </table>
        </div>
        </div>
    )
}