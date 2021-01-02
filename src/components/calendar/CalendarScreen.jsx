import React, { useState, useEffect } from 'react';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import { NavBar } from '../ui/NavBar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { messages } from "../../helpers/calendar-messages-es";
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector} from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { aventSetActive, eventClearActiveEvent, eventStartLoading } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

moment.locale('es');

//Configure el localizador proporcionando el objeto de moment (o globalize) al localizador correcto.
const localizer = momentLocalizer(moment);

// const events = [{
//     title: 'Cumpleaños del jefe',
//     start: moment().toDate(), //new Date()
//     end: moment().add(2, 'hours').toDate(),
//     bgcolor: '#fafafa',
//     notas: 'Comprar el pastel',
//     user:{
//         _id: '123',
//         name: 'Ezequiel'
//     }
// }]

export const CalendarScreen = () => {
    //Creo el estado para saber dónde abrir la aplicación:
    //Coge el valor del localStorage y si no hay coge 'month'
    const [lastView, setLastView] = useState(localStorage.getItem('lasView')||'month')
    const dispatch = useDispatch();
    const {events, activeEvent} = useSelector(state => state.calendar);
    const {uid} = useSelector(state => state.auth);

    
    //leer del store los eventos
    useEffect(() => {
        dispatch( eventStartLoading() )
    }, [dispatch])
   
    const onDoubleClick = (e) =>{
        //Ejecuto la acción para actival el modal
        dispatch( uiOpenModal());
    }

    const onSelectEvent = (e) =>{
        //Hace que el evento sea el evento activo
        dispatch( aventSetActive ( e ) );
    }

    const onViewChange = (e) =>{
        setLastView(e); //Llamo al useState.
        //Guardo el (e) en el localStorage (week, day, month. agenda)
        localStorage.setItem('lasView', e);
    }

    const onSelectSlot = (e) => {
        //Desactiva el evento y elimina el botón de borrar
        dispatch( eventClearActiveEvent());
    }

    const eventStyleGetter = ( event, start, end, isSelected )=>{ //En estos parámetros están todas las propiedades de los eventos
        //Lo que sea que regrese esta función, será el estilo de aplicará a ese evento en particular

        const style = {
            backgroundColor: ( uid === event.user._id) ? '#367CF7': '#465660',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }
        return {
            style
        }
    };

    return (
        <div className="calendar-screen">
            <NavBar />
            <Calendar  //Componente BigCalendar
                localizer={localizer} //Es el que tenemos arriba
                events={events} //Es una lista de eventos
                startAccessor="start"
                endAccessor="end"
                messages={messages}
                eventPropGetter={eventStyleGetter}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelectEvent}
                onView={ onViewChange }
                onSelectSlot={ onSelectSlot }
                selectable={ true }
                view={lastView}
                components={{
                    event: CalendarEvent
                }}
            />
            <AddNewFab />
            
            {/* Activo el botón si hay un Evento activo */}
            {( activeEvent ) && <DeleteEventFab />}

            <CalendarModal />
        </div>
    )
}
