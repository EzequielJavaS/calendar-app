import React from 'react'

export const NavBar = () => {
    return (
        <div className="navbar navbar-dark bg-dark mb4">
            <span className="navbar-brand"> Eva </span>
            <button className="btn btn-outline-danger">
                <i className="fas fa-sign-out-alt"></i>
                <span> Salir</span>
            </button>
            
        </div>
    )
}
