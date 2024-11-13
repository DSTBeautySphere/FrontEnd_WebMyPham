function Footer() {
    return (
        <div className="footer">
            <div className="grid wide">
                <div className="row">
                    <div className="col l-3 m-6 s-12">
                        <h3 className="footer__title">Menu</h3>
                        <ul className="footer__list">
                            <li className="footer__item">
                                <a href="#" className="footer__link">
                                    Trang điểm
                                </a>
                            </li>
                            <li className="footer__item">
                                <a href="#" className="footer__link">
                                    Chăm sóc da
                                </a>
                            </li>
                            <li className="footer__item">
                                <a href="#" className="footer__link">
                                    Chăm sóc tóc
                                </a>
                            </li>
                            <li className="footer__item">
                                <a href="#" className="footer__link">
                                    Nước hoa
                                </a>
                            </li>
                            <li className="footer__item">
                                <a href="#" className="footer__link">
                                    Chăm sóc toàn thân{" "}
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="col l-3 m-6 s-12">
                        <h3 className="footer__title">Hỗ trợ khách hàng</h3>
                        <ul className="footer__list">
                            <li className="footer__item">
                                <a href="#" className="footer__link">
                                    Hướng dẫn mua hàng
                                </a>
                            </li>
                            <li className="footer__item">
                                <a href="#" className="footer__link">
                                    Giải đáp thắc mắc
                                </a>
                            </li>
                            <li className="footer__item">
                                <a href="#" className="footer__link">
                                    Chính sách mua hàng
                                </a>
                            </li>
                            <li className="footer__item">
                                <a href="#" className="footer__link">
                                    Chính sách đổi trả
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="col l-3 m-6 s-12">
                        <h3 className="footer__title">Liên hệ</h3>
                        <ul className="footer__list">
                            <li className="footer__item">
                                <span className="footer__text">
                                    <i className="fas fa-map-marked-alt" /> 319 C16 Lý Thường Kiệt,
                                    Phường 15, Quận 11, Tp.HCM
                                </span>
                            </li>
                            <li className="footer__item">
                                <a href="#" className="footer__link">
                                    <i className="fas fa-phone" /> 038 555 1577
                                </a>
                            </li>
                            <li className="footer__item">
                                <a href="#" className="footer__link">
                                    <i className="fas fa-envelope" /> Huynhsang1020@gmail.com
                                </a>
                            </li>
                            <li className="footer__item">
                                <div className="social-group">
                                    <a href="#" className="social-item">
                                        <i className="fab fa-facebook-f" />
                                    </a>
                                    <a href="#" className="social-item">
                                        <i className="fab fa-twitter" />
                                    </a>
                                    <a href="#" className="social-item">
                                        <i className="fab fa-pinterest-p" />
                                    </a>
                                    <a href="#" className="social-item">
                                        <i className="fab fa-invision" />
                                    </a>
                                    <a href="#" className="social-item">
                                        <i className="fab fa-youtube" />
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="col l-3 m-6 s-12">
                        <h3 className="footer__title">Đăng kí</h3>
                        <ul className="footer__list">
                            <li className="footer__item">
                                <span className="footer__text">
                                    Đăng ký để nhận được được thông tin ưu đãi mới nhất từ chúng tôi.
                                </span>
                            </li>
                            <li className="footer__item">
                                <div className="send-email">
                                    <input
                                        className="send-email__input"
                                        type="email"
                                        placeholder="Nhập Email..."
                                    />
                                    <a href="#" className="send-email__link">
                                        <i className="fas fa-paper-plane" />
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="copyright">
                <span className="footer__text">
                    {" "}
                    © Bản quyền thuộc về{" "}
                    <a className="footer__link" href="#">
                        {" "}
                        SangSang
                    </a>
                </span>
            </div>
        </div>

    );
}

export default Footer;
