import React, { useState } from 'react'
import { Navbar } from '../ui/Navbar'
import {Calendar,momentLocalizer} from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { messages } from '../../helpers/calendar-message-es';


import 'moment/locale/es';
import { CalendarEvent } from './CalendarEvent';
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

    const onDoubleClick = (e)=>{
        console.log(e);
    }
    const onSelectEvent = (e)=>{
        console.log(e);
    }
    const onViewChange = (e)=>{
        //Cuando cambia la vista seteo en local storage
        setLastView(e);
        localStorage.setItem('lastView',e);
    }

    const eventStyleGetter=(event, start,end, isSelected)=>{
        const styles = {
            backgroundColor:'#367CF7',
            borderRadius:'0px',
            opacity:0.8,
            display:'block',
            color:'white'
        }
        return {
            styles
        }
    };
    return (
        <div className="calendar-screen">
           <Navbar/>
           <Calendar
            localizer={localizer}
            events={myEventsList}
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
            />
        </div>
    )
}
