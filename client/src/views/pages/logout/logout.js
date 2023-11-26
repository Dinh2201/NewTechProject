import React, { useEffect } from 'react'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
const Logout = () => {
    useEffect(() => {
        confirmAlert({
            title: "Xác nhận đăng xuất",
            message: "Bạn muốn đăng xuất?",
            buttons: [
                {
                    label: 'Xác nhận',
                    onClick: () => {
                        localStorage.removeItem('user_id');
                        localStorage.removeItem('username');
                        localStorage.removeItem('fullname');
                        localStorage.removeItem('email');
                        localStorage.removeItem('address');
                        localStorage.removeItem('phone');
                        localStorage.removeItem('role');
                        localStorage.removeItem('isLogin');
                        localStorage.removeItem('department');
                        localStorage.removeItem('academicYear');
                        localStorage.removeItem('dateOfBirth');
                        
                        window.location.href = '/';
                    }
                },
                {
                    label: 'Hủy',
                    onClick: () => window.location.href = '/'
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
    }, []);

    return (
        <>
        </>
    )
}
export default Logout;