import * as THREE from "three";
import AudioController from "../../utils/AudioController";
import Scene from "../Scene";

// eslint-disable-next-line import/no-webpack-loader-syntax
import fragmentShader from "!!raw-loader!!glslify-loader!../../shaders/cover/fragment.glsl";
// eslint-disable-next-line import/no-webpack-loader-syntax
import vertexShader from "!!raw-loader!!glslify-loader!../../shaders/cover/vertex.glsl";

export default class Cover {
    constructor() {
        this.geometry = new THREE.PlaneGeometry(10, 10, 256, 256);
        this.material = new THREE.ShaderMaterial({ /*size: 0.02, sizeAttenuation: true,*/ wireframe: false, uniforms: { uMap: { value: null }, uBassFrequency: { value: 0 }, uTime: { value: 0 }, uNoiseFrequency: { value: 1 }, }, fragmentShader: fragmentShader, vertexShader: vertexShader });

        this.mesh = new THREE.Points(this.geometry, this.material);

        this.group = new THREE.Group();
        this.group.add(this.mesh)

        /*this.folder = pane.addFolder({
            title: "Cover",
        });

        this.folder.addBinding(this.material.uniforms.uNoiseFrequency, "value", {
            min: -5,
            max: 5,
            stop: 0.001,
            label: "uNoiseFrequency",
        })*/

    }


    updateCover(src) {
        Scene.textureLoader.load(src, (texture) => {
            console.log(texture);
            //this.material.map = texture;

            this.material.uniforms.uMap.value = texture;
            this.material.needsUpdate = true;
        });
    }


    tick(deltaTime) {
        this.material.uniforms.uTime.value += deltaTime * 0.001;
        this.material.uniforms.uBassFrequency.value = AudioController.fdata[0];
    }
}