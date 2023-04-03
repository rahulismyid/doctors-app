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

export const COLUMNS = (onEditClick, onDeleteClick) => [{
    name: 'PID',
    selector: row => row.pid,
    width: "80px",
}, {
    name: 'Name',
    selector: row => row.name,
    sortable: true,
    width: "150px",
}, {
    name: 'Age',
    selector: row => row.age,
    sortable: true,
    width: "80px",
}, {
    name: 'Gender',
    selector: row => row.gender,
    sortable: true,
    width: "90px",
}, {
    name: 'Code',
    selector: row => row.code,
    sortable: true,
    width: "90px",
}, {
    name: 'Mobile',
    selector: row => row.mobile,
    sortable: true,
}, {
    name: 'Department',
    selector: row => row.department,
    sortable: true,
}, {
    name: 'Actions',
    sortable: false,
    cell:(row) => <>
        <span className="table-action-btn" onClick={() => onEditClick(row)}>Edit</span>
        <span className="table-action-btn" onClick={onDeleteClick}>Delete</span>
    </>,
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
    style: {
        margin: '0 10px',
        width: '100px',
        minWidth: '150px',
    },
}];
