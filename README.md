# Previe-Discord.js
[Previe-Discord.py](https://github.com/te94d/Previe-Discord.py) のリファクタリング版
### Previeって？  
Preserve + Video = Previe（プレビィー）  
SNSプラットフォームの動画をローカルに保存してくれるBot
## 開発環境
![](https://img.shields.io/badge/Node.js-v18.9.0-blue)
![](https://img.shields.io/badge/discord.js-v14.3.0-blue)
![](https://img.shields.io/badge/ytdl--core-v4.11.2-blue)
![](https://img.shields.io/badge/python-v3.10.6-blue)
![](https://img.shields.io/badge/yt--dlp-v2022.8.8-blue)  
## ビルド
[Node.js](https://nodejs.org/ja/) をインストール  
[python3](https://www.python.org/) をインストール
### package.jsonの作成
作成するディレクトリに移動し下記コマンドを実行する。
```
$ npm init
```
### パッケージのインストール
```
$ npm install discord.js
$ npm install discord.js @discordjs/rest discord-api-types
$ npm install fs
$ npm install ascii-table
$ npm install -g nodemon //管理者権限で実行
$ npm install mongoose
$ npm install ytdl-core
$ npm install python-shell
```
```
$ pip install yt-dlp
```
ytdl-coreを使用して実装を考えていたが、[node-ytdl-core](https://github.com/fent/node-ytdl-core) のREADMEに
>1080p以上の動画にはオーディオが入っていないため、フルHDかつ音声付きの動画をダウンロードするには、動画と音声を個別にそれぞれダウンロードし、ffmpegでマージする必要がある。  

上記の記載があったので、今回は動画の情報を取得する際には[node-ytdl-core](https://github.com/fent/node-ytdl-core) を使用し
動画をダウンロードする際はNode.jsでpythonを呼び出して[yt-dlp](https://github.com/yt-dlp/yt-dlp) を使用した。  
`config.json`ファイルを作成し`config.sample.json`の中身を記述する。
```
{
  "discord_token" : "<token>",
  "mongodb" : "<token>"
}
```
TOKEN | [Discord Developer](https://discord.com/developers/applications/) | [MongoDB](https://www.mongodb.com/) |
### 実行
```
$ node src/index.js
```
開発するときはnodemonを用いることでコード変更時に自動でサーバ再起することが可能
```
$ nodemon src/index.js
```