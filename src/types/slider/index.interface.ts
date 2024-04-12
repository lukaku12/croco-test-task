export interface SliderDataType {
    id: number,
    image: string | File[] | Blob,
    title: {
        ka: string,
        en: string,
    },
    date: string,
}

export interface SliderFormDataType {
    id?: number,
    title: {
        en: string,
        ka: string
    },
    image: undefined | File[],
    date: string | undefined
}