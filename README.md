# Previe-Discord.js
[Previe-Discord.py](https://github.com/te94d/Previe-Discord.py) のリファクタリング版
### Previeって？  
Preserve + Movie = Previe（プレビィー）  
SNSプラットフォームの動画をローカルに保存してくれるBot
## 開発環境
![](https://img.shields.io/badge/Node.js-v18.9.0-blue)
![](https://img.shields.io/badge/discord.js-v14.3.0-blue)
![](https://img.shields.io/badge/ytdl--core-v-blue) 
## ビルド
[Node.js](https://nodejs.org/ja/) をインストール
### package.jsonの作成
作成するディレクトリに移動し下記コマンドを実行する。
```
$ npm init
```
### パッケージのインストール
```
$ npm install discord.js
$ npm install discord.js @discordjs/rest discord-api-types
$ npm install dotenv
```
[ffmpeg](https://ffmpeg.org/) にアクセスしwindowsビルドのものをダウンロードする。  
ダウンロードしたファイルを解凍し、binフォルダの中にある`ffmpeg.exe`を`ytdl.py`と同じ階層に置いておく。  
`.env`ファイルを作成し`.env.sample`の中身を記述する。
```
discord_token = <token>
```