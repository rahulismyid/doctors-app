export const INVESTIGATION_VISUAL_DETAILS = [{
    color_vision: "",
    options: [{
        m_key: "vision_with_glasses",
        key: "right_eye",
        value: "",
    }, {
        m_key: "vision_with_glasses",
        key: "left_eye",
        value: "",
    }]
}, {
    options: [{
        m_key: "vision_without_glasses",
        key: "right_eye",
        value: "",
    }, {
        m_key: "vision_without_glasses",
        key: "left_eye",
        value: "",
    }]
}];

export const INVESTIGATION_VISUAL_DETAILS_2 = [{
    eye: "Dist",
    eye_power: [{
        power_type: "dist",
        options: {
            r_sph: "1rd",
            r_cyl: "2rd",
            r_axis: "3rd",
            r_vn: "4rd",
            l_sph: "1ld",
            l_cyl: "2ld",
            l_axis: "3ld",
            l_vn: "4ld"
        }
    }]
}, {
    eye: "Near",
    eye_power: [{
        power_type: "near",
        options: {
            r_sph: "1rd",
            r_cyl: "2rd",
            r_axis: "3rd",
            r_vn: "4rd",
            l_sph: "1ld",
            l_cyl: "2ld",
            l_axis: "3ld",
            l_vn: "4ld"
        }
    }],
}];

export const INVESTIGATION_CHECKBOX_QUESTIONS = {
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
