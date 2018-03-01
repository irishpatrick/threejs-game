let THREE = require("three");

class FirstPersonCamera {
    constructor(camera) {
        this.yaw = new THREE.Object3D();
        this.pitch = new THREE.Object3D();

        this.pitch.add(camera);
        this.yaw.add(this.pitch);
    }

    getObject() {
        return this.yaw;
    }
}

module.exports = FirstPersonCamera;
