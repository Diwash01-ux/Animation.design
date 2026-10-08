const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    5000
);

camera.position.z = 450;

const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
});

renderer.setPixelRatio(
    window.devicePixelRatio > 1 ? 2 : 1
);

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

document
    .getElementById("heart-container")
    .appendChild(renderer.domElement);


// -----------------------------
// HEART PARTICLES
// -----------------------------

const particleCount = 9000;

const positions = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount; i++) {

    // Random value
    const t = Math.random() * Math.PI * 2;

    // Heart equation
    const x =
        16 * Math.pow(Math.sin(t), 3);

    const y =
        13 * Math.cos(t)
        - 5 * Math.cos(2 * t)
        - 2 * Math.cos(3 * t)
        - Math.cos(4 * t);

    // Give the heart some thickness
    const scale = 10;

    positions[i * 3] =
        x * scale + (Math.random() - 0.5) * 8;

    positions[i * 3 + 1] =
        y * scale + (Math.random() - 0.5) * 8;

    positions[i * 3 + 2] =
        (Math.random() - 0.5) * 30;
}


// Geometry
const geometry = new THREE.BufferGeometry();

geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
);


// Particle material
const material = new THREE.PointsMaterial({
    color: 0xff4fa3,
    size: 2.2,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending,
    depthWrite: false
});


// Create particles
const heart = new THREE.Points(
    geometry,
    material
);

scene.add(heart);


// -----------------------------
// ANIMATION
// -----------------------------

let time = 0;

function animate() {

    requestAnimationFrame(animate);

    time += 0.025;

    // Heartbeat
    const beat =
        1 +
        Math.sin(time * 2.5) * 0.04 +
        Math.sin(time * 5) * 0.02;

    heart.scale.set(
        beat,
        beat,
        beat
    );

    // Slight rotation
    heart.rotation.y =
        Math.sin(time * 0.4) * 0.12;

    heart.rotation.z =
        Math.sin(time * 0.3) * 0.02;

    renderer.render(
        scene,
        camera
    );
}

animate();


// -----------------------------
// RESPONSIVE
// -----------------------------

window.addEventListener(
    "resize",
    () => {

        camera.aspect =
            window.innerWidth /
            window.innerHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );
    }
);
