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
    CFormSelect,
    CButton,
    CModalFooter,
    CModalBody,
    CModalTitle,
    CModalHeader,
    CModal
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

const ManageTeacher = () => {
    const [isReload, setIsReload] = useState(false);

    const headerRef = useRef(null);

    const [idItem, setIdItem] = useState(0);

    const [isShowForm, setIsShowForm] = useState(false);

    const [Departments, setDepartments] = useState([]);
    const [Department, setDepartment] = useState('');
    const [DepartmentSort, setDepartmentSort] = useState('All');

    const [Position, setPosition] = useState('Giảng viên');

    const [Teachers, setTeachers] = useState([]);

    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmpasswordRef = useRef(null);
    const fullnameRef = useRef(null);
    const dateofbirthRef = useRef(null);
    const phoneRef = useRef(null);
    const emailRef = useRef(null);
    const addressRef = useRef(null);

    useEffect(() => {
        axios.get(`${API_URL}/api/departments`)
            .then(response => {
                setDepartment(response.data[0]._id);
                setDepartments(response.data);
            })
            .catch(() => {
            });
    }, []);

    useEffect(() => {
        axios.get(`${API_URL}/api/teachers/department/${DepartmentSort}`)
            .then(response => {
                setTeachers(response.data);
            })
            .catch(() => {
            });
    }, [isReload, DepartmentSort]);

    const [perPage, setPerPage] = useState(10);
    const [size, setSize] = useState(perPage);
    const [current, setCurrent] = useState(1);

    const PerPageChange = (value) => {
        setSize(value);
        const newPerPage = Math.ceil(Teachers.length / value);
        if (current > newPerPage) {
            setCurrent(newPerPage);
        }
    }

    const getData = (current, pageSize) => {
        return Teachers.slice((current - 1) * pageSize, current * pageSize);
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
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        const confirmpassword = confirmpasswordRef.current.value;
        const fullname = fullnameRef.current.value;
        const dateofbirth = dateofbirthRef.current.value;
        const phone = phoneRef.current.value;
        const email = emailRef.current.value;
        const address = addressRef.current.value;

        if (idItem === 0) {
            if (!username || !password || !confirmpassword || !fullname || !dateofbirth || !phone || !email || !address) {
                toast('Vui lòng điền đầy đủ thông tin');
                return;
            }
            if (password != confirmpassword) {
                toast('Mật khẩu xác nhận không đúng');
                return;
            }

            const teacherData = {
                UserName: username,
                Password: password,
                DepartmentID: Department,
                FullName: fullname,
                DateOfBirth: dateofbirth,
                Email: email,
                Phone: phone,
                Address: address,
                Position: Position
            };

            axios.post(`${API_URL}/api/teachers`, teacherData)
                .then((response) => {
                    if (response.status === 200) {
                        toggleFormVisibility();
                        toast('Thêm mới dữ liệu thành công');
                        setIsReload(!isReload);
                    } else {
                        toast('Lỗi khi thêm mới giảng viên');
                    }
                })
                .catch((error) => {
                    toast(error.response.data.message);
                });

        }
        else {

            if (!username || !fullname || !dateofbirth || !phone || !email || !address) {
                toast('Vui lòng điền đầy đủ thông tin');
                return;
            }
            if (password != confirmpassword) {
                toast('Mật khẩu xác nhận không đúng');
                return;
            }

            const teacherData = {
                UserName: username,
                Password: password,
                DepartmentID: Department,
                FullName: fullname,
                DateOfBirth: dateofbirth,
                Email: email,
                Phone: phone,
                Address: address,
                Position: Position
            };

            axios.put(`${API_URL}/api/teachers/${idItem}`, teacherData)
                .then((response) => {
                    if (response.status === 200) {
                        toggleFormVisibility();
                        toast(`Cập nhật dữ liệu thành công`);
                        setIsReload(!isReload);
                    } else {
                        toast('Lỗi khi cập nhật thông tin sản phẩm');
                    }
                })
                .catch((error) => {
                    toast(error.response.data.message);
                });
            setIdItem(0);
        }
    }

    const handleEditClick = async (id) => {
        await axios.get(`${API_URL}/api/teachers/${id}`)
            .then((response) => {
                if (response.status === 200) {
                    setIsShowForm(true);
                    setIdItem(id);
                    scrollToHeader();

                    setTimeout(() => {
                        console.log(response.data)
                        const { DepartmentID, FullName, DateOfBirth, Email, Phone, Address, Position } = response.data.teacher;
                        usernameRef.current.value = response.data.teacher.UserID.UserName;
                        fullnameRef.current.value = FullName;
                        var date = format(new Date(DateOfBirth), 'yyyy-MM-dd');
                        dateofbirthRef.current.defaultValue = date;
                        emailRef.current.value = Email;
                        phoneRef.current.value = Phone;
                        addressRef.current.value = Address;
                        setPosition(Position);
                        setDepartment(DepartmentID._id);
                    });

                    setIdItem(id);
                } else {
                    toast('Lỗi khi lấy thông tin giảng viên');
                }
            })
            .catch(() => {
            });
    }

    const handleDeleteClick = (id) => {
        setIsShowForm(false);
        confirmAlert({
            title: "Xác nhận xóa",
            message: "Bạn muốn xóa thông tin giảng viên?",
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
            const response = await axios.delete(`${API_URL}/api/teachers/${id}`);
            if (response.status === 200) {
                toast('Xóa dữ liệu thành công');
                setIsReload(!isReload);
            } else {
                toast('Lỗi khi xóa giảng viên');
            }
        } catch (error) {
            console.log(error);
            toast('Lỗi: ', error.response.data.message);
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
                            <strong ref={headerRef}>QUẢN LÍ GIẢNG VIÊN</strong>
                        </CCardHeader>
                        <CCardBody className='table-responsive'>
                            {
                                isShowForm ? <>
                                    <div className='row'>
                                        <div className='col-md-4'>
                                            <div className="mb-3">
                                                <CFormLabel>Tên đăng nhập</CFormLabel>
                                                <CFormInput
                                                    ref={usernameRef}
                                                    type="text"
                                                    placeholder="Tên đăng nhập"
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <CFormLabel>Mật khẩu</CFormLabel>
                                                <CFormInput
                                                    ref={passwordRef}
                                                    type="password"
                                                    placeholder="Mật khẩu"
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <CFormLabel>Xác nhận mật khẩu</CFormLabel>
                                                <CFormInput
                                                    ref={confirmpasswordRef}
                                                    type="password"
                                                    placeholder="Xác nhận mật khẩu"
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <CFormLabel>Chức vụ</CFormLabel>
                                                <CFormSelect value={Position} onChange={(e) => {
                                                    setPosition(e.target.value);
                                                }}>
                                                    <option value="Giảng viên">Giảng viên</option>
                                                    <option value="Trưởng bộ môn">Trưởng bộ môn</option>
                                                </CFormSelect>
                                            </div>
                                        </div>
                                        <div className='col-md-4'>
                                            <div className="mb-3">
                                                <CFormLabel>Chuyên ngành</CFormLabel>
                                                <CFormSelect value={Department} onChange={(e) => {
                                                    setDepartment(e.target.value);
                                                }}>
                                                    {Departments.map(department => (
                                                        <option key={department._id} value={department._id}>{department.DepartmentName}</option>
                                                    ))}
                                                </CFormSelect>
                                            </div>
                                            <div className="mb-3">
                                                <CFormLabel>Họ và tên</CFormLabel>
                                                <CFormInput
                                                    ref={fullnameRef}
                                                    type="text"
                                                    placeholder="Họ và tên"
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <CFormLabel>Ngày sinh</CFormLabel>
                                                <CFormInput
                                                    ref={dateofbirthRef}
                                                    type="date"
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <CFormLabel>Email</CFormLabel>
                                                <CFormInput
                                                    ref={emailRef}
                                                    type="email"
                                                    placeholder='Email'
                                                />
                                            </div>
                                        </div>
                                        <div className='col-md-4'>
                                            <div className="mb-3">
                                                <CFormLabel>Số điện thoại</CFormLabel>
                                                <CFormInput
                                                    ref={phoneRef}
                                                    type="tel"
                                                    placeholder='Số điện thoại'
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <CFormLabel>Địa chỉ</CFormLabel>
                                                <CFormInput
                                                    ref={addressRef}
                                                    type="text"
                                                    placeholder='Địa chỉ'
                                                />
                                            </div>
                                        </div>
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
                                        <div className='row'>
                                            <div className='col-md-9'></div>
                                            <div className='col-md-3'>
                                                <div className="mb-3">
                                                    <CFormLabel>Chuyên ngành</CFormLabel>
                                                    <CFormSelect value={DepartmentSort} onChange={(e) => {
                                                        setDepartmentSort(e.target.value);
                                                    }}>
                                                        <option value='All'>Tất cả</option>
                                                        {Departments.map(department => (
                                                            <option key={department._id} value={department._id}>{department.DepartmentName}</option>
                                                        ))}
                                                    </CFormSelect>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                            }
                            <CTable bordered borderColor="primary">
                                <CTableHead>
                                    <CTableRow>
                                        <CTableHeaderCell scope="col">#</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Họ và tên</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Chức vụ</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Chuyên ngành</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Ngày sinh</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Số điện thoại</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Địa chỉ</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {getData(current, size).map((teacher, index) => (
                                        <CTableRow key={teacher._id}>
                                            <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                                            <CTableDataCell>{teacher.FullName}</CTableDataCell>
                                            <CTableDataCell>{teacher.Position}</CTableDataCell>
                                            <CTableDataCell>{teacher.DepartmentID.DepartmentName}</CTableDataCell>
                                            <CTableDataCell>{format(new Date(teacher.DateOfBirth), 'dd/MM/yyyy')}</CTableDataCell>
                                            <CTableDataCell>{teacher.Email}</CTableDataCell>
                                            <CTableDataCell>{teacher.Phone}</CTableDataCell>
                                            <CTableDataCell>{teacher.Address}</CTableDataCell>
                                            <CTableDataCell style={{ display: 'flex' }}>
                                                <CButton
                                                    className='mr-2'
                                                    color='danger'
                                                    variant="outline"
                                                    onClick={() => { handleDeleteClick(teacher._id) }}
                                                >
                                                    Xóa
                                                </CButton>
                                                <CButton
                                                    color='warning'
                                                    variant="outline"
                                                    onClick={() => handleEditClick(teacher._id)}
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
                                total={Teachers.length}
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

export default ManageTeacher
