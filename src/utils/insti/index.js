export const detailDataKeys= {
    OT: 'OT',
    TG: 'TG',
    OS: 'OS',
    R1: 'R1',
    R2: 'R2',
    R3: 'R3',
    R4: 'R4',
    R5: 'R5',
    AG: 'AG',
}

export const additionDataKeys= {
    TP: 'TP'
}

export function generateInstiData(data, format) {
    let tmpObj = {};
    let rest = [];
    if (data === null) return rest;
    const chkFormat = (formatKeys, o) => {
        let rest = false;
        let resObj = {};
        rest = formatKeys.every(key => {
            return o[key] !== undefined;
        });
        if (rest) {
            formatKeys.forEach(key => {
                resObj[key] = o[key];
            });
        }

        return resObj;
    };
    //
    const chk = data => {
        if (typeof data === "object") {
            return chkFormat(format, data);
        } else {
            return {}
        }
    };

    if (Array.isArray(data)) {
        data.forEach(o => {
            tmpObj = chk(o);
            if (
                !(Object.entries(tmpObj).length === 0 && tmpObj.constructor === Object)
            ) {
                rest = [...rest, tmpObj];
            } else {
                let tmpv = generateInstiData(o, format);
                if (tmpv) {
                    rest = [...rest, ...tmpv];
                }
            }
        });
    } else if (typeof data === "object") {
        tmpObj = chk(data);
        if (
            !(Object.entries(tmpObj).length === 0 && tmpObj.constructor === Object)
        ) {
            rest = [...rest, tmpObj];
        } else {
            Object.keys(data).forEach(key => {
                let tmpv = generateInstiData(data[key], format);
                if (tmpv) {
                    rest = [...rest, ...tmpv];
                }
            });
        }
    }
    return rest;
}

