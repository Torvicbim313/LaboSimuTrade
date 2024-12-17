<template>
    <div>
        <h2>list</h2>
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

                this.whalesData = data

            } catch (error) {
                console.error(error)
            }
        }
    },
}
</script>
