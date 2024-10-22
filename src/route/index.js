import Home from "../Page/Home/Home";
import Product from "../Page/Product/Product.js";
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/product', component: Product }

];

// Định nghĩa route riêng tư
const privateRoutes = [

];

// Xuất các route
export { publicRoutes, privateRoutes };