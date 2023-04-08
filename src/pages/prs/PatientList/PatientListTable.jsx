import React, { useContext, useEffect, useMemo, useState } from 'react'
import DataTable, { createTheme } from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import { useDB } from '../../../contexts/DbContext';
import { COLUMNS } from './constants';
import { GlobalContext } from '../../../contexts/GlobalContext';
import "./patient-list.-table.styles.css";
import { EDIT_PATIENT_ROUTE, MEDICAL_FINDINGS_ROUTE, PRINT_ROUTE } from '../../../routes/constants';

const customStyles = {
    rows: {
        style: {
            minHeight: '42px', // override the row height
        },
    },
    headCells: {
        style: {
            fontSize: '14px',
            fontWeight: 'bold',
            paddingLeft: '8px', // override the cell padding for head cells
            paddingRight: '8px',
            textAlign: 'center',
            color: '#34327a',
        },
    },
    cells: {
        style: {
            paddingLeft: '8px', // override the cell padding for data cells
            paddingRight: '8px',
            color: '#34327a',
            // borderRight: '1px solid #ccc',
        },
    },
};


createTheme('solarized', {
    text: {
      primary: '#268bd2',
      secondary: '#2aa198',
    },
    background: {
      default: '#002b36',
    },
    context: {
      background: '#cb4b16',
      text: '#FFFFFF',
    },
    divider: {
      default: '#073642',
    },
    action: {
      button: 'rgba(0,0,0,.54)',
      hover: 'rgba(0,0,0,.08)',
      disabled: 'rgba(0,0,0,.12)',
    },
}, 'default');

const PatientListTable = () => {
    const {
        allPatients,
        fetchAllPatients,
        fetchPatientMedicalDetails,
        deletePatientPersonalDetails,
        deletePatientMedicalDetails,
    } = useDB();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { setModalData } = useContext(GlobalContext);

    const [filterText, setFilterText] = useState('');
	const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
	const filteredItems = allPatients && allPatients.filter(
		item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()),
	);

    useEffect(() => {
        fetchAllPatients();
    },[]);

    useEffect(() => {
        if(allPatients) {
            setLoading(false);
        }
    }, [allPatients]);

    const subHeaderComponentMemo = useMemo(() => {
		const handleClear = () => {
			if (filterText) {
				setResetPaginationToggle(!resetPaginationToggle);
				setFilterText('');
			}
		};

		return (
            <>
                <div className='patient-list-table-header-wrapper'>
                    {/* <span className='less-than' onClick={() => navigate("/")}>&lt;</span> */}
                    <h1>Patient List</h1>
                </div>
                {/* <div className='patient-list-table-filter-wrapper'>
                    <h1>Patient List</h1>
                    <span>Filter</span>
                    <input className='medical-exam-input-fields' onChange={e => setFilterText(e.target.value)} value={filterText} />
                </div> */}
            </>
		);
	}, [filterText, resetPaginationToggle]);

    const onEditPrescription = (row) => navigate(MEDICAL_FINDINGS_ROUTE.replace(":pid?", row.pid).replace(":id?", row.id));
    const onEditPatientDetails = (row) => navigate(EDIT_PATIENT_ROUTE.replace(":id", row.id));

    const onDeleteClicked = (row) => {
        setModalData({
            open: true,
            title: 'Delete Action',
            msg: 'Are you sure you want to delete this patient details?',
            callback: () => deletePatient(row),
        });
    };

    const deletePatient = async (row) => {
        const data = await fetchPatientMedicalDetails(row.pid);
        Promise.all([
            deletePatientPersonalDetails(row.id),
            deletePatientMedicalDetails(data[0].id)
        ]).then(res => {
            alert('Deleted');
            fetchAllPatients();
        }).catch(err => err);
    };

    const onPDFClick = (row) => navigate(PRINT_ROUTE.replace(":pid", row.pid).replace(":id", row.id));

    return (
        <div className='patient-list-table-container'>
            <DataTable
                // title="Patient List"
                theme="default"
                columns={COLUMNS(onEditPrescription, onEditPatientDetails, onDeleteClicked, onPDFClick)}
                data={filteredItems}
                customStyles={customStyles}
                progressPending={loading}
                defaultSortFieldId={1}
                pagination
                paginationPerPage={20}
                paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                paginationRowsPerPageOptions={[10,20,50,100]}
                subHeader
                subHeaderComponent={subHeaderComponentMemo}
                dense
                persistTableHead
                fixedHeader
                fixedHeaderScrollHeight="400px"
                striped
                responsive
                highlightOnHover
            />
        </div>
    )
}

export default PatientListTable;
