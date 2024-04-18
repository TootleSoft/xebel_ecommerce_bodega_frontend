<template>
    <div class="p-grid crud-demo" v-if="skeleton">
        <div class="col-12">
            <div class="grid formgrid p-fluid">
                <div class="field hidden md:block col-12 xl:col-2">
                        <Skeleton width="14rem"  class="mb-4"></Skeleton>
                        <Skeleton size="14rem" class="mb-4"></Skeleton>
                        <Skeleton size="14rem" class="mb-4"></Skeleton>
                        <Skeleton size="14rem" class="mb-4"></Skeleton>
                </div>
                <div class="field col-12 sm:col-12 md:col-12 xl:col-10">
                    <div class="card">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    interface Props {
        skeleton: boolean;
    }
    const props = withDefaults(defineProps<Props>(),{
        skeleton: true,
    })
</script>