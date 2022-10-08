import './style.css'

import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import * as dat from 'lil-gui'
import { gsap } from 'gsap'







// Debug
// const gui = new dat.GUI()


let camera,scene,renderer,controls;

const objects = [];

let raycaster;


let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;


let prevTime = performance.now();
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();



init();
animate();

function init() {

/**
 * Loaders
 */
 const loadingBarElement = document.querySelector('.loading-bar')
 const loadingManager = new THREE.LoadingManager(
     // Loaded
     () =>
     {
         // Wait a little
         window.setTimeout(() =>
         {
             // Animate overlay
             gsap.to(floorMaterial, { duration: 3, value: 0, delay: 1 })
 
             // Update loadingBarElement
             loadingBarElement.classList.add('ended')
             loadingBarElement.style.transform = ''
         }, 500)
     },
 
     // Progress
     (itemUrl, itemsLoaded, itemsTotal) =>
     {
         // Calculate the progress and update the loadingBarElement
         const progressRatio = itemsLoaded / itemsTotal
         loadingBarElement.style.transform = `scaleX(${progressRatio})`
     }
 )
 const gltfLoader = new GLTFLoader(loadingManager)
 const textureLoader = new THREE.TextureLoader(loadingManager)




    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight,1);
    camera.position.y = 10;
    camera.position.z = -140;
    camera.rotateY(34.5)
    scene = new THREE.Scene();
    // scene.background = new THREE.Color(0xff00);
    // scene.fog = new THREE.Fog(0xff0,0,750);

    // const light = new THREE.HemisphereLight()
    // light.position.set(0.5,1,0.75);
    // scene.add(light);
/**
 * Overlay
 */


    const updateAllMaterials = () => {
        scene.traverse((child) => {
            if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial){
    
                // child.material.envMap = enviromentMap
                child.material.envMapIntensity = debugObject.envMapIntensity
                child.material.needsUpdate = true
                child.castShadow = true
                child.receiveShadow = true
             }
        })
    }


/**
 * Lights
 */

 const light = new THREE.PointLight( '#fad6a5', 350, 140 );
 light.position.set( 70, 80,60);

 scene.add( light );

const lightStudio = new THREE.PointLight( '#fad6a5', 200, 140 );
lightStudio.position.set( -50, 20,30);
scene.add( lightStudio);


