<template>
<div v-if="product.length > 0" class="mx-8 my-8 px-4 sm:px-6 md:px-8 lg:px-16">        
    <!--Contenedor púrpura-->
        <div class="grid col-12" style="padding: 2rem;">
            <div class="flex flex-column lg:col-6" style="align-items: center;">
                <!--FOTO PRINCIPAL-->
                <div class="flex justify-center items-center mb-3 w-full">
                <img
                    :alt="`Selected Image ${selectedImageIndex}`"
                    :src="images[selectedImageIndex]"
                    class="w-full max-w-[400px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[800px] h-auto object-contain"
                    style="aspect-ratio: 1 / 1;"
                />
                </div>
                <div class="flex flex-wrap justify-center gap-2">
                    <img 
                        v-for="(image, i) in images" 
                        :alt="``" 
                        :key="i"
                        :src="image"
                        @click="setSelectedImageIndex(i)"
                        class="cursor-pointer border-2 border-transparent hover:border-orange-400 rounded object-contain transition duration-300"
                        :class="{ 'border-orange-500': selectedImageIndex === i }"
                        style="width: 100px; height: 100px;"
                    />
                </div>
            </div>
            <div class="lg:col-6 py-3 lg:pl-2">
                <div class="bg-white" style="height: 813px; padding-left: 4rem; padding-top: 2rem">
                    <div v-if="!loading" class="flex align-items-center text-4xl pl-5 pt-5 mb-2"
                        style="font-family: 'MontExtraBold'; color: #000 !important; font-size: 2.4rem !important;">
                        {{ product[0].name }} &nbsp &nbsp
                    </div>
                    <div> <!--Calificación-->
                        <ProductRating :productId="product[0].id" :userId="auth.id_customer"></ProductRating>
                    </div>  
                    <div class="flex align-items-center pl-5 mb-3">
                        <span v-if="!loading && product[0].original_price"
                            class="text-900 font-medium text-lg block line-through" style="
                            color: #99a0a1 !important; 
                            font-family: 'MontBold'; 
                            font-size: 1.6rem !important;
                            margin-right: 0.5rem;
                            ">
                            ${{ product[0].original_price.toFixed(2) }}</span>
                        <span v-if="!loading && !product[0].original_price" class="text-900 font-medium text-lg block"
                            style="
                            color: red !important; 
                            font-family: 'MontBold'; 
                            font-size: 2.2rem !important;
                            ">${{ product[0].price_tax.toFixed(2) }}</span>
                        &nbsp &nbsp
                        <span v-if="!loading && product[0].original_price" class="text-900 font-medium text-lg block"
                            style="
                            color: red !important;
                            font-family: 'MontBold'; 
                            font-size: 2.2rem !important;
                            ">{{ product[0].price_tax.toFixed(2) }}</span>
                    </div>
                    <div v-if="!loading" class="flex align-items-center text-4xl pl-5 mb-8"
                        style="font-family: 'MontSemiBold'; color: #000 !important; font-size: 1.2rem !important;">
                        {{ product[0].key_name }}
                    </div>
                    <div class="flex align-items-center pl-5 pr-5 mb-5">
                        <!-- Contenedor Flex para colocar el InputNumber y el Button en la misma fila -->
                        <div class="flex align-items-center mb-2">
                            <!-- InputNumber de cantidad -->
                            <InputNumber showButtons buttonLayout="horizontal" :min="1" :max="stock == 0 ? 1 : stock"
                                inputClass="w-8rem text-center py-2 px-1 border-transparent outline-none shadow-none"
                                v-model="quantity" class="border-1 surface-border border-round mr-4"
                                decrementButtonClass="p-button-text text-600 hover:text-primary py-1 px-1"
                                incrementButtonClass="p-button-text text-600 hover:text-primary py-1 px-1"
                                incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" style="font-family: 'Montsemibold';
                            height: 40px;
                            border-radius: 60px !important">
                            </InputNumber>

                            <!-- Botón Comprar ahora -->
                            <Button @click="addToCart(true)"
                                :disabled="(dissableNoStock == 1 && stock <= 0) || product[0].is_only_store == true"
                                label="Comprar" class="w-auto" style="font-family: 'Montsemibold';
                                font-size: 1.2rem;
                                border-radius: 160px;
                                background: #00365f;
                                color: white;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                height: 40px;
                                width: 150px !important;
                                border: none;
                                margin-right: 1rem;
                            ">
                            </Button>

                            <!-- Botón Agregar al carrito -->
                            <Button @click="addToCart(false)"
                                :disabled="(dissableNoStock == 1 && stock <= 0) || product[0].is_only_store == true"
                                label="Agregar al carrito" class="w-auto" style="font-family: 'Montsemibold'; 
                                border-radius: 160px !important; 
                                font-size: 1.2rem;
                                padding: 0 1rem;
                                background: #ff7a0d; 
                                color: white; 
                                height: 40px;
                                border: none;
                                display: flex;
                                align-items: center;
                            ">
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Div azul ajustado para ocupar 6 columnas -->
        <div class="col-12 lg:col-12 py-3 lg:pl-12" style="padding: 4rem;" >
            <!-- <div class="font-bold text-900" style="font-family: Montsemibold;">Sucursal</div>
            <div class="flex">
                <div class="field col-12 h-3rem">
                    <Dropdown v-model="selectedBranch" :options="existence" optionValue="id_branch"
                        optionLabel="branch_name" placeholder="Seleccione una Sucursal" class="w-full"
                        style="font-family: 'Montserrat';" />
                </div>
            </div>
             
            <div v-if="!loading && product[0].is_attributable" class="font-bold text-900 mt-4"
                style="font-family: 'Montsemibold';">Atributos</div>
            <div v-if="!loading && product[0].is_attributable" class="flex">
                <div v-for="sa in save_atributes" :key="sa.id_attribute" class="field col-6 h-2rem">
                    <label class="h-2rem" style="font-family: 'Montserrat';">{{ GetName(sa) }}</label>
                    <br>
                    <Dropdown v-model="item_attributes[sa.id_attribute - 1]" :options="atts[sa.id_attribute - 1]"
                        optionValue="id_serie" optionLabel="name" class="w-full" @change="changeSubarticle"
                        style="font-family: 'Montserrat'">
                    </Dropdown>
                </div>
            </div>
             -->
            <TabView>
                <TabPanel header="Descripción" style="font-family: 'Montserrat' !important;">
                    <p class="line-height-3 text-600 p-0 mx-0 mt-0 mb-4" v-if="!loading"
                        style="font-family: 'Montserrat';">
                        {{ product[0].key_name }}
                    </p>
                </TabPanel>
                <TabPanel header="Detalles" style="font-family: 'Montserrat' !important;">
                    <div class="grid">
                        <div class="col-12 lg:col-6">
                            <span class="text-900 block font-medium mb-3 font-bold"
                                style="font-family: 'Montbold';">SKU</span>
                            <ul class="py-0 pl-3 m-0 text-600 mb-3">
                                <li class="mb-2" v-if="!loading" style="font-family: 'Montserrat';">
                                    {{ product[0].barcode }}</li>
                            </ul>
                        </div>
                        <div class="col-12 lg:col-6">
                            <span class="text-900 block font-medium mb-3 font-bold"
                                style="font-family: 'Montbold';">Medidas</span>
                            <ul class="py-0 pl-3 m-0 text-600 mb-3" style="font-family: 'Montserrat';">
                                <li class="mb-2" v-if="!loading">Peso: {{ product[0].weight }} g</li>
                                <li class="mb-2" v-if="!loading">Largo: {{ product[0].height }} cm</li>
                                <li class="mb-2" v-if="!loading">Ancho: {{ product[0].width }} cm</li>
                                <li class="mb-2" v-if="!loading">Alto: {{ product[0].length }} cm</li>
                            </ul>
                        </div>
                        <div class="col-12 lg:col-6">
                            <span class="text-900 block font-medium mb-3 font-bold"
                                style="font-family: 'Montbold';">Marca</span>
                            <ul class="py-0 pl-3 m-0 text-600 mb-3">
                                <li class="mb-2" v-if="!loading" style="font-family: 'Montserrat'">{{ product[0].brand
                                    }}
                                </li>
                            </ul>
                        </div>
                        <div class="col-12 lg:col-6">
                            <span class="text-900 block font-medium mb-3 font-bold"
                                style="font-family: 'Montbold">Categorias y Subcategorias</span>
                            <ul class="py-0 pl-3 m-0 text-600 mb-3">
                                <li class="mb-2" v-if="!loading" style="font-family: 'Montserrat">{{ product[0].fam }}
                                </li>
                                <li class="mb-2" v-if="!loading" style="font-family: 'Montserrat">{{ product[0].gro }}
                                </li>
                                <li class="mb-2" v-if="!loading" style="font-family: 'Montserrat">{{ product[0].sgro }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </TabPanel>
            </TabView>
            <RelatedProductCarusell :value="relateds"/>
        </div>

    </div>
</template>
<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useToast } from "primevue/usetoast";
import { useCartStore } from '../../stores/cart';
import { useAuthStore } from '../../stores/auth';
import { OrderData } from '../Cart/Function/OrderData';
const auth = useAuthStore();
const cartStore = useCartStore();
const toast = useToast();
const entity = new OrderData();
import RelatedProductCarusell from '../../components/general/RelatedProductCarusell.vue'
import Galleria from 'primevue/galleria';
import ProductRating from '../../components/reusables/ProductRating.vue';

