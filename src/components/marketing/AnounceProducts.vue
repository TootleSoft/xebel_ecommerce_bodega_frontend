<template>
    <div class="main-container">
        <!-- Foto rectangular horizontal -->
        <div class="photo horizontal-photo">
            <img :src="'/src/images/banner/banner_1.png'" alt="Producto 2" />
        </div>
        <!-- Foto cuadrada -->
        <div class="photo square-photo">
            <img :src="'/src/images/banner/baner cuadrado2.png'" alt="Producto 1" />
        </div>
        <!-- Foto cuadrada -->
        <div class="photo square-photo">
            <img :src="'/src/images/banner/baner cuadrado1.png'" alt="Producto 4" />
        </div>
    </div>
</template>

<script>
export default {
    name: "AnounceProducts",
};
</script>

<style scoped>
.main-container {
    display: grid;
    grid-template-columns: 1fr 1fr; /* Dos columnas: una para la imagen rectangular y otra para las cuadradas */
    grid-template-rows: auto; /* Filas automáticas */
    gap: 1rem; /* Espaciado entre las fotos */
    margin: 4rem auto;
    max-width: 1400px;
    height: 800px;
}

.photo {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.photo img {
    width: 100%;
    height: auto;
    object-fit: cover;
}

.horizontal-photo {
    grid-column: 1 / 2; /* Ocupa la primera columna */
    grid-row: 1 / 3; /* Ocupa dos filas */
}

.square-photo {
    grid-column: 2 / 3; /* Ocupa la segunda columna */
    grid-row: auto; /* Cada imagen cuadrada ocupa una fila */
}
</style>