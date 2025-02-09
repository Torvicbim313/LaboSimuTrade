<template>
    <div class="min-h-screen bg-gray-100">
      <!-- Header -->
      <header class="bg-white shadow">
        <nav class="container mx-auto px-6 py-3">
          <div class="flex items-center justify-between">
            <div class="text-xl font-bold text-gray-800">CryptoLab</div>
            <div class="space-x-4">
              <a href="#" class="text-gray-600 hover:text-gray-800">Home</a>
              <a href="#" class="text-gray-600 hover:text-gray-800">Features</a>
              <a href="#" class="text-gray-600 hover:text-gray-800">About</a>
              <a href="#" class="text-gray-600 hover:text-gray-800">Contact</a>
            </div>
          </div>
        </nav>
      </header>
  
      <!-- Hero Section with 3D Ethereum Animation -->
      <section class="container mx-auto px-6 py-12">
        <div class="flex flex-col md:flex-row items-center">
          <div class="md:w-1/2 mb-8 md:mb-0">
            <h1 class="text-4xl font-bold mb-4">Automatic Trading Simulated Laboratory</h1>
            <p class="text-xl text-gray-600 mb-6">
              Experience the future of crypto trading with our advanced simulation platform.
            </p>
            <button class="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300">
              Get Started
            </button>
          </div>
          <div class="md:w-1/2">
            <div ref="ethereumCanvas" class="w-full h-64 md:h-96"></div>
          </div>
        </div>
      </section>
  
      <!-- Features Section -->
      <section class="bg-white py-12">
        <div class="container mx-auto px-6">
          <h2 class="text-3xl font-bold text-center mb-8">Key Features</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="bg-gray-100 p-6 rounded-lg">
              <h3 class="text-xl font-semibold mb-2">Real-time Simulation</h3>
              <p class="text-gray-600">Experience live market conditions with our advanced simulation engine.</p>
            </div>
            <div class="bg-gray-100 p-6 rounded-lg">
              <h3 class="text-xl font-semibold mb-2">AI-Powered Strategies</h3>
              <p class="text-gray-600">Leverage cutting-edge AI algorithms to optimize your trading strategies.</p>
            </div>
            <div class="bg-gray-100 p-6 rounded-lg">
              <h3 class="text-xl font-semibold mb-2">Risk-Free Learning</h3>
              <p class="text-gray-600">Hone your skills without risking real capital in a safe environment.</p>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Call to Action -->
      <section class="bg-blue-500 text-white py-12">
        <div class="container mx-auto px-6 text-center">
          <h2 class="text-3xl font-bold mb-4">Ready to revolutionize your trading?</h2>
          <p class="text-xl mb-8">Join our platform and start your journey to becoming a crypto trading expert.</p>
          <button class="bg-white text-blue-500 px-6 py-3 rounded-lg hover:bg-gray-100 transition duration-300">
            Sign Up Now
          </button>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  import * as THREE from 'three'
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
  
  export default {
    name: 'CryptoTradingLab',
    data() {
      return {
        scene: null,
        camera: null,
        renderer: null,
        ethereum: null
      }
    },
    mounted() {
      this.initThree()
      this.animate()
      window.addEventListener('resize', this.onWindowResize)
    },
    beforeUnmount() {
      window.removeEventListener('resize', this.onWindowResize)
    },
    methods: {
      initThree() {
        this.scene = new THREE.Scene()
        this.camera = new THREE.PerspectiveCamera(75, this.$refs.ethereumCanvas.clientWidth / this.$refs.ethereumCanvas.clientHeight, 0.1, 1000)
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
        
        this.renderer.setSize(this.$refs.ethereumCanvas.clientWidth, this.$refs.ethereumCanvas.clientHeight)
        this.$refs.ethereumCanvas.appendChild(this.renderer.domElement)
        
        const light = new THREE.PointLight(0xffffff, 1, 100)
        light.position.set(0, 0, 10)
        this.scene.add(light)
        
        const loader = new GLTFLoader()
        loader.load(
          '/ethereum.glb',
          (gltf) => {
            this.ethereum = gltf.scene
            this.ethereum.scale.set(0.5, 0.5, 0.5)
            this.scene.add(this.ethereum)
          },
          undefined,
          (error) => {
            console.error('An error occurred loading the 3D model:', error)
          }
        )
        
        this.camera.position.z = 5
      },
      animate() {
        requestAnimationFrame(this.animate)
        
        if (this.ethereum) {
          this.ethereum.rotation.y += 0.01
        }
        
        this.renderer.render(this.scene, this.camera)
      },
      onWindowResize() {
        this.camera.aspect = this.$refs.ethereumCanvas.clientWidth / this.$refs.ethereumCanvas.clientHeight
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(this.$refs.ethereumCanvas.clientWidth, this.$refs.ethereumCanvas.clientHeight)
      }
    }
  }
  </script>