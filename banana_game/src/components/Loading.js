import React from 'react'
import { Modal, Spinner } from 'react-bootstrap'
import { useStateContext } from '../context/ContextProvider'

const Loading = () => {
    const { isLoading } = useStateContext();

    if (!isLoading) {
        return null;
    }

    return (
        <>
            <div className='loading-overlay'>
                <Spinner animation="border" variant="primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        </>
    )
}

export default Loading;
