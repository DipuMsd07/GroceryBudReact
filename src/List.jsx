import React from 'react'
import {FaEdit,FaTrash} from '../node_modules/react-icons/fa';

const List = ({items,editItem,deleteItem}) =>{
    return(
        <div className="grocery-list">
            {
                items.map(({id,title})=>{
                    return <article className="grocery-item" key={id}>
                        <p className="title">{title}</p>
                        <div className="btn-container">
                            <button type="button" className="edit-btn" onClick={()=> editItem(id)}>
                                <FaEdit/>
                            </button>
                            <button type="button" className="delete-btn" onClick={()=> deleteItem(id,title)}>
                                <FaTrash/>
                            </button>
                        </div>
                    </article>
                })
            }
        </div>
    )
}

export default List;