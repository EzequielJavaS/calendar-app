import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { startLogin, startRegister, startCheking, startLogout} from '../../actions/auth';
import { types } from '../../types/types';
import Swal from 'sweetalert2';
import * as fetchModule from '../../helpers/fetch';

//Cuando se llama al sweetAlert devuelve un objeto, de ahí el callback devolviendo el objeto: 
jest.mock('sweetalert2', ()=> ({
    fire: jest.fn()
}));

const middlewares = [thunk]; //Ponemos aquí el middleware que estamos utilizando
const mockStore = configureStore(middlewares); //Esto es una función que permite crtearme un store

//Creo el store
const initState = {}; //Hacemos que el estado inicial sea un objeto vacío
let store = mockStore(initState);

Storage.prototype.setItem = jest.fn() //Estamos simulando la llamada a una función.
Storage.prototype.clear = jest.fn() //Estamos simulando la llamada a una función.



describe('Pruebas en las acciones de Auth', () => {

    beforeEach( () => { //Reinicializamos todas las acciones que el store haya ejecutado
        store = mockStore( initState );
        jest.clearAllMocks();
    });

    test('startLogin correcto ', async () => {
        //Simula la activación de dispatch enviando la información necesaria.
        await store.dispatch( startLogin('diana@gmail.com','123456'));
        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: types.authLogin,
            payload: {
                uid: expect.any(String),
                name: expect.any(String)
            }
        })

        expect( localStorage.setItem ).toHaveBeenCalledWith('token', expect.any(String));
        expect( localStorage.setItem ).toHaveBeenCalledWith('token-init-date', expect.any(Number));

        // let token = localStorage.setItem.mock.calls[0][1];
        // console.log(localStorage.setItem.mock.calls[0][1]);
    })

    test('startLogin incorrecto ', async() => {
        //Simula la activación de dispatch enviando la información incorrecta. El password no es correcto
        await store.dispatch( startLogin('diana@gmail.com','654321'));
        let actions = store.getActions();

        //Debemos esperar un array vacío
        expect(actions).toEqual([]);
        expect(Swal.fire).toHaveBeenCalledWith("Error", "Password incorrecto", "error");

        await store.dispatch( startLogin('dia@gmail.com','123456'));
        actions = store.getActions();

        expect(actions).toEqual([]);
        expect(Swal.fire).toHaveBeenCalledWith("Error", "No existe usuario con ese email", "error");
    })

    test('startRegister Correcto ', async() => {
        //debe devolver el json en el que simula la respuesta
        fetchModule.fetchSinToken = jest.fn(()=> ({
            json(){
                return{
                    ok: true,
                    uid: '123',
                    name: 'Rigoberto',
                    token: 'hfg1234'
                }   
            } 
        }));
        await store.dispatch( startRegister('test2@gmail.com','654321', 'test2'));
        let actions = store.getActions();
      
        expect( actions[0] ).toEqual({ 
            type: types.authLogin,
            payload: { uid: '123', name: 'Rigoberto' }
        })

        expect( localStorage.setItem ).toHaveBeenCalledWith('token', 'hfg1234');
        expect( localStorage.setItem ).toHaveBeenCalledWith('token-init-date', expect.any(Number));   
    })

    test('Prueba startCheking ', async() => {

        fetchModule.fetchConToken = jest.fn(()=> ({
            json(){
                return{
                    ok: true,
                    uid: '123',
                    name: 'Rigoberto',
                    token: 'hfg1234'
                }   
            } 
        }));

        await store.dispatch( startCheking() );
        const actions = store.getActions();

        expect(actions[0]).toEqual( {
            type: types.authLogin,
            payload:{
                uid: '123',
                name: 'Rigoberto'
            }

        });

        expect( localStorage.setItem ).toHaveBeenCalledWith( 'token', 'hfg1234');

    })

    test('prueba startLogout ', async() => {

        await store.dispatch( startLogout() );
        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.authLogout
        })
        expect( localStorage.clear ).toBeCalled;
    })
})