const productRating = ref(3);
const route = useRoute();
const router = useRouter();
const selectedBranch = ref<number>();
const stock = ref<number>();
const product = ref<any[]>([]);
const existence = ref<any[]>([])
const id_user = ref<string>(auth.id_customer ? auth.id_customer.toString() : "0");
const loading = ref<boolean>(true);
const atribute_name = ref<any[]>([]);
const item_attributes = ref<any[]>([]);
const atts = ref<any[]>([]);
const save_atributes = ref<any[]>([]);
const atributes = ref<any[]>([]);
const relateds = ref<any[]>([]);
const dissableNoStock = ref<number>(0);
const showStock = ref<number>(0);


const selectedImageIndex = ref(0);
const liked = ref(false);
const quantity = ref(1);
const color = ref('bluegray');
const size = ref('M');
const images = ref<string[]>([]);
// Obtener la ruta base de la API desde las variables de entorno
const apiRoute = import.meta.env.VITE_API_ROUTE;

const onSwiper = (swiper) => {
    console.log(swiper);
};
const onSlideChange = () => {
    console.log('slide change');
};

const refresh = async () => {
    loading.value = true;
    try {
        dissableNoStock.value = import.meta.env.VITE_DISSABLE_NO_STOCK;
        showStock.value = import.meta.env.VITE_SHOW_STOCK;
        if (cartStore.order.length == 1)
            await entity.newOrder();
        let response = await axios.get('Inventory/EComerce/GetArticleInfo/' + route.params.id_article + '/' + route.params.id_subarticle + '/' + id_user.value)
        product.value = response.data;
        console.log(JSON.stringify(product.value))

        //Extraemos solo las imagenes que pertenecen a ese articulo
        const responseImg = await axios.get(`Inventory/EComerce/GetImages/${product.value[0].id}`);

        // Transformar los datos recibidos a una lista de URLs de imágenes. En caso de no tener imagen cargada traera la de la marca
        images.value = responseImg.data.map(imgObj => [
            imgObj.image_name_1 ? getImageUrl(imgObj.image_name_1.replace('.jpeg', '')) : imgbrand(product.value[0].id + '_' + product.value[0].barcode + '_1', product.value[0].id_brand),
            imgObj.image_name_2 ? getImageUrl(imgObj.image_name_2.replace('.jpeg', '')) : imgbrand(product.value[0].id + '_' + product.value[0].barcode + '_2', product.value[0].id_brand),
            imgObj.image_name_3 ? getImageUrl(imgObj.image_name_3.replace('.jpeg', '')) : imgbrand(product.value[0].id + '_' + product.value[0].barcode + '_3', product.value[0].id_brand),
            imgObj.image_name_4 ? getImageUrl(imgObj.image_name_4.replace('.jpeg', '')) : imgbrand(product.value[0].id + '_' + product.value[0].barcode + '_4', product.value[0].id_brand)
        ]).flat(); // 'flat()' para aplanar el array de arrays

        let existence_resposnse = await axios.get('Inventory/EComerce/GetProductExistences/' + route.params.id_article + '/' + route.params.id_subarticle)
        existence.value = existence_resposnse.data;

        let article_related = await axios.get('Inventory/EComerce/GetArticleRelated/' + route.params.id_article + '/' + route.params.id_subarticle + '/' + id_user.value)
        relateds.value = article_related.data;

        //Por el momento es asi, pero si el cliente ya asigno una sucursal a su cuenta, se pondra siempre el stock en esa sucursal
        let branch = existence.value.sort((a, b) => b.stock - a.stock)[0].id_branch
        selectedBranch.value = branch;
        console.log(selectedBranch.value)
        forceUpdateBranch(selectedBranch.value)
        if (product.value[0].is_attributable == true) {
            let response = await axios.get('Inventory/EComerce/GetAttributes');
            atributes.value = response.data;
            item_attributes.value = new Array(atributes.value.length);
            atts.value = new Array(atributes.value.length);
            response = await axios.get('Inventory/EComerce/GetAttributeNames');
            atribute_name.value = response.data;
            response = await axios.get('Inventory/EComerce/GetAtributes/' + product.value[0].id)
            save_atributes.value = response.data;
            save_atributes.value = save_atributes.value.sort((a, b) => a.id_attribute - b.id_attribute)
            if (save_atributes.value.length > 0) {
                for (const attributes of save_atributes.value) {
                    response = await axios.get('Inventory/EComerce/GetOptions/' + attributes.id)
                    let att = response.data
                    att = att.map(x => +x);
                    let att_attributes = atribute_name.value.filter(x => x.id_attribute == attributes.id_attribute);
                    att_attributes = att_attributes.filter(x => att.includes(x.id_serie));
                    if (att_attributes != null) {
                        let newRecord = { "id": 0, "id_attribute": attributes.id_attribute, "id_serie": 0, "name": "N/A", "prop": null };
                        att_attributes.unshift(newRecord);
                    }
                    atts.value[attributes.id_attribute - 1] = att_attributes;
                }
                let i = -1;
                let subarticle = product.value[0].subarticle.split(",");
                for (const sub of subarticle) {
                    if (sub != "0" || sub != String(product.value[0].id)) {
                        item_attributes.value[i] = parseInt(sub);
                    }
                    i++;
                }
            }
        }
    } catch {
        console.log("No se cargaron los datos")
    }
    finally {
        loading.value = false;
    }
}

