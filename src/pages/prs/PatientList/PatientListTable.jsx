import React, { useEffect, useMemo, useState } from 'react'
import DataTable, { createTheme } from 'react-data-table-component';
import { useDB } from '../../../contexts/DbContext';
import { COLUMNS } from './constants';

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
        },
    },
    cells: {
        style: {
            paddingLeft: '8px', // override the cell padding for data cells
            paddingRight: '8px',
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
    const { allPatients } = useDB();
    const [loading, setLoading] = useState(true);

    const [filterText, setFilterText] = useState('');
	const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
	const filteredItems = allPatients && allPatients.filter(
		item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()),
	);

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
                <input className='medical-exam-input-fields' onChange={e => setFilterText(e.target.value)} value={filterText} />
            </>
		);
	}, [filterText, resetPaginationToggle]);

    return (
        <div className='patient-list-table-container'>
            <DataTable
                title="Patient List"
                theme="default"
                columns={COLUMNS}
                data={filteredItems}
                customStyles={customStyles}
                progressPending={loading}
                defaultSortFieldId={1}
                pagination
                paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                subHeader
                subHeaderComponent={subHeaderComponentMemo}
                dense
                persistTableHead
                fixedHeader
                fixedHeaderScrollHeight="300px"
            />
        </div>
    )
}

export default PatientListTable;