const alight = new THREE.AmbientLight( 0x404040,4 ); // soft white light
scene.add( alight );


    const onKeyDown = (event) => {

        switch(event.code){

            case 'ArrowUp':
            case 'KeyW':
                 moveForward = true;
                 break;
            case 'ArrowLeft':
            case 'KeyA':
                moveLeft = true;
                break;
            
            case 'ArrowDown':
            case 'KeyS':
                moveBackward = true;
                break;
            
            case 'ArrowRight':
            case 'KeyD':
                moveRight = true;
                break;
        }
    };

    const onKeyUp = (event) => {

        switch(event.code){
            case 'ArrowUp':
            case 'KeyW':
                moveForward = false;
                break;
            
            case 'ArrowLef':
            case 'KeyA':
                  moveLeft = false;
                  break;
            
            case 'ArrowDown':
            case 'KeyS':
                moveBackward = false;
                break;
            
            case 'ArrowRight':
            case 'KeyD':
                moveRight = false;
                break;
        }
    };

    document.addEventListener('keydown',onKeyDown);
    document.addEventListener('keyup',onKeyUp);





    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('/draco/')

    gltfLoader.setDRACOLoader(dracoLoader)
    gltfLoader.load('/Prendas/T-SHIRT-BLACK-blender.glb',
    (gltf) => {

        gltf.scene.position.setY(9)
        gltf.scene.position.setZ(220)
    gltf.scene.position.setX(37)
        gltf.scene.rotateY(59.79)

        scene.add(gltf.scene)

     
    })


    gltfLoader.load('/Prendas/puffer-jacket.glb',
    (gltf) => {

    // //     gltf.scene.scale.set(5,5,5)
        gltf.scene.position.setY(7)
        gltf.scene.position.setZ(-10)

    gltf.scene.rotateY(29.93)
    gltf.scene.position.setX(178)
        scene.add(gltf.scene)

     
    })
    gltfLoader.load('/Prendas/hoodie-1.glb',
    (gltf) => {

    //     // gltf.scene.scale.set(5,5,5)
        gltf.scene.position.setY(8)
        gltf.scene.position.setZ(35)
        gltf.scene.position.setX(-56)

        gltf.scene.rotateY(-29.91)
        scene.add(gltf.scene)

     
    })

    gltfLoader.load('/Prendas/T-SHIRT-BROWN-black.glb',
    (gltf) => {

        gltf.scene.position.setY(9)
        gltf.scene.position.setZ(209)
    gltf.scene.position.setX(110)
        gltf.scene.rotateY(59.79)
        scene.add(gltf.scene)

     
    })

    gltfLoader.load('/Prendas/hoodie-black.glb',
    (gltf) => {

    //     // gltf.scene.scale.set(5,5,5)
        gltf.scene.position.setY(7)
    //     // gltf.scene.position.setZ(94)
    gltf.scene.position.setZ(27)
    gltf.scene.position.setX(-55)
    gltf.scene.rotateY(-29.91)
        scene.add(gltf.scene)

     
    })

    gltfLoader.load('/Prendas/hoodie-brown.glb',
    (gltf) => {


    gltf.scene.position.setY(7)

    gltf.scene.position.setX(-63)
    gltf.scene.position.setZ(170)
    gltf.scene.rotateY(-29.91)
        scene.add(gltf.scene)

     
    })
    gltfLoader.load('/Prendas/t-shirt-white.glb',
    (gltf) => {

        gltf.scene.position.setY(9)
        gltf.scene.position.setZ(212.5)
    gltf.scene.position.setX(130)
        gltf.scene.rotateY(59.79)
        scene.add(gltf.scene)

     
    })

    gltfLoader.load('/Prendas/hoodie-rose.glb',
    (gltf) => {

        gltf.scene.position.setY(9)
        gltf.scene.position.setZ(1)

    gltf.scene.rotateY(29.91)
    gltf.scene.position.setX(183)
        scene.add(gltf.scene)

     
    })

    gltfLoader.load('/Prendas/hoodie-buda.glb',
    (gltf) => {

    //     // gltf.scene.scale.set(5,5,5)
        gltf.scene.position.setY(7)
    //     // gltf.scene.position.setZ(103)
    gltf.scene.position.setX(-59.94)
    gltf.scene.position.setZ(115)

    gltf.scene.rotateY(-29.89)
        scene.add(gltf.scene)

     
    })
    gltfLoader.load('/Prendas/hoodie-green.glb',
    (gltf) => {

        gltf.scene.position.setY(8)
        gltf.scene.position.setZ(15)

    gltf.scene.rotateY(29.93)
    gltf.scene.position.setX(187)
    // gltf.scene.rotateY(-29.91)
        scene.add(gltf.scene)

     
    })
    gltfLoader.load('/Prendas/hoodie-pecan.glb',
    (gltf) => {
        gltf.scene.position.setY(9)
        gltf.scene.position.setZ(7)

    gltf.scene.rotateY(29.93)
    gltf.scene.position.setX(185)
    // gltf.scene.rotateY(-29.91)
        scene.add(gltf.scene)

     
    })
    gltfLoader.load('/Prendas/t-shirt-creme.glb',
    (gltf) => {
    gltf.scene.position.setY(9)
    gltf.scene.position.setZ(215)
gltf.scene.position.setX(120)
    gltf.scene.rotateY(59.79)
        scene.add(gltf.scene)

     
    })


    // Fourniture


    gltfLoader.load('/fourniture/armchair.glb',
    (gltf) => {
        gltf.scene.position.setY(5)
        gltf.scene.position.setZ(-30)
        gltf.scene.position.setX(65)
        gltf.scene.rotateY(29.9)

        scene.add(gltf.scene)
        


    })

        // Models
        const listener = new THREE.AudioListener();
        camera.add( listener );
        
        // create the PositionalAudio object (passing in the listener)
        const sound = new THREE.PositionalAudio( listener )
        // load a sound and set it as the PositionalAudio object's buffer
        const audioLoader = new THREE.AudioLoader();
        audioLoader.load( 'audio/audio.mp3', function( buffer ) {
            sound.setBuffer(buffer)            
            sound.setRefDistance( 1 );
        });
        
    gltfLoader.load('/fourniture/Audio-Table.glb',
    (glb) => {
        const audio = glb.scene;
        audio.position.setZ(-60)
        audio.position.setY(1)
        audio.position.setX(70)
        audio.rotateY(29.9)

        audio.add(sound)
        scene.add(audio)
        animate()


    })


    
    controls = new PointerLockControls(camera,document.body);

    const blocker = document.getElementById('blocker');
    const instructions = document.getElementById('instructions');

    instructions.addEventListener('click', () => {
        controls.lock();
        sound.play()
    });


    controls.addEventListener('lock', () => {

        instructions.style.display = 'none';
        blocker.style.display = 'none';
    });

    controls.addEventListener('unlock',() => {

        blocker.style.display = 'block';
        instructions.style.display = '';
    });

    scene.add(controls.getObject());
    gltfLoader.load('/fourniture/chairs-table.glb',
    (glb) => {

        // glb.scene.scale.set(5,5,5)
        glb.scene.position.setZ(-50)
        glb.scene.position.setY(6)
        glb.scene.position.setX(30)
        glb.scene.rotateY(29.9)

        scene.add(glb.scene)
        


    })

    gltfLoader.load('/fourniture/photos.glb',
    (glb) => {

        glb.scene.position.setZ(65)
        glb.scene.position.setY(2)
        glb.scene.position.setX(-30)
        glb.scene.rotateY(29.9)

        scene.add(glb.scene)
        


    })

    gltfLoader.load('/fourniture/armchairTwo.glb',
    (glb) => {

        glb.scene.position.setZ(30)
        glb.scene.position.setY(-1)
        glb.scene.position.setX(-40)
        glb.scene.rotateY(29.9)
        scene.add(glb.scene)
        


    })

    gltfLoader.load('/fourniture/worktable.glb',
    (glb) => {

        glb.scene.position.setZ(-40)
        glb.scene.position.setY(5)
        // glb.scene.position.setX(-40)
        glb.scene.rotateY(29.9)
        scene.add(glb.scene)
        


    })

    
    gltfLoader.load('/fourniture/perchero.glb',
    (glb) => {

        glb.scene.position.setZ(-60)
        scene.add(glb.scene)
        


    })

    gltfLoader.load('/fourniture/perchero2.glb',
    (glb) => {

        glb.scene.position.setZ(-60)

        glb.scene.position.setX(-30)

        scene.add(glb.scene)
        


    })


