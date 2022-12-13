import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as THREE from 'three'
import { WebGLRenderer } from 'three';
const WIDTH = window.innerWidth
const HEIGHT = window.innerHeight


@Component({
  selector: 'app-move-camera',
  templateUrl: './move-camera.component.html',
  styleUrls: ['./move-camera.component.css']
})
export class MoveCameraComponent implements OnInit, AfterViewInit {

  private camera!:THREE.PerspectiveCamera
  //private geometry = new THREE.BoxGeometry(6,6,6)
  //private material = new THREE.MeshLambertMaterial({color: 0xFFFFFF})
  //private cube: THREE.Mesh = new THREE.Mesh(this.geometry, this.material)
  private renderer!:THREE.WebGLRenderer
  private scene!: THREE.Scene

  constructor() { }

  ngAfterViewInit(): void {}

  ngOnInit(): void {}

  createScene():void 
  {
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(45, WIDTH/HEIGHT, 0.1, 1000)
    this.renderer = new WebGLRenderer()
    this.renderer.setClearColor(0xF9F9F9)
    this.renderer.setSize(WIDTH, HEIGHT)

    this.camera.lookAt(this.scene.position)
    window.document.getElementById('webgl-output')?.appendChild(this.renderer.domElement)
    this.renderer.render(this.scene, this.camera)
  }

}
