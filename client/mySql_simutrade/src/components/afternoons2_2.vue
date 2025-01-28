<template>
    <div>
        <div class="sticky top-0 bg-white shadow-md z-10 p-2 grid grid-cols-5 gap-8 border-b-2 border-gray-300">
            <h3 class="font-bold">FECHA</h3>
            <h3 class="font-bold ml-40">BTC</h3>
            <h3 class="font-bold ml-20">USDT</h3>
            <h3 class="font-bold ml-20">ACCION</h3>
            <h3 class="font-bold ml-20">BALLENAS</h3>
            <h3 class="font-bold ml-10">PRECIO COMPRA</h3>
            <h3 class="font-bold">PRECIO VENTA</h3>
            <h3 class="font-bold">BENEFICIO</h3>

          </div>
        <ul class="grid grid-cols-1 gap-2">
            <li v-for="record in Data" :key="record.record_id">
              <div  @click="sendToggleFeaturedEmisor(record.record_id)" class="p-2 flex flex-row justify-between gap-8 w-[100%] h-[100%] rounded-xl shadow-2xl border-2 border-purple-300 overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105">
                <h3>{{ record.fecha }}</h3>
                <h3 class="text-emerald-700 font-extrabold text-xl">{{record.BTC}}</h3>
                <h3>{{ record.btc }}</h3>
                <h3>{{ record.usdt }}</h3>
                <h3>{{ record.btc }}</h3>
                <h3>{{ record.accion }}</h3>
                <h3>{{ record.precio_compra }}</h3>
                <h3>{{ record.precio_venta }}</h3>
                <h3>{{ record.beneficio }}</h3>
                    <button @click="deleterecord(record.record_id)" class="flex justify-center items-center rounded-lg w-8 h-8 p-2  border-red-950 bg-red-600 text-white font-extrabold hover:bg-red-400">X</button>
              </div>
            </li>
          </ul>
        </div>
</template>
<script>
export default {
    name: "Afternoons2_2",
    data() {
        return {
            Data: []
        }
    },
    async mounted() {
        await this.getData()
    },
    methods: {
        async getData() {
            try {
                const response = await fetch('https://labosimutrade-1.onrender.com/api/2_2afternoons/all')

                const data = await response.json()
                console.log(data)

                this.Data = data.reverse();

            } catch (error) {
                console.error(error)
            }
        }
    },
}
</script>
