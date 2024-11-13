import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Sidebar() {
    return (
        <div className="p-3" style={{ width: '250px', borderRight: '1px solid #ddd' }}>
            <h6 className="mb-3">KHOẢNG GIÁ</h6>
            <div className="mb-3">
                <input type="text" className="form-control mb-2" placeholder="Từ" />
                <input type="text" className="form-control mb-2" placeholder="Đến" />
                <button className="btn btn-warning w-100">Áp dụng</button>
            </div>

            <h6 className="mt-4">DUNG TÍCH</h6>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" id="combo" />
                <label className="form-check-label" htmlFor="combo">Combo(41)</label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" id="fullsize" />
                <label className="form-check-label" htmlFor="fullsize">Fullsize(37)</label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" id="minisize" />
                <label className="form-check-label" htmlFor="minisize">Minisize(10)</label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" id="refill" />
                <label className="form-check-label" htmlFor="refill">Refill(1)</label>
            </div>

            <h6 className="mt-4">THÀNH PHẦN NỔI BẬT</h6>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" id="panthenol" />
                <label className="form-check-label" htmlFor="panthenol">Panthenol (Vitamin B5)(11)</label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" id="bha" />
                <label className="form-check-label" htmlFor="bha">BHA (Salicylic Acid)(7)</label>
            </div>
            {/* Thêm các thành phần khác ở đây */}

            <h6 className="mt-4">LOẠI DA</h6>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" id="oily" />
                <label className="form-check-label" htmlFor="oily">Da dầu/Hỗn hợp dầu(33)</label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" id="sensitive" />
                <label className="form-check-label" htmlFor="sensitive">Da nhạy cảm(20)</label>
            </div>
            {/* Thêm các loại da khác ở đây */}

            <h6 className="mt-4">CÔNG DỤNG CHÍNH</h6>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" id="oilControl" />
                <label className="form-check-label" htmlFor="oilControl">Kiểm soát dầu(1)</label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" id="skinRepair" />
                <label className="form-check-label" htmlFor="skinRepair">Phục hồi tái tạo da(6)</label>
            </div>
            {/* Thêm các công dụng khác ở đây */}

            <h6 className="mt-4">LOẠI SẢN PHẨM</h6>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" id="cleanser" />
                <label className="form-check-label" htmlFor="cleanser">Sữa rửa mặt(19)</label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" id="care" />
                <label className="form-check-label" htmlFor="care">Bộ chăm sóc da(18)</label>
            </div>
            {/* Thêm các loại sản phẩm khác ở đây */}

            <h6 className="mt-4">ĐẶC TÍNH</h6>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" id="broadSpectrum" />
                <label className="form-check-label" htmlFor="broadSpectrum">Chống nắng phổ rộng(8)</label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" id="fragranceFree" />
                <label className="form-check-label" htmlFor="fragranceFree">Không hương liệu(2)</label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" id="alcoholFree" />
                <label className="form-check-label" htmlFor="alcoholFree">Không cồn(1)</label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" id="colorFree" />
                <label className="form-check-label" htmlFor="colorFree">Không màu(1)</label>
            </div>
        </div>
    );
}

export default Sidebar;
