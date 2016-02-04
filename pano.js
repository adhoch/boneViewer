$(window).bind("load", function(){
inlineX3d=document.getElementById('x3dFile');
console.log(inlineX3d._x3domNode.getVolume());
vol=inlineX3d._x3domNode.getVolume();
ran=0;
console.log(vol.max.x);
console.log(vol.min.x);

function translateCheck(){
if(vol.max.x==0 && vol.min.x==0){
console.log('test');

setTimeout(translateStart,500);
}
}

function translateStart(){
console.log('translateStart');
xtrans=-1*vol.getCenter().x;
ytrans=-1*vol.getCenter().y;
ztrans=-1*vol.getCenter().z;
document.getElementById('testtrans').setAttribute('translation', xtrans+" "+ytrans+" "+ztrans);
document.getElementById('start').setAttribute('position', '0 0 '+(vol.max.z-vol.min.z)*2.5);
translateCheck();    
}


translateCheck();
translateStart();
}

);

/* Front end x3d panorama javascript
 *  
 * 1. Button/Fullscreen functions
 *  a. Fullscreen exit detection
 *  b. Fullscreen button change
 *  c. Fullscreen button toggle
 *  d. Move left
 *  e. Move right
 *  f. Move up
 *  g. Move down
 *  h. Zoom
 * 2. Overlays
 *  a. Raw HTML overlays
 *  b. Omeka overlay
 * 
 */




//***1. Button/fullscreen functions



//****** 1a. Fullscreen exit detection
    //Listen for a change in full screen status
    document.addEventListener('webkitfullscreenchange', changeHandler, false);
    document.addEventListener('mozfullscreenchange', changeHandler, false);
    document.addEventListener('fullscreenchange', changeHandler, false);
    document.addEventListener('MSFullscreenChange', changeHandler, false);
    
    
//****** 1b. Fullscreen exit detection   
    //Runs when there's a change in full screen status however accomplished (ie keyboard or button)
    function changeHandler() {
        //sets the element to change the text of
        button = document.getElementById("fullscreen")
        //If the document is full screen changes the button text
        if (document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement != null) {
            button.innerHTML = "Unzoom";
            }
            //if the button isn't full screen changes the button text 
            else {
            button.innerHTML = "Full Screen";
        }
    }

//******* 1c. Fullscreen button toggle    
    //Full screen function. Also contains command to exit full screen
    function fullscreen(button) {
        //get the x3d node
        x3dcontext = document.getElementById('x3dcontext');
        // Check if in full screen
        if (document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement != null) {
            // Exits full screen in all browsers
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
     
     // if not in full screen
        } else {
            // Puts in full screen in all browsers
            if (x3dcontext.requestFullscreen) {
                x3dcontext.requestFullscreen();
            } else if (x3dcontext.mozRequestFullScreen) {
                x3dcontext.mozRequestFullScreen();
            } else if (x3dcontext.webkitRequestFullScreen) {
                x3dcontext.webkitRequestFullScreen();
            } else if (x3dcontext.msRequestFullscreen) {
                x3dcontext.msRequestFullscreen();
            }
        }
    }
    

//******** 1d. Move left
    //Move left -- takes distance to move as argument
    function left(move) {
        // Sets x as the x camera's rotation
        x = $('#xcamera').attr('rotation')
        // Changes from string to 4 numbers
        x=x.split(/[\s,]+/).map(Number);
        // Adds the movement left to the current rotation of the sphere
        x[3] = x[3] + move;
        // Assigns the movement to the x axis
        x[1] = 1;
        // Moves the x camera
        $('#xcamera').attr('rotation', x);
        
    }
    
//******** 1e. Move right    
    //Move right -- takes distance to move as argument
    function right(move) {
    // Sets x as the x camera's rotation
        x = $('#xcamera').attr('rotation')
        // Changes from string to 4 numbers
        x=x.split(/[\s,]+/).map(Number);
        // Subtracts the movement right to the current rotation of the sphere
        x[3] = x[3] - move;
        // Assigns the movement to the x axis
        x[1] = 1;
        // Moves the camera
        $('#xcamera').attr('rotation', x);    
    }


//******** 1f. Move up
    //Move up -- takes distance to move as argument
    function up(move) {
        // Sets y as the y camera's rotation
        y = $('#ycamera').attr('rotation')
        // Changes from a string to 4 numbers
        y=y.split(/[\s,]+/).map(Number);
        // Adds the movement up to the current rotation of the sphere
        y[3] = y[3] + move;
        // Assigns the movement to the y axis
        y[0] = 1;
        // Moves the camera
        $('#ycamera').attr('rotation', y);    
    }
    
    
//******** 1g. Move down
    //Move down -- takes distance to move as argument
    function down(move) {
        // Sets y as the y camera's rotation 
        y = $('#ycamera').attr('rotation')
        console.log(y);
        // Changes from a string to 4 numbers
        y=y.split(/[\s,]+/).map(Number);
        console.log(y);
        // Subtracts the movement down to the current rotation of the sphere
        y[3] = y[3] - move;
        // Assigns the movement to the y axis
        y[0] = 1;
        // Moves the camera
        $('#ycamera').attr('rotation', y);
        console.log($('#ycamera').attr('rotation'));
        
    }
    
    
//******** 1h. Zoom    
    // Creates the zoom function
    function zoom (delta) {
        // id of the <x3d> element in the html
        var x3d = document.getElementById('x3dcontext');
        // for this to work viewpoint needs to be in html not associated x3d file
        var vpt = x3d.getElementsByTagName("viewpoint")[0];
        
        // checks to see if zoomed in too close
        if (parseFloat(vpt.fieldOfView) + delta < .1) {
            alert("Zoom in limit reached");
            vpt.fieldOfView = .1;
            // checks to see if zoomed out too much
        } else if (parseFloat(vpt.fieldOfView + delta) > 1.3) {
            alert("Zoom out limit reached");
            vpt.fieldOfView = 1.3;
        } else {
            vpt.fieldOfView = parseFloat(vpt.fieldOfView) + delta;
        }
    }
