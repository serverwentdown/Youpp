var youapikey = require("./apikey.js").youtubekey; // "AIzaSyD88ejeWUIVWmU7j5lhZNLyP9q3S6TFtFQ"

var gui = require('nw.gui');
var gclipboard = gui.Clipboard.get();
var gwindow = gui.Window.get();

var menubar = new gui.Menu({ type: 'menubar' });
var menuview = new gui.Menu();
// gwindow.menu.append(menuview);
var alwaysontop = false;
function togglefloating () {
	if (alwaysontop == true) {
		console.info("awww not floating");
		togglefloat.checked = false;
		alwaysontop = false;
		gwindow.setAlwaysOnTop(false);
	}
	else if (alwaysontop == false) {
		console.info("yay floating");
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
Mousetrap.bindGlobal(['command+f', 'ctrl+f'], function() {
	togglefloating();
    return false;
});
// Check out line 123 onYouTubeIframeAPIReady()
Mousetrap.bindGlobal(['command+d', 'ctrl+d'], function() {
	gwindow.showDevTools();
    return false;
});
menuview.append(togglefloat);
menubar.append(new gui.MenuItem({ label: 'View', submenu: menuview }));
gwindow.menu = menubar;
gwindow.on("new-win-policy", function (frame, url, policy) {
	if (url.indexOf("youtube") >= 0) {
		gui.Shell.openExternal(url);
	}
	policy.ignore();
});
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
	console.info(hash);
	if (hash.length == 11) {
		try {
			showplayer(hash);
		}
		catch (e) {
			console.error("oops. not loaded.");
		}
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
	}).fail(function (error) {
		console.error(error);
		$("#search .resultslist").html('<li id="popular">Unable to get(); Check your connection. </li>');
		setTimeout(function () {
			getpopular();
		}, 8000);
	});
}
getpopular();

var splash = setTimeout(function () {
	$(".view").fadeOut(250);
	$("#search").fadeIn(250);
	console.info("YouTube API not Ready yet. ");
}, 5000);
// $("#splash").click(function () {
// 	clearTimeout(splash);
// 	$(".view").fadeOut(250);
// 	$("#search").fadeIn(250);
// });

function search(term) {
	if (term != "") {
		$.get("https://www.googleapis.com/youtube/v3/search?part=id,snippet&maxResults=50&q=" + term + "&key=" + youapikey, function (data) {
			// console.log(data.items);
			$("#search .resultslist").empty();
			populateresults(data.items);
		}).fail(function (error) {
			console.error(error);
			$("#search .resultslist").html('<li id="popular">Unable to get(); Check your connection. </li>');
			setTimeout(function () {
				search(term);
			}, 8000);
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
});

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
var currentvideoid = "8tPnX7OPo0Q";
function onYouTubeIframeAPIReady() {
	player = new YT.Player('player', {
		height: '390',
		width: '640',
		videoId: '8tPnX7OPo0Q',
	    playerVars: {
	    	'autoplay': 1,
	    	'controls': 0,
	    	'showinfo': 0
	    },
		events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange,
		}
	});
	// player.addEventListener("keyup", function (e) {
	//     e.mousetrap = true;
	//     Mousetrap.handleKeyEvent(e);
	// });
}
function onPlayerReady(event) {

	if (splash) {
		clearTimeout(splash);
		$(".view").fadeOut(250);
		$("#search").fadeIn(250);
		splash = null;
	}
	else if (!splash) {
		console.error("Something's gone wrong with the YouTube API! Multiple onReady events. ");
	}

	setTimeout(function () {
		player.loadVideoById(currentvideoid);
		event.target.playVideo();
		// setTimeout(function () {
		// 	event.target.stopVideo();
		// }, 100);
	}, 100);
	console.info("Ready!");
	// window.location.hash = "";
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

var kbdeventhelper;

function showplayer(id) {
	$("body").addClass("playback");
	player.setSize(window.innerWidth, window.innerHeight);
	currentvideoid = id;
	setTimeout(function () {
		try {
			player.loadVideoById(id);
		}
		catch (e) {
			console.error(e);
		}
	}, 50);
	// $(".view").fadeOut(250);
	$("#playerview").fadeIn(250);
	// $("#movebar").fadeOut(250);
	// setTimeout(function () {
	// // player.stopVideo();
	// 	try {
	// 		player.playVideo();
	// 	}
	// 	catch (e) {
	// 		console.error(e);
	// 	}
	// }, 100);
	// setTimeout(function () {
	// 	event.target.playVideo()
	// }, 1000);

	kbdeventhelper = setInterval(function () {
		if (document.activeElement != document.getElementById("kbdeventhelper")) {
			document.getElementById("kbdeventhelper").focus();
		}
	}, 200);
}
function hideplayer() {
	window.location.hash = "";
	$("body").removeClass("playback");
	// $(".view").fadeOut(250);
	// $("#search").fadeIn(250);
	$("#playerview").fadeOut(250);
	// $("#movebar").fadeIn(250);
	player.stopVideo();

	clearInterval(kbdeventhelper);
}
$("#back").click(function() {
	hideplayer();
});
$(window).on("resize", function () {
	player.setSize(window.innerWidth, window.innerHeight);
});