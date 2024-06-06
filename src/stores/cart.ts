import { defineStore } from "pinia";
import { useStorage } from 'vue3-storage';
import { useRouter } from 'vue-router';
import { ref } from "vue";

const router = useRouter();
const storage = useStorage();

export interface CartState {
    barcode?: string;
    id?: number;
    key_name?: string;
    name?: string;
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
}


export const useCartStore = defineStore({
    id: 'cart',
    state: () => ({
        cart: storage.getStorageSync<CartState[]>('cart') ?? [],
    }),
    actions: {
        addCart(product: CartState, quantity: number, id_branch: number){
            console.log(JSON.stringify(product))
            console.log(JSON.stringify(quantity))
            console.log(JSON.stringify(id_branch))
            let article: CartState = { ...product };
            article.quantity = quantity;
            article.id_branch = id_branch;
            
            const index = this.cart.findIndex(item => item.id === article.id && item.subarticle === article.subarticle);
            if (index !== -1) {
                // Actualizar la cantidad si el producto ya existe en el carrito
                this.cart[index].quantity = (this.cart[index].quantity || 0) + quantity;
            } else {
                // Agregar el nuevo producto al carrito
                this.cart.push(article);
            }
            // Guardar el estado actualizado en el almacenamiento
            storage.setStorageSync('cart', this.cart);
            console.log(JSON.stringify(this.cart));
            console.log(JSON.stringify(article))
        },
        updateCart(){
            storage.setStorageSync('cart', this.cart);
        },
        setSession(id_usuario: number, usuario: string, company: number | undefined, branch: number | undefined, branch_name: string | undefined) {
            // const sessionLength = parseInt(import.meta.env.VITE_SESSION_HOURS_DURATION) * 60 * 60000;
            storage.setStorageSync('id_usuario', id_usuario, undefined);
            storage.setStorageSync('usuario', usuario, undefined);
            storage.setStorageSync('company', company, undefined);
            storage.setStorageSync('branch', branch, undefined);
            storage.setStorageSync('branch_name', branch_name, undefined);
            this.id_usuario = id_usuario
            this.usuario = usuario;
            this.company = company;
            this.branch = branch;
            this.branch_name = branch_name;
            // EnvUtils.isDev() && console.log('Using pinia 🍍 [auth:setSession]', this.$state);
        },
        logout() {
            console.log("entre aqui")
            //TODO: Eliminar dexie
            this.usuario = undefined;
            this.company = undefined;
            this.branch = undefined;
            this.branch_name = undefined;
            storage.clearStorageSync();
            console.log("Cerre sesion")
            // await db.menus.clear();
            // EnvUtils.isDev() && console.log('Using pinia 🍍 [auth:logout]');
        },
    }
})