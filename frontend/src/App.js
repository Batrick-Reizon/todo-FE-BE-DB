import { useEffect, useState } from "react"
import axios from "axios"

function App()
{
    const [einput,seteinput] = useState("")
    const [fruits,setfruits] =useState([""])

    const API = process.env.REACT_APP_API_URL

    const handleinput = (event) =>
    {
        seteinput(event.target.value)
    }

    useEffect(() =>
    {
        var fruitslist = axios.get(`${API}/fruitslist`)
        fruitslist.then((data) =>
            {
                setfruits(data.data)
            })
            .catch((err) =>
                {
                    console.log("Failed to show Fruitlist", err)
                }
            )
    },[API]
    )
    
    // Fruit Add
    const handleadd = () =>
    {
        if(!einput.trim()){
            alert("Enter any task to add todo list")
            return
        }

        var addfruit = axios.post(`${API}/addfruit`, {newfruit:einput})
        addfruit.then((res) =>
        {
            setfruits([...fruits,res.data])
            seteinput("")
        })
    }

    // Delete Fruit
    const handleremove = (id) =>
    {
        var removefruit = axios.delete(`${API}/deletefruit/${id}`)
        removefruit.then(() =>
        {
            setfruits(fruits.filter((res) =>
            {
                return(res._id !== id)
            }))
        })
    }

    return(
        <div className="flex h-screen items-center justify-center bg-gradient-to-r from-amber-200 to-yellow-400">
            <div className="bg-gradient-to-r from-slate-300 to-slate-500 w-[90%] sm:w-[70%] md:w-[60%] lg:w-1/3 text-center rounded shadow-black shadow-lg p-5">
                <h1 className="text-xl md:text-2xl lg:text-3xl font-black m-3">Todo List</h1>
                <p className="m-2 font-medium text-lg">Please enter any activities to add todo list</p>
                <input type="text" value={einput} onChange={handleinput} className="border-2 border-black rounded p-1 outline-none w-[50%]" placeholder="Enter Fruit Name"></input>
                <button onClick={handleadd} className="m-1 bg-black text-white p-1 rounded">Add Fruit</button>
                {
                    fruits.map((item,index) =>
                    {
                        return(<div key={index} className="flex justify-evenly items-center my-3 border-b-2 border-black">
                            <h1 className="text-base md:text-xl lg:text-2xl font-black m-3">{index+1}. {item.name}</h1>
                            <button onClick={() => handleremove(item._id)} className="text-base md:text-lg lg:text-xl bg-red-500 px-3 py-1 rounded">Delete</button>
                        </div>)
                    })
                }
            </div>
        </div>
    )
}

export default App