<script setup lang="ts">
    import { ref, onMounted, type Ref } from 'vue';
    import type { ISupplier } from '../../interfaces/index';
    import type { IProduct } from '../../interfaces/index';
    import type { ICartSale } from '../../interfaces/index';
    import type { IPurchase } from '../../interfaces/index';
    import useSupplier from '../../composables/supplier';
    import useProduct from '../../composables/product';
    import usePurchase from '../../composables/purchase';
    import IBreadcrumb from "@/components/UI/IBreadcrumb.vue";
    import { useCartPurchaseStore } from "@/stores/cartPurchase"
    import { formatCurrency } from '../../utils/index';

    const cartStore = useCartPurchaseStore()

    const supplierComp = useSupplier()
    const productComp = useProduct()
    const purchaseComp = usePurchase()
    const suppliers : Ref<ISupplier[]> = ref([])

    const products : Ref<IProduct[]> = ref([])

    const price = ref(0)
    const qtyRes = ref(0)
    const initalValueP = ref({ label: 'Selecciona', value: '0' })

    const home = ref({
        label: 'Compras',
        icon: 'pi pi-fw pi-cart-plus',
        to: '/compras'
    })
    const items = ref([
        {
            label: 'Registrar compra',
            icon: 'pi pi-fw pi-cart-plus'
        }
    ])

    const handleSubmit = async (formData : IPurchase) => {
        await purchaseComp.registerPurchase(formData)
    }

    const searchProduct = async (id : string | unknown) => {
        cartStore.productSelected = await productComp.getById(<string>id)
        price.value = cartStore.productSelected!.price!.$numberDecimal
    }

    const addProduct = () => {
        let item : ICartSale = { 
            quantity: qtyRes.value,
            price: price.value,
            products: cartStore.productSelected?._id!,
            name: cartStore.productSelected?.name
        }
        cartStore.addCartPurchase(item)
        cartStore.$reset()
        price.value = 0
        qtyRes.value = 0
    }

    onMounted(async () => {
        suppliers.value = await supplierComp.allSupplier()
        suppliers.value = suppliers.value.map((supplier) => {
            return { label: supplier.social_reason, value: supplier._id }
        })

        products.value = await productComp.allProducts()
        products.value = products.value.filter((product) => {
            return product.type === 1
        })
        products.value = products.value.map((product) => {
            return { label: product.name, value: product._id }
        })
    })
</script>

<template>
    <div class="w-full custom-2 bg-white border-round shadow-1 px-5 mt-3 pb-3 md:pb-0">
        <div class="md:flex mb-5 justify-content-between pt-2">
            <h1 class="text-2xl md:text-3xl text-800">Registro de compra</h1>
            <IBreadcrumb
                :home="home"
                :items="items"
            />
        </div>
        <div class="pm-4">

            <FormKit
                id="form-product-new"
                type="form"
                :actions="false"
                incomplete-message="Revisa las notificaciones"
                @submit="handleSubmit"
                :onInput="() => {}"
            >
              <div class="formgrid grid">
                  <div class="field col-12 md:col-6 lg:col-6">
                    <FormKit
                          type="select"
                          label="Cliente"
                          placeholder="Seleccione un proveedor"
                          name="supplier"
                          :options="(suppliers as any)"
                          validation="required"
                          validation-visibility="dirty"
                          :validation-messages="{
                              required: 'Seleccione un cliente'
                          }"
                          :onInput="(id) => {
                            console.log(id)
                          }"
                      />
                  </div>
                  <div class="field col-12 md:col-6 lg:col-6">
                      <FormKit
                        :initialValues="{ selectedOption: initalValueP }"
                        type="select"
                        label="Producto/Servicio"
                        placeholder="Seleccione un producto"
                        name="product"
                        :options="(products as any)"
                        :onInput="(productSelected) => {
                            searchProduct(productSelected)
                        }"
                      />
                  </div>
                  <div class="field col-12 md:col-6 lg:col-2">
                      <FormKit
                        type="text"
                        label="Precio"
                        name="price"
                        v-model="(price as any)"
                        :onInput="() => {}"
                      />
                  </div>
                  <div class="field col-12 md:col-6 lg:col-2">
                      <FormKit
                          type="number"
                          label="Cantidad"
                          name="quantityP"
                          validation="required"
                          v-model="(qtyRes as any)"
                          :onInput="() => {}"
                      />
                  </div>
                  <div class="field col-12 md:col-6 lg:col-2 flex align-items-center">
                    <Button
                      label="Añadir"
                      icon="pi pi-plus-circle"
                      type="button"
                      class="mt-3 w-full"
                      @click="addProduct"
                    />
                  </div>
                  <h3 class="block col-12 mb-2">Detalle compra</h3>
                    <DataTable :value="cartStore.cart" class="p-datatable-sm width-detail-table1" >
                        <Column header="Producto" class="hidden">
                            <template #body="prop">
                                {{ prop.data.products }}
                            </template>
                        </Column>
                        <Column header="Producto">
                            <template #body="prop">
                                {{ prop.data.name }}
                            </template>
                        </Column>
                        <Column header="Cantidad">
                            <template #body="prop">
                                {{ prop.data.quantity }}
                            </template>
                        </Column>
                        <Column header="Precio">
                            <template #body="prop">
                                {{ prop.data.price }}
                            </template>
                        </Column>
                        <Column header="Subtotal">
                            <template #body="prop">
                                {{ formatCurrency(Number(prop.data.price * prop.data.quantity)) }}
                            </template>
                        </Column>
                        <Column>
                            <template #body="prop">
                                <Button
                                    icon="pi pi-trash"
                                    severity="danger"
                                    text
                                    rounded
                                    @click="cartStore.deleteItem(prop.data)"
                                />
                            </template>
                        </Column>
                    </DataTable>
                <div class="w-full flex justify-content-between align-items-center px-1 mt-2">
                    <h4>Total a pagar:</h4>
                    <FormKit
                          type="text"
                          label=""
                          style="display: none;"
                          name="total"
                          v-model="(cartStore.total as any)"
                          :onInput="() => {}"
                      />
                    <span class="text-lg font-medium">{{ formatCurrency(Number(cartStore.total)) }}</span>
                </div>
              </div>
              <Button
                  label="Guardar"
                  icon="pi pi-save"
                  type="submit"
                  class="block mt-2"
              />
            </FormKit>

        </div>
    </div>  
</template>