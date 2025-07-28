<template>
    <div class="navigation-bar">
      <Dialog v-model:visible="showUserDialog" modal header="Mi Cuenta" class="user-dialog" :style="{ width: '300px' }">
        <div class="dialog-options">
          <p @click="logout" class="dialog-option">Cerrar sesión</p>
          <p @click="switchAccount" class="dialog-option">Cambiar de cuenta</p>
          <p @click="router.push('/userorders')" class="dialog-option">Mis Pedidos</p>
        </div>
      </Dialog>
        <Menubar class="MegaMenuBar">
            <!-- Elementos del lado izquierdo -->
            <template #start>
                <div class="start-section">
                    <!-- Código Postal
                    <div class="postal-code">
                        <label for="postal-code-input">Ingresa tu código postal:</label>
                        <input id="postal-code-input" type="text" placeholder="Código Postal" class="postal-input" />
                    </div> -->

                    <button @click="showDialog = true" class="button-address bg-blue-900 text-white py-1 px-3">📍 Agregar dirección</button>

                    <AddressDialog
                      :open="showDialog"
                      :saved-addresses="savedAddresses"
                      @delete="deleteAddress"
                      @close="showDialog = false"
                      @save="handleSaveAddress"
                    />

                    <!-- Categorías -->
                    <div class="categories-menu">
                        <span @mouseover="showCategories = true" @mouseleave="showCategories = false">
                            Categorías
                            <ul v-if="showCategories" class="dropdown-menu">
                                <li @mouseover="showSubcategories = true" @mouseleave="showSubcategories = false">
                                    Electrónica
                                    <ul v-if="showSubcategories" class="dropdown-submenu">
                                        <li @click="router.push('/categories/electronics/phones')">Teléfonos</li>
                                        <li @click="router.push('/categories/electronics/laptops')">Laptops</li>
                                    </ul>
                                </li>
                                <li @click="router.push('/categories/clothing')">Ropa</li>
                                <li @click="router.push('/categories/home')">Hogar</li>
                            </ul>
                        </span>
                    </div>
                    <!-- Ofertas -->
                    <span class="menu-item" @click="router.push('/offers')" v-tooltip.bottom="'Clic para ver nuestras ofertas'">Ofertas</span>
                    <!-- Cupones -->
                    <!-- <span class="menu-item" @click="router.push('/coupons')" v-tooltip.bottom="'Clic para ver nuestros cupones'">Cupones</span> -->
                </div>
            </template>
            <template #end>
                <div class="end-section">
                    <!-- Crea tu cuenta -->
                    <span v-if="!authStore.id_customer" class="menu-item" @click="router.push('auth/login')" v-tooltip.bottom="'Clic para crear tu cuenta'">Crea tu cuenta</span>
                    <!-- Ingresa -->
                    <span v-if="!authStore.id_customer" class="menu-item" @click="router.push('auth/login')" v-tooltip-bottom="'Clic para ingresar'">Ingresa</span>
                    <!-- Nombre de usuario -->
                    <span v-if="authStore.id_customer" class="menu-item" @click="showUserDialog = true" v-tooltip.bottom="'Clic para ver mas opciones'">¡Bienvenido, {{ nombreCliente }}!</span>
                    <!-- Carrito -->
                    <div class="cart-section" @click="shoppingCart" v-tooltip.bottom="'Clic para ver tu carrito'">
                        <i class="pi pi-shopping-cart icon-large"></i>
                        <span class="cart-icon">
                            {{ totalItemsInCart }}                            
                        </span>
                    </div>
                </div>
            </template>
        </Menubar>
    </div>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted, watch } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '../../stores/auth';
  import { useCartStore } from '../../stores/cart';
  import AddressDialog from '../../components/general/AddressDialog.vue';
  import axios from  'axios'; 
  const authStore = useAuthStore();
  const cartStore = useCartStore();
  const router = useRouter();
  const nombreCliente = toTitleCase(authStore.usuario);
  const showUserDialog = ref(false);
  const showDialog = ref(false);
  const userAddress = ref('')
  const showModal = ref(false)
  const savedAddresses = ref([]);

  function addAddress(newAddress) {
    savedAddresses.value.push(newAddress);
  } 

  function handleSaveAddress(data) {
    userAddress.value = `${data.address}, CP ${data.postalCode}`

    const exists = savedAddresses.value.some(addr =>
      addr.address === data.address && addr.postalCode === data.postalCode
    )

    if (!exists) {
      savedAddresses.value.push(data)
    }
  }


  function logout() {
    authStore.logout();
    router.push('/auth/login');
  }

  function switchAccount() {
    authStore.logout();
    router.push('/auth/login');
  }
 
  const totalItemsInCart = computed(() => {
    return cartStore.cart.reduce((total, item) => total + (item.quantity || 1), 0);
  });
  watch(totalItemsInCart, (newVal) => {
    console.log('Total en carrito:', newVal);
  });

  const mounted = onMounted(async() => {
        const response = await axios.get(`/Ecommerce/Customer/addresses/${authStore.id_usuario}`);
        savedAddresses.value = response.data;
   
});
const deleteAddress = async (id: number) => {
  try {
        console.log('Id de la direccion a eliminar: ', id)
        await axios.delete(`/Ecommerce/Customer/deleteAddress/${id}`);
        //Recargo la lista
        savedAddresses.value = savedAddresses.value.filter(a => a.id !== id);
    } catch (error) {
        console.error('Error al eliminar la dirección: ', error);
    }
};
  const shoppingCart = () => {
    if (authStore.usuario) {
      router.push('/shoppingcart');
    } else {
      router.push('/auth/login');
    }
  };
  function toTitleCase(str: string): string {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
  const showCategories = ref(false);
  const showSubcategories = ref(false);
  </script>
  
  <style scoped>
  .address-list {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background-color: #f8f8f8;
    border-radius: 8px;
    font-size: 0.9rem;
    color: #333;
  }
  .address-list ul {
    padding-left: 1rem;
  }
  .button-address {
    border: none;
    font-size: 1rem;
    border: 1px solid transparent;
  }
  .button-address:hover {
    border: 1px solid white;
  }
  .dialog-options {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }
  .dialog-option {
    cursor: pointer;
    padding: 0.8rem;
    transition: background-color 0.3s ease;
    border-radius: 2rem;
    color: rgb(75, 72, 72);
    font-weight: 600;
    font-size: 1.1rem;
  }
  .dialog-option:hover {
    background-color: #93c6f0;
    border-radius: 2rem;
    color: black;
    font-weight: 600;
    font-size: 1.1rem;
  }
  /* Barra de navegación */
  .navigation-bar {
    display: flex;
    justify-content: space-between; /* Separar elementos a izquierda y derecha */
    align-items: center;
    background-color: #0c3e66;
    padding: 0.5rem 1rem;
    
  }
  .MegaMenuBar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    color: white;
  }
  .start-section {
    display: flex;
    align-items: center;
    gap: 1rem; /* Espacio entre los elementos */
  }
    /* Sección derecha */
  .end-section {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  /* Código postal */
  .postal-code {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
   /* Menú desplegable de categorías */
   .categories-menu {
    position: relative;
    cursor: pointer;
  }
  .postal-input {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 150px;
  }
  .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 4px;
    list-style: none;
    padding: 0.5rem;
    margin: 0;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    color: black;
  }
  
  .dropdown-menu li {
    padding: 0.5rem;
    cursor: pointer;
  }
  
  .dropdown-menu li:hover {
    background-color: rgb(247, 190, 85);

  }
  
  .dropdown-submenu {
    position: absolute;
    top: 0;
    left: 100%;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 4px;
    list-style: none;
    padding: 0.5rem;
    margin: 0;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .dropdown-submenu li {
    padding: 0.5rem;
    cursor: pointer;
  }
  
  .dropdown-submenu li:hover {
    background-color: #f0f0f0;
  }
  
  .menu-items {
    cursor: pointer;
    padding: 0.5rem;
  }
  
  .menu-item:hover {
    text-decoration: underline;
    cursor: pointer;
  }
  /* Carrito */
  .cart-section {
    position: relative;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  
  .cart-icon {
    position: relative;
    background-color: red;
    border-radius: 30px;
    height: 20px;
    width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 0.9rem;
    margin-left: 5px;
  }
  @media (max-width: 768px) {
    .navigation-bar {
        flex-direction: column;
        align-items: flex-start; /* Alinear elementos al inicio */
    }
    .start-section,
    .end-section {
            width: 100%;
            justify-content: space-between;
        }
    .postal-code {
        margin-bottom: 0.5rem; /* Agregar espacio entre el código postal y otros elementos */
    }
}
  </style>