import React from 'react'

const Todo = (params) => {

    const {value,status,todoid} = params.params

   


    return (
        <div>
            <div className="element">
                {/* <input className="element__check" type="checkbox" id="1" name="" /> */}
                <span className="element__text">{value}</span>
                <button onClick={() => params.deleteTodo(todoid)} className="element__delete"><i class="far fa-times-circle"></i></button>
            </div>
        </div>
    )
}

export default Todo
