<template>
    <div class="grid -mt-3 -ml-3 -mr-3">
        <div class="col-12">
            <div class="grid formgrid p-fluid">
                <div class="field col-12 sm:col-12 md:col-8 xl:col-8"></div>
                <div class="field col-12 sm:col-12 md:col-4 xl:col-4">
                    <FloatLabel>
                        <AutoComplete v-model="filterproductname" @item-select="selectSuggestion" inputId="filter"
                            optionLabel="name" :suggestions="suggest" @complete="search"
                            v-on:keyup.enter="filteredsearch(filterproductname)">
                        </AutoComplete>
                        <label for="filter" style="font-family: 'Montserrat';">
                            <i class="pi pi-filter"></i> Búsqueda Filtrada en {{ pagetitle }}
                        </label>
                    </FloatLabel>
                </div>
            </div>
        </div>
        <div v-for="(product, i) in products.slice(first / 10 * pagesize, first / 10 * pagesize + pagesize)" :key="i"
            class="col-12 md:col-5 lg:col-3 mb-5 lg:mb-4">
            <div class="mb-4 relative">
                <img :src="imgroute(product.id, product.barcode, product.id_brand)" class="w-full h-auto shadow-8" :alt="String(i)" @click="router.push('/product/'+product.id+'/'+product.id_subarticle)"/>
                
            </div>
            <div class="flex flex-column align-items-center justify-content-center">
                <span class="text-l text-900 font-bold mb-3"  style="color: #0eabbd !important; font-family: 'MontExtraBold'; font-size: 1.6rem !important; text-align: center;">{{ product.name }}</span>
                <span class="text-l text-900 mb-3 line-through" style="color: red !important; font-family: 'Montserrat';">{{ "$" + product.unit_price.toFixed(2)}}</span>

                <span class="text-l text-900 mb-3 text-red-500" style="color: green !important; font-family: 'Montbold'; font-size: 1.6rem !important;">{{ "$" + product.ecomerce_offer_price.toFixed(2)}}</span>
                <span class="text-l text-900 mb-3 font-medium" style="font-family: 'Montserrat' !important;">{{ product.barcode }}</span>
                
                <div class="col-12 flex justify-center items-center">
                <div class="flex flex-wrap md:w-10/12 p-fluid">
                
                <!-- Columna para InputNumber -->
                <div class="col-6 md:w-6/12">
                    <InputNumber 
                    showButtons 
                    buttonLayout="horizontal" 
                    :min="1"
                    inputClass="w-full text-center py-3 px-2 border-transparent outline-none shadow-none"
                    v-model="product.quantity" 
                    class="border-1 surface-border border-round w-full"
                    decrementButtonClass="p-inputnumber-button text-600 hover:text-primary py-1 px-2"
                    incrementButtonClass="p-inputnumber-button text-600 hover:text-primary py-1 px-2"
                    incrementButtonIcon="pi pi-plus" 
                    decrementButtonIcon="pi pi-minus"
                    />
                </div>
                
                <!-- Columna para Botón "Agregar al carrito" -->
                <div class="col-6 md:w-6/12">
                    <Button 
                    type="button"
                    class="carrito-btn border-1 border-white border-round py-3 px-4 w-full flex items-center justify-center"
                    :style="{ width: '100%' }"
                    :disabled="(dissableNoStock == 1 && product.stock <= 0) || product.existence == 'SOLO DE VENTA EN TIENDA'"
                    @click="addCart(product.id, product.id_subarticle, product.quantity, i)"
                    >
                    <i class="pi pi-shopping-cart mr-3 text-base"></i>
                    <span class="text-base" style="font-family: Montserrat;">Agregar al carrito</span>
                    </Button>
                </div>
                
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useAuthStore } from '../../stores/auth';
import { useCartStore } from '../../stores/cart';
import { useToast } from 'primevue/usetoast';

