<template>
    <div v-if="open" class="modal-overlay">
        <div v-if="authStore.id_customer" class="modal-content">
            <button class="close-button" @click="emit('close')">x</button>
            <h2>Elige tu ubicación</h2>
            <!-- Lista de direcciones guardadas -->
            <div v-if="props.savedAddresses.length > 0" class="saved-addresses">
                <h3>Direcciones guardadas</h3>
                <ul class="clickable-address-list">
                    <li
                        v-for="(addr, index) in props.savedAddresses"
                        :key="index"
                        :class="{ selected: selected?.address === addr.addressText && selected?.postalCode === addr.postalCode }"
                        @click="selectAddress(addr)"
                    >
                        📍 {{ addr.addressText }} (CP: {{ addr.postalCode }})
                        <button 
                            @click="deleteAddress(addr.id)" 
                            class="text-red-600 hover:text-red-800"
                            aria-label="Eliminar dirección"
                            v-tooltip.top="'Clic para eliminar esta dirección'"
                            >
                            <i class="pi pi-trash"></i> 
                        </button>
                    </li>
                </ul>
            </div>

            <form @submit.prevent="handleSubmit">
                <label for="title" class="text-900 text-xl block font-medium mb-1">Agrega una dirección de entrega:</label>
                <label for="postal">Código Postal:</label>
                <input id="postal" v-model="postalCode" placeholder="Código Postal" />

                <label for="address">Dirección:</label>
                <input id="address" v-model="address" placeholder="Calle, número, ciudad..." />

                <div class="modal-actions">
                    <button type="submit">Guardar</button>
                    <button type="button" @click="emit('close')">Cancelar</button>
                </div>
            </form>
        </div>
        <div v-else class="modal-actions">
            <h2>Debes iniciar sesión para elegir tu ubicación</h2>
            <button @click="router.push('/auth/login')">Iniciar Sesión</button>
        </div>
    </div>
</template>
  
  <script setup>
  import { ref, defineEmits, defineProps } from 'vue'
  import { useAuthStore } from '../../stores/auth';
  import { useRouter } from 'vue-router';
  import axios from 'axios';
  const router = useRouter();
  const authStore = useAuthStore();

  const props = defineProps({ 
    open: Boolean,
    savedAddresses: {
        type: Array,
        default: () => []
    }
})

  const emit = defineEmits(['close', 'save', 'delete'])
  
  const postalCode = ref('')
  const address = ref('')
  
  const selected = ref(null)


function selectAddress(addr) {
  selected.value = addr
  emit('save', addr)
  emit('close')
}

  function handleSelectSavedAddress(address) {
    emit('save', address)
    emit('close')
    }
  const deleteAddress = async (id) => {
    emit('delete', id)
  }
  async function handleSubmit() {
    if (!authStore.id_customer) {
      router.push('/auth/login')
      return
    }
    const newAddress = {
        address: address.value,
        postalCode: postalCode.value,
        customerId: authStore.id_usuario,
    }

    try {
    const response = await axios.post('/Ecommerce/Customer/saveAddress', newAddress);
        emit('save', response.data);

        //Limpio campos y cierro el modal
        address.value = ''
        postalCode.value = ''
        emit('close')
    } catch (error) {
        console.error('Error al guardar la dirección: ', error);
    }
  }
  </script>
  
  <style scoped>
  .trash-button {
    color: red;
    align-self: end;
  }
  .close-button {
  position: absolute;
  top: 8px;
  right: 8px;
  background: transparent;
  border: none;
  font-size: 1.9rem;
  color: rgb(0, 0, 82);
  cursor: pointer;
  z-index: 10001;
  transition: color 0.2s ease;
  }
  
.close-button:hover {
  color: #000;
}
  .clickable-address-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.clickable-address-list li {
  padding: 0.8rem;
  margin-bottom: 0.5rem;
  background-color: #f1f1f1;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  border: 1px solid transparent;
  color: black;
}

.clickable-address-list li:hover {
  background-color: #f1f1f1;
  color: black;
  border: 1px solid #ff9800;
}

.clickable-address-list li.selected {
  background-color: #ffd180;
  border-color: #ff9800;
}

.saved-addresses {
  background-color: #fafafa;
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem 1.5rem 0;
  font-size: 0.9rem;
  max-height: 200px;
  overflow-y: auto;
}

.saved-addresses h3 {
  margin-bottom: 0.5rem;
  font-size: 1rem;
  color: #444;
}

.saved-addresses ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.address-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.4rem 0;
  border-bottom: 1px solid #eee;
}

.address-text {
  color: #333;
}

.address-item button {
  background-color: #ff9800;
  border: none;
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
}

.address-item button:hover {
  background-color: #e68900;
}

 .modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-content {
  background: #ffffff;
  padding: 0;
  border-radius: 12px;
  width: 400px;
  height: auto;
  max-height: 90vh;
  overflow: hidden;
  border: 2px solid #ff9800;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  position: relative;
}

.modal-content h2 {
  background-color: #f5f5f5;
  padding: 1rem 1.2rem;
  margin: 0;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  border-bottom: 1px solid #ddd;
}

form {
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  gap: 1rem;
}

label {
  font-size: 0.95rem;
  font-weight: 500;
  color: #444;
}

input {
  padding: 0.6rem 0.8rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.2s;
}

input:focus {
  border-color: #ff9800;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.8rem;
  margin-top: 1.5rem;
}

.modal-actions button {
  border: none;
  border-radius: 6px;
  padding: 0.6rem 1.2rem;
  font-size: 0.95rem;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.modal-actions button[type="submit"] {
  background-color: #ff9800;
  color: white;
}

.modal-actions button[type="submit"]:hover {
  background-color: #e68900;
}

.modal-actions button[type="button"] {
  background-color: #e0e0e0;
  color: #333;
}

.modal-actions button[type="button"]:hover {
  background-color: #ccc;
}

  </style>
  
