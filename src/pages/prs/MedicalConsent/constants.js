export const MEDICAL_DECLARATION_CONSENT_FIELDS = [{
    q: "Do you suffer/have suffered from?",
    options: [{
        vertigo: false,
        giddiness: false,
        running_ear: false,
        epilepsy: false,
        remark_q11: "",
    },{
        heart_disease: false,
        diabetes: false,
        hypertension: false,
        paralysis: false,
        tb: false,
        other_major_illness: false,
        remark_q12: "",
    },{
        allergy_to_any_medicine_or_object: false,
        asthama: false,
        remark_q13: "",
    }],
}, {
    q: "Does your parent or brother/sister, have from any of above disease?",
    options: [{
        yes_no_q21: false,
        remark_q21: ""
    }],
}, {
    q: "Do you have/had?",
    options: [{
        smoking: false,
        tobacco: false,
        alcohol: false,
        other_addiction: false,
        remark_q31: "",
    },{
        height_phobia: false,
        fear_of_confined_space: false,
        remark_q32: "",
    }],
}, {
    q: "Have you undergone any surgery (other than family planning)?",
    options: [{
        yes_no_q41: false,
        remark_q41: ""
    }],
}, {
    q: "Are you taking any medicine on regular basis?",
    options: [{
        yes_no_q51: false,
        remark_q51: ""
    }],
}];
