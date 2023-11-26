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
import { format } from 'date-fns';

const ManageProfile = () => {

    const [userName, setUserName] = useState('')
    const [fullName, setFullName] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState(new Date())
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [visibleModal, setVisibleModal] = useState(false)

    useEffect(() => {
        setUserName(localStorage.getItem('username'))
        setFullName(localStorage.getItem('fullname'))
        setDateOfBirth(localStorage.getItem('dateOfBirth'))
        setEmail(localStorage.getItem('email'))
        setPhone(localStorage.getItem('phone'))
        setAddress(localStorage.getItem('address'))
    }, [])

    const handleEditClick = (id) => {
        setVisibleModal(true);
    }


    return (
        <div>
            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>THÔNG TIN TÀI KHOẢN</strong>
                        </CCardHeader>
                        <CCardBody>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="card">
                                        <img
                                            src="/imgProfile/150.png"
                                            className="card-img-top"
                                            alt="Avatar"
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">{userName}</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="card-title">Thông tin cá nhân</h5>
                                            <p className="card-text">Họ và tên: {fullName}</p>
                                            <p className="card-text">Ngày sinh: {format(new Date(dateOfBirth), 'yyyy-MM-dd')}</p>
                                            <p className="card-text">Email: {email}</p>
                                            <p className="card-text">Số điện thoại: {phone}</p>
                                            <p className="card-text">Địa chỉ: {address}</p>
                                            <a
                                                style={{ cursor: "pointer" }}
                                                onClick={handleEditClick}
                                                className="btn btn-primary"
                                            >
                                                Chỉnh sửa thông tin
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
            <CModal alignment="center" scrollable visible={visibleModal} onClose={() => setVisibleModal(false)}>
                <CModalHeader>
                    <CModalTitle>Chỉnh sửa thông tin</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <div>
                        <div className="mb-3">
                            <CFormLabel>Họ và tên</CFormLabel>
                            <CFormInput
                                value={fullName}
                                type="text"
                                placeholder="Họ và tên"
                            />
                        </div>
                        <div className="mb-3">
                            <CFormLabel>Ngày sinh</CFormLabel>
                            <CFormInput
                                value={format(new Date(dateOfBirth), 'yyyy-MM-dd')}
                                type="date"
                            />
                        </div>
                        <div className="mb-3">
                            <CFormLabel>Email</CFormLabel>
                            <CFormInput
                                value={email}
                                type="email"
                                placeholder='Email'
                            />
                        </div>
                        <div className="mb-3">
                            <CFormLabel>Số điện thoại</CFormLabel>
                            <CFormInput
                                value={phone}
                                type="tel"
                                placeholder='Số điện thoại'
                            />
                        </div>
                        <div className="mb-3">
                            <CFormLabel>Địa chỉ</CFormLabel>
                            <CFormInput
                                value={address}
                                type="text"
                                placeholder='Địa chỉ'
                            />
                        </div>
                        <div className="mb-3">
                            <CFormLabel>Mật khẩu</CFormLabel>
                            <CFormInput
                                type="password"
                                placeholder="Mật khẩu"
                            />
                        </div>
                        <div className="mb-3">
                            <CFormLabel>Xác nhận mật khẩu</CFormLabel>
                            <CFormInput
                                type="password"
                                placeholder="Xác nhận mật khẩu"
                            />
                        </div>
                    </div>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisibleModal(false)}>
                        Hủy
                    </CButton>
                    <CButton color="primary">Thực thi</CButton>
                </CModalFooter>
            </CModal>
        </div>
    )
}

export default ManageProfile
