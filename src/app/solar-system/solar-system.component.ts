import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as THREE from 'three'
import { Scene } from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import { Planet } from '../Planet';
import { Rotation } from '../Rotation';

const fov = 36

const earthTexturePath:string = "../../assets/textures/earth.jpeg"
const marsTexturePath:string = "../../assets/textures/mars.jpeg"
const mercuryTexturePath:string = "../../assets/textures/mercury.png"
const sunTexturePath:string = "../../assets/textures/sun.jpeg"
const venusTexturePath:string = "../../assets/textures/venus.jpeg"

const EARTH_YEAR = 2 * Math.PI * (1/60) * (1/60)

@Component({
  selector: 'app-solar-system',
  templateUrl: './solar-system.component.html',
  styleUrls: ['./solar-system.component.css']
})
export class SolarSystemComponent implements AfterViewInit {

  private scene!:THREE.Scene
  private stats:any = Stats
  private camera!:THREE.PerspectiveCamera
  private controls!:any;
  private renderer!: THREE.WebGLRenderer

  constructor() { }

  ngAfterViewInit(): void {
    this.initScene()
  }

  initScene()
  {
    this.camera = new THREE.PerspectiveCamera(
      fov,
      window.innerWidth/window.innerHeight,
      1,
      1000
    ) 

    this.camera.position.z = 128
    this.scene = new Scene()
    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setClearColor(0x292929)
    this.renderer.setSize(window.innerWidth, window.innerHeight)

    const sunGeometry = new THREE.SphereGeometry(8)
    const sunTexture =   new THREE.TextureLoader().load(sunTexturePath)
    const sunMaterial = new THREE.MeshBasicMaterial({map: sunTexture})
    const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial)
    const solarSystem = new THREE.Group()
    solarSystem.add(sunMesh) 
    
    this.scene.add(solarSystem)

    const mercury = new Planet(2, 16, mercuryTexturePath)
    const mercuryMesh = mercury.getMesh()
    let mercureSystem = new THREE.Group()
    mercureSystem.add(mercuryMesh)

    const venus = new Planet(3, 32, venusTexturePath)
    const venusMesh = venus.getMesh()
    let venusSystem = new THREE.Group()
    venusSystem.add(venusMesh)

    const earth = new Planet(4, 48, earthTexturePath)
    const earthMesh = earth.getMesh()
    let earthSystem = new THREE.Group()
    earthSystem.add(earthMesh)

    const mars = new Planet(3, 64, marsTexturePath)
    const marsMesh = mars.getMesh()
    let marsSystem = new THREE.Group()
    marsSystem.add(marsMesh)
    
    solarSystem.add(mercureSystem, venusSystem, earthSystem, marsSystem)

    const mercuryRotation = new Rotation(mercuryMesh)
    const mercuryRotationMesh = mercuryRotation.getMesh()
    mercureSystem.add(mercuryRotationMesh)

    const venusRotation = new Rotation(venusMesh)
    const venusRotationMesh = venusRotation.getMesh()
    venusSystem.add(venusRotationMesh)

    const earthRotation = new Rotation(earthMesh)
    const earthRotationMesh = earthRotation.getMesh()
    earthSystem.add(earthRotationMesh)

    const marsRotation = new Rotation(marsMesh)
    const marsRotationMesh = marsRotation.getMesh()
    marsSystem.add(marsRotationMesh)

    window.document.getElementById("webgl")?.appendChild(this.renderer.domElement)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.stats = Stats()
    document.body.appendChild(this.stats.domElement)

    this.renderer.render(this.scene, this.camera)

    const animate = () => {
      sunMesh.rotation.y += 0.001
      mercureSystem.rotation.y += (EARTH_YEAR * 4)
      venusSystem.rotation.y += (EARTH_YEAR * 2)
      earthSystem.rotation.y += EARTH_YEAR
      marsSystem.rotation.y += (EARTH_YEAR * 0.5)
      requestAnimationFrame(animate)
    }
    animate()
    this.animate()

  }

  animate()
  {
    window.requestAnimationFrame(this.animate.bind(this))
    this.renderer.render(this.scene, this.camera);
    this.stats.update();
  }

}
