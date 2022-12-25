import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Rotation } from '../Rotation';

const colorProton:string = "#09a837" //"#5cb85c";
const colorEletron:string = "#5bc0de";
const colorLine:string = "#dfe3ee"

const marsTexturePath:string = "../../assets/textures/red_metalic.jpg"


@Component({
  selector: 'app-hydrogen-atom',
  templateUrl: './hydrogen-atom.component.html',
  styleUrls: ['./hydrogen-atom.component.css']
})
export class HydrogenAtomComponent implements AfterViewInit {

  private scene!:THREE.Scene
  private camera!:THREE.PerspectiveCamera
  private controls!:OrbitControls
  private renderer!:THREE.WebGLRenderer

  constructor() { }

  initScene():void
  {
    this.camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth/innerHeight,
      1,
      1000
    )

    this.camera.position.z = 10

    //this.camera.position.set(0,0,0)
    this.scene = new THREE.Scene()

    const ambientLight = new THREE.AmbientLight(0xFFFFFF)
    //this.scene.add(ambientLight) 
    

    //REFERENCE
    const refGeometry = new THREE.SphereGeometry(0.4)
    const refMaterial =  new THREE.MeshBasicMaterial()
    const refMesh = new THREE.Mesh(refGeometry, refMaterial) 
    
    //PROTON

    const material = new THREE.MeshStandardMaterial({
      color: 0xFF0000,    // red (can also use a CSS color string here)
      roughness: 0.60,//0.51
      metalness: 0.60//0.51
    }); 


    const hydrogenGeo = new THREE.SphereGeometry(0.5, 300, 300)
    const texture = new THREE.TextureLoader().load(marsTexturePath)
    const hydrogenMaterial =  new THREE.MeshBasicMaterial({map: texture})//new THREE.MeshBasicMaterial({color: colorEletron})
     //new THREE.MeshBasicMaterial({map: texture})*/
    const hydrogen = new THREE.Mesh(hydrogenGeo, material)
    hydrogen.castShadow = true
    hydrogen.position.set(0,0,0)

    this.scene.add(hydrogen)

    const help = new THREE.AxesHelper(50)
    //this.scene.add(help)

    this.setLights()

    //ELETRON ORBIT
    let lineGeometry = new THREE.BufferGeometry().setFromPoints(
      new THREE.Path().absarc(0, 0, 3, 0, Math.PI * 2, false).getSpacedPoints(50)
    );
    let lineMaterial = new THREE.LineBasicMaterial({color: colorLine, linewidth: 1});
    let line = new THREE.Line(lineGeometry, lineMaterial);
    line.rotation.z = 90

    //ELETRON

    const ematerial = new THREE.MeshStandardMaterial({
      color: 0x0000FF,    // red (can also use a CSS color string here)
      roughness: 0.51,//0.51
      metalness: 0.51//0.51
    }); 

    const eletronGeo = new THREE.SphereGeometry(0.1)
    const eletronMaterial = new THREE.MeshLambertMaterial({color: colorEletron}) //MeshBasicMaterial({color: colorProton})
    const eletron = new THREE.Mesh(eletronGeo, ematerial)
    eletron.position.set(0,3,0)
    refMesh.add(eletron)
    //refMesh.add(line)
    //refMesh.add(hydrogen)
    //hydrogen.add(eletron)
    
    this.scene.add(line); 
    this.scene.add(hydrogen)
    //.scene.add(eletron)
    this.scene.add(refMesh)


    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setClearColor("#f8f9fa")  //(0xF9F9F9)
    this.renderer.setSize(window.innerWidth, window.innerHeight)  

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.target = new THREE.Vector3(0,0,0)
    this.controls.enablePan = false;
    this.controls.minDistance = 10;
    this.controls.maxDistance = 20;

    //this.camera.position.x = -30
    //this.camera.position.y = 40
    

    //this.camera.lookAt(hidrogen.position)
    //pointLight.target = hydrogen

    window.document.getElementById("webgl")?.appendChild(this.renderer.domElement)
    this.renderer.render(this.scene, this.camera) 

    const _animate = () => {
      refMesh.rotation.z += 0.017
      //refMesh.rotation.x += 0.01
      //refMesh.rotation.y += 0.01

      //hydrogen.rotation.x += 0.01
      //hydrogen.rotation.y += 0.01

      this.controls.update()
      this.renderer.render(this.scene, this.camera)  
      window.requestAnimationFrame(_animate)
    }
    _animate()
    //this.animate() 
  }

  animate()
  {
    window.requestAnimationFrame(this.animate.bind(this));
    this.controls.update()
    this.renderer.render(this.scene, this.camera)  
  }

  ngAfterViewInit(): void {
    this.initScene()    
  }

  setLights()
  {
    const pointLight = new THREE.SpotLight(0xFFFFFF, 8, 50)
    pointLight.position.z = 20

    const pointLight2 = new THREE.SpotLight(0xFFFFFF, 8, 50)
    pointLight2.position.z = -20

    const pointLight3 = new THREE.SpotLight(0xFFFFFF, 8, 50)
    pointLight3.position.y = 20

    const pointLight4 = new THREE.SpotLight(0xFFFFFF, 8, 50)
    pointLight4.position.y = -20

    const pointLight5 = new THREE.SpotLight(0xFFFFFF, 8, 50)
    pointLight5.position.x = 20

    const pointLight6 = new THREE.SpotLight(0xFFFFFF, 8, 50)
    pointLight6.position.x = -20

    
    this.scene.add(pointLight, pointLight2, pointLight3, pointLight4, pointLight5, pointLight6)
  }

}
