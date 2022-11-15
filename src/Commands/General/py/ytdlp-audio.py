import sys
import re
import urllib.request
import argparse
from yt_dlp import YoutubeDL
from tkinter import filedialog

parser = argparse.ArgumentParser()
parser.add_argument("-url", help="url")
parser.add_argument("-format", help="format")
args = parser.parse_args()

ydl_opts = {} 
with YoutubeDL(ydl_opts) as ydl: 
  meta = ydl.extract_info(args.url, download= False)

filename = filedialog.asksaveasfilename(
  title = "名前を付けて保存",
  filetypes = [("mp3", ".mp3"),("m4a", ".m4a"),("aac", ".aac"),("ogg", ".ogg"),("webm", ".webm")],
  initialdir = "./",
  initialfile = meta['title'],
  defaultextension = "mp3"
  )
print(filename)
if filename:
  ydl_opts = {
    'format': args.format,
    'outtmpl': filename,
    }
  with YoutubeDL(ydl_opts) as ydl:
    ydl.download([args.url])
  print('finish')
else:
  print('error')