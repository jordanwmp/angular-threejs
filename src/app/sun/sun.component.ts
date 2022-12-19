import { AfterViewInit, Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core'

import * as THREE from 'three'

import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass  } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'

let fov:number = 60
const aspect:number = window.innerWidth/window.innerHeight
const near:number = 0.1
const far:number = 1000

const canvas = document.getElementsByTagName("canvas")[0];

const galaxyTexture:string = "../../assets/textures/galaxy1.png"


@Component({
  selector: 'app-sun',
  templateUrl: './sun.component.html',
  styleUrls: ['./sun.component.css']
})
export class SunComponent implements OnInit, AfterViewInit {

  private scene!:THREE.Scene
  private renderer!: THREE.WebGLRenderer
  private camera!:THREE.PerspectiveCamera

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent)
  {
    console.log('event ', event.key)
    const letter = event.key
    if(letter == "w")
    {
      this.camera.zoom += 10;
    }else if(letter == "s")
    {
      this.camera.zoom -= 10;
    }

    this.camera.updateProjectionMatrix()
  }

  constructor() { }

  ngAfterViewInit(): void {
    this.createScene()
  }

  ngOnInit(): void {
  }

  createScene()
  {
    this.scene = new THREE.Scene()

    this.renderer = new THREE.WebGLRenderer(
      
    )
    /**
     * {
        canvas: canvas,
        antialias: true
      }
     */
    this.renderer.autoClear = false
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1)
    this.renderer.setClearColor(0x000000, 0.0)
    

    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far)

    /*this.camera.position.z = 8
    this.camera.position.x  = 0*/

    this.camera.position.x = -30
    this.camera.position.y = 40
    this.camera.position.z = 30

    this.scene.add(this.camera)

    //boom renderer
    const renderScene = new RenderPass(this.scene, this.camera)

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5,
      0.4,
      0.85
    )

    bloomPass.threshold = 0
    bloomPass.strength = 2 //intensidade do brilho
    bloomPass.radius = 0

    const bloomComposer = new EffectComposer(this.renderer)
    bloomComposer.setSize(window.innerWidth, window.innerHeight)
    bloomComposer.renderToScreen = true 
    bloomComposer.addPass(renderScene)
    bloomComposer.addPass(bloomPass)
    
    //sun object
    const color = new THREE.Color("#FDB813")
    const geometry = new THREE.IcosahedronGeometry(5, 15)
    const material = new THREE.MeshBasicMaterial({color: color})
    const sphere = new THREE.Mesh(geometry, material)
    sphere.position.set(0, 0, 0)
    sphere.layers.set(1)
    this.scene.add(sphere)

    //galaxy object
    const starGeometry = new THREE.SphereGeometry(80, 64, 64)
    const starMaterial = new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load(galaxyTexture),
      side: THREE.BackSide,
      transparent: true
    })
    //galaxy mesh
    const starMesh = new THREE.Mesh(starGeometry, starMaterial)
    starMesh.layers.set(1)
    this.scene.add(starMesh)

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.1)
    this.scene.add(ambientLight)

    
    this.camera.lookAt(sphere.position)
    this.camera.layers.set(1)
    bloomComposer.render()
    
    window.document.getElementById("webgl")?.appendChild(this.renderer.domElement)
    this.renderer.render(this.scene, this.camera)

  }
}
