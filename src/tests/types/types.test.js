import { types } from "../../types/types"

describe('Pruebas en Types', () => {
    test('El objeto de types debe ser igual a esto', () => {
        expect( types ).toEqual({
            uiOpenModal: '[ui] Open modal',
            uiCloseModal: '[ui] Close modal',
        
            eventSetActive: '[event] Set Active',
            eventStartAddNew: '[event] Start add new',
            eventAddNew: '[event] Add new',
            eventClearActiveEvent: '[event] Clear active event',
            eventUpdated: '[event] Event updated',
            eventDeleted: '[event] Event deleted',
            eventLoaded: '[Event] Events loaded',
            eventLogout: '[Event] Event logout',
        
            authCheking: '[auth] Checking login state',
            authChekingFinish: '[auth] Finish Checking login state',
            authStartLogin: '[auth] Start login',
            authLogout: '[auth] Logout',
            authLogin: '[auth] Login',
            authStartTokenRenew: '[auth] Start token renew',
            authStartLogout: '[auth] Start logout',
        
            regiStartRegister: '[regi] Start register',
        }) 
    })
})
