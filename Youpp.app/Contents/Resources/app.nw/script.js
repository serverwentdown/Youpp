var youapikey = require("./apikey.js").key; // "AIzaSyD88ejeWUIVWmU7j5lhZNLyP9q3S6TFtFQ"

var gui = require('nw.gui');
var gclipboard = gui.Clipboard.get();
var gwindow = gui.Window.get();

var menubar = new gui.Menu({ type: 'menubar' });
var menuview = new gui.Menu();
// gwindow.menu.append(menuview);
var alwaysontop = false;
function togglefloating () {
	if (alwaysontop == true) {
		togglefloat.checked = false;
		alwaysontop = false;
		gwindow.setAlwaysOnTop(false);
	}
	else if (alwaysontop == false) {
		togglefloat.checked = true;
		alwaysontop = true;
		gwindow.setAlwaysOnTop(true);
	}
}
var togglefloat = new gui.MenuItem({
	label: 'Always on top    \u2318F',
	type: 'checkbox',
	click: togglefloating
});
Mousetrap.bind(['command+f', 'ctrl+f'], function() {
	togglefloating();
    return false;
});
menuview.append(togglefloat);
menubar.append(new gui.MenuItem({ label: 'View', submenu: menuview }));
gwindow.menu = menubar;

window.location.hash = "";

$("#minimize").on("click", function () {
	gwindow.minimize();
});
$("#maximize").on("click", function () {
	gwindow.maximize();
});
$("#exitbtn").on("click", function () {
	gwindow.close(); // BUG: `window.close()` not working if an `iframe` exists.
});
$(window).on('hashchange', function() {
	var hash = window.location.hash.replace("#", "");
	console.log(hash);
	if (hash.length == 11) {
		showplayer(hash);
	}
});

function populateresults(items) {
	$.each(items, function (i, vid) {
		if (vid.id.kind == "youtube#video") {
			$.get("https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=" + vid.id.videoId + "&key=" + youapikey, function (data) {
				// console.log(vid.id.videoId);
				var duration = data.items[0].contentDetails.duration;
				duration = duration.replace("S", " seconds ").replace("M", " minutes ").replace("H", " hours ").replace("PT", "");
				$("#search .resultslist").append('<li><a href="#' + vid.id.videoId + '"><div style="background-image: url(' + vid.snippet.thumbnails.medium.url + '); "></div><h3>' + vid.snippet.title + '</h3><footer><span class="time">' + duration + '</span></footer></a></li>');
			});
		}
	});
}

function getpopular() {
	$.get("https://www.googleapis.com/youtube/v3/videos?part=id,snippet,contentDetails&maxResults=50&chart=mostPopular&key=" + youapikey, function (data) {
		// console.log(data.items);
		$("#search .resultslist").html('<li id="popular">Popular</li>');
		$.each(data.items, function (i, vid) {
			var duration = vid.contentDetails.duration;
			duration = duration.replace("S", " seconds ").replace("M", " minutes ").replace("H", " hours ").replace("PT", "");
			$("#search .resultslist").append('<li><a href="#' + vid.id + '"><div style="background-image: url(' + vid.snippet.thumbnails.medium.url + '); "></div><h3>' + vid.snippet.title + '</h3><footer><span class="time">' + duration + '</span></footer></a></li>');
		});
	});
}
getpopular();

var splash = setTimeout(function () {
	$(".view").fadeOut(250);
	$("#search").fadeIn(250);
}, 4000);
$("#splash").click(function () {
	clearTimeout(splash);
	$(".view").fadeOut(250);
	$("#search").fadeIn(250);
});

function search(term) {
	if (term != "") {
		$.get("https://www.googleapis.com/youtube/v3/search?part=id,snippet&maxResults=50&q=" + term + "&key=" + youapikey, function (data) {
			// console.log(data.items);
			$("#search .resultslist").empty();
			populateresults(data.items);
		});
	}
	else {
		getpopular();
	}
}
$("#searchquery").keyup(function (e) {
	if (event.keyCode == 13) {
		search($("#searchquery").val());
	}
});
$("#searchbtn").click(function () {
	search($("#searchquery").val());
})

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
	player = new YT.Player('player', {
		height: '390',
		width: '640',
		videoId: 'M7lc1UVf-VE',
	    playerVars: { 'autoplay': 0, 'controls': 0, 'showinfo': 0 },
		events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange
		}
	});
}
function onPlayerReady(event) {
	// event.target.playVideo();
}

// var done = false;
function onPlayerStateChange(event) {
    // if (event.data == YT.PlayerState.PLAYING && !done) {
    //   setTimeout(stopVideo, 6000);
    //   done = true;
    // }
}
function stopVideo() {
	player.stopVideo();
}
function showplayer(id) {
	$("body").addClass("playback");
	// $(".view").fadeOut(250);
	$("#playerview").fadeIn(250);
	// $("#movebar").fadeOut(250);
	player.loadVideoById(id);
	// setTimeout(function () {
	// 	event.target.playVideo()
	// }, 1000);
	player.setSize(window.innerWidth, window.innerHeight);
}
function hideplayer() {
	window.location.hash = "";
	$("body").removeClass("playback");
	// $(".view").fadeOut(250);
	// $("#search").fadeIn(250);
		$("#playerview").fadeOut(250);
	// $("#movebar").fadeIn(250);
	player.stopVideo();
}
$("#back").click(function() {
	hideplayer();
});
$(window).on("resize", function () {
	player.setSize(window.innerWidth, window.innerHeight);
});

// gwindow.showDevTools();

