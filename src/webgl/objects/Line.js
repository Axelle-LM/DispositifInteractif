import * as THREE from "three";
import AudioController from "../../utils/AudioController";

export default class Line {
    constructor() {
        this.group = new THREE.Group();
        this.colors = [0x4287f5, 0x42bcf5, 0x42daf5, 0x42f2f5];

        this.geometry = new THREE.BoxGeometry(1, 1, 1);
        this.material = new THREE.MeshNormalMaterial();

        this.materials = [];

        this.colors.forEach(color => {
            const material = new THREE.MeshBasicMaterial({
                color: color
            })

            this.materials.push(material);

        });

        let n = 0;
        const MODULO = Math.round(256 / this.colors.length);

        this.SPACING = 1.5;


        for (let i = 1; i < 256; i++) {
            //const geometry = new THREE.BoxGeometry(1, 1, 1);
            //const material = new THREE.MeshNormalMaterial();
            if (i % MODULO === 0) {
                n++;
                console.log(n);
            }

            const mesh = new THREE.Mesh(this.geometry, this.materials[n]);
            mesh.position.x = i + this.SPACING;

            this.group.add(mesh);
        }

        //this.group.add(this.mesh);
        this.group.position.set((-256 * this.SPACING) / 2, 0, 0);
    }

    tick() {
        for (let i = 0; i < this.group.children.length; i++) {
            this.group.children[i].scale.y = AudioController.fdata[i];

        }
    }
}