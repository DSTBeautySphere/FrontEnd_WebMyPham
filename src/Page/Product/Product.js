import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAllProducts } from '../../Component/Service/Product_service';

function Product({ loaisp }) {
    console.log(":::>>>", loaisp);

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchAllProducts();

                // Kiểm tra cấu trúc của response
                const datasp = response?.dong_san_pham?.[0]?.loai_san_pham?.[0]?.san_pham;

                if (Array.isArray(datasp)) {
                    console.log("datasp", datasp);
                    console.log("loaisp", loaisp);

                    if (loaisp.length === 0) { // Kiểm tra nếu loaisp là null hoặc undefined
                        setProducts(datasp);
                    } else if (loaisp && loaisp.san_pham) {
                        setProducts(loaisp.san_pham); // Lưu sản phẩm vào state
                    }
                } else {
                    console.error("Dữ liệu không có trong response hoặc không phải là mảng.");
                }
            } catch (error) {
                console.error("Lỗi khi fetching dữ liệu:", error);
            }
        };

        console.log("loaisp", loaisp); // Kiểm tra giá trị của loaisp
        fetchData();
    }, [loaisp]);

    useEffect(() => {
        console.log("products updated:", products); // Kiểm tra sản phẩm sau khi cập nhật
    }, [products]);

    return (
        <div className="main">
            <div style={{ marginTop: '150px' }} className="grid wide">
                <div className="main__taskbar">
                    <div className="main__breadcrumb">
                        <div className="breadcrumb__item">
                            <a href="#" className="breadcrumb__link">
                                Trang chủ
                            </a>
                        </div>
                        <div className="breadcrumb__item">
                            <a href="#" className="breadcrumb__link">
                                Cửa hàng
                            </a>
                        </div>
                        <div className="breadcrumb__item">
                            <a href="#" className="breadcrumb__link">
                                Hãng DHC
                            </a>
                        </div>
                    </div>
                    <div className="main__sort">
                        <h3 className="sort__title">Hiển thị kết quả theo</h3>
                        <select className="sort__select">
                            {" "}
                            name="" id=""&gt;
                            <option value={1}>Thứ tự mặc định</option>
                            <option value={2}>Mức độ phổ biến</option>
                            <option value={3}>Điểm đánh giá</option>
                            <option value={4}>Mới cập nhật</option>
                            <option value={5}>Giá : Cao đến thấp</option>
                            <option value={6}>Giá Thấp đến cao</option>
                        </select>
                    </div>
                </div>
                <div className="productList">
                    <div className="listProduct">
                        <div className="row">
                            {products.map(product => (
                                <div className="col l-2 m-4 s-6" key={product.ma_san_pham}>
                                    <div className="product">
                                        <div
                                            className="product__avt"
                                            style={{
                                                backgroundImage: `url(${product.anh_san_pham[0]?.url_anh})`, // Ảnh chính
                                                backgroundSize: 'cover', // Đảm bảo ảnh được hiển thị đầy đủ
                                                height: '200px', // Đặt chiều cao cho ảnh
                                            }}
                                        ></div>
                                        <div className="product__info">
                                            <h3 className="product__name">{product.ten_san_pham}</h3>
                                            <div className="product__price">
                                                <div className="price__old">
                                                    {/* Nếu có giá cũ, bạn có thể hiển thị ở đây */}
                                                    <span className="price__unit">đ</span>
                                                </div>
                                                <div className="price__new">
                                                    {product.gia_ban} <span className="price__unit">đ</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="product__sale">
                                            <span className="product__sale-percent">Giảm giá</span>
                                            <span className="product__sale-text">{product.tinh_trang}</span>
                                        </div>
                                        <a href="#" className="viewDetail">
                                            Xem chi tiết
                                        </a>
                                        <a href="#" className="addToCart">
                                            Thêm vào giỏ
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>


            </div>
        </div>

    );
}

export default Product;
