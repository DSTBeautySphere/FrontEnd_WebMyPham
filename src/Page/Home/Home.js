function Home() {
    return (
        <div className="main__slice">
            <div className="slider">
                <div
                    className="slide active"
                    style={{ backgroundImage: "url(./assets/img/slider/slide-6.jpg)" }}
                >
                    <div className="container">
                        <div className="caption">
                            <h1>Giảm giá 30%</h1>
                            <p>Giảm giá cực sốc trong tháng 6!</p>
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
                            <p>Giảm giá cực sốc trong tháng 6!</p>
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
                            <p>Giảm giá cực sốc trong tháng 6!</p>
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

    );
}

export default Home;