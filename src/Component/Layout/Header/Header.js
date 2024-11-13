import { useEffect, useState } from 'react';
import { fetchAllProducts } from '../../Service/Product_service'
import { useNavigate } from 'react-router-dom';

function Header({ OnLoaiSPClick }) {
    const navigate = useNavigate();
    const [dongsp, setdongsp] = useState([]);
    const [sanpham, setsanpham] = useState([]);
    const [isFixed, setIsFixed] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const reponse = await fetchAllProducts();
            const dongsp = reponse.dong_san_pham;
            console.log("dongsp", dongsp)
            setdongsp(dongsp);
        }
        fetchData();
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsFixed(true);
            } else {
                setIsFixed(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleLoaiSanPhamClick = (loaisp) => {
        console.log("loaisp", loaisp);
        navigate(`/danhmuc/${loaisp.ma_loai_san_pham}`); // Assuming loaisp has a property `ma_loai_san_pham`
        OnLoaiSPClick(loaisp);
    }


    return (
        <div className="header scrolling" id="myHeader">
            <div className="grid wide">
                <div className="header__top">
                    <div className="navbar-icon">
                        <span />
                        <span />
                        <span />
                    </div>
                    <a href="index.html" className="header__logo">
                        <img src="./assets/logo.png" alt="" />
                    </a>
                    <div className="header__search">
                        <div className="header__search-wrap">
                            <input
                                type="text"
                                className="header__search-input"
                                placeholder="Tìm kiếm"
                            />
                            <a className="header__search-icon" href="#">
                                <i className="fas fa-search" />
                            </a>
                        </div>
                    </div>
                    <div className="header__account">
                        <a href="#my-Login" className="header__account-login">
                            Đăng Nhập
                        </a>
                        <a href="#my-Register" className="header__account-register">
                            Đăng Kí
                        </a>
                    </div>
                    {/* Cart */}
                    <div className="header__cart have" href="#">
                        <i className="fas fa-shopping-basket" />
                        <div className="header__cart-amount">3</div>
                        <div className="header__cart-wrap">
                            <ul className="order__list">
                                <li className="item-order">
                                    <div className="order-wrap">
                                        <a href="product.html" className="order-img">
                                            <img src="./assets/img/product/product1.jpg" alt="" />
                                        </a>
                                        <div className="order-main">
                                            <a href="product.html" className="order-main-name">
                                                Áo sơ mi caro kèm belt caro kèm belt Áo sơ mi caro kèm belt
                                            </a>
                                            <div className="order-main-price">2 x 45,000 ₫</div>
                                        </div>
                                        <a href="product.html" className="order-close">
                                            <i className="far fa-times-circle" />
                                        </a>
                                    </div>
                                </li>
                                <li className="item-order">
                                    <div className="order-wrap">
                                        <a href="product.html" className="order-img">
                                            <img src="./assets/img/product/product1.jpg" alt="" />
                                        </a>
                                        <div className="order-main">
                                            <a href="product.html" className="order-main-name">
                                                Áo sơ mi caro kèm belt caro kèm belt Áo sơ mi caro kèm belt
                                            </a>
                                            <div className="order-main-price">2 x 45,000 ₫</div>
                                        </div>
                                        <a href="product.html" className="order-close">
                                            <i className="far fa-times-circle" />
                                        </a>
                                    </div>
                                </li>
                                <li className="item-order">
                                    <div className="order-wrap">
                                        <a href="product.html" className="order-img">
                                            <img src="./assets/img/product/product1.jpg" alt="" />
                                        </a>
                                        <div className="order-main">
                                            <a href="product.html" className="order-main-name">
                                                Áo sơ mi caro kèm belt caro kèm belt Áo sơ mi caro kèm belt
                                            </a>
                                            <div className="order-main-price">2 x 45,000 ₫</div>
                                        </div>
                                        <a href="product.html" className="order-close">
                                            <i className="far fa-times-circle" />
                                        </a>
                                    </div>
                                </li>
                            </ul>
                            <div className="total-money">Tổng cộng: 120.000đ</div>
                            <a href="cart.html" className="btn btn--default cart-btn">
                                Xem giỏ hàng
                            </a>
                            <a href="pay.html" className="btn btn--default cart-btn orange">
                                Thanh toán
                            </a>
                            {/* norcart */}
                            {/* <img class="header__cart-img-nocart" src="http://www.giaybinhduong.com/images/empty-cart.png" alt=""> */}
                        </div>
                    </div>
                </div>
            </div>
            {/* Menu */}
            <div className="header__nav">
                <ul className="header__nav-list">
                    <li className="header__nav-item nav__search">
                        <div className="nav__search-wrap">
                            <input
                                className="nav__search-input"
                                type="text"
                                name=""
                                id=""
                                placeholder="Tìm sản phẩm..."
                            />
                        </div>
                        <div className="nav__search-btn">
                            <i className="fas fa-search" />
                        </div>
                    </li>
                    <li className="header__nav-item authen-form">
                        <a href="#" className="header__nav-link">
                            Tài Khoản
                        </a>
                        <ul className="sub-nav">
                            <li className="sub-nav__item">
                                <a href="#my-Login" className="sub-nav__link">
                                    Đăng Nhập
                                </a>
                            </li>
                            <li className="sub-nav__item">
                                <a href="#my-Register" className="sub-nav__link">
                                    Đăng Kí
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li className="header__nav-item index">
                        <a href="index.html" className="header__nav-link">
                            Trang chủ
                        </a>
                    </li>
                    <li className="header__nav-item">
                        <a href="#" className="header__nav-link">
                            Giới Thiệu
                        </a>
                    </li>
                    <li className="header__nav-item">
                        <a href="#" className="header__nav-link">
                            Sản Phẩm
                        </a>
                        <div className="sub-nav-wrap container-fluid">
                            <div className="row">
                                {dongsp.length > 0 && dongsp.map((row, index) => (
                                    <div key={index} className="col-lg-2">
                                        <div className="sub-nav__item">
                                            <a href={`/danhmuc/${row.ma_dong_san_pham}`} className="sub-nav__link heading d-block mb-2">
                                                {row.ten_dong_san_pham}
                                            </a>
                                            <ul className="list-unstyled">
                                                {row.loai_san_pham.length > 0 && row.loai_san_pham.map((loai, loaiIndex) => (
                                                    <li key={loaiIndex} className="mb-1">
                                                        <a href={`/loaisanpham/${loai.ma_loai_san_pham}`} className="sub-nav__link d-block">
                                                            {loai.ten_loai_san_pham}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </li>
                    <li className="header__nav-item">
                        <a href="news.html" className="header__nav-link">
                            Tin Tức
                        </a>
                    </li>
                    <li className="header__nav-item">
                        <a href="contact.html" className="header__nav-link">
                            Liên Hệ
                        </a>
                    </li>
                </ul>
            </div>
        </div>

    );
}

export default Header;