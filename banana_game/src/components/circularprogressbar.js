import {memo,Fragment} from 'react'
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';

//CircularProgressbarsccss
import 'react-circular-progressbar/dist/styles.css';

const Circularprogressbar = memo((props) => {
    return (
        <Fragment>
            <div style={props.style}>
                <CircularProgressbarWithChildren styles={{
                    width:props.width,
                    height:props.height,
                    trail:{
                        strokeWidth:props.strokewidth,
                        stroke:props.trailstroke,
                    },
                    path:{
                        stroke:props.stroke,
                        strokeLinecap:props.Linecap,
                    }
                }} value={props.value} id={props.id} className={props.className} >
                    {props.children}
                </CircularProgressbarWithChildren>
            </div>
        </Fragment>
    )
})

Circularprogressbar.displayName="Circularprogressbar"
export default Circularprogressbar
