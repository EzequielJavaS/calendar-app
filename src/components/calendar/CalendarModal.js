import React, { useState } from 'react';
import moment from "moment";
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import Swal from "sweetalert2";
import { useSelector, useDispatch } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';
import { aventAddNew } from "../../actions/events";

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

Modal.setAppElement('#root'); //hay que poner el elemeto raiz de React <div id="root"></div>

const now = moment().minutes(0).seconds(0).add(1,'hours'); //Seleccionamos la hora
const nowMoreOneHours = now.clone().add(1, 'hours');


export const CalendarModal = () => {

    const dispatch = useDispatch();

    //Mantendrá el estado del campo Fecha y Hora incial
    const [dateStart, setDateStart] = useState(now.toDate());
    const [dateEnd, setDateEnd] = useState(nowMoreOneHours.toDate());
    const [titleValid, setTitleValid] = useState( true );

    //Accedo al state de modalOpen para abrir o cerrar el modal
    const {modalOpen} = useSelector(state => state.ui);

    
    //Para trabajar con la información del formulario
    const [formValues, setFormValues] = useState({
        title: 'Evento',
        notes: '',
        start: now.toDate(),
        end: nowMoreOneHours.toDate()
    });

    //Extraigo los valores de notes y title. start y end
    const { notes, title, start, end} = formValues;

    const handleInputChange = ({ target} ) => { //Del evento que recibe solo me interesa el Target
        setFormValues({
            ...formValues,  //Quiero los valores que tenga formValues
            [target.name]:target.value //Solo cambio el name que me traiga el target al value que traiga al llamarlo
        })
    }
    const closeModal = ()=>{
        dispatch( uiCloseModal());
    }

    const handleStatDateChange= ( e)=>{ //Recibe el cambio de dateTimePicker. La es es la fecha 
        setDateStart( e );
        //Cambio el valor de dateStart en el formulario
        setFormValues({
            ...formValues,  //Quiero los valores que tenga formValues
            start: e
        })
        
    }
    const handleEndDateChange = ( e ) => {
        setDateEnd( e );
        setFormValues({
            ...formValues,  //Quiero los valores que tenga formValues
            end: e 
        })
    }

    const handleSubmitForm = ( e ) => {
        e.preventDefault();
        //Las fechas las tengo en instancias de date normal de JS, pero las necesitamos de moment
        const momenStart = moment( start );
        const momentEnd = moment (end );

        if ( momenStart.isSameOrAfter( momentEnd )){
            return Swal.fire('Error', 'La fecha de fin debe de ser mayor a la fecha de inicio', 'error');
        }

        if ( title.trim().length < 3) {
            //Creo un estado nuevo const [titleValid, setTitleValid] = useState( true )
            return setTitleValid( false ); //Cambio el estado
        }

        //TODO: Realizar gravación en base de datos
        dispatch( aventAddNew ({
            ...formValues, //Hay que enviar lo que ya tenemos
            id: new Date().getTime(),
        }));

    
        
        
        setTitleValid( true );
        closeModal()
    }

    return (
        <Modal
          isOpen={ modalOpen } //Muestra u oculta el modal
          onRequestClose={closeModal}//Marca la acción al cerrar el modal (clicar fuera)
          style={customStyles} //Estilo que hemos mostrado más arriba
          closeTimeoutMS={200} //ralentiza el cierre
          className="modal"//La clase moda y modal-fondo están definidas en styles.css
          overlayClassName="modal-fondo"//className que se aplicará a la superposición.
        >
            <h1> Nuevo evento </h1>
            <hr />
            <form
                className="container"
                onSubmit={ handleSubmitForm }
            >
                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker
                        onChange={ handleStatDateChange }
                        value={ dateStart }
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker
                        onChange={ handleEndDateChange }
                        value={ dateEnd }
                        minDate={ dateStart} //No permite una fecha inferior
                        className="form-control"
                    />
                </div>


                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input 
                        type="text" 
                        className={`form-control ${!titleValid && 'is-invalid'}`}
                        placeholder="Título del evento"
                        name="title"
                        value={ title }
                        onChange={ handleInputChange }
                        autoComplete="off"
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={ notes }
                        onChange={ handleInputChange }
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>

        </Modal>
    )
}
