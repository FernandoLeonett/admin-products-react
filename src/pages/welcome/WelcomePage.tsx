import React from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useProducts } from '../../context/context'
import routes from '../../routers/routes'

const WelcomePage = () => {





    const { user } = useProducts()





    return (
        <>
            <div>Bienvenido {user.email}</div>
            <Link to={routes.home}>Empezar</Link>
        </>
    )
}

export default WelcomePage