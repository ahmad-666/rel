type GoogleSchemaProps<T> = {
    jsonLd: T;
};

const GoogleSchema = <T,>({ jsonLd }: GoogleSchemaProps<T>) => {
    return (
        <>
            <script
                id='google-schema'
                type='application/ld+json'
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(jsonLd)
                }}
            />
        </>
    );
};

export default GoogleSchema;

//! We don't use nextjs/script because it has problem when we use 'dangerouslySetInnerHTML' and change page via client and it will not load new content on page change
