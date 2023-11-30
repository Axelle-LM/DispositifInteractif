import * as THREE from "three";
import { gsap } from "gsap";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { TextureLoader } from "three";
import pane from "../utils/Pane";
import Cube from "./objects/Cube";
import Line from "./objects/Line";
import Logoiut from "./objects/Logoiut";
import Board from "./objects/Board";
import Cover from "./objects/Cover";
import Picker from "../component/picker/Picker";


class SCENE {
    setup(canvas) {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas = canvas;

        this.setupScene();
        this.setupCamera();
        this.setupControl();
        this.setupStats();
        this.setupRenderer();
        this.setupPostprocessing();
        this.setupGLTFLoader();
        this.setupTextureLoader();



        this.addObjects();
        this.addEvents();



    }

    setupGLTFLoader() {
        this.gltfLoader = new GLTFLoader();

        this.gltfLoader.load("/logo-iut.glb", (gltf) => {
            console.log(gltf.scene);
        });
    }


    setupTextureLoader() {
        this.textureLoader = new THREE.TextureLoader();
    }



    setupScene() {
        this.scene = new THREE.Scene();
    }



    setupStats() {
        this.stats = new Stats();
        document.body.appendChild(this.stats.dom);
    }


    setupCamera() {
        this.camera = new THREE.PerspectiveCamera(
            28,
            this.width / this.height,
            0.1,
            10000
        );
        this.camera.position.z = 5;
    }



    setupControl() {
        this.control = new OrbitControls(this.camera, this.canvas);
    }



    setupRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: false,
            powerPreference: "high-performance",
            stencil: false,
            depth: false,
            // alpha: true
        });

        this.renderer.toneMapping = THREE.NoToneMapping;
        this.renderer.outputColorSpace = THREE.SRGBColorSpace;

        this.renderer.setClearColor(0x000000);
        this.renderer.setSize(this.width, this.height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }

    addEvents() {
        // gsap.ticker.add((time, deltaTime, frame) =>
        //   this.tick(time, deltaTime, frame)
        // );
        gsap.ticker.add(this.tick);

        window.addEventListener("resize", () => this.resize());
    }

    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(this.width, this.height);


    }



    setupPostprocessing() {
        this.BLOOM_PARAM = { strength: 0.1, radius: 0, threshold: 0 };
        this.composer = new EffectComposer(this.renderer);
        this.scenePass = new RenderPass(this.scene, this.camera);
        this.bloomPass = new UnrealBloomPass(new THREE.Vector2(this.width / this.height),
            this.BLOOM_PARAM.strength,
            this.BLOOM_PARAM.radius,
            this.BLOOM_PARAM.threshold
        );

        this.composer.addPass(this.scenePass);
        this.composer.addPass(this.bloomPass);

        this.postProcessFolder = pane.addFolder({
            title: "Post process",
        });

        this.postProcessFolder
            .addBinding(this.BLOOM_PARAM, "strength", {
                min: 0,
                max: 1,
                step: 0.1,
            })
            .on("change", (e) => {
                this.bloomPass.strength = e.value;
                console.log(e);
            });
    }


    changeVisualizer(index) {
        console.log(index);

        this.scene.remove(this.selectedObject.group)

        switch (index) {
            case 0:
                this.selectedObject = this.cube
                this.camera.position.z = 5;
                break;

            case 1:
                this.selectedObject = this.line
                this.camera.position.z = 500;
                break;

            case 2:
                this.selectedObject = this.logoiut
                break;

            case 3:
                this.selectedObject = this.board
                this.camera.position.z = 50;
                break;

            case 4:
                this.selectedObject = this.cover
                this.camera.position.z = 50;
                break;

            default:
                break;
        }
        this.scene.add(this.selectedObject.group);
    }


    addObjects() {
        this.cube = new Cube();
        this.line = new Line();
        this.logoiut = new Logoiut();
        this.board = new Board();
        this.cover = new Cover();

        //this.scene.add(this.cube.mesh);
        //this.scene.add(this.line.group);

        this.selectedObject = this.cube;
        this.scene.add(this.selectedObject.group);

        //this.camera.position.z = 500;
    }

    tick = (time, deltaTime, frame) => {
        this.stats.begin();
        //this.cube.tick(deltaTime);
        this.selectedObject.tick(deltaTime);
        this.composer.render();
        //this.renderer.render(this.scene, this.camera);
        // console.log("allo");
        this.stats.end();
    };
}

const Scene = new SCENE();
export default Scene;