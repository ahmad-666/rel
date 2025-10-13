// Helps to create Loading UI with React Suspense.
//! If we want better SEO and we want to still load page even with disabled js
export default function Loading() {
    return (
        <div className='fixed top-0 left-0 z-3 h-2 w-full'>
            <div className='bg-primary animate-linear-loader absolute top-0 left-0 h-full rounded-sm' />
        </div>
    );
}
