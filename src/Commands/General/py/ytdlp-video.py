import sys
import re
import urllib.request
from yt_dlp import YoutubeDL
from tkinter import filedialog

url = sys.stdin.readline()

#title取得
ydl_opts = {} 
with YoutubeDL(ydl_opts) as ydl: 
  meta = ydl.extract_info(url, download= False)

filename = filedialog.asksaveasfilename(
  title = "名前を付けて保存",
  filetypes = [("mp4", ".mp4"),("webm", ".webm"),("flv", ".flv")],
  initialdir = "./",
  initialfile = meta['title'],
  defaultextension = "mp4"
  )
if filename:
  ydl_opts = {
    'format': 'best',
    'outtmpl': filename,
    }
  with YoutubeDL(ydl_opts) as ydl:
    ydl.download([url])
  print('finish')
else:
  print('error')