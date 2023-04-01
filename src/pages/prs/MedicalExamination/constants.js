export const MEDICAL_EXAMINATION_1 = [{
    key: "height",
    label: "Height (in cm)",
    value: "",
}, {
    key: "weight",
    label: "Weight(in Kg)",
    value: "",
}, {
    key: "bmi",
    label: "BMI",
    value: "",
}, {
    key: "pulse_rate",
    label: "Pulse Rate",
    value: "",
}, {
    key: "bp_max",
    label: "Max BP (mm of Hg)",
    max_bp: "Max BP",
    value: "",
}, {
    key: "bp_min",
    label: "Min BP (mm of Hg)",
    min_bp: "Min BP",
    value: "",
}, {
    key: "respiratory_rate",
    label: "Respiratory Rate",
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
    value: false
},{
    key: "remarks_2",
    label: "Remarks",
    value: ""
}];

export const MEDICAL_EXAMINATION_3 = [{
    key: "cvs",
    label: "CVS",
    value: ""
}, {
    key: "rs",
    label: "R.S.",
    value: ""
}, {
    key: "pa",
    label: "P/A",
    value: ""
}, {
    key: "cns",
    label: "CNS",
    value: ""
}, {
    key: "ent",
    label: "ENT",
    value: ""
}, {
    key: "musculoskeletal_system",
    label: "Musculoskeletal System",
    value: ""
}, {
    key: "genitourinary_system",
    label: "Genitourinary System",
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
    }],
    remarks_4: "",
}];

export const MAJOR_DISABILITY = [{
    q: "Any major deformity/disability?",
    yes: false,
    details: "",
    remark: ""
}, {
    q: "Visual Activity:",
    eye_test_done: false,
}];
