export const MEDICAL_EXAMINATION_1 = [{
    key: "height",
    label: "Height (in cm)",
    type: "text",
    value: "",
}, {
    key: "weight",
    label: "Weight(in Kg)",
    type: "text",
    value: "",
}, {
    key: "bmi",
    label: "BMI",
    type: "text",
    value: "",
}, {
    key: "pulse_rate",
    label: "Pulse Rate",
    type: "text",
    value: "",
}, {
    key: "bp_max",
    label: "BP (mm of Hg)",
    max_bp: "Max BP",
    type: "text",
}, {
    key: "bp_min",
    label: "BP (mm of Hg)",
    min_bp: "Min BP",
    type: "text",
}, {
    key: "respiratory_rate",
    label: "Respiratory Rate",
    type: "text",
    value: "",
}];

export const MEDICAL_EXAMINATION_2 = [{
    key: "pallor",
    label: "Pallor",
    value: false
}, {
    key: "lnpathy",
    label: "Lnpathy",
    value: false
},{
    key: "cynosis",
    label: "Cynosis",
    value: false
},{
    key: "clubbing",
    label: "Clubbing",
    value: false
},{
    key: "edema",
    label: "Edema",
    value: false
},{
    key: "icterus",
    label: "Icterus",
    value: false
},{
    key: "other",
    label: "Other",
    type: "text",
    value: false
},{
    key: "remarks_2",
    label: "Remarks",
    type: "text",
    value: ""
}];

export const MEDICAL_EXAMINATION_3 = [{
    key: "cvs",
    label: "CVS",
    type: "text",
    value: ""
}, {
    key: "rs",
    label: "R.S.",
    type: "text",
    value: ""
}, {
    key: "pa",
    label: "P/A",
    type: "text",
    value: ""
}, {
    key: "cns",
    label: "CNS",
    type: "text",
    value: ""
}, {
    key: "ent",
    label: "ENT",
    type: "text",
    value: ""
}, {
    key: "musculoskeletal_system",
    label: "Musculoskeletal System",
    type: "text",
    value: ""
}, {
    key: "genitourinary_system",
    label: "Genitourinary System",
    type: "text",
    value: ""
}];

export const MEDICAL_EXAMINATION_4 = [{
    q: "Contagious skin disease? such as",
    options: [{
        scabies: false,
        dermatitis: false,
        boils: false,
        cuts: false,
        soars: false,
        remarks_4: "",
    }],
}];

export const MAJOR_DISABILITY = [{
    q: "Any major deformity/disability?",
    options: [{
        yes_no_q41: false,
        details: "",
        remark_q51: ""
    }]
}];
