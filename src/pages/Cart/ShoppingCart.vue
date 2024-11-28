<template>
    <div class="card">
        <div class="flex flex-column align-items-center mb-6 p-4" style="border: 1px solid #ddd; border-radius: 10px;">
    <!-- Texto del total en el carrito -->
    <div class="text-3xl text-900 mb-4 font-medium" style="font-family: 'Montbold';">
        Tu total en el carrito es ${{ total.toFixed(2) }}
    </div>

    <!-- Botón de Pagar -->
    <Button v-if="total != 0.00" label="Pagar" @click="router.push('/orderdata')" 
        style="font-family: 'Montbold';
               background: linear-gradient(to right, #193a62, #1099af);
               color: white;
               border-radius: 40px;
               padding: 12px 24px;
               box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
               font-weight: 600;
               border: none; 
               width: 100%; /* Hacer que el botón ocupe el 100% del contenedor */
               max-width: 320px; /* Limitar el ancho máximo del botón para evitar que se estire demasiado en pantallas grandes */
               display: flex;
               align-items: center;
               justify-content: center;
    ">
    </Button>
    <!-- Boton ver tienda -->
    <Button v-if="total == 0.00" label="Ir a la tienda" @click="router.push('/')" 
        style="font-family: 'Montbold';
               background: linear-gradient(to right, #193a62, #1099af);
               color: white;
               border-radius: 40px;
               padding: 12px 24px;
               box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
               font-weight: 600;
               border: none; 
               width: 100%; /* Hacer que el botón ocupe el 100% del contenedor */
               max-width: 320px; /* Limitar el ancho máximo del botón para evitar que se estire demasiado en pantallas grandes */
               display: flex;
               align-items: center;
               justify-content: center;
    ">
    </Button>
</div>
        <ul class="list-none p-0 m-0">
            <ShoppingCartProduct></ShoppingCartProduct>
        </ul>
        <div class="flex flex-column md:flex-row p-4" style="border: 1px solid #ddd;">
    <!-- Espacio en el lado izquierdo para alineación (solo en pantallas medianas y mayores) -->
    <div class="w-full md:w-12rem"></div>

    <!-- Contenedor de la lista de precios -->
    <ul class="list-none py-0 pr-0 pl-0 md:pl-5 mt-6 mx-0 mb-0 flex-auto">
        <!-- Subtotal -->
        <li class="flex justify-content-between mb-4">
            <span class="text-xl text-900 font-bold" style="font-family: 'Montbold'">Subtotal</span>
            <span class="text-xl text-900" style="font-family: 'Montserrat';">${{subtotal.toFixed(2)}}</span>
        </li>

        <!-- Impuestos -->
        <li class="flex justify-content-between mb-4">
            <span class="text-xl text-900 font-semibold" style="font-family: 'Montbold'">Impuestos</span>
            <span class="text-xl text-900" style="font-family: 'Montserrat'">${{taxes.toFixed(2)}}</span>
        </li>

        <!-- Total -->
        <li class="flex justify-content-between border-top-1 surface-border mb-4 pt-4">
            <span class="text-3xl text-900 font-bold" style="font-family: 'Montbold'">Total</span>
            <span class="text-3xl text-900 font-bold" style="font-family: 'Montbold'">${{ total.toFixed(2) }}</span>
        </li>

        <!-- Botón de Pagar -->
        <li class="flex justify-content-end">
            <Button v-if="total != 0.00" label="Pagar" @click="router.push('/orderdata')" 
                style="font-family: 'Montserrat'; 
                    background: linear-gradient(to right, #193a62, #1099af);
                    color: white;
                    border-radius: 40px;
                    padding: 12px 24px;
                    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
                    font-weight: 600;
                    border: none;">
            </Button>
        </li>
    </ul>
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

const total = computed(()=>{
    let i = 0;
    for(const product of cartStore.cart){
        i = i + (product.price_tax*product.quantity)
    }
    return i
})

const subtotal = computed(()=>{
    let i = 0;
    for(const product of cartStore.cart){
        if(product.is_bundle){
            i = i + ((product.price_tax)*product.quantity / 1.16)
        }else{
            i = i + ((product.ecomerce_offer_price ?? product.unit_price)*product.quantity)
        }
        console.log("subtotal", i)
        console.log("producto "+product.key_name+" precio oferta: "+product.ecomerce_offer_price+" precio normal: " +product.unit_price +" precio con iva: "+product.price_tax)
    }
    return i
})

const taxes = computed(()=>{
    let i = 0;
    console.log("carrito", cartStore.cart)
    for(const product of cartStore.cart){
        if(product.is_bundle){
            i = i + product.total_taxes * product.quantity;
        }else{
            i = i + ((product.ecomerce_offer_price ?? product.unit_price)*((product.iva_transferred+product.ieps_transferred)*.01)*product.quantity)
        }
    }
    return i
})

const selectedQuantity = ref({ label: '1', value: 1 });
const selectedQuantity2 = ref({ label: '1', value: 1 });
</script>