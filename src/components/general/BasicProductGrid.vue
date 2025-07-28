<template>
    <div class="grid">
        <div class="col-12">
            <div class="grid formgrid p-fluid">
                <div class="field col-12 sm:col-12 md:col-8 xl:col-8"></div>
                <div class="field col-12 sm:col-12 md:col-4 xl:col-4" style="font-family: Montserrat;">
                    <FloatLabel style="border: 1px solid #ccc; border-radius: 8px">
                        <AutoComplete v-model="filterproductname" @item-select="selectSuggestion" inputId="filter"
                            optionLabel="description" :suggestions="suggest" @complete="search"
                            v-on:keyup.enter="filteredserch(filterproductname)">
                        </AutoComplete>
                        <label for="filter">
                            <i class="pi pi-filter"></i> Busqueda Filtrada en {{ pagetitle }}
                        </label>
                    </FloatLabel>
                </div>
            </div>
        </div>
        <div v-for="(product, i) in products.slice(first / 10 * pagesize, first / 10 * pagesize + pagesize)" :key="i"
            class="col-12 sm:col-6 md:col-4 lg:col-3" style="
            padding: 1rem !important;
            ">
            <div class="product-item mb-0 relative" style="
                height: 320px; 
                max-width: 100%; 
                border-radius: 0px;
                border: 1px solid #bbb;
                cursor: pointer;
                ">
                <!-- <img :src="'/demo/images/ecommerce/product-list/product-list-4-1.png'" class="w-full" :alt="String(i)" @click="router.push('/product/'+product.id+'/'+product.id_subarticle)"/> -->
                <img :src="imgroute(product.id, product.barcode, product.id_brand)" 
                class="w-full h-auto"
                :alt="String(i)" 
                @click="router.push('/product/' + product.id + '/' + product.id_subarticle)" 
                style="
                    max-height: 318px;
                    width: 100%; 
                    border-radius: 0px;
                " />
                <!-- <span v-if="product.existence == 'EN EXISTENCIA'" class="surface-card text-900 px-3 py-2 absolute border-round-3xl text-green-500 font-bold" :style="{ left: '1rem', top: '1rem' }"> {{ product.existence }} </span>
                    <span v-if="product.existence == 'POCA EXISTENCIA'" class="surface-card text-900 px-3 py-2 absolute border-round-3xl text-orange-500 font-bold" :style="{ left: '1rem', top: '1rem' }"> {{ product.existence }} </span>
                    <span v-if="product.existence == 'SOLO DE VENTA EN TIENDA'" class="surface-card text-900 px-3 py-2 absolute border-round-3xl text-green-500 font-bold" :style="{ left: '1rem', top: '1rem' }"> {{ product.existence }} </span>
                    <span v-if="product.existence == 'SIN EXISTENCIA'" class="surface-card text-900 px-3 py-2 absolute border-round-3xl text-red-500 font-bold" :style="{ left: '1rem', top: '1rem' }"> {{ product.existence }} </span> -->
                <!-- <Button
                    type="button"
                        :disabled="(dissableNoStock == 1 && product.stock <= 0) || product.existence == 'SOLO DE VENTA EN TIENDA'"
                    class="border-1 border-white border-round py-2 px-3 absolute bg-black-alpha-30 text-white inline-flex align-items-center justify-content-center hover:bg-teal-500 transition-colors transition-duration-300 cursor-pointer"
                    :style="{ bottom: '1rem', left: '1rem', width: 'calc(100% - 2rem)'}"
                    @click="addCart(product.id, product.id_subarticle, product.quantity, i)"
                    >
                        <i class="pi pi-shopping-cart mr-3 text-base"></i>
                        <span class="text-base">Agregar al carrito</span>
                    </Button> -->
            </div>

            <div class="flex flex-column align-items-center justify-content-center" style="
                height: auto;
                width: 100%; 
                overflow: hidden;
                ">
                <!-- Botón "Agregar al carrito" -->      
                <Button type="button"
                    :disabled="(dissableNoStock == 1 && product.stock <= 0) || product.existence == 'SOLO DE VENTA EN TIENDA'"
                    class="relative text-white bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-300 w-full flex items-center justify-center carrito-btn"
                    :style="{ width: '100%', borderRadius: '0' }"
                    @click="addCart(product.id, product.id_subarticle, product.quantity, i)"
                    >
                    <span class="text-base w-full" style="
                    font-family: Montserrat !important;
                    text-align: center;
                    ">Agregar al
                    carrito</span>
                </Button>
                
                <!-- <span class="text-l mb-3" por si quieren meter marca del producto -->
                <span class="text-l mb-2 mt-1" style="
                    color:  #0056b3 !important; 
                    font-family: 'MontExtraBold' !important; 
                    font-size: 1rem !important; 
                    text-align: center; 
                    display: inline-block; 
                    line-height: 1rem; 
                    min-height: 2rem;  /* Al menos 3 renglones de altura */
                    padding: 0.5em 0;
                    height: auto; /* Establece una altura fija para el span */
                ">
                    {{ product.description }}
                </span>

                <!-- Contenedor de precios con altura fija -->
                <div class="price-container" style="
                    height: auto; 
                    overflow: hidden; 
                    display: flex; 
                    flex-direction: column; 
                    justify-content: space-between; 
                    align-items: center; 
                    text-align: center;
                    ">
                    <div>
                        <!-- Precio con descuento (si tiene) -->
                        <span v-if="product.original_price" class="text-l mb-2 line-through"
                            style="
                            color: red !important; 
                            font-family: 'Montserrat'; 
                            font-size: 1.2rem;
                            ">
                            {{ "$" + product.original_price.toFixed(2) }}
                        </span>
                    </div>

                    <div>
                        <!-- Precio con impuesto (si no hay precio original) -->
                        <span v-if="!product.original_price" class="text-l mb-2"
                            style="
                            color: #0056b3 !important; 
                            font-family: 'Montbold'; 
                            font-size: 1.4rem !important;
                            ">
                            {{ "$" + product.price_tax.toFixed(2) }}
                        </span>
                    </div>

                    <div>
                        <!-- Precio con descuento (si tiene) en verde, más grande -->
                        <span v-if="product.original_price" class="text-l mb-3"
                            style="
                            color: green !important; 
                            font-family: 'Montbold'; 
                            font-size: 1.4rem !important;
                            ">
                            {{ "$" + product.price_tax.toFixed(2) }}
                        </span>
                    </div>

                    <!-- <div>
                         Código de barras 
                        <span class="text-l text-900 mb-3"
                            style="font-family: 'Montserrat' !important; font-size: 1.2rem;">
                            {{ product.barcode }}
                        </span>
                    </div>  -->
                </div>
            </div>
            <!-- 
            <div class="col-12 align-items-center">
                <div class="grid formgrid p-fluid grid-nogutter align-items-center">

                     Columna para InputNumber 
                     <div class="col-12 md:col-6">
                        <InputNumber showButtons buttonLayout="horizontal" :min="1"
                            :max="product.stock == 0 ? 1 : product.stock"
                            inputClass="w-full text-center py-2 px-1 border-transparent outline-none shadow-none"
                            v-model="product.quantity" class="border-1 surface-border border-round w-full"
                            decrementButtonClass="p-button-text text-600 hover:text-primary py-1 px-1"
                            incrementButtonClass="p-button-text text-600 hover:text-primary py-1 px-1"
                            incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" />
                    </div> 


                </div>
            </div> -->
        </div>
        <br></br>
        <div class="field col-12 sm:col-12 md:col-12 xl:col-12">
            <Paginator v-model:first="first" :rows="10" :totalRecords="products.length / (pagesize / 10)"></Paginator>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '../../stores/cart';
