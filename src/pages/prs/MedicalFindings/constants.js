export const AILMENT_HISTORY_DETAILS = [{
    q: "Do you suffer/have suffered from?",
    options: [{
        vertigo: false,
        giddiness: false,
        running_ear: false,
        epilepsy: false,
        remark_q11: "",
        remark_key: "remark_q11",
    },{
        heart_disease: false,
        diabetes: false,
        hypertension: false,
        paralysis: false,
        tb: false,
        other_major_illness: false,
        remark_q12: "",
        remark_key: "remark_q12",
    },{
        allergy_to_any_medicine_or_object: false,
        asthama: false,
        remark_q13: "",
        remark_key: "remark_q13",
    }],
}, {
    q: "Does your parent or brother/sister, have from any of above disease?",
    options: [{
        remark_q21: "",
        remark_key: "remark_q21",
    }],
}, {
    q: "Do you have/had?",
    options: [{
        smoking: false,
        tobacco: false,
        alcohol: false,
        other_addiction: false,
        remark_q31: "",
        remark_key: "remark_q31",
    },{
        height_phobia: false,
        fear_of_confined_space: false,
        remark_q32: "",
        remark_key: "remark_q32",
    }],
}, {
    q: "Have you undergone any surgery (other than family planning)?",
    options: [{
        remark_q41: "",
        remark_key: "remark_q41",
    }],
}, {
    q: "Are you taking any medicine on regular basis?",
    options: [{
        remark_q51: "",
        remark_key: "remark_q51",
    }],
}];

export const BODY_EXAMINATION_METRICS = [{
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

export const BODY_EXAMINATION_AILMENTS = [{
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

export const BODY_ORGANS_AND_TESTS = [{
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

export const CONTAGIOUS_SKIN_DISEASES = [{
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

export const MAJOR_DISABILITY = {
    q: "Any major deformity/disability?",
    yes: false,
    details: "",
    remark: "",
    eye_test_done_q: "Visual Activity:",
    eye_test_done: false,
};

export const VISION_TEST_DETAILS = [{
    key: "color_vision",
    m_key: "no_display",
    value: ""
}, {
    key: "right_eye",
    m_key: "vision_with_glasses",
    value: ""
}, {
    key: "left_eye",
    m_key: "vision_with_glasses",
    value: ""
}, {
    value: "",
    key: "right_eye",
    m_key: "vision_without_glasses"
}, {
    key: "left_eye",
    m_key: "vision_without_glasses",
    value: ""
}];

export const EYE_SIGHT_DETAILS = [{
    eye: "Dist",
    eye_power: [{
        power_type: "dist",
        options: {
            r_sph: "",
            r_cyl: "",
            r_axis: "",
            r_vn: "",
            l_sph: "",
            l_cyl: "",
            l_axis: "",
            l_vn: ""
        }
    }]
}, {
    eye: "Near",
    eye_power: [{
        power_type: "near",
        options: {
            r_sph: "",
            r_cyl: "",
            r_axis: "",
            r_vn: "",
            l_sph: "",
            l_cyl: "",
            l_axis: "",
            l_vn: ""
        }
    }],
}];

export const EYE_SIGHT_REMARK = {
    eye_remark: "",
};

export const TEST_EVALUATIONS_AND_FINDINGS = {
    ecg_q: "Ecg Findings:",
    ecg_done: false,
    ecg_done_remark: "",
    lab_sample_taken_q: "Lab Test Report No.",
    lab_sample_taken: false,
    lab_sample_taken_value: "",
    audiometry_done_q: "Audiometry",
    audiometry_done_checked: false,
    audiometry_done_value: "",
    abnormal_reports_q: "Abnormal Reports if any",
    abnormal_reports_value: "",
    deworming_q: "Deworming (with Albendazole 400mg):",
    deworming_value: "",
    deworming_remark: "",
    covid_q: "Covid Vaccination",
    covid_value: "",
    evaluation_q: "Further Evaluation (if any)",
    evaluation_value: "",
    treatment_q: "Treatment advised (if any)",
    treatment_value: "",
    restriction_q: "Restriction Advised (ifany)",
    restriction_value: "",
    follow_up_q: "Follow-up advised (If any)",
    follow_up_value: "",
    remark_q: "Remark",
    remark_value: "",
    fit: false,
    fit_with_restrictions: false,
    temporary_unfit: false,
    unfit: false,
};
