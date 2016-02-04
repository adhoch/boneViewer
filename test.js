



//Round a float value to x.xx format
function roundWithTwoDecimals(value)
{
    return (Math.round(value * 100)) / 100;
}

//Handle click on any group member
function handleGroupClick(event) {
    //Mark hitting point
    $('#marker').attr('translation', event.hitPnt);
    console.log(event);

    //Display coordinates of hitting point (rounded)
    var coordinates = event.hitPnt;
    $('#xcord').html(roundWithTwoDecimals(coordinates[0]));
    $('#ycord').html(roundWithTwoDecimals(coordinates[1]));
    $('#zcord').html(roundWithTwoDecimals(coordinates[2]));
}

function test2(){console.log('test2');}