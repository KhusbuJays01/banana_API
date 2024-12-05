import {memo,Fragment} from 'react'

//react-bootstrap
import {Row,Col} from 'react-bootstrap'

//recat-router
import { Link } from 'react-router-dom'

//componets
import Card from '../../bootstrap/card'

 const HeaderBread = memo(() => {
     return(
         <Fragment>
            <Row>
                <Col md="12">
                    <Card>
                        <Card.Body className="d-flex justify-content-between align-items-center">
                            <div className="card-title mb-0">
                                <h4 className="mb-0">Calender</h4>
                            </div>
                            <div className="card-action">
                                <Link to="#" className="btn btn-primary" role="button">Back</Link>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    )
})
HeaderBread.displayName="HeaderBread"
export default HeaderBread