import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Rotation } from '../Rotation';

const colorProton:string = "#5cb85c";
const colorEletron:string = "#5bc0de";
const colorLine:string = "#dfe3ee"

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


    //PROTON
    const hydrogenGeo = new THREE.SphereGeometry(0.5)
    const hydrogenMaterial = new THREE.MeshNormalMaterial() //MeshBasicMaterial({color: colorProton})
    const hydrogen = new THREE.Mesh(hydrogenGeo, hydrogenMaterial)
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
    const eletronMaterial = new THREE.MeshNormalMaterial() //MeshBasicMaterial({color: colorProton})
    const eletron = new THREE.Mesh(eletronGeo, eletronMaterial)
    eletron.position.set(0,3,0)
    
    hydrogen.add(eletron)

    //atomSystem.add(eletron)
    
    this.scene.add(line); 
    this.scene.add(hydrogen)
    //this.scene.add(eletron)


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
      hydrogen.rotation.z += 0.004
      //eletronGroup.rotation.y += 0.
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
