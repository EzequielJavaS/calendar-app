import React from 'react'

export const CalendarEvent = ({ event }) => {
    const { title, user } = event; //Destructuro el event
    return (
        <div>
            <strong>{ title }</strong>
            <span> - { user.name }</span>
        </div>
    )
}
