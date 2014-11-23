var youtubeVideoPlayer = {
    playVideo: function(youtubeId) {}
};
var eventDispatcherMock = {
    publish: function() {}
};
var dfAnimateMock = {
    enableVoting: function() {}
};
var rootScopeMock = {
    $apply: function() {}
};
var locationMock = {
    path: function() {}
};
var cookieStoreMock = {
    put: function() {},
    get: function() {}
};
var filterStub = {
    shouldPlay: function(){return true;}
};

function cookieStoreStub () {
    var videos = [];

    var get = function() {
        return videos;
    };
    var put = function (v) {
        videos = v;
    };

    return {
        get: get,
        put: put
    };
};