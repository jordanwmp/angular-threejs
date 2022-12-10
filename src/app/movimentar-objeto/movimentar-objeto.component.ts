import { Component, OnInit, AfterViewInit, ElementRef, Input, ViewChild } from '@angular/core';

import { HostListener } from '@angular/core';
import * as THREE from 'three'
import { Mesh } from 'three';

const WIDTH = window.innerWidth
const HEIGHT = window.innerHeight
const VELOCITY = 0.2;
let TOP = 0;
let RIGHT = 0;
let LEFT = 0;

@Component({
  selector: 'app-movimentar-objeto',
  templateUrl: './movimentar-objeto.component.html',
  styleUrls: ['./movimentar-objeto.component.css']
})
export class MovimentarObjetoComponent implements OnInit, AfterViewInit {

  //properties
  private camera!:THREE.PerspectiveCamera
  private geometry = new THREE.BoxGeometry(6,6,6)
  private material = new THREE.MeshLambertMaterial({color: 0xFF0000})
  private cube: THREE.Mesh = new THREE.Mesh(this.geometry, this.material)
  private renderer!:THREE.WebGLRenderer
  private scene!:THREE.Scene 


  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    console.log(event.key);
    this.setDirection(event.key)
  }

  constructor() { }

  ngOnInit(): void {
    //this.createScene()
  }

  ngAfterViewInit()
  {
    console.log('after init')
    this.createScene2()
    this.rotateCube()
  }

  
  setDirection(key:string)
  {
    switch(key)
    {
      case 'w':
        TOP+= VELOCITY
        break
      case 'a':
        LEFT-= VELOCITY
        break
      case 's':
        TOP-=VELOCITY
        break
      case 'd':
        LEFT+= VELOCITY
        break
      case 'z':
        RIGHT-=VELOCITY
        break
      case 'x':
        RIGHT+= VELOCITY
        break
    }
    console.log('top ', TOP)
  }

  createScene2()
  {
    this.scene = new THREE.Scene()
    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setClearColor(0xF9F9F9)
    this.renderer.setSize(WIDTH, HEIGHT)
    this.camera = new THREE.PerspectiveCamera(45, WIDTH/HEIGHT, 0.1, 1000)

    let planeGeometry = new THREE.PlaneGeometry(30, 20, 1, 1)
    let planeMaterial = new THREE.MeshLambertMaterial({color: 0xCCCCCC})
    let plane = new THREE.Mesh(planeGeometry, planeMaterial)

    plane.rotation.x = -0.5 * Math.PI
    plane.position.x = 0
    plane.position.y = 0
    plane.position.z = 0

    this.scene.add(plane)

    let spotLight = new THREE.SpotLight('#ffffff')
    spotLight.position.set(-40, 60, -10)
    spotLight.castShadow = true 
    spotLight.target = plane//APONTA O CONE DE LUZ PARA O PLANO
    this.scene.add(spotLight)

    //let cubeGeometry = new THREE.BoxGeometry(6,6,6)
    //let cubeMaterial = new THREE.MeshLambertMaterial({color: 0xFF0000})
    //let cube = new THREE.Mesh(cubeGeometry, cubeMaterial)

    this.cube.position.y = 6
    

    this.scene.add(this.cube)

    this.camera.position.x = -30
    this.camera.position.y = 40
    this.camera.position.z = 30

   
    //GARANTE QUE A this.CAMERA ESTEJA OLHANDO PARA OS OBJETOS
    this.camera.lookAt(this.scene.position)

    window.document.getElementById("webGL-output")
    ?.appendChild(this.renderer.domElement)

    //RENDERIZA A CENA E A this.CAMERA
    this.renderer.render(this.scene, this.camera)
    

  }

  animateCallback = {
    callAnimate: (this.rotateCube).bind(this)
  };
  //this.animateCallback.callAnimate();

  rotateCube()
  {
    //setTimeout(()=>{
      //requestAnimationFrame( this.animateCallback.callAnimate );
      requestAnimationFrame((this.rotateCube).bind(this));
      //this.cube.position.x = 10
      //this.cube.rotation.x += 0.02
      //this.cube.rotation.y += 0.02

      this.cube.position.x = LEFT
      this.cube.position.y = TOP
      this.cube.position.z = RIGHT


      /*window.document.getElementById("webGL-output")
     ?.appendChild(this.renderer.domElement)*/

      this.renderer.render(this.scene, this.camera)
    //}, 3000)
    //requestAnimationFrame(this.rotateCube.bind(this));
  }


}
