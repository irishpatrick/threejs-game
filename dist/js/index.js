let THREE = require("three");
let Stats = require("stats.js")
var Tree = require("./tree.js");
var Terrain = require("./terrain.js");

var camera, scene, renderer;
var test;
var terr;

var ambient;
var directional;

var stats;

window.onresize = function(e)
{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

var now, then, delta;

function init() {
    camera = new THREE.PerspectiveCamera(
        90, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    stats = new Stats();
    stats.showPanel(0) // fps
    document.body.appendChild(stats.dom);
}

function create_world() {
    scene = new THREE.Scene();

    // lights
    ambient = new THREE.AmbientLight(0x404040);
    scene.add(ambient);

    point = new THREE.PointLight(0xffffff, 1, 100);
    point.position.y = 10;
    let helper = new THREE.PointLightHelper(point, 1);
    scene.add(point);
    scene.add(helper);

    camera.position.x = 2;
    camera.position.y = 20;
    camera.position.z = 40;

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
