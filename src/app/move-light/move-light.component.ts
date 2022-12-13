import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import {HostListener} from '@angular/core'
import * as THREE from 'three'
import { Vector3 } from 'three';
const WIDTH = window.innerWidth
const HEIGHT = window.innerHeight

@Component({
  selector: 'app-move-light',
  templateUrl: './move-light.component.html',
  styleUrls: ['./move-light.component.css']
})
export class MoveLightComponent implements OnInit, AfterViewInit {

  private camera!: THREE.PerspectiveCamera
  private renderer!: THREE.WebGLRenderer
  private scene!: THREE.Scene
  private pointLight:THREE.PointLight = new THREE.PointLight(0xFF0000)
  private sphereGeometry:THREE.SphereGeometry = new THREE.SphereGeometry(2) 
  private sphereMaterial:THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial({shininess: 60})
  private sphere:THREE.Mesh = new THREE.Mesh(this.sphereGeometry, this.sphereMaterial) 
  private position = {x: 1, y: 1}
  //private x:number = 1
  //private y:number = 1

  isMouse:boolean = false
  time!:any

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event:any)
  {
    this.position.x = event.x
    this.position.y = event.y 
    this.updateLight()
  }

  constructor() { }

  ngAfterViewInit(): void {
    this.createScene()
  }

  ngOnInit(): void {
  }


  degree2radius(degree:number):number 
  {
    return (degree/180) * Math.PI
  }

  createScene()
  {
    //teste
    this.scene = new THREE.Scene()
    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setClearColor(0xF9F9F9)
    this.renderer.setSize(WIDTH, HEIGHT)
    this.camera = new THREE.PerspectiveCamera(45, WIDTH/HEIGHT, 0.1, 1000)
    this.camera.zoom = 0.00000000001

    let planeGeometry = new THREE.PlaneGeometry(60, 60, 1, 1)
    let planeMaterial = new THREE.MeshLambertMaterial({color: 0xCCCCCC})
    let plane = new THREE.Mesh(planeGeometry, planeMaterial)

    plane.rotation.x = -0.5 * Math.PI
    plane.rotation.z = this.degree2radius(-45)
    plane.position.x = 0
    plane.position.y = 0
    plane.position.z = -10

    //this.scene.add(plane)

    let spotLight = new THREE.SpotLight('#ffffff')
    spotLight.position.set(-40, 60, -10)
    spotLight.castShadow = true 
    spotLight.target = plane//APONTA O CONE DE LUZ PARA O PLANO
    this.scene.add(spotLight)

    
    this.sphere.position.set(0,0,0)
    this.scene.add(this.sphere)
    this.scene.add(this.pointLight)

    this.camera.position.x = -30
    this.camera.position.y = 40
    this.camera.position.z = 30

    this.camera.lookAt(this.scene.position)

    window.document.getElementById("webgl")
    ?.appendChild(this.renderer.domElement)
    this.renderer.render(this.scene, this.camera)
    
    //this.renderer.setAnimationLoop((this.updateLight).bind(this))
  
  }


  updateLight()
  {
    
    this.position.x = (this.position.x/WIDTH) * 2 - 1 //(event.clientX/WIDTH)
    this.position.y = -(this.position.y/HEIGHT) * 2 + 1 //(event.clientY/HEIGHT) 

    //MAKE THE SPHERE FOLOW THE MOUSE
    let vector = new THREE.Vector3(this.position.x, this.position.y, 0.5)
    vector.unproject(this.camera)//Projeta esse vetor do espaço de coordenadas de dispositivo normalizado (NDC) da câmera
    let dir = vector.sub(this.camera.position).normalize()//pega a distância entre o vetor das coordenadas do mouse, projeta na direção da camera e o transforma no vetor unitario
    let distance = - this.camera.position.z/dir.z
    //adiciona a posição da camera
    //o vetor normalizado multiplicado pela distancia em z
    let pos = this.camera.position.clone().add(dir.multiplyScalar(distance))
    this.sphere.position.copy(pos)
    this.renderer.render(this.scene, this.camera)
  }

}
