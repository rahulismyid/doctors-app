import { ReactComponent as EditDocument } from "../../../components/svg/edit-document.svg";
import { ReactComponent as DeleteSvg } from "../../../components/svg/delete.svg";
import { ReactComponent as Prescription } from "../../../components/svg/prescription.svg";
import { ReactComponent as PdfSvg } from "../../../components/svg/pdf-svg.svg";

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

export const COLUMNS = (onEditPrescription, onEditPatientDetails, onDeleteClick, onPDFClick) => [{
    name: 'PID',
    selector: row => row.pid,
}, {
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
    name: 'Actions',
    sortable: false,
    cell:(row) => <>
        <span className="table-action-btn" title="Edit Personal Details" onClick={() => onEditPatientDetails(row)}>
            <EditDocument width={18} height={18} style={{margin: '0 5px'}} />
        </span>
        <span className="table-action-btn" title="Edit Prescription" onClick={() => onEditPrescription(row)}>
            <Prescription width={18} height={18} style={{margin: '0 5px'}} />
        </span>
        <span className="table-action-btn" title="Prescription" onClick={() => onPDFClick(row)}>
            <PdfSvg width={18} height={18} style={{margin: '0 5px'}} />
        </span>
        <span className="table-action-btn" title="Delete patient" onClick={() => onDeleteClick(row)}>
            <DeleteSvg width={18} height={18} style={{margin: '0 5px'}} />
        </span>
    </>,
    width: "150px",
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
    style: {
        margin: '0 10px',
    },
}];