interface Props {
    allproducts?: any[];
    pagesize?: number;
    pagetitle?: string;
}

const props = withDefaults(defineProps<Props>(), {
    allproducts: () => [],
    pagesize: 40,
    pagetitle: '',
})

const auth = useAuthStore();
const cartStore = useCartStore();
const product = ref<any[]>([]);
const id_user = ref<string>(auth.id_customer ? auth.id_customer.toString() : "0");
const toast = useToast();


const products = ref<any[]>(props.allproducts)
const filterproductname = ref<string>();

const selectSuggestion = (payload) => {
    console.log(JSON.stringify(payload))
    filterproductname.value = payload.value.name;
}

const suggest = ref<any[]>([]);

const router = useRouter();
const first = ref<number>(0);

const search = (event) => {
    suggest.value = products.value.filter(x => { return (x.name || '').toLowerCase().includes((event.query || '').toLowerCase()) });
}

const filteredsearch = (newValue) => {
    console.log(JSON.stringify(newValue))
    if (newValue == '') {
        products.value = props.allproducts;
    }
    else {
        products.value = props.allproducts;
        products.value = products.value.filter(x => { return x.name.toLowerCase().includes(newValue.toLowerCase()) })
    }
}

const imgroute = (id, sku, brand) => {
        console.log(brand)
        sku= sku.replace(/\//g, "--").replace(/ñ/g, "nnn").replace(/Ñ/g, "nnn").replace(/#/g, '----')
        return import.meta.env.VITE_API_ROUTE+'Inventory/Ecomerce/image/'+id+'_'+sku+'_1/'+brand;
    }

    const addCart = async (id_article, id_subarticle, quantity, i) =>{
        let response = await axios.get('Inventory/EComerce/GetArticleInfo/' + id_article + '/' + id_subarticle + '/' + id_user.value)
        product.value = response.data;
        let existence_resposnse = await axios.get('Inventory/EComerce/GetProductExistences/' + id_article + '/' + id_subarticle)
        let existence = existence_resposnse.data;
        let branch = existence.sort((a, b) => b.stock - a.stock)[0].id_branch
        console.log(JSON.stringify(quantity))
        console.log(JSON.stringify(branch))
        console.log(JSON.stringify(product.value[0]))
        products.value[i].quantity = 1
        cartStore.addCart(product.value[0], quantity, branch, false);
        toast.add({ severity: 'success', summary: 'Agregado', detail: 'Articulo Agregado al carrito', life: 3000 });
    }
</script>
<style lang="scss" scoped>
    .line-through {
    text-decoration: line-through;
}

/* Estilos para el botón de "Agregar al carrito" */
.carrito-btn {
    background: linear-gradient(140deg, #193a62, #1099af) !important; /* Degradado verde oscuro a verde claro */
    border-radius: 50px !important; /* Bordes más redondeados */
    height: 52px;
    transition: background 0.3s ease, transform 0.2s ease;
}

.carrito-btn:hover {
    background: linear-gradient(145deg, #193a62, #1099af) !important; /* Degradado con tonos más oscuros para el hover */
    transform: translateY(-2px); /* Leve movimiento de elevación al hacer hover */
    cursor: pointer;
}

.carrito-btn:disabled {
    background-color: #6c757d !important; /* Gris para el estado deshabilitado */
    cursor: not-allowed; /* Cambia el cursor al pasar sobre el botón cuando está deshabilitado */
}

/* Estilos para los botones de InputNumber (incremento y decremento) */
.p-inputnumber-button {
    background-color: transparent !important; /* Fondo transparente */
    color: white; /* Texto blanco */
    border-radius: 8px; /* Bordes redondeados */
    border: none;
    transition: background-color 0.3s ease;
}

.p-inputnumber-button:hover {
    background-color: #0056b3 !important; /* Azul oscuro en hover */
}

.p-inputnumber-button:disabled {
    background-color: transparent; /* Gris para los botones deshabilitados */
}

</style>