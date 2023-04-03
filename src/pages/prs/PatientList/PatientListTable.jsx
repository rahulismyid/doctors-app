import React, { useContext, useEffect, useMemo, useState } from 'react'
import DataTable, { createTheme } from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import { useDB } from '../../../contexts/DbContext';
import { COLUMNS } from './constants';
import "./patient-list.-table.styles.css";
import { GlobalContext } from '../../../contexts/GlobalContext';

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
        },
    },
    cells: {
        style: {
            paddingLeft: '8px', // override the cell padding for data cells
            paddingRight: '8px',
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
    const { allPatients, fetchAllPatients } = useDB();
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

    const onEditClicked = (row) => navigate(`/app/medical-findings/${row.pid}`);

    const onDeleteClicked = (row) => {
        setModalData({
            open: true,
            title: 'Delete Action',
            msg: 'Are you sure you want to delete this patient details?',
        });
    };


    return (
        <div className='patient-list-table-container'>
            <DataTable
                // title="Patient List"
                theme="default"
                columns={COLUMNS(onEditClicked, onDeleteClicked)}
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
