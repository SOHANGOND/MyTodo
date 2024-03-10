import React from 'react';
import "./todo.css";

const getLocalStorage = () => {
    const list = localStorage.getItem("myTodo");
    if (list) {
        return JSON.parse(list);
    }
    else {
        return [];
    }
}
const Todo = () => {
    const [inputData, setInputData] = React.useState("");
    const [items, setItems] = React.useState(getLocalStorage());
    const [isEdited, setIsEdited] = React.useState("");
    const [toggleButton, setToggleButton] = React.useState(false);
    
    //adding items
    const addItem = () => {
        if (!inputData) {
            alert("Please fill the data");
        }
        else if (inputData && toggleButton) {
            setItems(items.map((curEle) => {
                if (curEle.id === isEdited) {
                    setToggleButton(false);
                    setInputData("");
                    return {...curEle,name:inputData}
                }
                else {
                    return curEle;
                }
                    
            }))
        }
        else {
            const myNewData = {
                 id:new Date().getTime().toString(),
                name:inputData
            }
            setItems([...items, myNewData]);
            setInputData("");
            setToggleButton(false);
        }
    };

    // edit items function
    const editItem = (index) => {
        const get = items.find((curEle) => {
            return curEle.id === index;
        });
        setIsEdited(index);
        setInputData(get.name);
        setToggleButton(true);
    };
   
    //deleteItems   function
    const deleteItem = (index) => {
        const updatedItems = items.filter((curEle) => {
            return curEle.id !== index;
          })

        setItems(updatedItems);
    }



    //removeAll
    const removeAll = () => {
        setItems([]);
    }
    

    // adding local storage in react.js
    React.useEffect(() => {
        localStorage.setItem("myTodo", JSON.stringify(items))
    });
    return (
        <>
            <div className="todo">
                <div className="container">
                    <img src="./icon.png" alt="" className='icon' />
                    <figcaption>Add Your List Here</figcaption>
                    <div className="inputContainer">
                        <input type="text" name="" id="" className='itemName' placeholder='✍️ Add items'
                        
                            value={inputData}
                            onChange={(event)=>setInputData(event.target.value)}
                        />
                        {toggleButton ?<img src="./edit.png" alt="" className='plus' onClick={(addItem) } />:
                            <button className="add"><img src="./plus.png" alt="" className='plus'
                                onClick={addItem}
                            /></button>  }

                    </div>
                    <div className="showTodo">
                        {items.map((curEle) => {
                            return (
                                <div className="eachTodo" key={curEle.id}>
                                    <h3>{curEle.name}</h3>
                                    <div className='iconPosition'>
                                    <img src="./edit.png" alt="" className='plus' onClick={()=>editItem(curEle.id)} />
                                    <img src="./delete.png" alt="" className='plus' onClick={()=>deleteItem(curEle.id)} />
                                    </div>
                        </div>
                            )
                            
                        })}
                       
                      </div>

                    <div className="showItem">
                        <button className="showButton" onClick={removeAll}>Check List</button>
                   </div>
                </div>
            </div>
        </>
    );
}

export default Todo;
