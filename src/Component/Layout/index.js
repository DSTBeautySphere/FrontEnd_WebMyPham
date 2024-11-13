import React, { useState } from 'react';
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import { useLocation } from 'react-router-dom';




const Layout = ({ children, showFooter = true }) => { // Thêm showFooter
    const [loaisp, setloaisp] = useState([]); // Đã sửa lại: const { loaisp, setloaisp } thành const [loaisp, setloaisp]

    const handelClickLoaiSP = (loai) => {
        setloaisp(loai);
    }

    return (

        <div className="app header-fixed sidebar-fixed aside-menu-fixed sidebar-lg-show">
            <Header />
            <div className="app-body">
                {/* <Sidebar /> */}
                <main style={{ marginTop: '30px' }} className="main">
                    {children} {/* Render nội dung con */}
                </main>
            </div>
            {showFooter && <Footer />} {/* Chỉ hiển thị footer nếu showFooter là true */}
        </div>
    );
};

export default Layout;