const GetName = (sa) => {
    let name = atributes.value.filter(x => x.id == sa.id_attribute);
    return name[0].name;
}
const imgbrand = (id, brand) => {

    return import.meta.env.VITE_API_ROUTE + 'Inventory/Ecomerce/imgbrand/' + id + '/' + brand;
}

const addToCart = (payNow) => {
    console.log(JSON.stringify(product.value[0]))
    cartStore.addCart(product.value[0], quantity.value, selectedBranch.value, false);
    if (payNow == true) {
        if (auth.id_usuario) {
            router.push('/orderdata')
        } else {
            router.push('/auth/login')
        }
    } else {
        toast.add({ severity: 'success', summary: 'Agregado', detail: 'Articulo Agregado al carrito', life: 3000 });
        quantity.value = 1
    }

}

const forceUpdateBranch = (branch) => {
    let stockx = existence.value.filter(x => x.id_branch == branch)[0].stock;
    if (branch != undefined && stockx > 0) {
        stock.value = stockx;
    } else if (branch != undefined && stockx <= 0) {
        stock.value = 0
    } else {
        stock.value = undefined;
    }
}
const setSelectedImageIndex = (index: number) => {
    selectedImageIndex.value = index;
};

// Función para construir la URL de la imagen
const getImageUrl = (imageName: string) => {
    return `${apiRoute}Inventory/EComerce/image/${imageName}` + "/" + new Date();
};
const changeSubarticle = async () => {

    let id_subarticle = String(product.value[0].id)
    for (let i = 0; i < atributes.value.length; i++) {
        id_subarticle = id_subarticle + (item_attributes.value[i] != null ? item_attributes.value[i] : "0");;
    }
    let response = await axios.get('Inventory/EComerce/ChekExistence/' + id_subarticle)
    if (response.data == false) {
        toast.add({ severity: 'warn', summary: 'Combinacion invalida', detail: 'No existe productos con dicha combinacion', life: 3000 });
        let i = -1;
        let subarticle = product.value[0].subarticle.split(",");
        for (const sub of subarticle) {
            if (sub != "0" || sub != String(product.value[0].id)) {
                item_attributes.value[i] = parseInt(sub);
            }
            i++;
        }
    } else if (response.data == true) {
        router.push('/product/' + product.value[0].id + '/' + id_subarticle)
    }
};

