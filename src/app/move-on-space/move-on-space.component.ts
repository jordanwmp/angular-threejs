import { Component, OnInit, AfterViewInit, ElementRef, Input, ViewChild } from '@angular/core';
import { HostListener } from '@angular/core';
import * as THREE from 'three'
import * as cannon from 'cannon-es';
import CannonDebugger from 'cannon-es-debugger';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader' //'three/addons/loaders/GLTFLoader.js';
const SPACE_CRAFT = "https://firebasestorage.googleapis.com/v0/b/app-tools-50fd4.appspot.com/o/space_travel%2Faero_jet.glb?alt=media&token=a431d35e-1a96-4990-96c2-932ed9c2b5b7";

const WIDTH = window.innerWidth
const HEIGHT = window.innerHeight

@Component({
  selector: 'app-move-on-space',
  templateUrl: './move-on-space.component.html',
  styleUrls: ['./move-on-space.component.css']
})
export class MoveOnSpaceComponent implements OnInit {

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    console.log(event.key);
  }

  //properties
  private camera!: THREE.PerspectiveCamera
  private geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
  private material = new THREE.MeshLambertMaterial({ color: 0xFF0000 })
  //private cube: THREE.Mesh = new THREE.Mesh(this.geometry, this.material)
  private renderer!: THREE.WebGLRenderer
  private scene!: THREE.Scene
  private controls!: OrbitControls

  cubePosition = new THREE.Vector3(0, 1, 8)

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.createScene()
    this.initWorld()
    this.createGround()
    this.createPlayer()
    this.initChaseCam()
    this.animate()

  }

  createScene() {
    this.scene = new THREE.Scene()
    const help = new THREE.AxesHelper(15)
    this.scene.add(help)

    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setClearColor(0xFF0000)
    this.renderer.setSize(WIDTH, HEIGHT)
    this.camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 1, 1000)

    let spotLight = new THREE.SpotLight('#ffffff')
    spotLight.position.set(-40, 60, -10)
    spotLight.castShadow = true
    //spotLight.target = this.cube //plane//APONTA O CONE DE LUZ PARA O PLANO
    this.scene.add(spotLight)

    //this.scene.add(this.cube)

    //this.camera.position.set(0, 10, 15)


    /*this.controls = new OrbitControls(this.camera, document.body);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05
    this.controls.maxDistance = 1000*/

    const _onKeyDown = (event: any) => {
      console.log('onKeyDown ', event.keyCode)

      switch (event.keyCode) {
        case 87: // w
          this.speed += this.acceleration
          break;
        case 65: // a
          this.angle += (Math.PI / 180)
          break;
        case 83: // s

          this.speed -= this.acceleration
          break;
        case 68: // d
          this.angle -= (Math.PI / 180)
          break;
      }

      this.speederBody.quaternion.setFromAxisAngle(
        new cannon.Vec3(0, 1, 0),
        this.angle
      )

    }

    const _onKeyUp = (event: any) => {
      console.log('onKeyUp')
      switch (event.keyCode) {
        case 87: // w
          //this._input._keys.forward = false;
          break;
        case 65: // a
          //this._input._keys.left = false;
          break;
        case 83: // s
          //this._input._keys.backward = false;
          break;
        case 68: // d
          //this._input._keys.right = false;
          break;
        case 32: // SPACE
          //this._input._keys.space = false;
          break;
        case 16: // SHIFT
          //this._input._keys.shift = false;
          break;
        case 33: // SPACE
          //this._input._keys.up = false;
          break;
        case 34: // SHIFT
          //this._input._keys.down = false;
          break;
      }
    }

    document.addEventListener('keydown', (e) => _onKeyDown(e), false);
    document.addEventListener('keyup', (e) => _onKeyUp(e), false);
    document.addEventListener('resize', () => this.onResize(), false);

    window.document.getElementById("webGL-output")
      ?.appendChild(this.renderer.domElement)
    this.renderer.render(this.scene, this.camera)

  }

  animate() {
    try {
      //this.cannorDebugger.update()
      this.world.step(this.timeStep)
      this.moveSpeeder()
      this.updateChaseCam()

    } catch (error) {
      console.log('error 1 ', error)
    }
    //this.controls.update()
    this.renderer.render(this.scene, this.camera)
    requestAnimationFrame((this.animate).bind(this));
  }

  loadGLTF(path: string = SPACE_CRAFT, scale: number = 0.4) {
    const loader = new GLTFLoader();
    loader.load(path, ((model) => {
      console.log('model ', model)
      model.scene.position.set(0, -0.6, 0)
      model.scene.scale.set(scale, scale, scale)
      this.speederMesh = model.scene
      this.speederMesh.position.copy(this.speederBody.position)
      this.speederMesh.quaternion.copy(this.speederBody.quaternion)
      //this.speederMesh.rotateY(THREE.MathUtils.degToRad(-45))
      this.speederMesh.add(this.chaseCam)
      this.speederMesh.rotation.y = THREE.MathUtils.degToRad(45)
      this.scene.add(this.speederMesh)
    }),
      (xhr) => {
        console.log('loading model')

      },
      (err) => {
        console.log('error model ', err)


      })
  }

  world: any;
  cannorDebugger: any;
  timeStep: number = 1 / 60
  groundMaterial!: any;
  speed: number = 0
  maxSpeed: number = 1
  acceleration: number = 0.025
  angle: number = 0
  speederBody: any;
  speederMesh: any;

  chaseCam:any;
  chaseCamPivot:any;
  view = new THREE.Vector3()

  initChaseCam()
  {
    this.chaseCam = new THREE.Object3D()
    this.chaseCam.position.set(0,0,0)

    this.chaseCamPivot = new THREE.Object3D()
    this.chaseCamPivot.position.set(0, 8, -20)
    this.chaseCam.add(this.chaseCamPivot)
    this.scene.add(this.chaseCam)

  }

  updateChaseCam()
  {
    this.chaseCamPivot.getWorldPosition(this.view)
    if(this.view.y < 1)
    {
      this.view.y = 1;
    }
    this.camera.position.lerpVectors(this.camera.position, this.view, 0.3)
  }

  initWorld() {
    this.world = new cannon.World()
    this.world.gravity.set(0, -10, 0)

    this.cannorDebugger = new (CannonDebugger as any)(
      this.scene,
      this.world,
      {
        color: 0xffffff,
        scale: 1.0
      }
    )

  }

  createGround() {
    //
    this.groundMaterial = new cannon.Material("../../assets/textures/ground_base_color.png")
    const groundShape = new cannon.Plane()

    const groundBody = new cannon.Body({
      mass: 0,
      shape: groundShape,
      material: this.groundMaterial
    })

    groundBody.quaternion.setFromAxisAngle(new cannon.Vec3(1, 0, 0), -Math.PI / 2)

    this.world.addBody(groundBody)

  }

  createPlayer() {
    const speederMaterial = new cannon.Material("speederMaterial")
    const speederBodyShape = new cannon.Box(
      new cannon.Vec3(1, 0.5, 1.5)
    )
    this.speederBody = new cannon.Body(
      {
        mass: 0,
        material: speederMaterial,
        shape: speederBodyShape
      }
    )

    this.speederBody.fixedRotation = true;
    this.speederBody.updateMassProperties()

    this.speederBody.position = new cannon.Vec3(0, 2, 0) //.set(0, 0, 0)
    this.world.addBody(this.speederBody)
    this.loadGLTF()

  }

  moveSpeeder() {
    if (this.speed > this.maxSpeed) {
      this.speed = this.maxSpeed
    }
    if (this.speed < 0) {
      this.speed = 0
    }

    this.speederBody.position.x += this.speed * Math.sin(this.angle)
    this.speederBody.position.z += this.speed * Math.cos(this.angle)

    if(this.speederMesh)
    {
      this.speederMesh.position.copy(this.speederBody.position)
      this.speederMesh.quaternion.copy(this.speederBody.quaternion)

      this.camera.lookAt(this.speederMesh.position)

    }


  }

  onResize() {
    this.camera.aspect = window.innerHeight / window.innerHeight
    this.camera.updateMatrix()
    this.renderer.setSize(
      window.innerWidth, window.innerHeight
    )
  }

}





