<template>
<div class="contenedor w-full px-0 sm:px-4 my-4">
    <h1 class="title" style="margin-top: 1rem; font-family: 'MontBold'; color: black;">Mi Carrito</h1>
        <!-- <div class="flex flex-column align-items-center mb-6 p-4" style="border: 1px solid #ddd; border-radius: 10px; background-color: red;">
            <div class="text-3xl text-900 mb-4 font-medium" style="font-family: 'Montbold';">
                Tu total en el carrito es ${{ total.toFixed(2) }}
            </div>

            <Button v-if="total != 0.00" label="Pagar" @click="router.push('/orderdata')" style="font-family: 'Montbold';
               background: linear-gradient(to right, #193a62, #1099af);
               color: white;
               border-radius: 40px;
               padding: 12px 24px;
               box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
               font-weight: 600;
               border: none; 
               width: 100%; 
               max-width: 320px; 
               display: flex;
               align-items: center;
               justify-content: center;
            ">
            </Button>
            
            <Button v-if="total == 0.00" label="Ir a la tienda" @click="router.push('/')" style="font-family: 'Montbold';
               background: linear-gradient(to right, #193a62, #1099af);
               color: white;
               border-radius: 40px;
               padding: 12px 24px;
               box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
               font-weight: 600;
               border: none; 
               width: 100%; 
               max-width: 320px; 
               display: flex;
               align-items: center;
               justify-content: center;
    ">
            </Button>
        </div> -->
        <!-- Contenedor principal responsive -->
        <div class="contenedor flex flex-col md:flex-row overflow-hidden" style="border: 1px solid #ddd;">
            <!-- Contenedor Verde (Productos del carrito) -->
            <div class="cart-container bg-white px-4 md:px-6 py-6 rounded-t-lg md:rounded-l-lg md:rounded-tr-none">
                <ul class="list-none p-0 m-0">
                    <ShoppingCartProduct></ShoppingCartProduct>
                </ul>
            </div>
            <!-- Contenedor Rojo (Resumen de precios) -->
            <div class="summary-container bg-blue-900 px-6 py-12 pb-2 rounded-b-lg md:rounded-r-lg md:rounded-bl-none order-first md:order-none">
            <h1 class="text-white font-bold text-4xl text-left md:text-left text-center mb-6 mt-5"
                >Tu orden</h1>
                <div class="flex flex-column px-4 md:px-6">
                    <!-- Lista de precios -->
                    <!-- Contenedor de la lista de precios -->
                    <ul class="list-none py-0 pr-0 pl-0 md:pl-2 mt-0 mx-0 mb-0 flex-auto"
                        >
                        <!-- Subtotal -->
                        <li class="flex justify-content-between mb-4">
                            <span class="text-xl text-900 font-bold"
                                style="font-family: 'Montbold'; color: white !important;">Subtotal</span>
                            <span class="text-xl text-900"
                                style="font-family: 'Montserrat'; color: white !important;">${{ subtotal.toFixed(2)
                                }}</span>
                        </li>

                        <!-- Impuestos -->
                        <li class="flex justify-content-between mb-4">
                            <span class="text-xl text-900 font-semibold"
                                style="font-family: 'Montbold'; color: white !important;">Impuestos</span>
                            <span class="text-xl text-900"
                                style="font-family: 'Montserrat'; color: white !important;">${{ taxes.toFixed(2)
                                }}</span>

                        </li>
                        <!-- Descuento -->
                        <li class="flex justify-content-between mb-4">
                            <span class="text-xl text-900 font-semibold"
                                style="font-family: 'Montbold'; color: white !important;">Descuento
                            </span>
                            <span class="text-xl text-900"
                                style="font-family: 'Montserrat'; color: white !important;">${{ taxes.toFixed(2)
                                }}
                            </span>
                        </li>
                        <!-- Envío -->
                        <li class="flex justify-content-between mb-4">
                            <span class="text-xl text-900 font-semibold"
                                style="font-family: 'Montbold'; color: white !important;">Envío
                            </span>
                            <span class="text-xl text-900"
                                style="font-family: 'Montserrat'; color: white !important;">${{ taxes.toFixed(2)
                                }}
                            </span>
                        </li>
                        <hr style="background-color: white;">
                        <!-- Total -->
                        <li class="flex justify-content-between border-top-1 surface-border mb-4 pt-2">
                            <span class="text-2xl text-900 font-bold"
                                style="font-family: 'Montbold'; color: white !important;">Total</span>
                            <span class="text-3xl text-900 font-bold"
                                style="font-family: 'Montbold'; color: white !important; font-size: 1.6rem !important;">${{
                                total.toFixed(2) }}</span>
                        </li>
                        <hr style="background-color: white;">
                        <!-- Botón de Pagar -->
                         <div class="flex justify-center align-items-center w-full">
                            <Button 
                                v-if="total != 0.00" 
                                @click="router.push('/orderdata')" 
                                class="btn-pay w-full text-white font-semibold text-lg px-6 py-3 rounded-full justify-center items-center text-center gap-2 text-center leading-tight mb-4">
                                Pagar
                                <i class="pi pi-arrow-circle-right"></i>

                            </Button>
                         </div>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import ShoppingCartProduct from './ShoppingCartProduct.vue';
import { useCartStore } from '../../stores/cart';
import { useRouter } from 'vue-router';
import axios from 'axios';
const cartStore = useCartStore();
const router = useRouter();

const quantityOptions = [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 }
];

const total = computed(() => {
    let i = 0;
    for (const product of cartStore.cart) {
        i = i + (product.price_tax * product.quantity)
    }
    return i
})

const subtotal = computed(() => {
    let i = 0;
    for (const product of cartStore.cart) {
        if (product.is_bundle) {
            i = i + ((product.price_tax) * product.quantity / 1.16)
        } else {
            i = i + ((product.ecomerce_offer_price ?? product.unit_price) * product.quantity)
        }
        console.log("subtotal", i)
        console.log("producto " + product.key_name + " precio oferta: " + product.ecomerce_offer_price + " precio normal: " + product.unit_price + " precio con iva: " + product.price_tax)
    }
    return i
})

const taxes = computed(() => {
    let i = 0;
    console.log("carrito", cartStore.cart)
    for (const product of cartStore.cart) {
        if (product.is_bundle) {
            i = i + product.total_taxes * product.quantity;
        } else {
            i = i + ((product.ecomerce_offer_price ?? product.unit_price) * ((product.iva_transferred + product.ieps_transferred) * .01) * product.quantity)
        }
    }
    return i
})

const selectedQuantity = ref({ label: '1', value: 1 });
const selectedQuantity2 = ref({ label: '1', value: 1 });
</script>
<style scoped>
.btn-pay {
    background-color: orange;
    border: none;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    transition-duration: 0.4s;
}
.btn-pay:hover {
    background-color: rgb(226, 147, 1) !important;
}
.cart-container {
    width: 100%;
}
.summary-container {
    width: 100%;
}
@media (max-width: 767px) {
.title {
    font-size: 2rem !important;
    text-align: center !important;
}
.contenedor {
    display: grid !important;
}
.cart-container,
.summary-container {
    width: 100% !important;
  }
  .summary-container h1 {
    text-align: center !important;
  }
  .summary-container {
    padding-bottom: 2rem !important;
  }
}

@media (min-width: 1024px) {
    .title {
        font-size: 2rem !important;
        text-align: center !important;
    }
    .cart-container {
        width: 65%;
    }
    .summary-container {
        width: 35%;
    }
}

@media (min-width: 1280px) {

    .title {
        font-size: 2rem !important;
        text-align: center !important;
    }
    .cart-container {
        width: 70%;
    }
    .summary-container {
        width: 30%;
    }
}
</style>