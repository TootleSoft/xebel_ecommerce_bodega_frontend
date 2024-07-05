import { defineStore } from "pinia";
import { ref } from "vue";
import { useStorage } from 'vue3-storage';
import axios from 'axios';

const storage = useStorage();

export interface CartState {
    barcode?: string;
    id?: number;
    key_name?: string;
    name?: string;
    id_article: number;
    id_subarticle?: string;
    subarticle?: string;
    unit_price?: number;
    iva_transferred?: number;
    iva_detained?: number;
    ieps_transferred?: number;
    ieps_detained?: number;
    ecomerce_offer_price?: number,
    original_price?: number;
    price_tax?: number;
    id_brand?: number;
    is_inventoriable?: boolean;
    weight?: number;
    brand?: string;
    fam?: string;
    gro?: string;
    sgro?: string;
    have_lot?: boolean;
    have_serie?: boolean;
    is_expirable?: boolean;
    is_attributable?: true;
    quantity?: number;
    id_branch?: number;
    is_bundle?: boolean;
    id_numberItem?: number;
    id_numberBundle?: number;
}

export interface Order {
    id: number;
    status: number;
}


export const useCartStore = defineStore({
    id: 'cart',
    state: () => ({
        cart: storage.getStorageSync<CartState[]>('cart') ?? [],
        id_numberBundle: storage.getStorageSync<number[]>('id_numberBundle') ?? 0,
        id_numberItem: storage.getStorageSync<number[]>('id_numberItem') ?? 0,
        order: storage.getStorageSync<Order[]>('order') ?? [],
    }),
    actions: {
        addCart(product: CartState, quantity: number, id_branch: number, is_bundle: boolean){
            if(this.order.length == 1){
                let deleted = axios.delete('Comercial/ECommerceOrder/deleteOrder/' + this.order[0].id);
                this.order = [];
            }else{
                let article: CartState = { ...product };
                article.quantity = quantity;
                article.id_branch = id_branch;

                const index = this.cart.findIndex(item => item.id === article.id && item.subarticle === article.subarticle && item.id_branch === article.id_branch);
                if (index !== -1) {
                    // Actualizar la cantidad si el producto ya existe en el carrito
                    this.cart[index].quantity = (this.cart[index].quantity || 0) + quantity;
                } else {
                    // Agregar el nuevo producto al carrito
                    if(article.is_bundle == true){
                        article.id_numberBundle = 0;
                    }else{
                        article.id_numberItem = 0;
                    }
                    this.cart.push(article);
                    for(let i = 0; i < this.cart.length; i++){
                        if(this.cart[i].is_bundle == true && this.cart[i].id_numberBundle == 0){
                            this.id_numberBundle = this.id_numberBundle + 1;
                            this.cart[i].id_numberBundle = this.id_numberBundle;
                        }else if(this.cart[i].id_numberItem == 0){
                            this.id_numberItem = this.id_numberItem + 1;
                            this.cart[i].id_numberItem = this.id_numberItem;
                        }
                    }
                }
                // Guardar el estado actualizado en el almacenamiento
                storage.setStorageSync('cart', this.cart);
                storage.setStorageSync('id_numberBundle', this.id_numberBundle);
                storage.setStorageSync('id_numberItem', this.id_numberItem);
            }
        },
        updateCart(is_deleted, is_deletedBundle){
            if(this.order.length == 1){
                let deleted = axios.delete('Comercial/ECommerceOrder/deleteOrder/' + this.order[0].id);
                this.order = [];
            }else{
                let is_duplicate = false;
                if(storage.getStorageSync<CartState[]>('cart').length == this.cart.length){
                    let arr1 = this.cart;
                    let arr2 = storage.getStorageSync<CartState[]>('cart');
                    let index_upd = null;
                    arr1.forEach((item, index) => {
                        console.log(item.id_branch !== arr2[index].id_branch)
                        if (item.id_branch !== arr2[index].id_branch) {
                            index_upd = index;
                        }
                    });
                    if(index_upd != null){
                        console.log(index_upd)
                        let update = this.cart[index_upd]
                        let products = this.cart.filter((_, index) => index !== index_upd)
                        for(const product of products){
                            if(product.id == update.id && product.subarticle == update.subarticle && product.id_branch == update.id_branch){
                                is_duplicate = true;
                            }
                        }
                        if(is_duplicate == true){
                            this.cart[index_upd].id_branch = storage.getStorageSync<CartState[]>('cart')[index_upd].id_branch;
                        }
                    }
                }
                if(is_deleted == true){
                    this.id_numberItem = this.id_numberItem > 1 ? this.id_numberItem - 1: this.id_numberItem == 1 && this.cart.length == 0 ? 0: this.id_numberItem == 1 ? 0 : this.id_numberItem;
                }
                if(is_deletedBundle == true){
                    this.id_numberBundle = this.id_numberBundle > 1 ? this.id_numberBundle - 1: this.id_numberBundle == 1 && this.cart.length == 0 ? 0 : this.id_numberBundle == 1 ? 0: this.id_numberBundle;
                }
                storage.setStorageSync('cart', this.cart);
                storage.setStorageSync('id_numberItem', this.id_numberItem);
                storage.setStorageSync('id_numberBundle', this.id_numberBundle);
                return is_duplicate
            }
            
        },
        saveOrder(id: number){
            const entity = ref<Order>({
                id: null,
                status: null,
            });
            entity.value.id = id;
            entity.value.status = 1;
            this.order.push(entity.value);
            storage.setStorageSync('order', this.order);
        }
    }
})