import moment from 'moment' //moment nos ayuda a trabajar con las fechas

export const prepareEvents = ( events = [])=> {
    //Retorna un objeto el array con los objetos destructurados pero modificando en end y el start de cada uno de ellos
    return events.map(
        (e) => ({
            ...e,
            end: moment (e.end).toDate(), //moment lee el string e.end y lo convierte en Date
            start: moment (e.start).toDate(),
        })
    );
}