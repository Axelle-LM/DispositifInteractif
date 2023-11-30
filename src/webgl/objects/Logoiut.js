import * as THREE from "three";
import AudioController from "../../utils/AudioController";
import Scene from "../Scene";

export default class Logoiut {
    constructor() {
        this.group = null;
        this.material = new THREE.MeshNormalMaterial();

        Scene.gltfLoader.load("/logo-iut.glb", (gltf) => {
            console.log(gltf.scene);
            this.group = gltf.scene;

            this.group.traverse((object) => {
                if (object.type == "Mesh") {
                    object.material = this.material;
                }
            });

            this.group.rotation.x = Math.PI / 4;

        });
    }



    tick(deltaTime) {

    }
}