gltfLoader.load('/lettering/letter.glb',(glb) => {
    
    glb.scene.position.setY(25)
    glb.scene.position.setX(4)
    glb.scene.position.setZ(-105)
    scene.add(glb.scene)

})
    raycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0,-1,0),0,10);


    // Load textures


    const floorTexture = textureLoader.load('/textures/multicolorquartz_1-1K/basecolor.png')
    const floorHeight = textureLoader.load('/textures/multicolorquartz_1-1K/height.png')
    const floorMetallic = textureLoader.load('/textures/multicolorquartz_1-1K/metallic.png')
    const floorRoughness = textureLoader.load('/textures/multicolorquartz_1-1K/roughness.png')
    const floorAmbienOcclusion = textureLoader.load('/textures/multicolorquartz_1-1K/ambientocclusion.png')
    const floorNormal = textureLoader.load('/textures/multicolorquartz_1-1K/normal.png')
   
    const wallsTexture = textureLoader.load('/textures/wallpaper_40-1K/1K-wallpaper_40_basecolor.png')
    const wallsHeight = textureLoader.load('/textures/wallpaper_40-1K/1K-wallpaper_40_height.png')
    const wallsMetallic = textureLoader.load('/textures/wallpaper_40-1K/1K-wallpaper_40_metallic.png')
    const wallsRoughness = textureLoader.load('/textures/wallpaper_40-1K/1K-wallpaper_40_roughness.png')
    const wallsAmbienOcclusion = textureLoader.load('/textures/wallpaper_40-1K/1K-wallpaper_40_ambientocclusion.png')
    const wallsNormal = textureLoader.load('/textures/wallpaper_40-1K/1K-wallpaper_40_normal.png')
    // floor


    // Columns

 const geometry = new THREE.CylinderGeometry(5,5,50,30);

