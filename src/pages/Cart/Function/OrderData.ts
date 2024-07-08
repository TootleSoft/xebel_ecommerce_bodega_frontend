import axios from 'axios'
import { useToast } from "primevue/usetoast";
import { useCartStore } from '../../../stores/cart';
import { useRouter } from 'vue-router';
// import { Buffer } from 'buffer'
import { useAuthStore } from '../../../stores/auth';
import { useStorage } from 'vue3-storage';

const cartStore = useCartStore();
const router = useRouter();
const authStore = useAuthStore();
const storage = useStorage();

export class OrderData {
     cartStore = useCartStore();
     router = useRouter();
     authStore = useAuthStore();
     storage = useStorage();

    openpayAxios = axios.create({
        baseURL: import.meta.env.VITE_OPENPAY_BASE_URL,
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Basic ${Buffer.from(`${import.meta.env.VITE_OPENPAY_PRIVATE_API_KEY}:`).toString('base64')}`
        }
    });

    getOrder = async (params) => {
        try {
            let query = "?";
            if (params) {
                Object.keys(params).forEach(prop => {
                    if (params[prop] != null) {
                        query = query + prop + "=" + params[prop] + "&";
                    }
                });
                query = query.substring(0, query.length - 1);
            } else {
                query = "";
            }
            const response = await axios.get('Comercial/EcommerceOrder/getOrder/' + query);
            return response.data;
        } catch (error) {

        }
    }

    getOpenPayOrder = async () => {
        let order_info = await this.getOrder({ id_order: this.cartStore.order[0].id }); //se obtiene la información del pedido
        let response = await this.openpayAxios.get('/charges/' + order_info[0].id_tracking);
        return response.data;
    }

    getPaymentInfo = async (params) => {
        try {
            let query = "?";
            if (params) {
                Object.keys(params).forEach(prop => {
                    if (params[prop] != null) {
                        query = query + prop + "=" + params[prop] + "&";
                    }
                });
                query = query.substring(0, query.length - 1);
            } else {
                query = "";
            }
            const response = await axios.get('Comercial/EcommerceOrder/getPaymentInfo/' + this.authStore.id_usuario + '/' + query);
            return response.data;
        } catch (error) {

        }
    }

    newOrder = async () => {
        try {
            let order = await this.getOpenPayOrder();
            if (order.status == 'completed') {
                cartStore.order = [];
                cartStore.cart = [];
                cartStore.id_numberBundle = 0;
                cartStore.id_numberItem = 0;
                let status = order.status;
                let update = await axios.post('Comercial/ECommerceOrder/updateOrder/' + order.order_id + '/' + order.id + '/' + status);
            }
            storage.setStorageSync('cart', cartStore.cart);
            storage.setStorageSync('order', cartStore.order);
            storage.setStorageSync('id_numberBundle', cartStore.id_numberBundle);
            storage.setStorageSync('id_numberItem', cartStore.id_numberItem);
        } catch (error) {

        }
    }
}
