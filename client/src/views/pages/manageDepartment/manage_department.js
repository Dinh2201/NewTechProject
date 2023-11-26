import React, { useState, useRef, useEffect } from 'react'
import {
    CTable,
    CCardHeader,
    CCardBody,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CRow,
    CCol,
    CCard,
    CFormInput,
    CFormLabel,
    CButton,
    CFormTextarea
} from '@coreui/react'
import axios from 'axios';
import API_URL from '../../../config';
import '../../../App.css';

import Pagination from "https://cdn.skypack.dev/rc-pagination@3.1.15";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { format } from 'date-fns';

const ManageDepartment = () => {

    const [isReload, setIsReload] = useState(false);

    const headerRef = useRef(null);

    const [idItem, setIdItem] = useState(0);

    const [isShowForm, setIsShowForm] = useState(false);

    const [datas, setDatas] = useState([]);

    const departmentNameRef = useRef(null);
    const descriptionRef = useRef(null);

    useEffect(() => {
        axios.get(`${API_URL}/api/departments`)
            .then(response => {
                setDatas(response.data);
            })
            .catch(() => {
            });
    }, [isReload]);

    const [perPage, setPerPage] = useState(10);
    const [size, setSize] = useState(perPage);
    const [current, setCurrent] = useState(1);

    const PerPageChange = (value) => {
        setSize(value);
        const newPerPage = Math.ceil(datas.length / value);
        if (current > newPerPage) {
            setCurrent(newPerPage);
        }
    }

    const getData = (current, pageSize) => {
        return datas.slice((current - 1) * pageSize, current * pageSize);
    };

    const PaginationChange = (page, pageSize) => {
        setCurrent(page);
        setSize(pageSize)
    }

    const PrevNextArrow = (current, type, originalElement) => {
        if (type === 'prev') {
            return <button><i className="fa fa-angle-double-left"></i></button>;
        }
        if (type === 'next') {
            return <button><i className="fa fa-angle-double-right"></i></button>;
        }
        return originalElement;
    }
    const toggleFormVisibility = () => {
        setIsShowForm(!isShowForm);
        setIdItem(0);
    };

    const handleAdd_Edit = () => {
        const departmentName = departmentNameRef.current.value;
        const description = descriptionRef.current.value;

        if (idItem === 0) {
            if (!departmentName || !description) {
                toast('Vui lòng điền đầy đủ thông tin');
                return;
            }

            const newData = {
                DepartmentName: departmentName,
                Description: description
            };

            axios.post(`${API_URL}/api/departments`, newData)
                .then((response) => {
                    if (response.status === 200) {
                        toggleFormVisibility();
                        toast('Thêm mới dữ liệu thành công');
                        setIsReload(!isReload);
                    } else {
                        toast('Lỗi khi thêm mới chuyên ngành');
                    }
                })
                .catch((error) => {
                    toast(error.response.data.message);
                });

        }
        else {

            if (!departmentName || !description) {
                toast('Vui lòng điền đầy đủ thông tin');
                return;
            }

            const newData = {
                DepartmentName: departmentName,
                Description: description
            };

            axios.put(`${API_URL}/api/departments/${idItem}`, newData)
                .then((response) => {
                    if (response.status === 200) {
                        toggleFormVisibility();
                        toast(`Cập nhật dữ liệu thành công`);
                        setIsReload(!isReload);
                    } else {
                        toast('Lỗi khi cập nhật thông tin chuyên ngành');
                    }
                })
                .catch((error) => {
                    toast(error.response.data.message);
                });
            setIdItem(0);
        }
    }

    const handleEditClick = async (id) => {
        console.log(id)
        await axios.get(`${API_URL}/api/departments/${id}`)
            .then((response) => {
                if (response.status === 200) {
                    setIsShowForm(true);
                    setIdItem(id);
                    scrollToHeader();

                    setTimeout(() => {
                        const { DepartmentName, Description } = response.data.department;
                        departmentNameRef.current.value = DepartmentName;
                        descriptionRef.current.defaultValue = Description;
                    });

                    setIdItem(id);
                } else {
                    toast('Lỗi khi lấy thông tin chuyên ngành');
                }
            })
            .catch((error) => {
                toast(error.response.data.message);
            });
    }

    const handleDeleteClick = (id) => {
        setIsShowForm(false);
        confirmAlert({
            title: "Xác nhận xóa",
            message: "Bạn muốn xóa thông tin chuyên ngành?",
            buttons: [
                {
                    label: 'Xác nhận',
                    onClick: () => handleConfirmDelete(id)
                },
                {
                    label: 'Hủy',
                    onClick: () => handleCancelDelete()
                }
            ],
            closeOnEscape: true,
            closeOnClickOutside: true,
            keyCodeForClose: [8, 32],
            willUnmount: () => { },
            afterClose: () => { },
            onClickOutside: () => { },
            onKeypress: () => { },
            onKeypressEscape: () => { },
            overlayClassName: "overlay-custom-class-name"
        });
    }

    const handleConfirmDelete = async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/api/departments/${id}`);
            if (response.status === 200) {
                toast('Xóa dữ liệu thành công');
                setIsReload(!isReload);
            } else {
                toast('Lỗi khi xóa chuyên ngành');
            }
        } catch (error) {
            toast('Lỗi:', error.response.data.message);
        }
    };

    const handleCancelDelete = () => {
    };

    const scrollToHeader = () => {
        if (headerRef.current) {
            headerRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div>
            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong ref={headerRef}>QUẢN LÍ CHUYÊN NGÀNH</strong>
                        </CCardHeader>
                        <CCardBody className='table-responsive'>
                            {
                                isShowForm ? <>
                                    <div className='col-md-4'>
                                        <div className="mb-3">
                                            <CFormLabel>Tên chuyên ngành</CFormLabel>
                                            <CFormInput
                                                ref={departmentNameRef}
                                                type="text"
                                                placeholder="Tên chuyên ngành"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <CFormLabel>Mô tả</CFormLabel>
                                            <CFormTextarea ref={descriptionRef} aria-label="With textarea"></CFormTextarea>
                                        </div>
                                        <div className='mb-3'>
                                            <CButton
                                                color='primary'
                                                variant="outline"
                                                onClick={handleAdd_Edit}
                                            >
                                                Thực thi
                                            </CButton>
                                            <CButton
                                                color='warning'
                                                variant="outline"
                                                onClick={toggleFormVisibility}
                                                style={{ marginLeft: 10 }}
                                            >
                                                Hủy
                                            </CButton>
                                        </div>
                                    </div>
                                </>
                                    :
                                    <>
                                        <div className='mb-3'>
                                            <CButton
                                                color='success'
                                                variant="outline"
                                                onClick={toggleFormVisibility}
                                            >
                                                Thêm mới
                                            </CButton>
                                        </div>
                                    </>

                            }
                            <CTable bordered borderColor="primary">
                                <CTableHead>
                                    <CTableRow>
                                        <CTableHeaderCell scope="col">#</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Tên chuyên ngành</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Mô tả</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {getData(current, size).map((data, index) => (
                                        <CTableRow key={data._id}>
                                            <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                                            <CTableDataCell>{data.DepartmentName}</CTableDataCell>
                                            <CTableDataCell>{data.Description}</CTableDataCell>
                                            <CTableDataCell style={{ display: 'flex' }}>
                                                <CButton
                                                    className='mr-2'
                                                    color='danger'
                                                    variant="outline"
                                                    onClick={() => { handleDeleteClick(data._id) }}
                                                >
                                                    Xóa
                                                </CButton>
                                                <CButton
                                                    color='warning'
                                                    variant="outline"
                                                    onClick={() => handleEditClick(data._id)}
                                                >
                                                    Sửa
                                                </CButton>
                                            </CTableDataCell>
                                        </CTableRow>
                                    ))}
                                </CTableBody>
                            </CTable>
                            <Pagination
                                className="pagination-data"
                                showTotal={(total, range) => `Showing ${range[0]}-${range[1]} of ${total}`}
                                onChange={PaginationChange}
                                total={datas.length}
                                current={current}
                                pageSize={size}
                                showSizeChanger={false}
                                itemRender={PrevNextArrow}
                                onShowSizeChange={PerPageChange}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            <ToastContainer />
        </div>
    )
}

export default ManageDepartment
