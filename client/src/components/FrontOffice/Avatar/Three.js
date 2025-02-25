import React, { Component } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// import duck from "../models/standard-female-figure.gltf";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
export class Three extends Component {
  componentDidMount() {
    var scene = new THREE.Scene();
    scene.background = new THREE.Color("#add8e6");
    const canvas = document.querySelector("canvas.webgl");
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas
    });

    renderer.setSize(350, 350);
    // document.body.appendChild( renderer.domElement );
    // use ref as a mount point of the Three.js scene instead of the document.body

    // Scene
    // const objLoader = new OBJLoader();
    // objLoader.load(this.props.man, root => {
    //   root.position.y = -1;
    //   console.log(root);
      
    //   root.scale.set(10,10,10);
    //   const material = new THREE.MeshStandardMaterial({
    //     color: 0xffdbac,
    //     emissive: 0x0,
    //     roughness: 1,
    //     metalness: 0.2
    //   });

    // //   root.children.forEach(c => {
    // //     c.children.forEach(child => {
    // //       child.material = material;
    // //     });
    // //   });

    //   scene.add(root);
    // });

    const gltfLoader = new GLTFLoader();
    gltfLoader.load(this.props.model, gltf => {
      gltf.scene.position.y = -10;
      const material = new THREE.MeshStandardMaterial({
        color: 0xffdbac,
        emissive: 0x0,
        roughness: 1,
        metalness: 0.2
      });

      gltf.scene.children.forEach(c => {
        c.children.forEach(child => {
          child.material = material;
        });
      });
      // gltf.scene.children[1].children[1].material = material;
      console.log(gltf);
      scene.add(gltf.scene);
    });
    if (this.props.robe !== undefined) {
      gltfLoader.load(this.props.robe, gltf => {
        gltf.scene.position.y = -10;

        console.log(gltf);
        scene.add(gltf.scene);
      });
    }
    if (this.props.vest !== undefined) {
      gltfLoader.load(this.props.vest, gltf => {
        gltf.scene.position.y = -10;

        console.log(gltf);
        scene.add(gltf.scene);
      });
    }
    if (this.props.shirt !== undefined) {
      gltfLoader.load(this.props.shirt, gltf => {
        gltf.scene.position.y = -10;
        const material = new THREE.MeshStandardMaterial({
          color: 0xe0ac69,
          roughness: 0,
          metalness: 0
        });

        gltf.scene.children[1].children[0].material = material;
        console.log(gltf);
        scene.add(gltf.scene);
      });
    }
    if (this.props.pants !== undefined) {
      gltfLoader.parse(this.props.pants,'', gltf => {
        gltf.scene.position.y = -10;

        // console.log("pants in three.js");
        // console.log(gltf);
        scene.add(gltf.scene);
      });
      // scene.add(this.props.pants);
    }
    /**
     * Floor
     */
    const floor = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(10, 10),
      new THREE.MeshStandardMaterial({
        color: "#444444",
        metalness: 0,
        roughness: 0.5
      })
    );
    floor.receiveShadow = true;
    floor.rotation.x = -Math.PI * 0.5;
    floor.position.y = -10;
    scene.add(floor);

    /**
     * Lights
     */
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.set(1024, 1024);
    directionalLight.shadow.camera.far = 15;
    directionalLight.shadow.camera.left = -7;
    directionalLight.shadow.camera.top = 7;
    directionalLight.shadow.camera.right = 7;
    directionalLight.shadow.camera.bottom = -7;
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    /**
     * Sizes
     */
    const sizes = {
      width: 350,
      height: 350
    };

    window.addEventListener("resize", () => {
      // Update sizes
      sizes.width = 350;
      sizes.height = 350;

      // Update camera
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      // Update renderer
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    /**
     * Camera
     */
    // Base camera
    const camera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      100
    );
    camera.position.set(0, 10, 20);
    scene.add(camera);

    // Controls
    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 0.75, 0);
    controls.enableDamping = true;

    /**
     * Renderer
     */

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    /**
     * Animate
     */
    const clock = new THREE.Clock();
    let previousTime = 0;

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();
      const deltaTime = elapsedTime - previousTime;
      previousTime = elapsedTime;

      // Update controls
      controls.update();

      // Render
      renderer.render(scene, camera);

      // Call tick again on the next frame
      window.requestAnimationFrame(tick);
    };

    tick();
  }
  render() {
    return <canvas className="webgl"></canvas>;
  }
}

export default Three;
