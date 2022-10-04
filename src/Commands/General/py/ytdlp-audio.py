import sys
import re
import urllib.request
from yt_dlp import YoutubeDL
from tkinter import filedialog

url = sys.stdin.readline()
print('audio-URL : ' + url)

#title取得
ydl_opts = {} 
with YoutubeDL(ydl_opts) as ydl: 
  meta = ydl.extract_info(url, download= False)

filename = filedialog.asksaveasfilename(
  title = "名前を付けて保存",
  filetypes = [("mp3", ".mp3"),("aac", ".aac"),("wav", ".wav"),("m4a", ".m4a")],
  initialdir = "./",
  initialfile = meta['title'],
  defaultextension = "mp3"
  )
print(filename)
if filename:
  ydl_opts = {
    'format': 'bestaudio/best',
    'outtmpl': filename,
    }
  with YoutubeDL(ydl_opts) as ydl:
    ydl.download([url])
  print('finish')
else:
  print('error')