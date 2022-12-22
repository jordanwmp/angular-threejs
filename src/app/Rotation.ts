import * as THREE from 'three'

export class Rotation
{
    planetPositionX: any
    y: number
    z: number
    showRotation: boolean
    mesh: any
    
    constructor(planetMesh:any, showRotation:boolean = false)
    {
        this.planetPositionX = planetMesh.position.x
        this.y = 0.25
        this.z = 0.25
        this.showRotation = showRotation
    }

    getMesh()
    {
        if(this.mesh === undefined || this.mesh === null)
        {
            const geometry = new THREE.BoxGeometry(this.planetPositionX, 0.25, 0.25)
            const material = new THREE.MeshNormalMaterial()
            this.mesh = new THREE.Mesh(geometry, material)
            this.mesh.position.x = this.planetPositionX/2
            this.mesh.visible = this.showRotation
        }
        return this.mesh
    }

}