watch(selectedBranch, (newvalue) => {
    let stockx = existence.value.filter(x => x.id_branch == newvalue)[0].stock;
    if (newvalue != undefined && stockx > 0) {
        stock.value = stockx;
    } else if (newvalue != undefined && stockx <= 0) {
        stock.value = 0
    } else {
        stock.value = undefined;
    }
})

watch(router.currentRoute, async () => {
    await refresh();
})

onMounted(async () => {
    console.log('QUE PEX PUTO YA CASI ACABAS ESTE PEDO Y VAS A PODER COBRAR AUMENTO PAPI ECHALE GANAS TU PUEDES')
    await refresh();
});

</script>
<style>
.p-tabview-nav {
    justify-content: center !important;
    font-family: 'MontExtraBold' !important;
    font-size: 1.2rem;
}

.custom-dropdown .p-dropdown {
    height: 2rem;
    /* Ajusta la altura del Dropdown */
}

.custom-dropdown .p-dropdown-label {
    line-height: 0rem;
    /* Ajusta la altura del contenido del label */
    overflow: hidden;
    /* Oculta el contenido que se desborda */
    text-overflow: ellipsis;
    /* Añade puntos suspensivos al texto que se desborda */
    white-space: nowrap;
    /* Evita que el texto haga un salto de línea */
}

.custom-dropdown .p-dropdown-items-wrapper {
    max-height: 10rem;
    /* Ajusta la altura máxima del panel desplegable */
    overflow-y: auto;
    /* Añade desplazamiento vertical */
}

.custom-dropdown .p-dropdown-item {
    line-height: 1.5rem;
    /* Ajusta la altura de cada ítem en el panel desplegable */
}
</style>