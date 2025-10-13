import LinearLoader from '.';

export default function LinearLoaderExample() {
    return (
        <div>
            <div className='w-[300px]'>
                <LinearLoader animate={false} value={50} size={10} className='rounded bg-slate-200' />
            </div>
            <div className='w-[300px]'>
                <LinearLoader animate size={6} className='rounded bg-slate-200' />
            </div>
        </div>
    );
}
