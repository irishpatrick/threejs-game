let fs = require("fs");
let path = require("path");
let THREE = require("three");

let assetpath = path.join(__dirname, "..", "assets");

function normalize(a) {

}

class Terrain {
    constructor(fn) {
        let geo = new THREE.PlaneGeometry(100, 100, 128, 128);
        let mat = new THREE.MeshToonMaterial({color: 0x00dd00, side: THREE.DoubleSide});
        this.mesh = new THREE.Mesh(geo, mat);
        this.mesh.rotation.x = Math.PI / 2;

        let ref = this;
        fs.readFile(path.join(assetpath, fn), function(err, data) {
            if (!err) {
                console.log(JSON.parse(data));
                ref.process(JSON.parse(data));

            } else {
                console.log(err);
            }
        });
    }

    getMesh() {
        return this.mesh;
    }

    process(json) {
        console.log(json);
        for (let feature of json.features) {
            console.log(feature);
            for (let vector in this.mesh.geometry.vertices) {
                let center = new THREE.Vector3(feature.location[0], feature.location[1], 0);
                let dist = center.distanceTo(vector);
            }
        }
    }
}

module.exports = Terrain;
