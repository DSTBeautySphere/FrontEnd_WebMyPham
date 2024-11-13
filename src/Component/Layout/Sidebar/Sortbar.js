import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function SortBar({ activeSort, setActiveSort, sortPriceDescending, sortPriceAscending }) {
    return (
        <div className="d-flex justify-content-between align-items-center p-2 border bg-light">
            <div className="btn-group" role="group" aria-label="Sort options">
                <button
                    type="button"
                    className={`btn ${activeSort === 'Sắp xếp' ? 'btn-primary' : 'btn-outline-secondary'}`}
                    onClick={() => setActiveSort('Sắp xếp')}
                >
                    Sắp xếp
                </button>
                <button
                    type="button"
                    className={`btn ${activeSort === 'Mới nhất' ? 'btn-primary' : 'btn-outline-secondary'}`}
                    onClick={() => setActiveSort('Mới nhất')}
                >
                    Mới nhất
                </button>
                <button
                    type="button"
                    className={`btn ${activeSort === 'Bán chạy' ? 'btn-primary' : 'btn-outline-secondary'}`}
                    onClick={() => setActiveSort('Bán chạy')}
                >
                    Bán chạy
                </button>
                <button
                    type="button"
                    onClick={() => {
                        sortPriceAscending(); // Gọi hàm sắp xếp giá thấp đến cao
                        setActiveSort('Giá thấp đến cao');
                    }}
                    className={`btn ${activeSort === 'Giá thấp đến cao' ? 'btn-success' : 'btn-outline-secondary'}`}
                >
                    Giá thấp đến cao
                </button>
                <button
                    type="button"
                    onClick={() => {
                        sortPriceDescending();
                        setActiveSort('Giá cao đến thấp');
                    }}
                    className={`btn ${activeSort === 'Giá cao đến thấp' ? 'btn-success' : 'btn-outline-secondary'}`}
                >
                    Giá cao đến thấp
                </button>
            </div>
            <div className="dropdown">
                <button className="btn btn-outline-secondary dropdown-toggle" type="button" id="displayCount" data-bs-toggle="dropdown" aria-expanded="false">
                    Hiển thị 40
                </button>
                <ul className="dropdown-menu" aria-labelledby="displayCount">
                    <li><button className="dropdown-item" type="button">10</button></li>
                    <li><button className="dropdown-item" type="button">20</button></li>
                    <li><button className="dropdown-item" type="button">40</button></li>
                    <li><button className="dropdown-item" type="button">50</button></li>
                </ul>
            </div>
        </div>
    );
}

export default SortBar;
