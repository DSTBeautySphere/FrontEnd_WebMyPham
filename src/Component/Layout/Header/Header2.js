import { useEffect, useState } from 'react';
import { fetchAllProducts } from '../../Service/Product_service';
import { useNavigate } from 'react-router-dom';

function Header({ OnLoaiSPClick }) {
    const navigate = useNavigate();
    const [dongsp, setdongsp] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchAllProducts();
            const dongsp = response.dong_san_pham;
            console.log("dongsp", dongsp);
            setdongsp(dongsp);
        };
        fetchData();
    }, []);

    const handleLoaiSanPhamClick = (loaisp) => {
        console.log("loaisp", loaisp);
        navigate(`/danhmuc/${loaisp.ma_loai_san_pham}`);
        OnLoaiSPClick(loaisp);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        // Navigate to the search results page or filter the products as needed
        // For example, you can redirect to a search results page:
        navigate(`/tim-kiem/${searchTerm}`);
        // Hoặc bạn có thể thêm logic để hiển thị kết quả tìm kiếm ngay trong component này
    };

    return (
        <header className="bg-light sticky-top">
            <div className="container">
                <div className="d-flex justify-content-between align-items-center py-2">
                    <a href="index.html" className="navbar-brand">
                        <img width={'20%'} src="/logo192.png" alt="Logo" />
                    </a>
                    {/* <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Tìm kiếm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)} // Cập nhật giá trị tìm kiếm
                        />
                        <button className="btn btn-outline-secondary" type="button" onClick={handleSearch}>
                            <i className="fas fa-search" />
                        </button>
                    </div> */}
                    <div>
                        <a href="#my-Login" className="btn btn-link">Đăng Nhập</a>
                        <a href="#my-Register" className="btn btn-link">Đăng Kí</a>
                    </div>
                    <div className="dropdown">
                        <button className="btn btn-outline-secondary dropdown-toggle" type="button" id="cartDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fas fa-shopping-basket" />
                            <span className="badge bg-danger">3</span>
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="cartDropdown">
                            <li>
                                <div className="dropdown-item">
                                    Tổng cộng: 120.000đ
                                </div>
                            </li>
                            <li>
                                <a href="cart.html" className="dropdown-item">Xem giỏ hàng</a>
                                <a href="pay.html" className="dropdown-item text-danger">Thanh toán</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* Menu */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="/">Trang chủ</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Giới Thiệu</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="productDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Sản Phẩm
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="productDropdown">
                                    {dongsp.length > 0 && dongsp.map((row, index) => (
                                        <li key={index}>
                                            <a className="dropdown-item" href={`/danhmuc/${row.ma_dong_san_pham}`}>
                                                {row.ten_dong_san_pham}
                                            </a>
                                            <ul className="dropdown-submenu">
                                                {row.loai_san_pham.length > 0 && row.loai_san_pham.map((loai, loaiIndex) => (
                                                    <li key={loaiIndex}>
                                                        <a onClick={() => handleLoaiSanPhamClick(loai)} className="dropdown-item">
                                                            {loai.ten_loai_san_pham}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="news.html">Tin Tức</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="contact.html">Liên Hệ</a>
                            </li>
                        </ul>
                        <form className="d-flex" onSubmit={handleSearch}>
                            <input className="form-control me-2" type="search" placeholder="Tìm sản phẩm..." aria-label="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                            <button className="btn btn-outline-success" type="submit">
                                <i className="fas fa-search" />
                            </button>
                        </form>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;
