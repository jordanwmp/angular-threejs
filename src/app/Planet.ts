import * as THREE from 'three';

export class Planet
{

    private mesh!:THREE.Mesh
    private radius!:number
    private positionX!:number
    private textureFile!:string

    constructor(radius:number, positionX:number, textureFile:string){
        this.radius = radius
        this.positionX = positionX
        this.textureFile = textureFile
    }

    getMesh()
    {
        if(this.mesh === undefined || this.mesh === null)
        {
            const geometry = new THREE.SphereGeometry(this.radius)
            const texture = new THREE.TextureLoader().load(this.textureFile)
            const material = new THREE.MeshBasicMaterial({map: texture})
            this.mesh = new THREE.Mesh(geometry, material)
            this.mesh.position.x += this.positionX
        }

        return this.mesh
    }

}