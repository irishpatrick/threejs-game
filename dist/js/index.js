//let THREE = require("three");
let THREE = require("three");
let Stats = require("stats.js")
let Tree = require("./tree.js");
let Terrain = require("./terrain.js");
let FirstPersonCamera = require("./firstpersoncamera.js");
let keycodes = require("keycodes");

var camera, scene, renderer;
var fpc;
var test;
var terr;

var ambient;
var directional;

var stats;

var keys = {};

// callbacks

window.onresize = function(e)
{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onkeydown(e) {
    keys[e.keyCode] = true;
}

function onkeyup(e) {
    delete keys[e.keyCode];
}

var now, then, delta;

function init() {
    camera = new THREE.PerspectiveCamera(
        70, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    let canvas = renderer.domElement;

    canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock;
    document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock;

    canvas.onclick = function() {
        canvas.requestPointerLock();
    }

    fpc = new FirstPersonCamera(camera);

    let pointerlockchange = function() {
        if (document.pointerLockElement === canvas || document.mozPointerLockElement === canvas) {
            fpc.enabled = true;

        } else {
            fpc.enabled = false;
        }
    };

    document.addEventListener("pointerlockchange", pointerlockchange, false);
    document.addEventListener("mozpointerlockchange", pointerlockchange, false);

    document.addEventListener("keydown", onkeydown, false);
    document.addEventListener("keyup", onkeyup, false);

    stats = new Stats();
    stats.showPanel(0) // fps
    document.body.appendChild(stats.dom);
}

function create_world() {
    scene = new THREE.Scene();

    fpc.initPointerLock();
    scene.add(fpc.getObject());

    // lights
    ambient = new THREE.AmbientLight(0x404040);
    scene.add(ambient);

    point = new THREE.PointLight(0xffffff, 1, 100);
    point.position.y = 10;
    let helper = new THREE.PointLightHelper(point, 1);
    scene.add(point);
    scene.add(helper);

    fpc.getObject().position.x = 2;
    fpc.getObject().position.y = 20;
    fpc.getObject().position.z = 40;

    test = new Tree(2);
    //test.getObject().position.y = -1;
    test.getObject().position.z = -2;
    scene.add(test.getObject());

    //camera.lookAt(test.getObject().position);

    terr = new Terrain("testterrain.json");
    scene.add(terr.getMesh());

    camera.lookAt(terr.getMesh().position);
}

function update(delta) {
    if (keycodes("escape") in keys)
    {
        document.exitPointerLock();
    }

    let w = keycodes("w") in keys;
    let s = keycodes("s") in keys;
    let a = keycodes("a") in keys;
    let d = keycodes("d") in keys;

    let obj = fpc.getObject();

    if (w) {
        obj.translateZ(-20 * delta);
    }
    if (s) {
        obj.translateZ(20 * delta);
    }
    if (a) {
        obj.translateX(-20 * delta);
    }
    if (d) {
        obj.translateX(20 * delta);
    }
}

function animate() {
    stats.begin();

    now = Date.now();
    delta = now - then;
    then = now;

    requestAnimationFrame( animate );

    update(delta/1000.0);

    renderer.render( scene, camera );

    stats.end();
}

init();
create_world();

then = Date.now();
animate();
