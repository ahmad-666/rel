export type FeatureItem = {
    title: string;
    imageSrc: string;
    description: string;
};

export type InfoItem = {
    title: string;
    description: string;
    btnHref?: string;
    btnText?: string;
    imageSrc: string;
    imageWidth?: number;
    imageHeight?: number;
    boxedImage?: boolean;
    layout?: 'row' | 'column';
    className?: string;
    imageClassName?: string;
    titleClassName?: string;
    descriptionClassName?: string;
};

export type ProcessOverviewItem = {
    title: string;
    imgSrc: string;
    className?: string;
    titleClassName?: string;
    bgColorClass?: string;
    textColorClass?: string;
    imgClassName?: string;
};

export type ReviewItem = {
    username: string;
    description: string;
    work?: string;
    userImageSrc?: string;
    avatarBgClassName?: string;
};

export type StatisticsItem = {
    title: string;
    value: string;
    icon: string;
    className?: string;
};
