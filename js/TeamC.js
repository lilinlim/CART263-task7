import * as THREE from 'three';
//texture
const loader = new THREE.TextureLoader();
const planet_texture = await loader.load ("./textures/jupiter_texE.png");
planet_texture.colorSpace = THREE.SRGBColorSpace;

// Planet class for Team C
export class PlanetC {
    constructor(scene, orbitRadius, orbitSpeed) {
        this.scene = scene;
        this.orbitRadius = orbitRadius;
        this.orbitSpeed = orbitSpeed;
        this.angle = Math.random() * Math.PI * 2;

        //Create planet group
        this.group = new THREE.Group()


        // Create planet
        //STEP 1:
        //TODO: Create a planet using THREE.SphereGeometry (Radius must be between 1.5 and 2).
        //TODO: Give it a custom material using THREE.MeshStandardMaterial.
        //TODO: Use castShadow and receiveShadow on the mesh and all future ones so they can cast and receive shadows.
        //TODO: Add the planet mesh to the planet group.
        // https://www.solarsystemscope.com/textures/ // cool textures
        this.sphere = new THREE.Mesh(
            new THREE.SphereGeometry(1.6, 32, 16 ),
            new THREE.MeshBasicMaterial( {
                // color: 0x7FFFD4,
                map: planet_texture
            })
        )
        //add glow effect
        this.glowSphere = new THREE.SphereGeometry(1.8, 32, 16);
        this.glowMaterial = new THREE.MeshBasicMaterial({
            color: 0xFF69B4,
            transparent: true,
            opacity: 0.2
        })
        this.glow = new THREE.Mesh(this.glowSphere, this.glowMaterial);
        //add glow effect 2!!
        this.glowSphere2 = new THREE.SphereGeometry(2, 32, 16);
        this.glowMaterial2 = new THREE.MeshBasicMaterial({
            color: 0xFF69B4,
            transparent: true,
            opacity: 0.1
        })
        this.glow2 = new THREE.Mesh(this.glowSphere2, this.glowMaterial2);
        //STEP 2: 
        //TODO: Add from 1 to 3 orbiting moons to the planet group. 
        //TODO: The moons should rotate around the planet just like the planet group rotates around the Sun.
        //make 3 moons and make them orbit around planet c
        //creates 3 moons with random sizes, colors, and orbit speeds
        for (let i = 0; i < 3; i++) {
            //creates a moon with random size and color
            const moonGeometry = new THREE.SphereGeometry(0.3 + Math.random() * 0.2, 16, 16);
            //creates a material with random color
            const moonMaterial = new THREE.MeshStandardMaterial({ color: Math.random() * 0xffffff });
            //creates the moon mesh and sets it to cast and receive shadows
            const moon = new THREE.Mesh(moonGeometry, moonMaterial);
            //sets the moon to cast and receive shadows
            moon.castShadow = true;
            //sets the moon to receive shadows
            moon.receiveShadow = true;
            //sets random orbit and radius for the moon
            const moonOrbitRadius = 2 + Math.random() * 1;
            //sets random orbit speed for the moon
            const moonOrbitSpeed = 0.5 + Math.random() * 0.5;
            //stores the moon's orbit radius, speed, and initial angle in userData for use in the update method
            moon.userData = { orbitRadius: moonOrbitRadius, orbitSpeed: moonOrbitSpeed, angle: Math.random() * Math.PI * 2 };
            this.group.add(moon);
        } // we make the moons orbit around the planet in the update method 





        //STEP 3:
        //TODO: Load Blender models to populate the planet with multiple props and critters by adding them to the planet group.
        //TODO: Make sure to rotate the models so they are oriented correctly relative to the surface of the planet.

        //STEP 4:
        //TODO: Use raycasting in the click() method below to detect clicks on the models, and make an animation happen when a model is clicked.
        //TODO: Use your imagination and creativity!
        this.group.add(this.sphere, this.glow, this.glow2);
        this.scene.add(this.group);
    }

    update(delta) {
        // Orbit around sun
        this.angle += this.orbitSpeed * delta * 30;
        this.group.position.x = Math.cos(this.angle) * this.orbitRadius;
        this.group.position.z = Math.sin(this.angle) * this.orbitRadius;

        // Rotate planet
        this.group.rotation.y += delta * 0.5;

        //TODO: Do the moon orbits and the model animations here.
        //makes all the moons orbit around the planet
        this.group.children.forEach(child => {
            if (child.userData.orbitRadius) {
                child.userData.angle += child.userData.orbitSpeed * delta * 3;
                child.position.x = Math.cos(child.userData.angle) * child.userData.orbitRadius;
                child.position.z = Math.sin(child.userData.angle) * child.userData.orbitRadius;
            }
        });

    }

    click(mouse, scene, camera) {
        //TODO: Do the raycasting here.
    }
}

