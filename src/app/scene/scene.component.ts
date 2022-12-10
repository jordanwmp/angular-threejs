import { Component, OnInit } from '@angular/core';
import { 
      Scene, 
      PerspectiveCamera, 
      WebGLRenderer,
      AxesHelper,
      PlaneGeometry,
      MeshBasicMaterial,
      Mesh,
      BoxGeometry, 
      SphereGeometry,
      SpotLight,
      MeshLambertMaterial,
      PCFShadowMap,
      PointLight,
      HemisphereLight,
      CircleGeometry,
      RingGeometry
    } from 'three' 

const WIDTH = window.innerWidth
const HEIGHT = window.innerHeight
const PI = Math.PI

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.css']
})
export class SceneComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.chapterFive()
  }

  deg2rad(degrees:number)
  {
    return (degrees * PI)/180
  }

  createMesh(color:any)
  {
    return new MeshLambertMaterial({color: color})
  }

  chapterFive():void
  {
    //CRIANDO UMA CENA
    const scene = new Scene()
    const camera = new PerspectiveCamera(45, WIDTH/HEIGHT, 0.1, 1000)
    const renderer = new WebGLRenderer()
    renderer.setClearColor(0xEEEEEE)
    renderer.setSize(WIDTH, HEIGHT)

    let spotLight = new SpotLight(0xffffff)
    spotLight.position.set(-40, 60, -10)
    scene.add(spotLight)

    let planeGeo = new PlaneGeometry(10, 10)
    let planeMat = new MeshLambertMaterial({color: 0xFF0000})
    let plane = new Mesh(planeGeo, planeMat)
    
    plane.rotation.x = -0.5 * Math.PI
    plane.position.x = 0
    plane.position.y = 0
    plane.position.z = 0

    //scene.add(plane)

    let circleGeo = new CircleGeometry(10, 60, 0, 2* PI)
    let circleMesh = new MeshLambertMaterial({color: 0x00FF00})
    let circle = new Mesh(circleGeo, circleMesh)
    circle.rotateX(-0.5*PI)
    //scene.add(circle)

    let ringGeo = new RingGeometry()
    let ringMesh = new MeshLambertMaterial({color: 0x0000ff})
    let ring = new Mesh(ringGeo, ringMesh)
    ring.rotateX(-0.5*PI)
    
    //scene.add(ring)

    let cubeGeo = new BoxGeometry(10, 10, 10)
    let cubeMesh = this.createMesh(0xfff000)
    let cube = new Mesh(cubeGeo, cubeMesh)

    //scene.add(cube)

    //OBJETOS DE DUAS DIMENSÕES CUSTOMIZADOS

    camera.position.x = -30
    camera.position.y = 40
    camera.position.z = 30

    camera.lookAt(scene.position)

    window.document.getElementById("WebGL-output")?.appendChild(renderer.domElement)

    renderer.render(scene, camera)

  }

  initLight():void
  {
    //CRIANDO UMA CENA
    const scene = new Scene() 

    //CREATE CAMERA
    let camera = new PerspectiveCamera(45, window.innerWidth/innerHeight, 0.1, 1000)

    //SETANDO A RENDERIZAÇÃO
    const renderer = new WebGLRenderer()
    renderer.setClearColor(0xF9F9F9)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.shadowMap.enabled = true//HABILITA A RENDERIZAÇÃO DE SOMBRA

    //POINT LIGHT
    /*let pointColor = '#ccffcc'
    let pointLight = new PointLight(pointColor)
    pointLight.position.set(10, 10, 10)
    pointLight.intensity = 3
    pointLight.distance = 40//DETERMINA QUÃO PONGE A LUZ VIAJA
    scene.add(pointLight)*/

    let planeGeometry = new PlaneGeometry(60, 20, 1, 1)
    let planeMaterial = new MeshLambertMaterial({color: 0xcccccc})
    let plane = new Mesh(planeGeometry, planeMaterial)

    plane.receiveShadow = true
    plane.name = 'test_plane'
    plane.rotation.x = -0.5 * Math.PI
    plane.position.x = 15
    plane.position.y = 0
    plane.position.z = 0

    scene.add(plane)

    //SPOTLIGHT
    const pointColor = '#ffffff'
    let spotLight = new SpotLight(pointColor)
    spotLight.position.set(-40, 60, -10)
    spotLight.castShadow = true 
    spotLight.target = plane//APONTA O CONE DE LUZ PARA O PLANO
    //scene.add(spotLight)

    //HEMISPHERE LIGHT
    let hemiLight = new HemisphereLight(0x0000ff, 0x00ff00, 0.6)
    hemiLight.position.set(0, 500, 0)
    //scene.add(hemiLight)

    camera.position.x = -30
    camera.position.y = 40
    camera.position.z = 30

   
    //GARANTE QUE A CAMERA ESTEJA OLHANDO PARA OS OBJETOS
    camera.lookAt(scene.position)

    window.document.getElementById("WebGL-output")
    ?.appendChild(renderer.domElement)

    //RENDERIZA A CENA E A CAMERA
    renderer.render(scene, camera)

  }

  initScene():void 
  {
    
    let scene = new Scene()
    let camera = new PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000)

    let renderer = new WebGLRenderer()
    renderer.setClearColor(0xEEEEEE)//SETA O BACKGROUND DA RENDERIZAÇÃO
    renderer.setSize(window.innerWidth, window.innerHeight)//SETA O TAMANHO DA JANELA
    renderer.shadowMap.enabled =true
    //renderer.shadowMap.type = PCFShadowMap
    
    let axes = new AxesHelper(20)
    scene.add(axes)

    let spotLight = new SpotLight(0xffffff)
    spotLight.position.set(-40, 60, -10)
    spotLight.castShadow = true
    scene.add(spotLight)

    /*spotLight.shadow.mapSize.width = 512; // default
    spotLight.shadow.mapSize.height = 512; // default
    spotLight.shadow.camera.near = 0.5; // default
    spotLight.shadow.camera.far = 500; // default
    spotLight.shadow.focus = 1; // default*/
    

    let planeGeometry = new PlaneGeometry(60, 20, 1, 1)
    let planeMaterial = new MeshLambertMaterial({color: 0xcccccc})

    let plane = new Mesh(planeGeometry, planeMaterial)

    plane.receiveShadow = true
    plane.name = 'test_plane'
    plane.rotation.x = -0.5 * Math.PI
    plane.position.x = 15
    plane.position.y = 0
    plane.position.z = 0

    scene.add(plane)

    let cubeGeometry = new BoxGeometry(4, 4, 4)
    let cubeMaterial = new MeshLambertMaterial({color: 0xff0000})
    let cube = new Mesh(cubeGeometry, cubeMaterial)

    cube.castShadow = true
    cube.position.x = -4
    cube.position.y = 3
    cube.position.z = 0

    scene.add(cube)

    let sphereGeometry = new SphereGeometry(4, 20, 20)
    let sphereMaterial = new MeshLambertMaterial({color: 0x7777ff, wireframe: false})
    let sphere = new Mesh(sphereGeometry, sphereMaterial)

    sphere.castShadow = true
    sphere.receiveShadow = false
    sphere.position.x = 20
    sphere.position.y = 4
    sphere.position.z = 2

    scene.add(sphere)
    
    camera.position.x = -30
    camera.position.y = 40
    camera.position.z = 30

   
    //GARANTE QUE A CAMERA ESTEJA OLHANDO PARA OS OBJETOS
    camera.lookAt(scene.position)

    window.document.getElementById("WebGL-output")
    ?.appendChild(renderer.domElement)

    //RENDERIZA A CENA E A CAMERA
    renderer.render(scene, camera)

  }

}
