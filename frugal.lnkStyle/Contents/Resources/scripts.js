//Appending new content to the message view
function appendMessage(html, section) {
	shouldScroll = nearBottom();

	//Append the new message to the bottom of our chat block
	chat = document.getElementById(section);
	range = document.createRange();
	range.selectNode(chat);
	documentFragment = range.createContextualFragment(html);
	chat.appendChild(documentFragment);
	
	if (shouldScroll) scrollToBottom();
	
	return shouldScroll;
}

function deleteFirstMessage() {	
	//Append the new message to the bottom of our chat block
	chat = document.getElementById("pastcontent");
	if (chat.hasChildNodes()) chat.removeChild( chat.firstChild() );
	else
	{
		chat = document.getElementById("content");
		if (chat.hasChildNodes()) chat.removeChild( chat.firstChild() );
	}
}

//Auto-scroll to bottom.  Use nearBottom to determine if a scrollToBottom is desired.
function nearBottom() {
	return ( document.body.scrollTop >= ( document.body.offsetHeight - ( window.innerHeight * 1.2 ) ) );
}
function scrollToBottom() {
	document.body.scrollTop = document.body.offsetHeight;
}

//Dynamically exchange the active stylesheet
function setStylesheet( id, url ) {
	code = "<style id=\"" + id + "\" type=\"text/css\" media=\"screen,print\">";
	if( url.length ) code += "@import url( \"" + url + "\" );";
	code += "</style>";
	range = document.createRange();
	head = document.getElementsByTagName( "head" ).item(0);
	range.selectNode( head );
	documentFragment = range.createContextualFragment( code );
	head.removeChild( document.getElementById( id ) );
	head.appendChild( documentFragment );
}

function windowDidResize() {
	scrollToBottom();
}

window.onresize = windowDidResize;