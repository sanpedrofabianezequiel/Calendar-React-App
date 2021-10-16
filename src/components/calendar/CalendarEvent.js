import React from 'react'

export const CalendarEvent = ({event}) => {
    //console.log("%c",event,"color:red");
    const  {title,user}=event;
    return (
        <div>
            <strong>{title}</strong>
            <strong>- {user.name}</strong>
        </div>
    )
}
