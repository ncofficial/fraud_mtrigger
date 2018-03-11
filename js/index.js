/* Card.js plugin by Jesse Pollak. https://github.com/jessepollak/card */
$('form').card({
    container: '.card-wrapper',
    width: 280,

    formSelectors: {
        nameInput: 'input[name="first-name"], input[name="last-name"]'
    }
})

/* Main trigger script */

var mouse_changes = 0

function mouse_currentXY(e){
	$($(".body-text")[0]).text("mouse location: "+ e.clientX+"  "+ e.clientY+"  "+mouse_changes+"  "+parse_mousecheck())
	mouse_changes++
}
function parse_mousecheck(){
	let parse_state = true
	if (mouse_changes!==0){
		parse_state = false
	}
	return parse_state
}
/* Call main script */

$("document").ready(function(){
	$("body").attr("onmousemove", "mouse_currentXY(event)")
})