const material = new THREE.MeshStandardMaterial( { map: floorTexture,transparent:true,aoMap: floorAmbienOcclusion, displacementMap:floorHeight,roughnessMap:floorRoughness,metalnessMap:floorMetallic,normalMap:floorNormal,displacementScale:0.1} );
const cylinder = new THREE.Mesh( geometry, material );
cylinder.position.setZ(-30)
cylinder.position.setY(20)
scene.add( cylinder );
   
const cylinder2 = new THREE.Mesh( geometry, material );
cylinder2.position.setZ(-30)
cylinder2.position.setX(-70)
cylinder2.position.setY(20)
scene.add( cylinder2 );
    let floorGeometry = new THREE.PlaneGeometry( 200,200, 100, 100 );
    // floorGeometry.rotateY( 8);
    floorGeometry.rotateX( -Math.PI / 2);


    const floorMaterial = new THREE.MeshStandardMaterial( { map: floorTexture,transparent:true,aoMap: floorAmbienOcclusion, displacementMap:floorHeight,roughnessMap:floorRoughness,metalnessMap:floorMetallic,normalMap:floorNormal,displacementScale:0.1} );

    const floor = new THREE.Mesh( floorGeometry, floorMaterial );
    scene.add( floor );


    let ceilingGeometry = new THREE.PlaneGeometry( 200,200, 100, 100 );
    ceilingGeometry.rotateX(Math.PI / 2);


    const ceilingMaterial = new THREE.MeshStandardMaterial( {map: floorTexture,transparent:true,aoMap: floorAmbienOcclusion, displacementMap:floorHeight,roughnessMap:floorRoughness,metalnessMap:floorMetallic,normalMap:floorNormal,displacementScale:0.1} );

    
    const ceiling = new THREE.Mesh( ceilingGeometry, ceilingMaterial );
    ceiling.position.y = 50
    scene.add( ceiling );


    const walls1 = new THREE.PlaneGeometry(200,50,1,1);
    walls1.rotateY(21.99);

    
    const wallsMaterial = new THREE.MeshStandardMaterial({ map: wallsTexture,transparent:true,aoMap: wallsAmbienOcclusion, displacementMap:wallsHeight,roughnessMap:wallsRoughness,metalnessMap:wallsMetallic,normalMap:wallsNormal,displacementScale:0.1})
    
    const walls = new THREE.Mesh(walls1,wallsMaterial)
    walls.position.y = 25
    walls.position.z = 100
    
    scene.add(walls)
    // gui.add(walls.position,'x').min(1).max(100).step(25)
    // gui.add(walls.position,'y').min(1).max(100).step(25)
    // gui.add(walls.position,'z').min(1).max(100).step(25)

    
    const doorHouse = new THREE.PlaneGeometry(90,50,1,1);
    doorHouse.rotateY(21.99);

    
    const doorhouseMaterial = new THREE.MeshStandardMaterial({ map: wallsTexture,transparent:true,aoMap: wallsAmbienOcclusion, displacementMap:wallsHeight,roughnessMap:wallsRoughness,metalnessMap:wallsMetallic,normalMap:wallsNormal,displacementScale:0.1})
    
    const doorH = new THREE.Mesh(doorHouse,doorhouseMaterial)
    doorH.position.y = 25
    doorH.position.z = -100
    doorH.position.x = 55
    
    scene.add(doorH)
    const door2House = new THREE.PlaneGeometry(90,50,1,1);
    // doorHouse.rotateY(21.99);

    
    const door2houseMaterial = new THREE.MeshStandardMaterial({ map: wallsTexture,transparent:true,aoMap: wallsAmbienOcclusion, displacementMap:wallsHeight,roughnessMap:wallsRoughness,metalnessMap:wallsMetallic,normalMap:wallsNormal,displacementScale:0.1})
    
    const doorH2 = new THREE.Mesh(door2House,door2houseMaterial)
    doorH2.position.y = 25
    doorH2.position.x = 55
    doorH2.position.z = -100
    
    scene.add(doorH2)


