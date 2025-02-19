import React from 'react'
import { useParams } from 'react-router-dom'

const DetailsProduct = () => {
    const { pid } = useParams()
    return (
        <div>
            {pid}
        </div>
    )
}

export default DetailsProduct
