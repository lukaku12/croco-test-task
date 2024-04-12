import {SliderDataType} from "@/types/slider/index.interface.ts";

export interface FakeAxiosInstance {
    get: Function,
    post: Function,
    delete: Function,
}

interface FakeAxiosResponse {
    data: { data: SliderDataType[] }
}

const fakeRequestTime = 300;
const responseWrapper = (data: SliderDataType[]): FakeAxiosResponse => {
    return {
        data: {
            data: data,
        }
    }
}

const formDataToObject = (myFormData: FormData): SliderDataType => {
    let object: any = {};
    object['title'] = {en: "", ka: ""};

    myFormData.forEach((value, key) => {
        // add en and ka to title fix
        if (key === 'title[en]') {
            object.title.en = value;
        } else if (key === 'title[ka]') {
            object.title.ka = value;
        } else if (key === 'date') {
            object['date'] = value;
        } else if (key === 'image') {
            object['image'] = value;
        }
    });

    return object;
}

function getBase64(file: Blob): Promise<string | ArrayBuffer | null> {
    return new Promise(function (resolve, reject) {
        const reader = new FileReader();
        reader.onload = function () {
            resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

const saveToLocalStorage = (data: SliderDataType[]) => {
    localStorage.setItem("sliderData", JSON.stringify(data));
}

const getDataFromLocalStorage = (): SliderDataType[] => {
    const items = localStorage.getItem("sliderData")
    if (!items) return [];
    return JSON.parse(items);
}

const localData = getDataFromLocalStorage();


export const fakeAxios = {


    async get(): Promise<FakeAxiosResponse> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(responseWrapper(getDataFromLocalStorage()));
            }, fakeRequestTime)
        })
    },


    async post(url: string, data: FormData) {
        if (url.includes('/')) {

            // this is patch request

            const parsedData = formDataToObject(data);
            const currentDataIndex = localData.findIndex((item) => item.id === parsedData.id);

            if (currentDataIndex >= 0) {
                localData[currentDataIndex].title = parsedData.title;
                localData[currentDataIndex].date = parsedData.date;

                if (parsedData['image']) {
                    const base64ImagePromise = getBase64(parsedData['image'] as Blob);

                    base64ImagePromise.then((res) => {
                        if (!res || typeof res !== 'string') return;
                        localData[currentDataIndex]['image'] = res;
                        saveToLocalStorage(localData);
                    })

                } else {
                    saveToLocalStorage(localData);
                }

            }


            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve('Slider has been Edited');
                }, fakeRequestTime)
            })


        } else {

            //this is post request
            const parsedData = formDataToObject(data);
            localData.unshift(parsedData);
            const base64ImagePromise = getBase64(parsedData['image'] as Blob);
            base64ImagePromise.then((res) => {
                if (!res || typeof res !== 'string') return;
                localData[0].image = res;
                saveToLocalStorage(localData);
            })

            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve('Slider has been Added');
                }, fakeRequestTime)
            })
        }


    },
    async delete(url: string) {
        //this is delete request
        const id = parseInt(url.split('/')[1]);
        const index = localData.findIndex(item => item.id === id);
        localData.splice(index, 1);

        saveToLocalStorage(localData);

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve('Slider has been Deleted');
            }, fakeRequestTime)
        })
    }
}