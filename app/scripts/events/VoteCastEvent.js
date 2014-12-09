/* exported VoteCastEvent */
'use strict';

/**
 * Event indicating that vote has been cast.
 *
 * @param videoId  Id of the video voted on.
 * @param voteType Type of the vote.
 *
 * @constructor
 */
function VoteCastEvent(videoId, voteType){
    this.name = 'voteCast';
    this.videoId = videoId;
    this.voteType = voteType;
}