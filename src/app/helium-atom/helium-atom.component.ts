import { Component, AfterViewInit } from '@angular/core';
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const colorProton:string = "#d14233";
const colorEletron:string = "#26ade4";
const colorLine:string = "#d8d8d8";

@Component({
  selector: 'app-helium-atom',
  templateUrl: './helium-atom.component.html',
  styleUrls: ['./helium-atom.component.css']
})
export class HeliumAtomComponent implements AfterViewInit {

  private scene!:THREE.Scene
  private camera!:THREE.PerspectiveCamera
  private controls!:OrbitControls
  private renderer!:THREE.WebGLRenderer

  constructor() { }
  
  initScene():void 
  {
    this.camera = new THREE.PerspectiveCamera(
      45, 
      window.innerWidth/window.innerHeight,
      1,
      1000
      )
    
    this.camera.position.z = 30

    this.scene = new THREE.Scene()
    const ambientLight = new THREE.AmbientLight(0xFFFFFF)
    this.scene.add(ambientLight)

    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setClearColor("#f8f9fa")
    this.renderer.setSize(window.innerWidth, window.innerHeight)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.target = new THREE.Vector3(0, 0, 0)
    this.controls.enablePan = false 
    this.controls.minDistance = 10
    this.controls.maxDistance = 20

    //REFERENCE
    const refGeometry = new THREE.SphereGeometry(0.1)
    const refMaterial =  new THREE.MeshBasicMaterial({color: '#e5e5e5'})
    const refMesh = new THREE.Mesh(refGeometry, refMaterial) 
    refMesh.position.set(0, 0, 0)
    this.scene.add(refMesh)

    //PROTON 1
    const protonMaterial = new THREE.MeshBasicMaterial({color: colorProton})
    const protonGeo = new THREE.SphereGeometry(0.5)
    const proton_1 = new THREE.Mesh(protonGeo, protonMaterial)
    const proton_2 = new THREE.Mesh(protonGeo, protonMaterial)
    proton_1.position.set(-0.4, 0, 0)
    proton_2.position.set(0.4, 0, 0)
    this.scene.add(proton_1)
    this.scene.add(proton_2)

    //NEUTROS
    const neutroMaterial = new THREE.MeshBasicMaterial({color: colorEletron})
    const neutronGeo = new THREE.SphereGeometry(0.5)
    const neutron_1 = new THREE.Mesh(neutronGeo, neutroMaterial)
    const neutron_2 = new THREE.Mesh(neutronGeo, neutroMaterial)
    neutron_1.position.set(0, 0.8, 0)
    neutron_2.position.set(0, -0.8, 0)
    this.scene.add(neutron_1)  
    this.scene.add(neutron_2)


    //ELETRON ORBIT
    const lineGeometry = new THREE.BufferGeometry()
    .setFromPoints(
      new THREE.Path().absarc(0, 0, 3, 0, Math.PI * 2, false).getSpacedPoints()
    )
    const lineMaterial = new THREE.LineBasicMaterial({color: colorLine})
    const line = new THREE.Line(lineGeometry, lineMaterial)
    line.rotation.z = 90
    this.scene.add(line)

    //ELETRONS
    const eletronGeo = new THREE.SphereGeometry(0.1)
    const eletronMaterial = new THREE.MeshLambertMaterial({color: colorEletron})
    const eletron_1 = new THREE.Mesh(eletronGeo, eletronMaterial)
    const eletron_2 = new THREE.Mesh(eletronGeo, eletronMaterial)
    eletron_1.position.set(0, 3, 0)
    eletron_2.position.set(0, -3, 0)

    const pointLight_1 = new THREE.PointLight(0x0000FF, 1, 300)
    const pointLight_2 = new THREE.PointLight(0x0000FF, 1, 300)
    pointLight_1.position.set(0, 3, 0)
    pointLight_2.position.set(0, -3, 0)

    eletron_1.add(pointLight_1)
    eletron_2.add(pointLight_2)
    //refMesh.add(pointLight_1, pointLight_2)
    refMesh.add(eletron_1, eletron_2)

    window.document.getElementById("webgl")?.appendChild(this.renderer.domElement)
    this.renderer.render(this.scene, this.camera)

    const animate = () =>{
      refMesh.rotation.z += 0.01;
      this.controls.update()
      this.renderer.render(this.scene, this.camera)
      window.requestAnimationFrame(animate)
    }

    animate()

  }

  ngAfterViewInit(): void {
    this.initScene()
  }



}
