import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.152.2/examples/jsm/loaders/GLTFLoader.js';


// Create a renderer with transparent background
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.outputColorSpace = THREE.SRGBColorSpace;

// Set up the rendering container and dimensions
const avatarContainer = document.getElementById('avatar');
let avatarCWidth = avatarContainer.clientWidth + 50;
let avatarCHeight = avatarContainer.clientHeight;
renderer.setSize(avatarCWidth, avatarCHeight);
renderer.setClearColor(0x000000, 0); // Set the clear color to black with full transparency
renderer.setPixelRatio(window.devicePixelRatio);
renderer.domElement.style.right = '0';            // Align to the right of its containing block
avatarContainer.appendChild(renderer.domElement);

const scene = new THREE.Scene();

// Set up camera
const camera = new THREE.PerspectiveCamera(58, avatarCWidth / avatarCHeight, 0.1, 1000);
camera.position.set(0, 1.45, 5.65);
camera.lookAt(0, 1.45, 5);

// Add lights
const spotLight = new THREE.SpotLight(0xffffff, 0.6, 100, 0.2, 0.3);
spotLight.position.set(0, 25, 25);
scene.add(spotLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.45);
directionalLight.position.set(0, 1, 5);
directionalLight.lookAt(0, 0, 5);
scene.add(directionalLight);

const blueLight = new THREE.DirectionalLight(0x2C598C, 2.5);
blueLight.position.set(-3, 3, 5);
blueLight.lookAt(0, 0, 5);
scene.add(blueLight);

const pinkLight = new THREE.DirectionalLight(0x7C4578, 3.5);
pinkLight.position.set(2, 0.5, 5);
pinkLight.lookAt(0, 0, 5);
scene.add(pinkLight);

const backLight = new THREE.DirectionalLight(0xffffff, 1.6);
backLight.position.set(2, 3, -2);
backLight.lookAt(0, 0, 5);
scene.add(backLight);

// Load and animate the avatar
let avatar;
let mixer;
let animations;

const loader = new GLTFLoader();
let isAvatarLoaded = false;  // To track if the avatar is fully loaded

// Steady loading progress bar
function steadyProgressBar() {
    let progress = 0;
    const progressInterval = setInterval(() => {
        if (progress < 90) {
            progress += 1;  // Increase the progress by 1 every interval
            const offset = 500 - (500 * (progress / 100));  // Update the SVG progress bar
            document.querySelector("path").setAttribute("stroke-dashoffset", offset);
        } else {
            clearInterval(progressInterval);  // Stop the steady progress at 90%
            loadAvatar();  // Start loading the avatar after the initial progress
        }
    }, 15);  // Adjust the interval to control the speed (lower for faster)
}

// Load the avatar model
function loadAvatar() {
    loader.load('js/avatar.glb', function(gltf) {
        avatar = gltf.scene;
        avatar.position.set(0, 0, 4.5);
        animations = gltf.animations;
        mixer = new THREE.AnimationMixer(avatar);
        scene.add(avatar);

        // Play the idle loop animation
        playIdleLoop();

        // Avatar is fully loaded, set the flag to true
        isAvatarLoaded = true;

        // Finalize the progress bar and show the main screen once the avatar is loaded
        finalizeLoadingScreen();
    }, function(xhr) {
        if (xhr.lengthComputable) {
            const progress = (xhr.loaded / xhr.total) * 100;
            const offset = 500 - (500 * (progress / 100));  // Update the progress based on avatar loading
            document.querySelector("path").setAttribute("stroke-dashoffset", offset);
        }
    }, function(error) {
        console.error('Error loading avatar model', error);
    });
}

// Finalize the loading screen transition
function finalizeLoadingScreen() {
    const progressInterval = setInterval(() => {
        if (isAvatarLoaded) {
            document.querySelector("path").setAttribute("stroke-dashoffset", 0);

            const loadingScreen = document.getElementById("loading-screen");
            loadingScreen.style.transition = "opacity 0.5s ease-out";
            loadingScreen.style.opacity = "0";

            setTimeout(() => {
                loadingScreen.style.display = "none";
                document.querySelector(".main-container").style.display = "block";
                window.dispatchEvent(new Event('resize'));
                startShinyAnimation();

                const introElements = document.querySelectorAll('#intro #h1-wrapper, #intro h2, #intro p, #intro .icons, #main-wrapper #arrow');

                const opacityMap = {
                    "#h1-wrapper": 1,
                    "h2": 1,
                    "p": 0.8,
                    ".icons": 0.6,
                    "#arrow": 0.35
                };

                const delayMap = {
                    "#h1-wrapper": 0,
                    "h2": 1200,
                    "p": 1200,
                    ".icons": 1200, // same as p
                    "#arrow": 2000
                };

                introElements.forEach(el => {
                    let delay = 0;
                    for (const selector in delayMap) {
                        if (el.matches(selector)) {
                            delay = delayMap[selector];
                            break;
                        }
                    }

                    setTimeout(() => {
                        el.classList.add('intro-fade-in');

                        for (const selector in opacityMap) {
                            if (el.matches(selector)) {
                                el.style.opacity = opacityMap[selector];
                                break;
                            }
                        }
                    }, delay);
                });

            }, 500);

            clearInterval(progressInterval);
        }
    }, 30);
}



// Start the steady loading process
steadyProgressBar();




// Function to play the idle animation in a loop
function playIdleLoop() {
    renderer.render(scene, camera);

    if (mixer && animations) {
        mixer.stopAllAction();
        const action = mixer.clipAction(animations[0]); // Assuming the idle animation is the first clip
        action.loop = THREE.LoopRepeat;
        action.play();
    }

    // Render loop
    function animate() {
        requestAnimationFrame(animate);
        if (mixer) mixer.update(0.01); // Update the mixer with a small delta time
        renderer.render(scene, camera);
    }
    animate();
}

// Initialize the clock
const clock = new THREE.Clock();

window.addEventListener("resize", () => {

    // Update canvas size
    avatarCWidth = avatarContainer.clientWidth + 50;
    avatarCHeight = avatarContainer.clientHeight;

    renderer.setSize(avatarCWidth, avatarCHeight); // Resize renderer
    camera.aspect = avatarCWidth / avatarCHeight; // Maintain aspect ratio
    camera.updateProjectionMatrix(); // Apply camera changes

    renderer.setPixelRatio(window.devicePixelRatio);


    // Adjust camera zoom or position for smaller screens
    if (window.innerWidth <= 1028) {
        camera.position.z = 5.8; // Move camera back (zoom out)
    } else if (window.innerWidth <= 400) {
        camera.position.z = 6; // Move camera back (zoom out)
    } else {
        camera.position.z = 5.65; // Default zoom
    }
});

