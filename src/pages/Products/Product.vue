<template>
    <div class="card">
        <div class="grid mb-7">
            <div class="col-12 lg:col-5">
                <div class="flex">
                    <div class="flex flex-column w-2 justify-content-between" :style="{ rowGap: '1rem' }">
                        <img v-for="(image, i) in images" :alt="String(i)" :key="i"
                            :src="`/demo/images/ecommerce/productoverview/${image}`"
                            class="w-full cursor-pointer border-2 border-transparent transition-colors transition-duration-150 border-round"
                            :class="{ 'border-primary': selectedImageIndex === i }" @click="setSelectedImageIndex(i)" />
                    </div>
                    <div class="pl-3 w-10 flex">
                        <img :alt="images[selectedImageIndex]"
                            :src="`/demo/images/ecommerce/productoverview/${images[selectedImageIndex]}`"
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
                        <p class="line-height-3 text-600 p-0 mx-0 mt-0 mb-4"  v-if="!loading">
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
                                <span class="text-900 block font-medium mb-3 font-bold">Peso</span>
                                <ul class="py-0 pl-3 m-0 text-600 mb-3">
                                    <li class="mb-2" v-if="!loading">{{product[0].weight}} KG</li>
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
                <div class="font-bold text-900 mb-3">Stock</div>
                <div class="flex align-items-center mb-5">
                    <label v-if="stock != undefined && stock > 0" class="w-full text-lg text-green-500">{{ stock }}
                        Disponible</label>
                    <label v-if="stock != undefined && stock <= 0" class="w-full text-lg text-red-500">{{ stock }}
                        Disponible</label>
                </div>
                <div class="font-bold text-900 mb-3">Cantidad</div>
                <div class="flex flex-column sm:flex-row sm:align-items-center sm:justify-content-between">
                    <InputNumber
                        showButtons
                        buttonLayout="horizontal"
                        :min="1"
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
                    <Button @click="addToCart" label="Añadir al carrito" class="w-full"></Button>
                </div>
                <div class="col-12">
                    <Button label="Pagar Ahora" class="w-full"></Button>
                </div>
            </div>
        </div>

        <TabView>
            <TabPanel header="Details">
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
const cartStore = useCartStore();
const toast = useToast();
import RelatedProductCarusell from '../../components/general/RelatedProductCarusell.vue'


const route = useRoute();
const router = useRouter();
const selectedBranch = ref<number>();
const stock = ref<number>();
const product = ref<any[]>([]);
const existence = ref<any[]>([])
const id_user = ref<string>("0");
const loading = ref<boolean>(true);
const atribute_name = ref<any[]>([]);
const item_attributes = ref<any[]>([]);
const atts = ref<any[]>([]);
const save_atributes = ref<any[]>([]);
const atributes = ref<any[]>([]);
const relateds = ref<any[]>([]);



const selectedImageIndex = ref(0);
const liked = ref(false);
const quantity = ref(1);
const color = ref('bluegray');
const size = ref('M');
const images = ref<string[]>([]);

const refresh = async () => {
    loading.value = true;
    try {
        let response = await axios.get('Inventory/EComerce/GetArticleInfo/' + route.params.id_article + '/' + route.params.id_subarticle + '/' + id_user.value)
        product.value = response.data;
        console.log(JSON.stringify(product.value))

        //Extraemos solo las imagenes que pertenecen a ese articulo
        const responseImg = await axios.get(`Inventory/EComerce/GetImages/${product.value[0].id}`);

        // images.value = [];
        // Transformar los datos recibidos a una lista de URLs de imágenes
        images.value = responseImg.data.map(imgObj => [
            imgObj.image_name_1 || 'default-image-1.png',
            imgObj.image_name_2 || 'default-image-2.png',
            imgObj.image_name_3 || 'default-image-3.png',
            imgObj.image_name_4 || 'default-image-4.png'
        ]).flat(); // 'flat()' para aplanar el array de arrays
        console.log('images', images.value);

        let existence_resposnse = await axios.get('Inventory/EComerce/GetProductExistences/' + route.params.id_article + '/' + route.params.id_subarticle)
        existence.value = existence_resposnse.data;

        let article_related = await axios.get('Inventory/EComerce/GetArticleRelated/' + route.params.id_article + '/' + route.params.id_subarticle + '/' + id_user.value)
        relateds.value = article_related.data;
        // console.log(JSON.stringify(existence.value.sort((a, b) => b.stock - a.stock)[0].stock))

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

const addToCart = () => {
    cartStore.addCart(product.value[0], quantity.value, selectedBranch.value);
    toast.add({ severity: 'success', summary: 'Agregado', detail: 'Articulo Agregado al carrito', life: 3000 });
    quantity.value = 1
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
const setSelectedImageIndex = (index) => {
    selectedImageIndex.value = index;
};
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