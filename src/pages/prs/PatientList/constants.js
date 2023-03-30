export const COLUMNS_KEYS = [
    "name",
    "age",
    "code",
    "mobile",
    "department",
    "emergency_mobile",
    "emergency_contact_person",
    "present_address",
    "doj",
    "son_of",
    "gender",
];

export const COLUMNS_HEADER_TITLE = [
    "Name",
    "Age",
    "Code",
    "Mobile",
    "Department",
    "Emergency mobile",
    "Emergency contact",
    "Present Address",
    "Date of Joining",
    "Son of",
    "Gender",
];

export const COLUMNS = [{
    name: 'Name',
    selector: row => row.name,
    sortable: true,
}, {
    name: 'Age',
    selector: row => row.age,
    sortable: true,
}, {
    name: 'Gender',
    selector: row => row.gender,
    sortable: true,
}, {
    name: 'Code',
    selector: row => row.code,
    sortable: true,
}, {
    name: 'Mobile',
    selector: row => row.mobile,
    sortable: true,
}, {
    name: 'Department',
    selector: row => row.department,
    sortable: true,
}, {
    name: 'Emergency Mobile',
    selector: row => row.emergency_mobile,
    sortable: true,
}, {
    name: 'Emergency Contact Person',
    selector: row => row.emergency_contact_person,
    sortable: true,
}, {
    name: 'Date Of Joining',
    selector: row => row.doj,
    sortable: true,
}, {
    name: 'Son of',
    selector: row => row.name,
    sortable: true,
}];
