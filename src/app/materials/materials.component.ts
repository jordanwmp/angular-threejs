import { Component, AfterViewInit } from '@angular/core';
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


@Component({
  selector: 'app-materials',
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.css']
})
export class MaterialsComponent implements AfterViewInit {

  private scene!:THREE.Scene
  private camera!:THREE.PerspectiveCamera
  private controls!:OrbitControls
  private renderer!:THREE.WebGLRenderer

  constructor() { }

  ngAfterViewInit(): void {
    this.camera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth/innerHeight,
        1,
        1000
      )

      this.camera.position.z = 50

    //this.camera.position.set(0,0,0)
    this.scene = new THREE.Scene()

    const ambientLight = new THREE.AmbientLight(0xFFFFFF)
    const spotLight = new THREE.SpotLight(0xFFFFFF, 27, 60, 30)
    spotLight.position.z = 20
    this.scene.add(spotLight)
    //this.scene.add(ambientLight)

    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setClearColor("#f8f9fa")  //(0xF9F9F9)
    this.renderer.setSize(window.innerWidth, window.innerHeight) 
    
    const refGeometry = new THREE.SphereGeometry(3, 200, 200)
    //const material =  new THREE.MeshBasicMaterial({color :0xFF0000})

    /** 
     * APARENCIA SOLIDA SEM BRILHO
     
    const material = new THREE.MeshPhongMaterial({
      color: 0xFF0000,    // red (can also use a CSS color string here)
      flatShading: true,
      specular: 0xFF0000,//#e50000'
      emissive: 0xFF0000,
      shininess: 150
    });*/

    /** 
     * APARENCIA METALICA COM BRILHO
    
*/
    const material = new THREE.MeshStandardMaterial({
      color: 0xFF0000,    // red (can also use a CSS color string here)
      roughness: 0.51,//0.51
      metalness: 0.51//0.51
    }); 

    const refMesh = new THREE.Mesh(refGeometry, material)
    refMesh.castShadow = true
    refMesh.position.set(0,0,0)
    const pointLight = new THREE.PointLight(0xFFFFFF, 8, 100)
    
    pointLight.position.set(0, 0, 10)

    this.scene.add(pointLight)
    this.scene.add(refMesh)
    this.camera.lookAt(pointLight.position)

    window.document.getElementById("webgl")?.appendChild(this.renderer.domElement)
    this.renderer.render(this.scene, this.camera) 
    
  }



}
