<template>
    <div v-if="!loading" class="card">
        <div class="grid mb-7">
            <div class="col-12 lg:col-5">
                <div class="flex">
                    <div class="flex flex-column w-2 justify-content-between" :style="{ rowGap: '1rem' }">
                        <img v-for="(image, i) in images" :alt="`Image ${i}`" :key="i" :src="image"
                            class="w-full cursor-pointer border-2 border-transparent transition-colors transition-duration-150 border-round"
                            :class="{ 'border-primary': selectedImageIndex === i }" @click="setSelectedImageIndex(i)" />
                    </div>
                    <div class="pl-3 w-10 flex">
                        <img :alt="`Selected Image ${selectedImageIndex}`" :src="images[selectedImageIndex]"
                            class="w-full border-2 border-transparent border-round" />
                    </div>
                </div>
            </div>
            <div class="col-12 lg:col-4 py-3 lg:pl-6">
                <!-- Se utilizaba en el codigo para atributos pero se cambiara -->

                <div class="font-bold text-900">Sucursal</div>
                <div class="flex">
                    <div class="field col-12 h-3rem">
                        <Dropdown v-model="selectedBranch" :options="existence" optionValue="id_branch"
                            optionLabel="branch_name" placeholder="Seleccione una Sucursal" class="w-full" />
                    </div>
                </div>



                <div v-if="!loading && product[0].is_attributable" class="font-bold text-900">Atributos</div>
                <div v-if="!loading && product[0].is_attributable" class="flex">
                    <div v-for="sa in save_atributes" :key="sa.id_attribute" class="field col-6 h-2rem">
                        <label class=" h-2rem">{{ GetName(sa) }}</label>
                        <br>
                        <Dropdown v-model="item_attributes[sa.id_attribute - 1]" :options="atts[sa.id_attribute - 1]"
                            optionValue="id_serie" optionLabel="name" class=" w-full" @change="changeSubarticle">
                        </Dropdown>
                    </div>
                </div>
                <br>
                <br>
                <br>
                <TabView>
                    <TabPanel header="Descripción">
                        <div class="text-900 font-bold text-3xl mb-4 mt-2">Descripción del producto</div>
                        <p class="line-height-3 text-600 p-0 mx-0 mt-0 mb-4" v-if="!loading">
                            {{ product[0].key_name }}
                        </p>
                    </TabPanel>
                    <TabPanel header="Detalles">
                        <div class="grid">
                            <div class="col-12 lg:col-6">
                                <span class="text-900 block font-medium mb-3 font-bold">SKU</span>
                                <ul class="py-0 pl-3 m-0 text-600 mb-3">
                                    <li class="mb-2" v-if="!loading">{{product[0].barcode}}</li>
                                </ul>
                            </div>
                            <div class="col-12 lg:col-6">
                                <span class="text-900 block font-medium mb-3 font-bold">Medidas</span>
                                <ul class="py-0 pl-3 m-0 text-600 mb-3">
                                    <li class="mb-2" v-if="!loading">Peso: {{product[0].weight}} g</li>
                                    <li class="mb-2" v-if="!loading">Largo: {{product[0].height}} cm</li>
                                    <li class="mb-2" v-if="!loading">Ancho: {{product[0].width}} cm</li>
                                    <li class="mb-2" v-if="!loading">Alto: {{product[0].length}} cm</li>
                                </ul>
                            </div>
                            <div class="col-12 lg:col-6">
                                <span class="text-900 block font-medium mb-3 font-bold">Marca</span>
                                <ul class="py-0 pl-3 m-0 text-600 mb-3">
                                    <li class="mb-2" v-if="!loading">{{product[0].brand}}</li>
                                </ul>
                            </div>
                            <div class="col-12 lg:col-6">
                                <span class="text-900 block font-medium mb-3 font-bold">Categorias y
                                    Subcategorias</span>
                                <ul class="py-0 pl-3 m-0 text-600 mb-3">
                                    <li class="mb-2" v-if="!loading">{{product[0].fam}}</li>
                                    <li class="mb-2" v-if="!loading">{{product[0].gro}}</li>
                                    <li class="mb-2" v-if="!loading">{{product[0].sgro}}</li>
                                </ul>
                            </div>
                        </div>
                    </TabPanel>
                </TabView>
            </div>
            <div class="col-12 lg:col-2 py-3 lg:pl-6">
                <div v-if="!loading" class="flex align-items-center text-2xl font-medium text-900 mb-4">
                    {{product[0].name}} &nbsp &nbsp <i class="pi text-2xl cursor-pointer"
                        :class="{ 'pi-heart text-600': !liked, 'pi-heart-fill text-orange-500': liked }"
                        @click="liked = !liked"></i></div>
                <div class="flex align-items-center mb-5">
                    <span v-if="!loading && !product[0].original_price"
                        class="text-900 font-medium text-lg block">${{product[0].price_tax.toFixed(2)}}</span>
                    <span v-if="!loading && product[0].original_price"
                        class="text-900 font-medium text-lg block line-through">${{product[0].original_price.toFixed(2)}}</span>
                    &nbsp &nbsp
                    <span v-if="!loading && product[0].original_price"
                        class="text-900 font-medium text-lg block text-red-500">${{product[0].price_tax.toFixed(2)}}</span>
                </div>
                <div v-if="!loading">
                    <div v-if="showStock == 1">
                        <div class="font-bold text-900 mb-3">Stock</div>
                        <div class="flex align-items-center mb-5">
                            <label v-if="product[0].is_only_store == true" class="w-full text-lg text-green-500">SOLO DE VENTA EN TIENDA</label>
                            <label v-else-if="stock != undefined  && stock > 0 && stock > 2" class="w-full text-lg text-green-500">{{ stock }}
                                Disponible</label>
                            <label v-else-if="stock != undefined && stock > 0 && stock <= 2" class="w-full text-lg text-orange-500">{{ stock }}
                                Disponible</label>
                            <label v-else-if="stock != undefined && stock <= 0" class="w-full text-lg text-red-500">{{ stock }}
                                Disponible</label>
                        </div>
                    </div>
                    <div v-else>
                        <div class="flex align-items-center mb-5">
                            <label v-if="product[0].is_only_store == true" class="w-full text-lg text-green-500">SOLO DE VENTA EN TIENDA</label>
                            <label v-else-if="stock != undefined  && stock > 0 && stock > 2" class="w-full text-lg text-green-500">EN EXISTENCIA</label>
                            <label v-else-if="stock != undefined && stock > 0 && stock <= 2" class="w-full text-lg text-orange-500">POCA EXISTENCIA</label>
                            <label v-else-if="stock != undefined && stock <= 0" class="w-full text-lg text-red-500">SIN EXISTENCIA</label>
                        </div>
                    </div>
                </div>
                <div class="font-bold text-900 mb-3">Cantidad</div>
                <div class="flex flex-column sm:flex-row sm:align-items-center sm:justify-content-between">
                    <InputNumber showButtons buttonLayout="horizontal" :min="1" :max="stock == 0 ? 1 : stock"
                        inputClass="w-2rem text-center py-2 px-1 border-transparent outline-none shadow-none"
                        v-model="quantity" class="border-1 surface-border border-round"
                        decrementButtonClass="p-button-text text-600 hover:text-primary py-1 px-1"
                        incrementButtonClass="p-button-text text-600 hover:text-primary py-1 px-1"
                        incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"></InputNumber>
                    <!-- <div class="flex align-items-center flex-1 mt-3 sm:mt-0 ml-0 sm:ml-5">
                        <Button label="Add to Cart" class="flex-1"></Button>
                    </div> -->
                </div>
                <br>
                <div class="col-12">
                    <Button @click="addToCart(false)" :disabled="(dissableNoStock == 1 && stock <= 0) || product[0].is_only_store == true" label="Añadir al carrito" class="w-full"></Button>
                </div>
                <div class="col-12">
                    <Button @click="addToCart(true)" :disabled="(dissableNoStock == 1 && stock <= 0) || product[0].is_only_store == true" label="Añadir al carrito y Pagar Ahora" class="w-full"></Button>
                </div>
                <div class="col-12">
                    <button @click="fetchData">Enviar a domicilio</button>
                </div>
            </div>
        </div>

        <TabView>
            <TabPanel header="Productos relacionados">
                <div class="card">
                    <RelatedProductCarusell :value="relateds" />
                </div>
            </TabPanel>
        </TabView>
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
import {OrderData} from '../Cart/Function/OrderData';
const auth = useAuthStore();
const cartStore = useCartStore();
const toast = useToast();
const entity = new OrderData();
import RelatedProductCarusell from '../../components/general/RelatedProductCarusell.vue'
import Galleria from 'primevue/galleria';




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
        if(cartStore.order.length == 1)
            await entity.newOrder();
        let response = await axios.get('Inventory/EComerce/GetArticleInfo/' + route.params.id_article + '/' + route.params.id_subarticle + '/' + id_user.value)
        product.value = response.data;
        console.log(JSON.stringify(product.value))

        //Extraemos solo las imagenes que pertenecen a ese articulo
        const responseImg = await axios.get(`Inventory/EComerce/GetImages/${product.value[0].id}`);

        // Transformar los datos recibidos a una lista de URLs de imágenes. En caso de no tener imagen cargada traera la de la marca
        images.value = responseImg.data.map(imgObj => [
            imgObj.image_name_1 ? getImageUrl(imgObj.image_name_1.replace('.jpeg', '')) : imgbrand(product.value[0].barcode, product.value[0].id_brand),
            imgObj.image_name_2 ? getImageUrl(imgObj.image_name_2.replace('.jpeg', '')) : imgbrand(product.value[0].barcode, product.value[0].id_brand),
            imgObj.image_name_3 ? getImageUrl(imgObj.image_name_3.replace('.jpeg', '')) : imgbrand(product.value[0].barcode, product.value[0].id_brand),
            imgObj.image_name_4 ? getImageUrl(imgObj.image_name_4.replace('.jpeg', '')) : imgbrand(product.value[0].barcode, product.value[0].id_brand)
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

const GetName = (sa) =>{
    let name = atributes.value.filter(x => x.id == sa.id_attribute);
    return name[0].name;
}
const imgbrand = (id, brand) => {

    return import.meta.env.VITE_API_ROUTE + 'Inventory/Ecomerce/imgbrand/' + id + '/' + brand;
}

const addToCart = (payNow) => {
    console.log(JSON.stringify(product.value[0]))
    cartStore.addCart(product.value[0], quantity.value, selectedBranch.value, false);
    if(payNow == true){
        if(auth.id_usuario){
            router.push('/orderdata')
        }else{
            router.push('/auth/login')
        }
    }else{
        toast.add({ severity: 'success', summary: 'Agregado', detail: 'Articulo Agregado al carrito', life: 3000 });
        quantity.value = 1
    }
    
}

const forceUpdateBranch = (branch) =>{
    let stockx = existence.value.filter(x => x.id_branch == branch)[0].stock;
    if(branch != undefined && stockx > 0){
        stock.value = stockx;
    }else if(branch != undefined && stockx <= 0){
        stock.value = 0
    }else{
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

// const fetchData = async () => {
//     console.log(`entro funcion`);
//     const query: string = new URLSearchParams({
//         client_id: 'dRJGi3o4fw8rI8woNFhMYb3LfdBxcd2ciGEmqw90OOsCMLQ5',
//         redirect_uri: 'https://playground.christensencreativeco.com/php-ups-api-rate-oauth2/receiveAuthentication.php',
//         response_type: 'code',
//         state: 'state',
//         scope: 'read',
//     }).toString();
//     console.log(`url`,query);

//   const resp: Response = await fetch(
//     `https://wwwcie.ups.com/security/v1/oauth/authorize?${query}`,
//     { method: 'GET' }
//   );
//   console.log(resp);

//   const data: string = await resp.text();
// }

//metodo para conectarse a generar envios a travez de Skydropx
interface Address {
  province: string;
  city: string;
  name: string;
  zip: string;
  country: string;
  address1: string;
  company: string;
  address2: string;
  phone: string;
  email: string;
  reference?: string;
  contents?: string;
}

interface Parcel {
  weight: number;
  distance_unit: string;
  mass_unit: string;
  height: number;
  width: number;
  length: number;
}

interface Carrier {
  name: string;
}

interface Shipment {
  address_from: Address;
  parcels: Parcel[];
  address_to: Address;
  consignment_note_class_code: string;
  consignment_note_packaging_code: string;
  carriers: Carrier[];
}

const createShipment = async (shipment: Shipment, apiKey: string) => {
  const response = await fetch('https://api-demo.skydropx.com/v1/shipments/', {
    method: 'POST',
    headers: {
      'Authorization': `Token token=${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(shipment)
  });
    console.log(`response`,response)
  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  const data = await response.json();
  console.log(`data`,data)
  return data;
}

// Ejemplo de uso de la función
const fetchData = async () =>{
  const shipment: Shipment = {
    address_from: {
      province: "Ciudad de México",
      city: "Azcapotzalco",
      name: "Jose Fernando",
      zip: "02900",
      country: "MX",
      address1: "Av. Principal #234",
      company: "skydropx",
      address2: "Centro",
      phone: "5555555555",
      email: "skydropx@email.com"
    },
    parcels: [{
      weight: 3,
      distance_unit: "CM",
      mass_unit: "KG",
      height: 10,
      width: 10,
      length: 10
    }],
    address_to: {
      province: "Jalisco",
      city: "Guadalajara",
      name: "Jorge Fernández",
      zip: "44100",
      country: "MX",
      address1: "Av. Lázaro Cárdenas #234",
      company: "-",
      address2: "Americana",
      phone: "5555555555",
      email: "ejemplo@skydropx.com",
      reference: "Frente a tienda de abarro",
      contents: "Equipo dental"
    },
    consignment_note_class_code: "53131600",
    consignment_note_packaging_code: "1H1",
    carriers: [{ name: "DHL" }, { name: "Fedex" }]
  };
  console.log(`datos envio`,shipment)
  const apiKey = 'Ya2dLvWZBfubsqHBIWr_ekFz_6KDRl9sPUrw1JAVLBo';

  try {
    const shipmentResponse = await createShipment(shipment, apiKey);
    console.log('Shipment created:', shipmentResponse);
  } catch (error) {
    console.error('Error creating shipment:', error);
  }
}
//termina bloque de codigo para generar envios
const changeSubarticle = async () => {

    let id_subarticle = String(product.value[0].id)
    for (let i = 0; i < atributes.value.length; i++) {
        id_subarticle = id_subarticle + (item_attributes.value[i] != null ? item_attributes.value[i] : "0");;
    }
    let response = await axios.get('Inventory/EComerce/ChekExistence/'+id_subarticle)
    if(response.data == false){
        toast.add({ severity: 'warn', summary: 'Combinacion invalida', detail: 'No existe productos con dicha combinacion', life: 3000 });
        let i = -1;
        let subarticle = product.value[0].subarticle.split(",");
        for (const sub of subarticle) {
            if (sub != "0" || sub != String(product.value[0].id)) {
                item_attributes.value[i] = parseInt(sub);
            }
            i++;
        }
    }else if(response.data == true){
        router.push('/product/'+product.value[0].id+'/'+id_subarticle)
    }
};

watch(selectedBranch, (newvalue)=>{
    let stockx = existence.value.filter(x => x.id_branch == newvalue)[0].stock;
    if(newvalue != undefined && stockx > 0){
        stock.value = stockx;
    }else if(newvalue != undefined && stockx <= 0){
        stock.value = 0
    }else{
        stock.value = undefined;
    }
})

watch(router.currentRoute, async ()=>{
    await refresh();
})

onMounted(async () => {
    await refresh();
});

</script>
<style>
.custom-dropdown .p-dropdown {
  height: 2rem; /* Ajusta la altura del Dropdown */
}

.custom-dropdown .p-dropdown-label {
  line-height: 0rem; /* Ajusta la altura del contenido del label */
  overflow: hidden; /* Oculta el contenido que se desborda */
  text-overflow: ellipsis; /* Añade puntos suspensivos al texto que se desborda */
  white-space: nowrap; /* Evita que el texto haga un salto de línea */
}

.custom-dropdown .p-dropdown-items-wrapper {
  max-height: 10rem; /* Ajusta la altura máxima del panel desplegable */
  overflow-y: auto; /* Añade desplazamiento vertical */
}

.custom-dropdown .p-dropdown-item {
  line-height: 1.5rem; /* Ajusta la altura de cada ítem en el panel desplegable */
}
</style>