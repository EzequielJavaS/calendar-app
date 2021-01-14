import { fetchSinToken, fetchConToken } from "../../helpers/fetch";

describe('Pruebas en el Hepers Fetch', () => {
    let token = '';
    test('fetchSinToken debe de funcionar ', async () => {
       
        const resp = await fetchSinToken('auth', {email: 'diana@gmail.com', password: '123456'}, 'POST');

        expect( resp instanceof Response ).toBe( true ); 

        const body = await resp.json();
        expect( body.ok ).toBe( true );

        token = body.token;
    })

    test('fetchConToken debe funcionar ', async() => {
        //Guardo el token en el localStorage
        localStorage.setItem('token', token );

        //En el endpoid pongo un id de mongo para eliminar eventos. Da igual que no exita. Esperaré que en evento no existe
        const resp = await fetchConToken('events/5fe766c3f30b4f0e1dfd1b4d', {}, 'DELETE');
        const body = await resp.json();

        expect(body.msg).toBe('Evento no existe por ese id');   
    })
    
})
