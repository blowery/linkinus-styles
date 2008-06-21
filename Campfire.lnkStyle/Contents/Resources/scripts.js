// Complete listing of all emoticons used in appendMessage()
function images(chat) {
  /*
	// chat = chat.replace(/:d/ig,"<img src='emoticons/Angry Face.png' />");
	chat = chat.replace(/:@|:-@/ig,"<img src='emoticons/VeryAngry.png' />");
	// chat = chat.replace(//ig,"<img src='emoticons/Angel.png' />");
	chat = chat.replace(/:-\[|:\[/ig,"<img src='emoticons/Blush.png' />");
	chat = chat.replace(/:s|:-s/ig,"<img src='emoticons/Confused.png' />");
	chat = chat.replace(/:'\(/ig,"<img src='emoticons/Crying.png' />");
	chat = chat.replace(/:!|:-!/ig,"<img src='emoticons/Foot In Mouth.png' />");
	chat = chat.replace(/:\(|:-\(/ig,"<img src='emoticons/Frown.png' />");
	chat = chat.replace(/:o|=o|:-o/g,"<img src='emoticons/Gasp.png' />");
	chat = chat.replace(/:O|=O|:-O/g,"<img src='emoticons/LargeGasp.png' />");
	chat = chat.replace(/:-D|:D/ig,"<img src='emoticons/Grin.png' />");
	chat = chat.replace(/O:-\)|O:\)/ig,"<img src='emoticons/Halo.png' />");
	chat = chat.replace(/\(L\)|&lt;3/ig,"<img src='emoticons/Heart.png' />");
	chat = chat.replace(/8-\)|8\)|\(H\)/ig,"<img src='emoticons/Hot.png' />");
	chat = chat.replace(/:-\*|:\*|\(K\)/ig,"<img src='emoticons/Kiss.png' />");
	// chat = chat.replace(/:-\'\(/ig,"<img src='emoticons/Lips are Sealed.png' />");
	// chat = chat.replace(/:$|$\)|:-$|$-\)/ig,"<img src='emoticons/Money-mouth.png' />");
	chat = chat.replace(/\(SARC\)|^\)/ig,"<img src='emoticons/Sarcastic.png' />");
	chat = chat.replace(/D:/ig,"<img src='emoticons/ohnoes.png' />");
	// chat = chat.replace(/:-\)/ig,"<img src='emoticons/Sick.png' />");
	chat = chat.replace(/:-\)|:\)/ig,"<img src='emoticons/Smile.png' />");
	chat = chat.replace(/:-p|:p/ig,"<img src='emoticons/Sticking Out Tongue.png' />");
	// chat = chat.replace(/P-[/ig,"<img src='emoticons/Pirate.png' />");
	// chat = chat.replace(/:\|:\/|:-\|:-\//ig,"<img src='emoticons/Undecided.png' />");
	chat = chat.replace(/\(N\)/ig,"<img src='emoticons/Thumbs Down.png' />");
	chat = chat.replace(/\(Y\)/ig,"<img src='emoticons/Thumbs Up.png' />");
	chat = chat.replace(/;\)|;-\)/ig,"<img src='emoticons/Wink.png' />");
	*/
	// Image link replacement
	imageStr = /http:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/]*)+\.(?:gif|jpg|jpeg|png|bmp)/ig;
	chat = chat.replace(imageStr, "<a href='\$0' alt='\$0'><img src='\$0' /></a>");
	// Audio link replacement
	audioStr = /http:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/]*)+\.(?:mp3|m4a|wav|aiff)/ig;
	chat = chat.replace(audioStr, "<embed src='\$0' width='200' height='16' autoplay='false'><br /><a href='\$0'>Link</a>");
	return chat;
}

//Appending new content to the message view
function appendMessage(html, section) {
	shouldScroll = nearBottom();

	//Append the new message to the bottom of our chat block
	chat = document.getElementById(section);
	range = document.createRange();
	range.selectNode(chat);
	documentFragment = range.createContextualFragment(images(html));
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

