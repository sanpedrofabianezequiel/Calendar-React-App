import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { eventDeleted } from '../../actions/events';

export const DeleteEventFab = () => {
    const state = useSelector(state => state.state)
    const dispatch = useDispatch();
    const handleDelete = ()=>{
        dispatch(eventDeleted());//En el reducer ya esta validado que el id que recibe se comapra con el id del STATE  actual para eliminar
        // que el reducer realiza un filter por ID
       /* events: state.events.filter(
            item => (item.id === state.activeEvent.id)
        ),*/
    }

    return (
        <button className="btn btn-danger fab-danger" onClick={handleDelete}>
            <i className="fas fa-trash"></i>
            <span>Borrar evento</span>
        </button>
    )
}