// Door Two

const door3House = new THREE.PlaneGeometry(90,50,1,1);
door3House.rotateY(21.99);


const door3houseMaterial = new THREE.MeshStandardMaterial({ map: wallsTexture,transparent:true,aoMap: wallsAmbienOcclusion, displacementMap:wallsHeight,roughnessMap:wallsRoughness,metalnessMap:wallsMetallic,normalMap:wallsNormal,displacementScale:0.1})

const doorH3 = new THREE.Mesh(door3House,door3houseMaterial)
doorH3.position.y = 25
doorH3.position.z = -100
doorH3.position.x = -50

scene.add(doorH3)
const door4House = new THREE.PlaneGeometry(90,50,1,1);
// doorHouse.rotateY(21.99);


const door4houseMaterial = new THREE.MeshStandardMaterial({ map: wallsTexture,transparent:true,aoMap: wallsAmbienOcclusion, displacementMap:wallsHeight,roughnessMap:wallsRoughness,metalnessMap:wallsMetallic,normalMap:wallsNormal,displacementScale:0.1})

const doorH4 = new THREE.Mesh(door4House,door4houseMaterial)
doorH4.position.y = 25
doorH4.position.x = -60
doorH4.position.z = -100

scene.add(doorH4)


// Door mini

    
const door5House = new THREE.PlaneGeometry(30,30,1,1);
door5House.rotateY(21.99);


const door5houseMaterial = new THREE.MeshStandardMaterial({ map: wallsTexture,transparent:true,aoMap: wallsAmbienOcclusion, displacementMap:wallsHeight,roughnessMap:wallsRoughness,metalnessMap:wallsMetallic,normalMap:wallsNormal,displacementScale:0.1})

const doorH5 = new THREE.Mesh(door5House,door5houseMaterial)
doorH5.position.y = 35
doorH5.position.z = -100
// doorH5.position.x = 

scene.add(doorH5)
const door6House = new THREE.PlaneGeometry(30,30,1,1);
// doorHouse.rotateY(21.99);


const door6houseMaterial = new THREE.MeshStandardMaterial({ map: wallsTexture,transparent:true,aoMap: wallsAmbienOcclusion, displacementMap:wallsHeight,roughnessMap:wallsRoughness,metalnessMap:wallsMetallic,normalMap:wallsNormal,displacementScale:0.1})

const doorH6 = new THREE.Mesh(door6House,door6houseMaterial)
doorH6.position.y = 35
// doorH6.position.x = -60
doorH6.position.z = -100

