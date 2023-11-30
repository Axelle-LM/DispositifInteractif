import * as THREE from "three";
import AudioController from "../../utils/AudioController";

export default class Cube {
    constructor() {
        this.geometry = new THREE.BoxGeometry(1, 1, 1);
        this.material = new THREE.MeshNormalMaterial({ wireframe: true, });

        this.mesh = new THREE.Mesh(this.geometry, this.material);

        this.group = new THREE.Group();
        this.group.add(this.mesh)
    }



    tick(deltaTime) {
        this.mesh.rotation.x += 0.01 * deltaTime * 0.1;
        this.mesh.rotation.z += 0.01 * deltaTime * 0.1;

        const remapped = AudioController.fdata[0] / 255

        this.mesh.scale.set(1 + remapped, 1 + remapped, 1 + remapped);
    }
}