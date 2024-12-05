import React, { useEffect, useState } from 'react'
import axiosClient from '../axios'
import { Container } from 'react-bootstrap';
import { useStateContext } from '../context/ContextProvider';

const History = () => {

    const [data, setData] = useState([]);

    const { currentUser } = useStateContext();

    const dayjs = require('dayjs');
    const relativeTime = require('dayjs/plugin/relativeTime');
    dayjs.extend(relativeTime);

    useEffect(() => {
        axiosClient.get(`/history/${currentUser.id}`)
            .then((response) => {
                console.log(response.data.data);
                setData(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    return (
        <Container>

            <table className="table table-striped bg-white">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>User Name</th>
                        <th>Score</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{currentUser.name}</td>
                            <td>{item.score}</td>
                            <td>{dayjs().to(dayjs(item.created_at))}</td>
                            {/* <td>{dayjs(item.created_at).format('MMMM DD, YYYY [at] HH:mm:ss')}</td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </Container>
    )
}

export default History;
