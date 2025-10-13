import Image from 'next/image';
import AutoPlaySlider from '.';

export default function AutoPlaySliderExample() {
    return (
        <div className='flex justify-center border border-solid p-5'>
            <AutoPlaySlider
                reverse={false}
                cloneCount={2}
                disable={false}
                stopOnHover={true}
                speed={1000}
                space={10}
                slides={[
                    //size of each image can be totally dynamic
                    '/imgs/1.png',
                    '/imgs/2.png',
                    '/imgs/3.png'
                ]}
            >
                {(slide) => <Image src={slide} alt={slide} width={500} height={500} className='h-[100px] w-auto' />}
            </AutoPlaySlider>
        </div>
    );
}
