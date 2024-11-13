import React, { useEffect, useState } from 'react'; // Đảm bảo đã nhập useEffect và useState
import { useParams, Link } from 'react-router-dom'; // Lấy id từ URLimport Header from '../../Component/Layout/Header/Header';
import { fetchAllProducts } from '../../Component/Service/Product_service';
import Header from '../../Component/Layout/Header/Header';
import Slider from 'react-slick';
import Footer from '../../Component/Layout/Footer/Footer';
import style from '../../Css/product.module.css'
function Home() {

    useEffect(() => {
        document.body.style.fontFamily = "'Roboto Slab', serif";
        document.body.style.fontSize = '62.5%';

        return () => {
            document.body.style.fontFamily = ''; // Hoàn tác khi rời khỏi trang
            document.body.style.fontSize = ''; // Hoàn tác khi rời khỏi trang
        };
    }, []);



    const [products, setProducts] = useState([]);
    const totalApplications = products.length;

    const settings = {
        dots: false,
        infinite: totalApplications > 3, // Nếu ít hơn hoặc bằng 3 thì tắt infinite
        pauseOnHover: true,
        autoplay: true,
        speed: 500,
        slidesToShow: 6, // Hiển thị tối đa 4
        speed: 200, // Animation speed
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                },
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: Math.min(totalApplications, 3), // Hiển thị tối đa 3
                },
            },
            {
                breakpoint: 1150,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchAllProducts();
            let allProducts = [];

            // Lấy tất cả sản phẩm từ response
            response?.dong_san_pham.forEach(dongsp => {
                dongsp.loai_san_pham.forEach(loai => {
                    allProducts = [...allProducts, ...loai.san_pham];
                });
            });

            // Lấy 20 sản phẩm đầu tiên
            const firstTwentyProducts = allProducts.slice(0, 20);
            setProducts(firstTwentyProducts);
        };

        fetchData();
    }, []);
    return (




        <div className='home'>
            <Header />

            <div className="main">
                {/* Slider */}
                <div className="main__slice">
                    <div className="slider">
                        <div
                            className="slide active"
                            style={{ backgroundImage: "url(./assets/img/slider/slide-6.jpg)" }}
                        >
                            <div className="container">
                                <div className="caption">
                                    <h1>Giảm giá 30%</h1>
                                    <p>Giảm giá cực sốc trong tháng 11</p>
                                    <a href="listProduct.html" className="btn btn--default">
                                        Xem ngay
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div
                            className="slide active"
                            style={{ backgroundImage: "url(./assets/img/slider/slide-4.jpg)" }}
                        >
                            <div className="container">
                                <div className="caption">
                                    <h1>Giảm giá 30%</h1>
                                    <p>Giảm giá cực sốc trong tháng 11</p>
                                    <a href="listProduct.html" className="btn btn--default">
                                        Xem ngay
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div
                            className="slide active"
                            style={{ backgroundImage: "url(./assets/img/slider/slide-5.jpg)" }}
                        >
                            <div className="container">
                                <div className="caption">
                                    <h1>Giảm giá 30%</h1>
                                    <p>Giảm giá cực sốc trong tháng 11</p>
                                    <a href="listProduct.html" className="btn btn--default">
                                        Xem ngay
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* controls  */}
                    <div className="controls">
                        <div className="prev">
                            <i className="fas fa-chevron-left" />
                        </div>
                        <div className="next">
                            <i className="fas fa-chevron-right" />
                        </div>
                    </div>
                    {/* indicators */}
                    <div className="indicator"></div>
                </div>
                {/*Product Category */}
                <div className="main__tabnine">
                    <div className="grid wide">
                        {/* Tab items */}
                        <div className="tabs">
                            <div className="tab-item active">Bán Chạy</div>
                            <div className="tab-item">Giá tốt</div>
                            <div className="tab-item">Mới Nhập</div>
                            <div className="line" />
                        </div>
                        {/* Tab content */}
                        <div className="tab-pane active">
                            <div className="row">
                                {products.map((product, index) => (
                                    <div key={index} className="col l-2 m-4 s-6">
                                        <div className="product">
                                            {/* Hiển thị hình ảnh sản phẩm */}
                                            <Link to={`/product/${product.ma_san_pham}`}>
                                                <div
                                                    className="card-img-top"
                                                    style={{
                                                        backgroundImage: `url(${product.anh_san_pham[0]?.url_anh})`, // URL hình ảnh
                                                        backgroundSize: 'cover',
                                                        backgroundPosition: 'center',
                                                        height: '250px', // Chiều cao của hình ảnh
                                                        borderRadius: '10px 10px 0 0', // Bo góc cho hình ảnh
                                                        width: '150px'
                                                    }}
                                                    aria-label={product.ten_san_pham} // Thêm aria-label cho accessibility
                                                ></div>
                                            </Link>
                                            <div className="product__info">
                                                <h className="product__name">{product.ten_san_pham}</h> {/* Tên sản phẩm */}
                                                <div className="product__price">
                                                    <div className="text-muted price__old" style={{ textDecoration: 'line-through', fontSize: '0.9rem' }}>
                                                        {
                                                            product.bien_the_san_pham?.length > 0 &&
                                                            (
                                                                <span> {product.bien_the_san_pham[0]?.GiaBan}đ   </span>
                                                            )
                                                        }
                                                    </div>
                                                    <div className="price__new text-danger font-weight-bold" style={{ fontSize: '0.5rem' }}>
                                                        {product.khuyen_mai_san_pham?.length > 0 && (
                                                            <div className="price__new text-danger font-weight-bold" style={{ fontSize: '1.2rem' }}>
                                                                {/* Calculate and show the discounted price */}
                                                                {Math.round(product.bien_the_san_pham[0]?.GiaBan * (1 - product.khuyen_mai_san_pham[0]?.muc_giam_gia / 100)).toLocaleString()} Đ
                                                            </div>
                                                        )}
                                                    </div>

                                                </div>
                                                {product.khuyen_mai_san_pham && product.khuyen_mai_san_pham.length > 0 && (
                                                    <div className="product__sale">
                                                        <span className="product__sale-percent">{product.khuyen_mai_san_pham[0].muc_giam_gia}%</span> {/* Phần trăm giảm giá */}
                                                        <span className="product__sale-text">Giảm</span>
                                                    </div>
                                                )}
                                            </div>
                                            <Link to={`/product/${product.slug}`} className="viewDetail"> {/* Đường dẫn đến chi tiết sản phẩm */}
                                                Xem chi tiết
                                            </Link>
                                            <a href="cart.html" className="addToCart">
                                                Thêm vào giỏ
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
                {/* HightLight  */}
                <div className="main__frame">
                    <h3 class="category__heading">SẢN PHẨM NỔI BẬT</h3>

                    <div className="grid wide">
                        <Slider {...settings}>
                            {products.map((product) => (
                                <div key={product.id} className="product-card">
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
                                    <p></p>
                                    <div className="card-body d-flex flex-column">
                                        <h9 className="card-title font-weight-bold text-center">
                                            {product.ten_san_pham}
                                        </h9>
                                        <div className="card-text text-center mb-3">

                                            <div className="price__new text-danger font-weight-bold" style={{ fontSize: '0.5rem' }}>
                                                {product.khuyen_mai_san_pham?.length > 0 && (
                                                    <div className="price__new text-danger font-weight-bold" style={{ fontSize: '1.2rem' }}>
                                                        {/* Calculate and show the discounted price */}
                                                        {Math.round(product.bien_the_san_pham[0]?.GiaBan * (1 - product.khuyen_mai_san_pham[0]?.muc_giam_gia / 100)).toLocaleString()} Đ
                                                    </div>
                                                )}
                                            </div>
                                            {product.khuyen_mai_san_pham?.length > 0 && (
                                                <div className="text-success product__promotion">
                                                    <span>Áp dụng từ {new Date(product.khuyen_mai_san_pham[0]?.ThoiGianBatDau).toLocaleDateString()} đến {new Date(product.khuyen_mai_san_pham[0]?.ThoiGianKetThuc).toLocaleDateString()}</span>
                                                </div>
                                            )}

                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>

                <div className={style.mainBanner}>

                    <div className="container">
                        <div className='row'>
                            <div className='col-4'>
                                <img style={{ border: '1px solid white', borderRadius: '10px' }} width={'90%'} src='https://thietkehaithanh.com/wp-content/uploads/2013/06/thietkehaithanh-banner-my-pham-1.jpg'></img>
                            </div>
                            <div className='col-4'>
                                <img style={{ border: '1px solid white', borderRadius: '10px' }} width={'90%'} src='https://ktpdesign.vn/wp-content/uploads/2020/09/5cf8b870584061.5d32a70860746.jpg'></img>
                            </div>
                            <div className='col-4'>
                                <img style={{ border: '1px solid white', borderRadius: '10px' }} width={'90%'} src='https://ktpdesign.vn/wp-content/uploads/2020/09/5404a970584061.5d04b74a08a02.jpg'></img>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sales Policy */}
                <div className="main__policy">
                    <div className="row">
                        <div className="col l-3 m-6">
                            <div className="policy bg-1">
                                <img src="./assets/img/policy/policy1.png" className="policy__img" />
                                <div className="policy__info">
                                    <h3 className="policy__title">GIAO HÀNG MIỄN PHÍ</h3>
                                    <p className="policy__description">Cho đơn hàng từ 300K</p>
                                </div>
                            </div>
                        </div>
                        <div className="col l-3 m-6">
                            <div className="policy bg-2">
                                <img src="./assets/img/policy/policy2.png" className="policy__img" />
                                <div className="policy__info">
                                    <h3 className="policy__title">ĐỔI TRẢ HÀNG</h3>
                                    <p className="policy__description">Trong 3 ngày đầu tiên</p>
                                </div>
                            </div>
                        </div>
                        <div className="col l-3 m-6">
                            <div className="policy bg-1">
                                <img src="./assets/img/policy/policy3.png" className="policy__img" />
                                <div className="policy__info">
                                    <h3 className="policy__title">HÀNG CHÍNH HÃNG</h3>
                                    <p className="policy__description">Cam kết chất lượng</p>
                                </div>
                            </div>
                        </div>
                        <div className="col l-3 m-6">
                            <div className="policy bg-2">
                                <img src="./assets/img/policy/policy4.png" className="policy__img" />
                                <div className="policy__info">
                                    <h3 className="policy__title">TƯ VẤN 24/24</h3>
                                    <p className="policy__description">Giải đáp mọi thắc mắc</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* News */}
                <div className="main__frame bg-3">
                    <div className="grid wide">
                        <h3 className="category__heading">Tin Tức</h3>
                        <div className="owl-carousel news owl-theme">
                            <a href="news.html" className="news">
                                <div className="news__img">
                                    <img src="./assets/img/news/news1.jpg" alt="" />
                                </div>
                                <div className="news__body">
                                    <h3 className="news__body-title">Trang điểm đúng cách</h3>
                                    <div className="new__body-date">20/10/2024</div>
                                    <p className="news__description">
                                        Mặc dù chúng tôi luôn cố gắng đảm bảo rằng mọi thông tin đều chính xác, nhưng đôi khi nhà sản xuất có thể thay đổi danh sách thành phần của sản phẩm. Bao bì và thành phần trong thực tế có thể khác biệt với những gì được mô tả trên website. Chúng tôi khuyến cáo bạn không nên chỉ dựa trên thông tin được ghi trên website, mà hãy luôn luôn đọc nhãn mác, cảnh báo và hướng dẫn sử dụng trước khi dùng sản phẩm. Để biết thêm thông tin, vui lòng liên hệ nhà sản xuất. Nội dung trên trang web này chỉ được dùng để tham khảo, không thể thay thế chỉ dẫn của dược sỹ, bác sỹ và các chuyên gia sức khỏe. Bạn không nên sử dụng thông tin này để tự chẩn đoán và điều trị bệnh của mình. Hãy liên hệ các cơ quan y tế ngay lập tức nếu bạn nghi ngờ mình đang gặp vấn đề về sức khỏe. Các thông tin và công bố liên quan đến thực phẩm chức năng giảm cân chưa được thẩm định bởi Cục quản lý Thực phẩm và Dược phẩm, cũng như không được dùng để chẩn đoán, điều trị, chữa trị, hay phòng ngừa bệnh tật cùng các vấn đề sức khỏe khác. Chúng tôi không chịu trách nhiệm về nhầm lẫn hay sai lệch về sản phẩm.
                                    </p>
                                </div>
                            </a>
                            <a href="news.html" className="news">
                                <div className="news__img">
                                    <img src="./assets/img/news/news1.jpg" alt="" />
                                </div>
                                <div className="news__body">
                                    <h3 className="news__body-title">Trang điểm đúng cách</h3>
                                    <div className="new__body-date">20/10/2024</div>
                                    <p className="news__description">
                                        – Hơn 75% phụ nữ cảm thấy làn da của họ trông trẻ trung hơn chỉ sau 4 tuần. Da cảm thấy mịn màng hơn, ngậm nước, mạnh mẽ hơn.

                                        – Hơn 82% cảm thấy da của họ bị ngậm nước. Da trông trẻ hơn, rạng rỡ hơn, săn chắc hơn.

                                        – Hơn 83% cảm thấy làn da của họ trông khỏe mạnh hơn, tươi hơn, được nghỉ ngơi nhiều hơn chỉ sau 4 tuần
                                    </p>
                                </div>
                            </a>
                            <a href="news.html" className="news">
                                <div className="news__img">
                                    <img src="./assets/img/news/news1.jpg" alt="" />
                                </div>
                                <div className="news__body">
                                    <h3 className="news__body-title">Trang điểm đúng cách</h3>
                                    <div className="new__body-date">20/10/2024</div>
                                    <p className="news__description">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. In sit
                                        molestiae aperiam modi cum deserunt, maxime blanditiis voluptate
                                        officiis accusantium minima pariatur harum tenetur quo iste iusto
                                        commodi. Modi, culpa?
                                    </p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="main__bands">
                    <div className="grid wide">
                        <div className="owl-carousel bands">
                            <a
                                href="listProduct.html"
                                className="band__item"
                                style={{ backgroundImage: "url(./assets/img/band/band1.png)" }}
                            />
                            <a
                                href="listProduct.html"
                                className="band__item"
                                style={{ backgroundImage: "url(./assets/img/band/band2.png)" }}
                            />
                            <a
                                href="listProduct.html"
                                className="band__item"
                                style={{ backgroundImage: "url(./assets/img/band/band3.png)" }}
                            />
                            <a
                                href="listProduct.html"
                                className="band__item"
                                style={{ backgroundImage: "url(./assets/img/band/band4.png)" }}
                            />
                            <a
                                href="listProduct.html"
                                className="band__item"
                                style={{ backgroundImage: "url(./assets/img/band/band5.png)" }}
                            />
                            <a
                                href="listProduct.html"
                                className="band__item"
                                style={{ backgroundImage: "url(./assets/img/band/band6.png)" }}
                            />
                            <a
                                href="listProduct.html"
                                className="band__item"
                                style={{ backgroundImage: "url(./assets/img/band/band7.png)" }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default Home;
