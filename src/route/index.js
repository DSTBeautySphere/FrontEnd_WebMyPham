import Home from "../Page/Home/Home";
import Product from "../Page/Product/Product";
import PRoductDetail from "../Page/Product/Product.Detail";
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/danhmuc/:id', component: Product },     // Route cho sản phẩm cụ thể với id
    { path: '/loaisanpham/:id', component: Product },     // Route cho sản phẩm cụ thể với id
    { path: '/product/:id', component: PRoductDetail },     // Route cho sản phẩm cụ thể với id

];

// Định nghĩa route riêng tư
const privateRoutes = [

];

// Xuất các route
export { publicRoutes, privateRoutes };