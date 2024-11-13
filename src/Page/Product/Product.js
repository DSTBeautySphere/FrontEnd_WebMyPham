import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'; // Lấy id từ URL
import { fetchAllProducts } from '../../Component/Service/Product_service';
import Header2 from '../../Component/Layout/Header/Header2';
import Sidebar from '../../Component/Layout/Sidebar/Sidebar';
import SortBar from '../../Component/Layout/Sidebar/Sortbar';
function Product() {
    const { id } = useParams(); // Lấy id từ URL
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeSort, setActiveSort] = useState('');

    console.log("id", id);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null); // Reset error state
            try {
                const response = await fetchAllProducts();
                let filteredProducts = [];

                // Kiểm tra xem id là loại sản phẩm hay dòng sản phẩm
                if (window.location.pathname.startsWith('/danhmuc')) {
                    // Lọc theo dòng sản phẩm
                    filteredProducts = response?.dong_san_pham
                        ?.filter(dongsp => dongsp.ma_dong_san_pham == id)
                        .flatMap(dongsp => dongsp.loai_san_pham.flatMap(loai => loai.san_pham));
                } else if (window.location.pathname.startsWith('/loaisanpham')) {
                    // Lọc theo loại sản phẩm
                    filteredProducts = response?.dong_san_pham
                        ?.flatMap(dongsp =>
                            dongsp.loai_san_pham
                                .filter(loai => loai.ma_loai_san_pham == id)
                                .flatMap(loai => loai.san_pham)
                        );
                }

                console.log(">>>>>>>", filteredProducts);
                if (filteredProducts && filteredProducts.length > 0) {
                    setProducts(filteredProducts);
                } else {
                    console.error("Không tìm thấy sản phẩm cho loại này.");
                    setProducts([]); // Đảm bảo setProducts là mảng rỗng
                }
            } catch (error) {
                console.error("Lỗi khi fetch dữ liệu:", error);
                setError("Có lỗi xảy ra khi tải sản phẩm. Vui lòng thử lại."); // Set error message
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const sortPriceDescending = () => {
        const sorted = [...products].sort((a, b) => {
            const discountA = a.khuyen_mai_san_pham?.[0]?.muc_giam_gia || 0;
            const discountB = b.khuyen_mai_san_pham?.[0]?.muc_giam_gia || 0;

            const priceA = a.bien_the_san_pham[0]?.GiaBan * (1 - discountA / 100);
            const priceB = b.bien_the_san_pham[0]?.GiaBan * (1 - discountB / 100);

            return priceB - priceA;
        });
        setProducts(sorted);
        setActiveSort('Giá cao đến thấp');
    };

    const sortPriceAscending = () => {
        const sorted = [...products].sort((a, b) => {
            const discountA = a.khuyen_mai_san_pham?.[0]?.muc_giam_gia || 0;
            const discountB = b.khuyen_mai_san_pham?.[0]?.muc_giam_gia || 0;

            const priceA = a.bien_the_san_pham[0]?.GiaBan * (1 - discountA / 100);
            const priceB = b.bien_the_san_pham[0]?.GiaBan * (1 - discountB / 100);

            return priceA - priceB; // Sắp xếp từ thấp đến cao
        });
        setProducts(sorted);
        setActiveSort('Giá thấp đến cao');
    };


    return (
        <div>
            <Header2 />
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-3'>
                        <Sidebar></Sidebar>
                    </div>
                    <div className='col-9'>
                        <SortBar
                            activeSort={activeSort}
                            setActiveSort={setActiveSort}
                            sortPriceDescending={sortPriceDescending}
                            sortPriceAscending={sortPriceAscending} // Thêm hàm này vào props
                        />                        <div className="container mt-4">
                            {loading ? (
                                <div className="alert alert-info">Đang tải sản phẩm...</div>
                            ) : error ? (
                                <div className="alert alert-danger">{error}</div>
                            ) : products.length === 0 ? (
                                <div className="alert alert-warning">Không có sản phẩm nào trong loại này.</div>
                            ) : (
                                <div className="row">
                                    {products.map(product => (
                                        <div className="col-md-3 mb-4" key={product.ma_san_pham}>
                                            <Link to={`/product/${product.slug}`} style={{ textDecoration: 'none' }}>
                                                <div className="card h-100 shadow-sm">
                                                    <div
                                                        className="card-img-top"
                                                        style={{
                                                            backgroundImage: `url(${product.anh_san_pham[0]?.url_anh})`,
                                                            backgroundSize: 'cover',
                                                            backgroundPosition: 'center',
                                                            height: '250px',
                                                            borderRadius: '10px 10px 0 0',
                                                        }}
                                                        aria-label={product.ten_san_pham}
                                                    ></div>
                                                    <div className="card-body d-flex flex-column">
                                                        <h5 className="card-title font-weight-bold text-center">
                                                            {product.ten_san_pham}
                                                        </h5>
                                                        <div className="card-text text-center mb-3">
                                                            <div className="text-muted price__old" style={{ textDecoration: 'line-through' }}>
                                                                {
                                                                    product.bien_the_san_pham?.length > 0 &&
                                                                    (
                                                                        <span> {product.bien_the_san_pham[0]?.GiaBan}đ   </span>
                                                                    )
                                                                }
                                                            </div>
                                                            <div className="price__new text-danger font-weight-bold" style={{ fontSize: '1.5rem' }}>
                                                                {product.khuyen_mai_san_pham?.length > 0 && (
                                                                    <div className="price__new text-danger font-weight-bold" style={{ fontSize: '1.5rem' }}>
                                                                        {/* Calculate and show the discounted price */}
                                                                        {Math.round(product.bien_the_san_pham[0]?.GiaBan * (1 - product.khuyen_mai_san_pham[0]?.muc_giam_gia / 100)).toLocaleString()} VNĐ
                                                                    </div>
                                                                )}
                                                            </div>


                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default Product;
