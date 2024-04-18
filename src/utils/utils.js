export const checkIfObjectHasRemarksKey = (option) => {
    const REMARK = "remark";
    let value;
    const key = Object.keys(option).find(i => {
        const res = i.includes(REMARK);
        if(res) {
        }
        return res;
    });
    if(!key) {
        value = Object.values(option).find(i => {
            const res = i && i.toString().includes(REMARK);
            if(res) {
                return res;
            }
        });
        return value;
    }
    return key
};

export const checkIfObjectHasEmptyProperty = (obj) => {
    return !Object.values(obj).find(x => !!x);
}