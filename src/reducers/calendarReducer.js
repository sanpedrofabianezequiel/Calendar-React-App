import moment from "moment";
import { types } from "../types/types";

const initialState = {
    events: [{
        id: new Date().getTime(),
        title:'Cumpleanos del jefe',
        start:moment().toDate(),
        end:moment().add(2,'hours').toDate(),
        bgcolor:'#fafafa',
        notes:'Comprar el pastel',
        user:{
            _id:'123',
            name:'Ezequiel'
        }
    }],
    activeEvent:null
}

export const calendarReducer = (state = initialState, action)=>{
    switch (action.type) {  
        case types.eventSetActive:
            return {
                ...state,
                activeEvent:action.payload
            }  
        case types.eventAddNew:
            return {
                ...state,
                events : [...state.events, action.payload]
            }
        case types.eventClearActiveEvent:
            return {
                ...state,
                activeEvent:null
            }
        case types.eventUpdated:
            return {
                ...state,
                events: state.events.map(
                    item => (item.id === action.payload.id)
                    ? action.payload
                    : item
                )
            }
        case types.eventDeleted://activeEvent.id => se genera cuando seleccionamos sobre la nota, es el mismo state.
        // retornamos todos menos ese id en escpecifico, y dejamos la nota INACTIVA
            return {
                ...state,
                events: state.events.filter(
                    item => (item.id !== state.activeEvent.id)
                ),
                activeEvent:null
            }
        case types.eventLoaded:
            return {
                ...state,
                events:[...action.payload]
            }
        case types.eventLogout:
            return {
                ...initialState
            }
        default:
            return state;
    }
}