import { useToast } from 'primevue/usetoast';
import axios from 'axios';
import { useAuthStore } from '../../stores/auth';
import ColorPicker from 'primevue/colorpicker';
const auth = useAuthStore();
const cartStore = useCartStore();
const toast = useToast();

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

const id_user = ref<string>(auth.id_customer ? auth.id_customer.toString() : "0");

const products = ref<any[]>(props.allproducts)

const filterproductname = ref<string>();

const suggest = ref<any[]>([]);

const dissableNoStock = ref<number>(0);

const search = (event) => {
    suggest.value = products.value.filter(x => { return (x.description || '').toLowerCase().includes((event.query || '').toLowerCase()) });
}

const imgroute = (id, sku, brand) => {
    sku = sku
        .replace(/\//g, "--")
        .replace(/ñ/g, "nnn")
        .replace(/Ñ/g, "nnn")
        .replace(/#/g, '----')

    return import.meta.env.VITE_API_ROUTE + 'Inventory/Ecomerce/image/' + id + '_' + sku + '_1/' + brand;
}
const filteredserch = (newValue) => {
    console.log(JSON.stringify(newValue))
    if (newValue == '') {
        products.value = props.allproducts;
    }
    else {
        products.value = props.allproducts;
        products.value = products.value.filter(x => { return x.description.toLowerCase().includes(newValue.toLowerCase()) })
    }
}

const selectSuggestion = (payload) => {
    console.log(JSON.stringify(payload))
    filterproductname.value = payload.value.description;
}


const first = ref<number>(0);

const router = useRouter();

const product = ref<any[]>([]);

const addCart = async (id_article, id_subarticle, quantity, i) => {
    let response = await axios.get('Inventory/EComerce/GetArticleInfo/' + id_article + '/' + id_subarticle + '/' + id_user.value)
    product.value = response.data;
    let existence_resposnse = await axios.get('Inventory/EComerce/GetProductExistences/' + id_article + '/' + id_subarticle)
    let existence = existence_resposnse.data;
    let branch = existence.sort((a, b) => b.stock - a.stock)[0].id_branch
    console.log(JSON.stringify(quantity))
    console.log(JSON.stringify(branch))
    console.log(JSON.stringify(product.value))
    products.value[i].quantity = 1
    cartStore.addCart(product.value[0], quantity, branch, false);
    toast.add({ severity: 'success', summary: 'Agregado', detail: 'Articulo Agregado al carrito', life: 3000 });
}

onMounted(() => {
    dissableNoStock.value = import.meta.env.VITE_DISSABLE_NO_STOCK;
})
</script>
<style>
.product-item:hover {
    box-shadow: 0 4px 8px rgba(235, 115, 4, 0.555);
    transition: all 0.3s ease-in-out;
}
/* Contenedor general para los precios */
.price-container {
    display: flex;
    flex-direction: column;
    /* Asegura que los elementos se apilen verticalmente */
    align-items: flex-start;
    /* Alinea los elementos al inicio (izquierda) */
    gap: 0.0rem;
    /* Espacio entre los elementos (renglones) */
    margin-bottom: 1rem;
    /* Espacio en la parte inferior del contenedor */
}

.price-container span {
    display: block;
    /* Asegura que cada span ocupe su propio renglón */
    min-height: 1em;
    /* Asegura que cada span tenga un renglón de altura como mínimo */
    line-height: 0em;
    /* Alinea el texto verticalmente dentro del span */
    padding: 0.5em 0;
    /* Un poco de padding para dar espacio dentro */
}

/* Estilos para el precio original (tachado) */
.price-container .line-through {
    text-decoration: line-through;
}

/* Estilos para el precio con descuento (en verde y más grande) */
.price-container .price-discount {
    color: green;
    font-size: 1rem !important;
    /* Tamaño de fuente más grande */
    font-family: 'Montbold';
}


/* Estilo para el precio normal (sin descuento) */
.price-container .price-tax {
    color: #008cf0;
    font-family: 'Montbold';
    font-size: 1rem;
    /* Tamaño de fuente medio */
}

/* Estilo para el código de barras */
.price-container .barcode {
    font-family: 'Montserrat';
    font-size: 1rem !important;
    color: #333;
}

/* Estilos para el botón de "Agregar al carrito" */
.carrito-btn {
    background-color: #008cf0 !important;
    height: 40px;
}

.carrito-btn:hover {
    background-color: #067ace !important;
    cursor: pointer;
}


.carrito-btn:disabled {
    background-color: #6c757d !important;
    /* Gris para el estado deshabilitado */
    cursor: not-allowed;
    /* Cambia el cursor al pasar sobre el botón cuando está deshabilitado */
}

/* Estilos para los botones de InputNumber (incremento y decremento) */
.p-inputnumber-button {
    background-color: transparent !important;
    /* Fondo transparente */
    color: white;
    /* Texto blanco */
    border-radius: 8px;
    /* Bordes redondeados */
    border: none;
    transition: background-color 0.3s ease;
}

.p-inputnumber-button:hover {
    background-color: #0056b3 !important;
    /* Azul oscuro en hover */
}

.p-inputnumber-button:disabled {
    background-color: transparent;
    /* Gris para los botones deshabilitados */
}
</style>