scene.add(doorH6)



    const walls2 = new THREE.PlaneGeometry(200,50,1,1);
    walls2.rotateY(80.11);

    
    const walls2sMaterial = new THREE.MeshStandardMaterial({ map: wallsTexture,transparent:true,aoMap: wallsAmbienOcclusion, displacementMap:wallsHeight,roughnessMap:wallsRoughness,metalnessMap:wallsMetallic,normalMap:wallsNormal,displacementScale:0.1})
    const walls2s = new THREE.Mesh(walls2,walls2sMaterial)
    walls2s.position.y = 25
 
    walls2s.position.x = 100
    
    scene.add(walls2s)
    // gui.add(walls2s.position,'x').min(1).max(100).step(25)
    // gui.add(walls2s.position,'y').min(1).max(100).step(25)
    // gui.add(walls2s.position,'z').min(1).max(100).step(25)
    const wallinter1 = new THREE.PlaneGeometry(100,50,1,1);
    wallinter1.rotateY(80.11);

    
    const wallinterMaterial = new THREE.MeshStandardMaterial({ map: wallsTexture,transparent:true,aoMap: wallsAmbienOcclusion, displacementMap:wallsHeight,roughnessMap:wallsRoughness,metalnessMap:wallsMetallic,normalMap:wallsNormal,displacementScale:0.1})
    const wallinter = new THREE.Mesh(wallinter1,wallinterMaterial)
    wallinter.position.y = 25
 
    wallinter.position.x = -5
    wallinter.position.z = 50
    
    scene.add(wallinter)

    const walls3 = new THREE.PlaneGeometry(200,50,1,1);
    walls3.rotateY(-80.11);

    
    const walls3sMaterial = new THREE.MeshStandardMaterial({ map: wallsTexture,transparent:true,aoMap: wallsAmbienOcclusion, displacementMap:wallsHeight,roughnessMap:wallsRoughness,metalnessMap:wallsMetallic,normalMap:wallsNormal,displacementScale:0.1})
    const walls3s = new THREE.Mesh(walls3,walls3sMaterial)
    walls3s.position.y = 25
 
    walls3s.position.x = -100
    
    scene.add(walls3s)
    const wallinter2 = new THREE.PlaneGeometry(100,50,1,1);
    wallinter2.rotateY(-80.11);

    
    const wallinter2Material = new THREE.MeshStandardMaterial({ map: wallsTexture,transparent:true,aoMap: wallsAmbienOcclusion, displacementMap:wallsHeight,roughnessMap:wallsRoughness,metalnessMap:wallsMetallic,normalMap:wallsNormal,displacementScale:0.1})
    const wallinterr2 = new THREE.Mesh(wallinter2,wallinter2Material)
    wallinterr2.position.y = 25
 
    wallinterr2.position.x = -5
    wallinterr2.position.z = 50
    
    scene.add(wallinterr2)
    














    // Wall and simulate door in indoor and outdoor gallery
    const doorGallery = new THREE.PlaneGeometry(30,50,1,1);
    doorGallery.rotateY(21.99);

    // doorGallery.rotateX(60);
    
    const doorMaterial = new THREE.MeshStandardMaterial({map: wallsTexture,transparent:true,aoMap: wallsAmbienOcclusion, displacementMap:wallsHeight,roughnessMap:wallsRoughness,metalnessMap:wallsMetallic,normalMap:wallsNormal,displacementScale:0.1})
    const door = new THREE.Mesh(doorGallery,doorMaterial)
    door.position.y = 25
 
door.position.x = 10


    // wallinterr2.position.z = 50
    
    scene.add(door)

  
  
  
    const door2Gallery = new THREE.PlaneGeometry(31,20,1,1);
    door2Gallery.rotateY(21.99);

    // doorGallery.rotateX(60);
    
    const door2Material = new THREE.MeshStandardMaterial({map: wallsTexture,transparent:true,aoMap: wallsAmbienOcclusion, displacementMap:wallsHeight,roughnessMap:wallsRoughness,metalnessMap:wallsMetallic,normalMap:wallsNormal,displacementScale:0.1})
    const door2 = new THREE.Mesh(door2Gallery,door2Material)
    door2.position.y = 40
 
door2.position.x = 35
    
    scene.add(door2)

    const door3Gallery = new THREE.PlaneGeometry(50,50,1,1);
    door3Gallery.rotateY(21.99);

    // doorGallery.rotateX(60);
    
    const door3Material = new THREE.MeshStandardMaterial({map: wallsTexture,transparent:true,aoMap: wallsAmbienOcclusion, displacementMap:wallsHeight,roughnessMap:wallsRoughness,metalnessMap:wallsMetallic,normalMap:wallsNormal,displacementScale:0.1})
    const door3 = new THREE.Mesh(door3Gallery,door3Material)
    door3.position.y = 25
 
door3.position.x = 75
    
    scene.add(door3)


    const door4Gallery = new THREE.PlaneGeometry(50,50,1,1);
    // door4Gallery.rotateY(10w);

    // doorGallery.rotateX(60);
    
    const door4Material = new THREE.MeshStandardMaterial({map: wallsTexture,transparent:true,aoMap: wallsAmbienOcclusion, displacementMap:wallsHeight,roughnessMap:wallsRoughness,metalnessMap:wallsMetallic,normalMap:wallsNormal,displacementScale:0.1})
    const door4 = new THREE.Mesh(door4Gallery,door4Material)
    door4.position.y = 25
 
