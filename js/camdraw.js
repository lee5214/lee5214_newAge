
var camera, scene, renderer;
var texture_placeholder,
    isUserInteracting = false,
    onMouseDownMouseX = 0, onMouseDownMouseY = 0,
    lon = 90, onMouseDownLon = 0,
    lat = 0, onMouseDownLat = 0,
    phi = 0, theta = 0,
    target = new THREE.Vector3();

init();
animate();

function init() {

    var container, mesh;

    container = document.getElementById( 'bg_canvas' );

    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 300 );
    scene = new THREE.Scene();

    texture_placeholder = document.createElement( 'canvas' );
    texture_placeholder.width = window.innerWidth;
    texture_placeholder.height = window.innerHeight;

    var context = texture_placeholder.getContext( '2d' );
    context.fillStyle = 'rgb( 0, 0, 0 )';
    context.fillRect( 0, 0, texture_placeholder.width, texture_placeholder.height );

    var materials = [
        loadTexture( 'textures/2/wheat_cube_r16_right.jpg' ), // right
        loadTexture( 'textures/2/wheat_cube_r16_left.jpg' ), // left
        loadTexture( 'textures/2/wheat_cube_r16_top.jpg' ), // top
        loadTexture( 'textures/2/wheat_cube_r16_bottom.jpg' ), // bottom
        loadTexture( 'textures/2/wheat_cube_r16_city.jpg' ), // back
        loadTexture( 'textures/2/wheat_cube_r16_back.jpg' ) // front

    ];

    mesh = new THREE.Mesh( new THREE.BoxGeometry( 300, 300, 300, 7, 7, 7 ), new THREE.MultiMaterial( materials ) );
    mesh.scale.x = - 1;
    scene.add( mesh );

    renderer = new THREE.CanvasRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );
    //document.addEventListener( 'mousedown', onDocumentMouseDown, false );
    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    document.addEventListener( 'mouseup', onDocumentMouseUp, false );
    /*document.addEventListener( 'mousewheel', onDocumentMouseWheel, false );*/
    document.addEventListener( 'touchstart', onDocumentTouchStart, false );
    document.addEventListener( 'touchmove', onDocumentTouchMove, false );

    window.addEventListener( 'resize', onWindowResize, false );

}
function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function loadTexture( path ) {

    var texture = new THREE.Texture( texture_placeholder );
    var material = new THREE.MeshBasicMaterial( { map: texture, overdraw: 0.5 } );

    var image = new Image();
    image.onload = function () {

        texture.image = this;
        texture.needsUpdate = true;

    };
    image.src = path;
    return material;

}

function onDocumentMouseDown( event ) {
    event.preventDefault();
    isUserInteracting = true;
    onPointerDownPointerX = event.clientX;
    onPointerDownPointerY = event.clientY;
    onPointerDownLon = lon;
    onPointerDownLat = lat;

}

function onDocumentMouseMove( event ) {

    if ( isUserInteracting === true ) {

        lon = ( onPointerDownPointerX - event.clientX ) * 0.1 + onPointerDownLon;
        lat = ( event.clientY - onPointerDownPointerY ) * 0.1 + onPointerDownLat;

    }

}

function onDocumentMouseUp( event ) {

    isUserInteracting = false;

}

function onDocumentMouseWheel( event ) {
    isUserInteracting = false;
    /*camera.fov -= event.wheelDeltaY * 0.05;
     camera.updateProjectionMatrix();*/

}


function onDocumentTouchStart( event ) {

    if ( event.touches.length == 1 ) {

        event.preventDefault();

        onPointerDownPointerX = event.touches[ 0 ].pageX;
        onPointerDownPointerY = event.touches[ 0 ].pageY;

        onPointerDownLon = lon;
        onPointerDownLat = lat;

    }

}

function onDocumentTouchMove( event ) {

    if ( event.touches.length == 1 ) {

        event.preventDefault();

        lon = ( onPointerDownPointerX - event.touches[0].pageX ) * 0.1 + onPointerDownLon;
        lat = ( event.touches[0].pageY - onPointerDownPointerY ) * 0.1 + onPointerDownLat;

    }

}

function animate() {

    requestAnimationFrame( animate );
    update();

}

function update() {

    if ( isUserInteracting === false ) {

        lon += 0.1;
    }

    lat = Math.max( - 85, Math.min( 85, lat ) );
    phi = THREE.Math.degToRad( 90 - lat );
    theta = THREE.Math.degToRad( lon );

    target.x = 100 * Math.sin( phi ) * Math.cos( theta ); //500 500 500
    target.y = 4 * Math.cos( phi );
    target.z = 100 * Math.sin( phi ) * Math.sin( theta );

    camera.lookAt( target );

    renderer.render( scene, camera );

}
