let THREE = require("three");

class Terrain {
    constructor(size, amp) {
        let geo = new THREE.PlaneGeometry(size, size, 128, 128);
        let mat = new THREE.MeshToonMaterial({color: 0x00dd00, side: THREE.DoubleSide});
        this.mesh = new THREE.Mesh(geo, mat);
        //this.mesh.geometry.verticesNeedUpdate = true;

        let verts = this.mesh.geometry.vertices;
        for (let i=0; i<verts.length; i++)
        {
            verts[i].z = (Math.random() * amp) - (amp/2);
        }
        this.mesh.rotation.x = Math.PI / 2;
    }

    getMesh() {
        return this.mesh;
    }
}

module.exports = Terrain;
