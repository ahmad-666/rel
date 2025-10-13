import CircularLoader from '.';

export default function CircularLoaderExample() {
    return (
        <div>
            <CircularLoader color='secondary' size={200} thickness={20} spaceOffset={50} animate className='mx-auto' />
            <CircularLoader
                color='secondary'
                value={50}
                size={200}
                thickness={20}
                spaceOffset={0}
                rotate={90}
                animate={false}
                className='mx-auto'
            >
                <p>text</p>
            </CircularLoader>
        </div>
    );
}
