import React, { useState } from 'react';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import { NavBar } from '../ui/NavBar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { messages } from "../../helpers/calendar-messages-es";
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';

moment.locale('es');

//Configure el localizador proporcionando el objeto de moment (o globalize) al localizador correcto.
const localizer = momentLocalizer(moment);

const events = [{
    title: 'Cumpleaños del jefe',
    start: moment().toDate(), //new Date()
    end: moment().add(2, 'hours').toDate(),
    bgcolor: '#fafafa',
    notas: 'Comprar el pastel',
    user:{
        _id: '123',
        name: 'Ezequiel'
    }
}]

export const CalendarScreen = () => {
    //Creo el estado para saber dónde abrir la aplicación:
    //Coge el valor del localStorage y si no hay coge 'month'
    const [lastView, setLastView] = useState(localStorage.getItem('lasView')||'month')

    const onDoubleClick = (e) =>{
        console.log('DOBLE CLICK');
    }

    const onSelectEvent = (e) =>{
        console.log('SELECCIÓN');
    }

    const onViewChange = (e) =>{
        setLastView(e); //Llamo al useState.
        //Guardo el (e) en el localStorage (week, day, month. agenda)
        localStorage.setItem('lasView', e);
        
    }

    const eventStyleGetter = ( even, start, end, isSelected )=>{ //En estos parámetros están todas las propiedades de los eventos
        //Lo que sea que regrese esta función, será el estilo de aplicará a ese evento en particular
        const style = {
            backgroundColor: '#367CF7',
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
                view={lastView}
                components={{
                    event: CalendarEvent
                }}
            />
            <CalendarModal />
        </div>
    )
}
