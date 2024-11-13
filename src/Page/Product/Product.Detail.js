import React, { useEffect, useState } from 'react';
import { fetchAllProducts } from '../../Component/Service/Product_service';
import { useParams } from 'react-router-dom'; // Lấy id từ URL
import Header2 from '../../Component/Layout/Header/Header2';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel } from 'react-bootstrap';
import stytleproduct from '../../Css/product.module.css'
import style from '../..//Css/ProductDetail.module.css'
import Footer from '../../Component/Layout/Footer/Footer';

function ProductDetail() {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1); // State for product quantity
    const { id } = useParams(); // Lấy id từ URL
    const [dungtich, setdungtich] = useState([]);
    const [dungtichSelected, setdungtichSelected] = useState([]);
    const [luachon, setluachon] = useState([]);
    const [khuyenMai, setKhuyenMai] = useState(null);
    const [timeLeft, setTimeLeft] = useState(null);
    const [giaSelected, setGiaSelected] = useState(null); // State để lưu giá đã chọn

    const [mauSacSelected, setMauSacSelected] = useState(null);

    const handleMauSacClick = (mau) => {
        setMauSacSelected(mau.Mau);
    };
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetchAllProducts();
                console.log("API Response:", response);

                const filteredProducts = response?.dong_san_pham
                    ?.flatMap(dongsp =>
                        dongsp.loai_san_pham.flatMap(loai =>
                            loai.san_pham.filter(product => product.slug == id)
                        )
                    ) || [];

                if (filteredProducts.length > 0) {
                    setProduct(filteredProducts[0]);

                    const bienTheSanPham = filteredProducts[0]?.bien_the_san_pham || [];
                    setdungtich(bienTheSanPham);

                    // Lấy khuyến mãi đầu tiên và tính số ngày khuyến mãi
                    const khuyenMai = filteredProducts[0]?.khuyen_mai_san_pham || [];
                    if (khuyenMai.length > 0) {
                        const sortedKhuyenMai = khuyenMai.sort((a, b) => new Date(a.ThoiGianKetThuc) - new Date(b.ThoiGianKetThuc));
                        const firstPromotion = sortedKhuyenMai[0];

                        setKhuyenMai(firstPromotion); // Lưu khuyến mãi đầu tiên

                        // Tính thời gian còn lại
                        const now = new Date();
                        const endTime = new Date(firstPromotion.ThoiGianKetThuc);
                        const startTime = new Date(firstPromotion.ThoiGianBatDau);

                        const timeDifference = endTime - now; // Tính thời gian còn lại
                        if (timeDifference > 0) {
                            setTimeLeft(timeDifference);
                        } else {
                            setTimeLeft(0); // Nếu đã hết thời gian
                        }
                    }
                } else {
                    console.error("No products found for this ID.");
                    setProduct(null);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Đã xảy ra lỗi khi tải sản phẩm. Vui lòng thử lại.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);


    useEffect(() => {
        let timer;
        if (timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prev => prev - 1000); // Giảm 1 giây (1000 ms)
            }, 1000);
        }

        return () => clearInterval(timer); // Dọn dẹp timer khi component unmount
    }, [timeLeft]);
    const formatTimeLeft = (milliseconds) => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const days = Math.floor(totalSeconds / 86400);
        const hours = Math.floor((totalSeconds % 86400) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return `${days} ngày ${hours} giờ ${minutes} phút ${seconds} giây`;
    };

    const handledungtichclick = (dungtich) => {

        console.log("DUng Tích", dungtich)
        setluachon(dungtich)
        setdungtichSelected(dungtich.ID_BienThe);
        setGiaSelected(dungtich.GiaBan * quantity); // Cập nhật giá khi click vào dung tích

    }
    useEffect(() => {
        // Nếu có dung tích đã chọn, cập nhật giá dựa trên dung tích đó
        if (dungtichSelected && quantity) {
            const selectedDungTich = dungtich.find(d => d.ID_BienThe === dungtichSelected);
            if (selectedDungTich) {
                setGiaSelected(selectedDungTich.GiaBan * quantity);
                return; // Kết thúc nếu đã có dung tích được chọn
            }
        }

        // Nếu chưa chọn dung tích nào và có sản phẩm đầu tiên, lấy giá của sản phẩm đầu tiên
        if (product?.bien_the_san_pham?.length > 0) {
            setGiaSelected(product.bien_the_san_pham[0].GiaBan * quantity);
        }
    }, [dungtichSelected, quantity, product, dungtich]);

    // Hàm tăng số lượng sản phẩm
    const plusProduct = () => {
        setQuantity(prevQuantity => Math.min(prevQuantity + 1, 10)); // Giới hạn số lượng tối đa là 10
    };

    // Hàm giảm số lượng sản phẩm
    const minusProduct = () => {
        setQuantity(prevQuantity => Math.max(prevQuantity - 1, 1)); // Ngăn số lượng nhỏ hơn 1
    };

    if (loading) {
        return <div className="text-center my-5">Loading...</div>;
    }

    if (error) {
        return <div className="text-danger text-center my-5">{error}</div>;
    }

    if (!product) {
        return <div className="text-center text-muted my-5">Không tìm thấy sản phẩm.</div>;
    }


    return (
        <div>
            <Header2 />
            <div className="container my-5">
                <div className="row">
                    <div className="col-lg-6 col-md-6 mb-4">
                        <Carousel>
                            {product.anh_san_pham.map((image, index) => (
                                <Carousel.Item key={index}>
                                    <img
                                        src={image.url_anh}
                                        className="d-block w-100"
                                        alt={`product_image_${index}`}
                                        style={{
                                            height: '500px',
                                            objectFit: 'cover',
                                            borderRadius: '8px'
                                        }}
                                    />
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </div>
                    <div className="col-lg-6 col-md-6">

                        <h3 className="productInfo__name mb-3">{product.ten_san_pham}</h3>
                        <div className={style.khuyenmaicontainer}>
                            {khuyenMai && (
                                <div className={style.khuyenmaiitem}>
                                    <h4>{khuyenMai.TenKhuyenMai}</h4>
                                    <p >Còn lại: {timeLeft !== null ? formatTimeLeft(timeLeft) : "Đã hết thời gian!"}</p>
                                </div>
                            )}
                        </div>
                        {<div className="price__new text-danger font-weight-bold" style={{ fontSize: '1.5rem' }}>
                            {product.khuyen_mai_san_pham?.length > 0 && (
                                <div className="price__new text-danger font-weight-bold" style={{ fontSize: '1.5rem' }}>
                                    {giaSelected == null ? (
                                        Math.round(product?.bien_the_san_pham?.[0]?.GiaBan * (1 - product.khuyen_mai_san_pham[0]?.muc_giam_gia / 100)).toLocaleString() + ' VNĐ'
                                    ) : (
                                        Math.round(giaSelected * (1 - product.khuyen_mai_san_pham[0]?.muc_giam_gia / 100)).toLocaleString() + ' VNĐ'
                                    )}
                                </div>

                            )}
                        </div>}

                        {<div className="">
                            {
                                giaSelected == null ? (
                                    <span>
                                        Giá thị trường: {product?.bien_the_san_pham?.[0]?.GiaBan.toLocaleString()} <span className="priceInfo__unit">VNĐ</span>
                                    </span>
                                ) : (
                                    <span>
                                        Giá thị trường: {giaSelected.toLocaleString()} <span className="priceInfo__unit">VNĐ</span>
                                    </span>
                                )
                            }
                        </div>}
                        <p></p>
                        <p className="text-muted mb-4">Dung Tích</p>

                        <div className="container">

                            <div className="row">
                                {
                                    dungtich.map((row, index) => (
                                        <div className="col-2 d-flex justify-content-center" key={row.ID_BienThe}>
                                            <div className={style.box}
                                                onClick={() => handledungtichclick(row)}
                                                style={{
                                                    position: 'relative',
                                                    border: dungtichSelected == row.ID_BienThe ? '2px solid blue' : '1px solid gray'
                                                }

                                                }
                                            >
                                                {dungtichSelected === row.ID_BienThe && (
                                                    <div style={{
                                                        width: '0',
                                                        height: '0',
                                                        borderTop: '20px solid blue',
                                                        borderLeft: '20px solid transparent',
                                                        position: 'absolute',
                                                        top: '0',
                                                        right: '0'
                                                    }}></div>
                                                )}
                                                {row.KhoiLuong}

                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>

                        <div style={{ marginTop: '10px' }} className="container">
                            <div className="row">
                                {luachon && luachon.MauSac && Array.isArray(luachon.MauSac) && luachon.MauSac.length > 0 ? (
                                    luachon.MauSac.map((mau, index) => (
                                        <div className="col-2 d-flex justify-content-center" key={index}>
                                            <div
                                                className={style.box}
                                                onClick={() => handleMauSacClick(mau)}
                                                style={{
                                                    position: 'relative',
                                                    border: mauSacSelected === mau.Mau ? '2px solid blue' : '1px solid gray',
                                                }}
                                            >
                                                {mauSacSelected === mau.Mau && (
                                                    <div
                                                        style={{
                                                            width: '0',
                                                            height: '0',
                                                            borderTop: '20px solid blue',
                                                            borderLeft: '20px solid transparent',
                                                            position: 'absolute',
                                                            top: '0',
                                                            right: '0',
                                                        }}
                                                    ></div>
                                                )}
                                                {mau.Mau}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No colors available</p>
                                )}
                            </div>
                        </div>
                        <div className="productInfo__addToCart my-4">
                            <div className="d-flex align-items-center mb-3">
                                <button className="btn btn-outline-secondary" type="button" onClick={minusProduct}>-</button>
                                <input
                                    type="text"
                                    className="form-control text-center mx-2"
                                    value={quantity}
                                    readOnly
                                    style={{ maxWidth: '50px' }}
                                />
                                <button className="btn btn-outline-secondary" type="button" onClick={plusProduct}>+</button>
                            </div>
                            <button className="btn btn-primary btn-lg btn-block">Thêm vào giỏ</button>
                        </div>


                        <div className={style.nowfreecontainer}>
                            <div className={style.nowfreeheader}>
                                <span className={style.nowfreelogo}>Now<span style={{ color: '#FF4A00' }}>Free</span></span>
                                <span className={style.nowfreetext}>Giao Nhanh Miễn Phí 2H tại 224 Chi Nhánh:</span>
                            </div>
                            <p className={style.nowfreedescription}>
                                Bạn muốn nhận hàng trước <span className={style.highlight}>10h</span> ngày mai. Đặt hàng trước <span className="highlight">24h</span> và chọn giao hàng <span className="highlight">2H</span> ở bước thanh toán. <a href="#" className="nowfree-link">Xem chi tiết</a>
                            </p>
                            <div className={style.nowfreeactions}>
                                <div className={style.availability}>
                                    <i className="fas fa-store"></i>
                                    <span>219/224 Chi Nhánh còn sản phẩm</span>
                                </div>
                                <button className={style.cartbutton}>
                                    <i className="fas fa-shopping-cart"></i> Giỏ hàng
                                </button>
                                <button className={style.buynowbutton}>
                                    Mua ngay NowFree 2H <span className={style.promotext}>Trả tặng 100k</span>
                                </button>
                            </div>
                        </div>
                    </div>


                </div>
                <div className="productDetail mt-5">
                    <h4 className="mb-4">Mô tả chi tiết</h4>
                    {/* <p>{product.MoTaChinh[0].chi_tiet[0].NoiDung}</p> */}


                </div>

                {/* Tab Section */}
                <ul className="nav nav-tabs my-4" id="productTab" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link active" id="info-tab" data-toggle="tab" href="#info" role="tab">Thông tin</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="spec-tab" data-toggle="tab" href="#spec" role="tab">Thông số</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="ingredients-tab" data-toggle="tab" href="#ingredients" role="tab">Thành phần</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="usage-tab" data-toggle="tab" href="#usage" role="tab">Cách dùng</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="reviews-tab" data-toggle="tab" href="#reviews" role="tab">Đánh giá</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="qa-tab" data-toggle="tab" href="#qa" role="tab">Hỏi đáp</a>
                    </li>
                </ul>
                <div className="tab-content" id="productTabContent">
                    <div className="tab-pane fade show active" id="info" role="tabpanel">
                        <div>
                            {product.MoTaChinh[0]?.chi_tiet?.map((chiTiet, index) => (
                                <div key={index}>
                                    <h5>{chiTiet.TieuDe}</h5>
                                    <p>{chiTiet.NoiDung}</p>
                                </div>
                            ))}
                        </div>

                    </div>
                    <div className="tab-pane fade" id="spec" role="tabpanel">
                        <div className="container mt-4">
                            <h4>Thông Số Sản Phẩm</h4>
                            <table className="table table-bordered">
                                <thead className="thead-light">
                                    <tr>
                                        <th>Tiêu Đề</th>
                                        <th>Nội Dung</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {product.MoTaChinh[1]?.chi_tiet?.map((chiTiet, index) => (
                                        <tr key={index}>
                                            <td>{chiTiet.TieuDe}</td>
                                            <td>{chiTiet.NoiDung}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="ingredients" role="tabpanel">
                        <div className="tab-pane fade show active" id="info" role="tabpanel">
                            <div>
                                {product.MoTaChinh[2]?.chi_tiet?.map((chiTiet, index) => (
                                    <div key={index}>
                                        <h5>{chiTiet.TieuDe}</h5>
                                        <p>{chiTiet.NoiDung}</p>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                    <div className="tab-pane fade" id="usage" role="tabpanel">
                        <div className="tab-pane fade show active" id="info" role="tabpanel">
                            <div>
                                {product.MoTaChinh[3]?.chi_tiet?.map((chiTiet, index) => (
                                    <div key={index}>
                                        <h5>{chiTiet.TieuDe}</h5>
                                        <p>{chiTiet.NoiDung}</p>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                    <div className="tab-pane fade" id="reviews" role="tabpanel">
                    </div>
                    <div className="tab-pane fade" id="qa" role="tabpanel">
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default ProductDetail;
