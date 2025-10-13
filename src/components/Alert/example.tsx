import { useState } from 'react';
import Alert from '.';

export default function AlertExample() {
    const [show, setShow] = useState(true);

    return (
        <div>
            <button onClick={() => setShow(!show)}>toggle</button>
            <Alert
                show={show}
                onChange={(newVal) => setShow(newVal)}
                closable
                timeout={3000}
                color='success-lighten-5'
                closeColor='success'
                size='md'
            >
                <span className='text-success'>close alert</span>
            </Alert>
        </div>
    );
}
