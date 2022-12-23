import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Rotation } from '../Rotation';

const colorProton:string = "#09a837" //"#5cb85c";
const colorEletron:string = "#5bc0de";
const colorLine:string = "#dfe3ee"

const marsTexturePath:string = "../../assets/textures/red_2.jpg"


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
      10000
    )

    //this.camera.position.set(0,0,0)
    this.scene = new THREE.Scene()


    const pointLight = new THREE.PointLight(0xFFFFFF, 0.5)
    const ambientLight = new THREE.AmbientLight(0xFFFFFF)
    this.scene.add(ambientLight) 
    //this.scene.add(pointLight)

    //REFERENCE
    const refGeometry = new THREE.SphereGeometry(0.4)
    const refMaterial =  new THREE.MeshBasicMaterial()
    const refMesh = new THREE.Mesh(refGeometry, refMaterial) 
    
    //PROTON
    const hydrogenGeo = new THREE.SphereGeometry(0.5, 30, 30)
    const texture = new THREE.TextureLoader().load(marsTexturePath)
    const hydrogenMaterial =  new THREE.MeshBasicMaterial({map: texture})
    const hydrogen = new THREE.Mesh(hydrogenGeo, hydrogenMaterial)
    hydrogen.castShadow = true
    hydrogen.position.set(0,0,0)

    this.scene.add(hydrogen)

    //ELETRON ORBIT
    let lineGeometry = new THREE.BufferGeometry().setFromPoints(
      new THREE.Path().absarc(0, 0, 3, 0, Math.PI * 2, false).getSpacedPoints(50)
    );
    let lineMaterial = new THREE.LineBasicMaterial({color: colorLine, linewidth: 1});
    let line = new THREE.Line(lineGeometry, lineMaterial);
    line.rotation.z = 90

    //ELETRON
    const eletronGeo = new THREE.SphereGeometry(0.1)
    const eletronMaterial = new THREE.MeshLambertMaterial({color: colorEletron}) //MeshBasicMaterial({color: colorProton})
    const eletron = new THREE.Mesh(eletronGeo, eletronMaterial)
    eletron.position.set(0,3,0)
    refMesh.add(eletron)
    //hydrogen.add(eletron)
    
    this.scene.add(line); 
    this.scene.add(hydrogen)
    //.scene.add(eletron)
    this.scene.add(refMesh)


    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setClearColor(0xF9F9F9)
    this.renderer.setSize(window.innerWidth, window.innerHeight)  

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)

    //this.camera.position.x = -30
    //this.camera.position.y = 40
    this.camera.position.z = 30

    //this.camera.lookAt(hidrogen.position)

    window.document.getElementById("webgl")?.appendChild(this.renderer.domElement)
    this.renderer.render(this.scene, this.camera) 

    const _animate = () => {
      //hydrogen.rotation.z += 0.004
      refMesh.rotation.z += 0.009
      //eletron.rotation.z += 0.0003
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

}
