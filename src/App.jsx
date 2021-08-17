import React, { useEffect, useState } from "react";
import Alert from "./Alert";
import List from "./List";

const getLocalStorage = () =>{
  let list = localStorage.getItem('lists');
  if(list)
  {
    return JSON.parse(localStorage.getItem('lists'))
  }
  else{
    return []
  }
}

const App = () => {
  const [name, setName] = useState("");
  const [list,setList] = useState(getLocalStorage());
  const [isEditing,setIsEditing] = useState(false);
  const [editId,setEditId] = useState(null);
  const [alert,setAlert] = useState({show:false, msg:"", type:""});
  
  const showAlert = (show=false,msg="",type="") =>{
      setAlert({show,msg,type});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!name)
    {
        showAlert(true,"Enter Value","danger")
    }
    else if(name && isEditing){
      setList(list.map((item)=>{
        if(item.id === editId)
        {
          return {...item,title:name};
        }
        return item;
      }))
      setEditId(null);
      setIsEditing(false);
      setName("");
      showAlert(true,"Edited Successfully!!!","success")
    }
    else{
        const newItem = {id: new Date().getTime().toString(), title:name}
        setList([...list, newItem]);
        setName("");
        showAlert(true,"Item Added","success")  
    }
  };

  const editItem = (id) =>{ 
    const specificItem = list.find((item)=> item.id === id);
    console.log(specificItem);
    setIsEditing(true);
    setEditId(id);
    setName(specificItem.title);
  }
  const deleteItem = (id,title) =>{
    showAlert(true,`${title} Deleted`,"danger")
    setList(list.filter((item) => item.id !== id)); 
  }

  const clearAll = () =>{
    showAlert(true,"Cleared List!!!","danger");
    setList([]);
  }

  useEffect(()=>{
    localStorage.setItem('lists',JSON.stringify(list));
  },[list])

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        { alert.show && <Alert {...alert} removeAlert={showAlert}/>}
        <h3>grocery bud</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="e.g. eggs"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {
              isEditing ? 'edit' : 'submit'
            }
          </button>
        </div>
      </form>
      {
          list.length > 0 && (
              <div className="grocery-container">
                <List items={list} editItem={editItem} deleteItem={deleteItem}/>
              </div>
          )
      }
      <button className="clear-btn" onClick={clearAll}>Clear All</button>
    </section>
  );
};

export default App;
