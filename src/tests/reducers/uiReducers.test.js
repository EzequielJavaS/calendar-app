import { uiReducer } from "../../reducers/uiReducers"
import { types } from "../../types/types";
import { uiOpenModal, uiCloseModal } from "../../actions/ui";

const initialState = {
    modalOpen: false
}
describe('Pruebas en el uiReducers', () => {

    test('debe de retornar el estado por defecto', () => {
        const state = uiReducer( initialState, {});
        expect(state).toEqual(initialState); 
    })
    test('debe de abrir y cerrar el modal ', () => {

        const modalOpen = uiOpenModal();// modalOpen tomaría el valor de { type: types.uiOpenModal} a través de la acción uiOpenModal()
        const state = uiReducer( initialState, modalOpen );

        expect(state).toEqual( {modalOpen: true});

        const modalClose = uiCloseModal();
        const stateClose = uiReducer( state, modalClose );

        expect(stateClose).toEqual( {modalOpen: false});
    })  
})
