import React, { useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button';

import SideNavbar from './SideNavbar';
import { getContact, deleteContact } from "../../Store/ActionCreators/ContactActionCreators"
import { useNavigate } from 'react-router-dom';

export default function AdminContactUs() {
    var Contact = useSelector((state) => state.ContactStateData)
    var dispatch = useDispatch()
    var navigate = useNavigate()
    var columns = [
        { field: '_id', headerName: 'ID', width: 230 },
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'email', headerName: 'Email', width: 130 },
        { field: 'phone', headerName: 'Phone', width: 130 },
        { field: 'subject', headerName: 'Subject', width: 130 },
        { field: 'status', headerName: 'Status', width: 70 },
        { field: 'date', headerName: 'Date', width: 200 },
        {
            field: "view",
            headerName: "View",
            sortable: false,
            renderCell: ({ row }) =>
                <Button onClick={() => {
                    navigate("/admin-single-contact/" + row._id)
                }}>
                    <span className="material-symbols-outlined">
                        visibility
                    </span>
                </Button>,
        },
        {
            field: "delete",
            headerName: "Delete",
            sortable: false,
            renderCell: ({ row }) => {
                if (row.status === "Done") {
                    return <Button onClick={() => {
                        dispatch(deleteContact({ _id: row._id }))
                    }}>
                        <span className="material-symbols-outlined">
                            delete_forever
                        </span>
                    </Button>
                }
            }
        }
    ];

    var rows = []
    for (let item of Contact) {
        rows.push(item)
    }

    useEffect(() => {
        function getAPIData() {
            dispatch(getContact())
        }

        getAPIData();
    }, [Contact.length, dispatch]);
    return (
        <>
            <div className="contain-fluid my-5">
                <div className="row">
                    <div className="col-lg-2 col-12">
                        <SideNavbar />
                    </div>
                    <div className="col-lg-10 col-12">
                        <h5 className='bg-secondary text-center text-light p-1'>Contact </h5>
                        <div style={{ height: 400, width: '100%' }}>
                            <DataGrid
                                getRowId={(row) => row._id}
                                rows={rows}
                                columns={columns}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                            // checkboxSelection
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
