import React, { useEffect, useState } from 'react'
import { Navbar } from '../ui/Navbar'
import {Calendar,momentLocalizer} from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { messages } from '../../helpers/calendar-message-es';
import { useDispatch, useSelector } from 'react-redux';

import 'moment/locale/es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { uiOpenModal } from '../../actions/ui';
import { eventClearActiveEvent, eventSetActive, eventStartLoading } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';
moment.locale('es');
const localizer = momentLocalizer(moment) // or globalizeLocalizer


const myEventsList = [{
    title:'Cumpleaños del jefe',
    start: moment().toDate(),
    end:moment().add(2,'hours').toDate(),
    bgcolor:'#fafafa',
    notes:'Comprar el pastel',
    user:{
        _id:'123',
        name:'Ezequiel'
    }
}]
export const CalendarScreen = () => {

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');
    const dispatch =  useDispatch();
    const {events,activeEvent} = useSelector(state => state.calendar);
    const {uid} = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(eventStartLoading());
    }, [dispatch])

    const onDoubleClick = (e)=>{
        dispatch(uiOpenModal());
    }
    const onSelectEvent = (e)=>{
       // console.log(e)
       dispatch(eventSetActive(e));
    }
    const onViewChange = (e)=>{
        //Cuando cambia la vista seteo en local storage
        setLastView(e);
        localStorage.setItem('lastView',e);
    }
    const eventStyleGetter=(event, start,end, isSelected)=>{


        const styles = {
            backgroundColor: (uid === event.user._id) ? '#367CF7':'#465660',
            borderRadius:'0px',
            opacity:0.8,
            display:'block',
            color:'white'
        }
        return {
            styles
        }
    };
    const onSelectSlot = (e)=>{
        //console.log(e); //Trae el Objecto de posicion fechas para realizar un nuevo Fix si quisiera
        dispatch(eventClearActiveEvent());
    }
    return (
        <div className="calendar-screen">
           <Navbar/>
           <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            messages={messages}
            eventPropGetter={eventStyleGetter}
            components={{
                event:CalendarEvent
            }}
            onDoubleClickEvent={onDoubleClick}
            onSelectEvent={onSelectEvent}
            onView={onViewChange}
            view={lastView}

            onSelectSlot={ onSelectSlot }
            selectable={ true }
            />

            <AddNewFab />
            {
                (activeEvent) &&
                    <DeleteEventFab/>
                
            }
            <CalendarModal/>
        </div>
    )
}
