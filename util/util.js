const Discord = require('discord.js');
const config = require("../config.json");
var index = require("../index.js");
const prefix = config.settings.prefix;
const request = require("request");

const crash = function AntiCrash(chan, err, sendToOwner = true) {
    console.log("AntiCrash:");
    console.log(err);
    var embed = new Discord.RichEmbed();
    embed.setAuthor(`${index.client.user.username} - AntiCrash`);
    embed.setDescription(err);
    embed.setColor("#FF0000");
    getUsername("324622488644616195").then(juby => {
        getUsername("321665259842830336").then(hamster => {
            if(chan != null) chan.send(`<:merror:489081457973919744> | Poinformuj nas o tym błędzie: https://discord.gg/t3xWk4X lub zgłoś to do ${juby}, ${hamster}` + "\n``" + err + "``");
        });
    });
    if(!sendToOwner) return;
    var owner = index.client.users.get(config.settings.ownerid);
    if(owner == undefined) return;
    embed.addField(err.path, err.method);
    owner.send(embed);
}

const ustawstatus = function ustawstatus(client = new Discord.Client()) {
    try{
        if (client.guilds.size == 1) {
            client.user.setPresence({ game: {name: `${prefix}help | 1 serwer`, type: 'LISTENING' }});
        } else {
            client.user.setPresence({ game: {name: `${prefix}help | ${client.guilds.size} serwerów`, type: 'LISTENING' }});
        }
    } catch(err) {}
}

const req = function req(method, url) {
    return new Promise((resolve, reject) => {
        request({
            method: method,
            url: url
        }, (error, response, body) => {
            if (error) return reject(error);
            resolve(body);
        });
    }).catch(err => console.log(err));
}

const getUsername = function getUsername(id) {
    return new Promise((resolve, reject) => {
        if(index.client.users.get(id)) {
            resolve(index.client.users.get(id).tag);
        } else {
            if (id == "324622488644616195") {
                resolve("Juby210#5831");
            } else if (id == "321665259842830336") {
                resolve("hamster#0001");
            } else {
                reject("Nie znaleziono użytkownika");
            }
        }
    }).catch(err => console.log(err));
}

const formatLength = function formatLength(ms, replace = true) {
    var h = Math.floor(ms / 1000 / 60 / 60);
    var min = Math.floor(ms / 1000 / 60 - h * 60);
    var sec = Math.floor(ms / 1000 - min * 60 - h * 60 * 60);
    
    var uh = false;
    if (!h == 0) {uh = true; if(h <= 9) {h = "0" + h;}}
    if (min <= 9) min = "0" + min;
    if (sec <= 9) sec = "0" + sec;
    var time = "";
    if(uh) {if(h >= 200) {time = "LIVE";} else {time = `${h}:${min}:${sec}`;}} else {time = `${min}:${sec}`;}
    if(replace) {
        if(time == "00:00") return "LIVE";
    }
    return time;
}

module.exports.crash = crash;
module.exports.ustawstatus = ustawstatus;
module.exports.req = req;
module.exports.getUsername = getUsername;
module.exports.formatLength = formatLength;