import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';
import { eventAddNew, eventClearActiveEvent, eventStartAddNew, eventStartUpdate, eventUpdated } from '../../actions/events';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

Modal.setAppElement('#root');

const startNow =  moment().minutes(0).seconds(0).add(1,'hours');
const endNow   =  startNow.clone().add(1,'hours');

const initEvent = {
  title:'',
  notes:'',
  start:startNow.toDate(),
  end:endNow.toDate()
}

export const CalendarModal = () => {

    const dispatch  =  useDispatch();
    const {modalOpen} = useSelector(state => state.ui);
    const {activeEvent} = useSelector(state => state.calendar);
    console.log('Proyecto de modal ' + modalOpen)
    const [dateStart, setDateStart] = useState(startNow.toDate());
    const [dateEnd, setDateEnd] = useState(endNow.toDate());
    const [titleValid, setTitleValid] = useState(true);

    const [formValues, setFormValues] = useState(initEvent);

    const {title,notes} = formValues;

    useEffect(() => {
      if(activeEvent){
        setFormValues(activeEvent);//Si la nota tiene valores los voy a mostrar
      }else{
        setFormValues(initEvent); //Si la nota no tiene valor, carga el valor por defecto.
      }
    }, [activeEvent,setFormValues ])



    const handleInputChange = ({target})=>{
      setFormValues({
        ...formValues,
        [target.name] :target.value
      });
    }
    const handleSubmitForm = (e)=>{
      e.preventDefault();
      //console.log(formValues);
      //La idea es pasar el date de JS  a MOMENT
      const momentStart = moment(formValues.start);
      const momentEnd = moment(formValues.end);
      if( momentStart.isSameOrAfter(momentEnd)){
        return Swal.fire('Error', 'La fecha fin debe ser mayor a la fecha de inicio','error');
      };
      if(title.trim().length < 2){
        return setTitleValid(false);
      }

      if(activeEvent){
        //Actualizamos una Nota segun si este dispatch tiene informacion o no
        dispatch(eventStartUpdate(formValues));
      }else{
        dispatch(eventStartAddNew(formValues))
      }

      setTitleValid(true);
      closeModal();
    }
    const closeModal = ()=>{
      dispatch(uiCloseModal());
      dispatch(eventClearActiveEvent());
      setFormValues(initEvent);
    };
    const handleStartDateChange =(e)=>{
      setDateStart(e);
      setFormValues({
        ...formValues,
        start:e
      })
    }
    const handleEndDateChange = (e) =>{
      setDateEnd(e);
      setFormValues({
        ...formValues,
        end:e
      })
    }

    return (
      <Modal
        isOpen={modalOpen}
        //onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        //contentLabel="Example Modal"
        closeTimeoutMS={200}
        className="modal"
        overlayClassName="modal-fondo"
      > 
        <h1>{ (activeEvent) ? 'Editar evento':'Nuevo Evento'} </h1>
          <hr />
          <form className="container" onSubmit={handleSubmitForm}>

              <div className="form-group">
                  <label>Fecha y hora inicio</label>
                  <DateTimePicker
                    onChange={handleStartDateChange}
                    value={dateStart}
                    className="form-control"
                  />
              </div>

              <div className="form-group">
                  <label>Fecha y hora fin</label>
                  <DateTimePicker
                    onChange={handleEndDateChange}
                    value={dateEnd}
                    minDate = {dateStart}
                    className="form-control"
                  />
              </div>

              <hr />
              <div className="form-group">
                  <label>Titulo y notas</label>
                  <input 
                      type="text" 
                      className= {`form-control  ${ !titleValid && 'is-invalid'}`}
                      placeholder="Título del evento"
                      name="title"
                      value={title}
                      onChange={handleInputChange}
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
                      value={notes}
                      onChange={handleInputChange}
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
