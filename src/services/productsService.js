import { productsAPI } from "./productsAPI";

// Wrapper agar halaman Product.jsx tetap pakai nama method yang sama
export const productsService = {
    getAll:   ()           => productsAPI.fetchProducts(),
    create:   (data)       => productsAPI.createProduct(data),
    update:   (id, data)   => productsAPI.updateProduct(id, data),
    remove:   (id)         => productsAPI.deleteProduct(id),
};
