const {SlashCommandBuilder, CommandInteraction, PermissionFlagsBits} = require("discord.js");
const fs = require('fs');
const ytdl = require('ytdl-core')
const readline = require('readline')
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path
const ffmpeg = require('fluent-ffmpeg')
ffmpeg.setFfmpegPath(ffmpegPath);
const {exec}=require('child_process');

const BASE_PATH = `https://www.youtube.com/watch?v=`;

const youtubeId = `VxR_BYPG7v4`; //DLするYoutube動画のID（urlのv=の後ろの部分11桁）
const destFilePath = __dirname;

const url = BASE_PATH+youtubeId;

module.exports = {
  data: new SlashCommandBuilder()
  .setName("mp4")
  .setDescription("Download SNS-Platform videos")
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator), // only allowed for admin users
  execute(interaction){
    const video = ytdl(url, { filter: format => format.container === 'mp4', quality: 'highestvideo' })
    video.pipe(fs.createWriteStream(destFilePath + `.mp4`));
    const audio = ytdl(url, { quality: 'highestaudio' })
    audio.pipe(fs.createWriteStream(destFilePath  + `.wav`));

    const mergePath = destFilePath + `_merged.mp4`;

    //exec(`ffmpeg -y -i ${destFilePath}.mp4 -i ${destFilePath}.wav -c:v copy -c:a aac -map 0:v:0 -map 1:a:0 ${mergePath}`, (err, stdout, stderr) => {

    //  download(mergePath);
    //});
    
    //exec(`ffmpeg -y -i ${destFilePath}.mp4 -i ${destFilePath}.wav -c:v copy -c:a aac -map 0:v:0 -map 1:a:0 output.mp4`);

    interaction.reply({content: "OK", ephemeral: true}) // ephemeral means only visible for yourself
  },
};