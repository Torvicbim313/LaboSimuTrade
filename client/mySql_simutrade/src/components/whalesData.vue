<template>
    <div>
        <div class="sticky top-0 bg-white shadow-md z-10 p-2 grid grid-cols-5 gap-8 border-b-2 border-gray-300">
            <h3 class="font-bold">Fecha</h3>
            <h3 class="font-bold ml-40">BTC</h3>
            <h3 class="font-bold ml-20">Diferencia</h3>
            <h3 class="font-bold ml-10">Precio Compra</h3>
            <h3 class="font-bold">Precio Venta</h3>
          </div>
        <ul class="grid grid-cols-1 gap-2">
            <li v-for="record in whalesData" :key="record.record_id">
              <div @click="sendToggleFeaturedEmisor(record.record_id)" class="p-2 flex flex-row justify-between gap-8 w-[100%] h-[100%] rounded-xl bg-slate-100 shadow-2xl border-2 border-purple-300 overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105">
                <h3>{{ record.FECHA }}</h3>
                <h3 class="text-emerald-700 font-extrabold text-xl">{{record.BTC}}</h3>
                <h3>{{ record.DIFERENCIA }}</h3>
                <h3>{{ record.PRECIO_COMPRA }}</h3>
                <h3>{{ record.PRECIO_VENTA }}</h3>
                    <button @click="deleterecord(record.record_id)" class="flex justify-center items-center rounded-lg w-8 h-8 p-2  border-red-950 bg-red-600 text-white font-extrabold hover:bg-red-400">X</button>
              </div>
            </li>
          </ul>
        </div>
</template>
<script>
export default {
    name: "WhalesData",
    data() {
        return {
            whalesData: []
        }
    },
    async mounted() {
        await this.getwhalesData()
    },
    methods: {
        async getwhalesData() {
            try {
                const response = await fetch('https://simutrade-mysql.onrender.com/api/whales-data/all')

                const data = await response.json()
                console.log(data)
                data.forEach(element => element.FECHA = element.FECHA.replace('T',' ').replace('.000Z', ''));

                this.whalesData = data.reverse();

            } catch (error) {
                console.error(error)
            }
        }
    },
}
</script>
