export const GetOrientation = async (file: File): Promise<any> => {
    return new Promise(async resolve => {
        let oreader = new FileReader();

        oreader.onload = (event) => {
            //@ts-ignore
            let view = new DataView(event.target.result);

            if (view.getUint16(0, false) !== 0xFFD8) {
                resolve(-2);
                return;
            }

            let length = view.byteLength,
                offset = 2;

            while (offset < length) {
                let marker = view.getUint16(offset, false);
                offset += 2;

                if (marker === 0xFFE1) {
                    if (view.getUint32(offset += 2, false) !== 0x45786966) {
                        resolve(-1);
                        return;
                    }
                    let little = view.getUint16(offset += 6, false) === 0x4949;
                    offset += view.getUint32(offset + 4, little);
                    let tags = view.getUint16(offset, little);
                    offset += 2;

                    for (let i = 0; i < tags; i++) {
                        if (view.getUint16(offset + (i * 12), little) === 0x0112) {
                            resolve(view.getUint16(offset + (i * 12) + 8, little));
                            return;
                        }
                    }
                } else if ((marker & 0xFF00) !== 0xFF00) {
                    break;
                } else
                    offset += view.getUint16(offset, false);
            }
            resolve(-1);
        };

        oreader.readAsArrayBuffer(file.slice(0, 64 * 1024));
    });
};

export const PhotoFileToData = async (file: File, maxSize: number = 4096): Promise<any> => {
    return new Promise<any>(async resolve => {
        const srcOrientation = await GetOrientation(file);

        // Create a file reader
        let reader = new FileReader();
        reader.onload = function (e: any) {
            let img = document.createElement("img");

            img.onload = async function () {
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > maxSize) {
                        height *= maxSize / width;
                        width = maxSize;
                    }
                } else {
                    if (height > maxSize) {
                        width *= maxSize / height;
                        height = maxSize;
                    }
                }

                let canvas = document.createElement("canvas");
                let ctx = canvas.getContext("2d");

                if ([5, 6, 7, 8].indexOf(srcOrientation) > -1) {
                    // noinspection JSSuspiciousNameCombination
                    canvas.width = height;
                    // noinspection JSSuspiciousNameCombination
                    canvas.height = width;
                } else {
                    canvas.width = width;
                    canvas.height = height;
                }

                switch (srcOrientation) {
                    case 2:
                        ctx!.transform(-1, 0, 0, 1, width, 0);
                        break;
                    case 3:
                        ctx!.transform(-1, 0, 0, -1, width, height);
                        break;
                    case 4:
                        ctx!.transform(1, 0, 0, -1, 0, height);
                        break;
                    case 5:
                        ctx!.transform(0, 1, 1, 0, 0, 0);
                        break;
                    case 6:
                        ctx!.transform(0, 1, -1, 0, height, 0);
                        break;
                    case 7:
                        ctx!.transform(0, -1, -1, 0, height, width);
                        break;
                    case 8:
                        ctx!.transform(0, -1, 1, 0, 0, width);
                        break;
                    default:
                        ctx!.transform(1, 0, 0, 1, 0, 0);
                        break;
                }

                ctx!.drawImage(img, 0, 0, width, height);

                resolve(canvas.toDataURL(file['type']));
            };

            img.onerror = function () {
                resolve(false);
            };

            img.src = e.target.result;
        };

        reader.readAsDataURL(file);
    });
};

export const FileToBase64 = (file: File): Promise<any> => {
    return new Promise<any>(async (resolve, reject) => {
        const reader = new FileReader();

        reader.onload = function (e: any) {
            resolve(e.target.result);
        };
        reader.onerror = function () {
            reject();
        };

        reader.readAsDataURL(file);
    });
};

// Thumb 128
export const ResizeBase64 = (base64Str: any, maxSize: number = 4096): any => {
    let img = new Image();
    img.src = base64Str;
    let canvas = document.createElement('canvas');
    let width = img.width;
    let height = img.height;

    if (width > height) {
        if (width > maxSize) {
            height *= maxSize / width;
            width = maxSize;
        }
    } else {
        if (height > maxSize) {
            width *= maxSize / height;
            height = maxSize;
        }
    }

    canvas.width = width;
    canvas.height = height;
    let ctx = canvas.getContext('2d');
    ctx!.drawImage(img, 0, 0, width, height);
    return canvas.toDataURL();
};