door4.position.x = 75
    
    scene.add(door4)

    const door5Gallery = new THREE.PlaneGeometry(31,20,1,1);
    // door2Gallery.rotateY(21.99);

    // doorGallery.rotateX(60);
    
    const door5Material = new THREE.MeshStandardMaterial({map: wallsTexture,transparent:true,aoMap: wallsAmbienOcclusion, displacementMap:wallsHeight,roughnessMap:wallsRoughness,metalnessMap:wallsMetallic,normalMap:wallsNormal,displacementScale:0.1})
    const door5 = new THREE.Mesh(door5Gallery,door5Material)
    door5.position.y = 40
    door5.position.x = 35

    scene.add(door5)


    const door6Gallery = new THREE.PlaneGeometry(30,50,1,1);
    // doorGallery.rotateY(21.99);

    // doorGallery.rotateX(60);
    
    const door6Material = new THREE.MeshStandardMaterial({map: wallsTexture,transparent:true,aoMap: wallsAmbienOcclusion, displacementMap:wallsHeight,roughnessMap:wallsRoughness,metalnessMap:wallsMetallic,normalMap:wallsNormal,displacementScale:0.1})
    const door6 = new THREE.Mesh(door6Gallery,door6Material)
    door6.position.y = 25
 
    door6.position.x = 10


    // wallinterr2.position.z = 50
    
    scene.add(door6)
renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio,2 );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.physicallyCorrectLights = true
    // The outputEnconding property controls the output render encoding
    // The default outputEncoding is THREE.LinearEncoding and we should use THREE.sRGBEncoding
    renderer.outputEncoding = THREE.sRGBEncoding
    // Another possible value is THREE.GamaEncoding which let us play with the gamaFactor the would act a little like the brightness, but we won't use this one
    renderer.toneMapping = THREE.LinearToneMapping
    renderer.toneMappingExposure = 1.225
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFShadowMap
    // gui.add(renderer, 'toneMapping', {
    //     No: THREE.NoToneMapping,
    //     Linear: THREE.LinearToneMapping,
    //     Reinhard: THREE.ReinhardToneMapping,
    //     Cineon: THREE.CineonToneMapping,
    //     ACESFilmic: THREE.ACESFilmicToneMapping
    // }).onFinishChange(() => {
    //     renderer.toneMapping = Number(renderer.toneMapping)
    //     updateAllMaterials()

    // })
    // gui.add(renderer,'toneMappingExposure').min(0).max(10).step(0.001)
    document.body.appendChild( renderer.domElement );

    window.addEventListener( 'resize', onWindowResize );


   

  
}
function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}
function animate() {

    requestAnimationFrame( animate );

    const time = performance.now();

    if ( controls.isLocked === true ) {

        raycaster.ray.origin.copy( controls.getObject().position );
        raycaster.ray.origin.y -= 10;

        const intersections = raycaster.intersectObjects( objects, false );

        const onObject = intersections.length > 0;

        const delta = ( time - prevTime ) / 1000;

        velocity.x -= velocity.x * 10.0 * delta;
        velocity.z -= velocity.z * 10.0 * delta;

        velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

        direction.z = Number( moveForward ) - Number( moveBackward );
        direction.x = Number( moveRight ) - Number( moveLeft );
        direction.normalize(); // this ensures consistent movements in all directions

        if ( moveForward || moveBackward ) velocity.z -= direction.z * 400.0 * delta;
        if ( moveLeft || moveRight ) velocity.x -= direction.x * 400.0 * delta;

        if ( onObject === true ) {

            velocity.y = Math.max( 0, velocity.y );

        }

        controls.moveRight( - velocity.x * delta );
        controls.moveForward( - velocity.z * delta );

        controls.getObject().position.y += ( velocity.y * delta ); // new behavior

        if ( controls.getObject().position.y < 10 ) {

            velocity.y = 0;
            controls.getObject().position.y = 10;


        }

    }

    prevTime = time;

    renderer.render( scene, camera );
}