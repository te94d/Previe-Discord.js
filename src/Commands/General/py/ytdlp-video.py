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
  filetypes = [("mp4", ".mp4"),("webm", ".webm"),("flv", ".flv")],
  initialdir = "./",
  initialfile = meta['title'],
  defaultextension = "mp4"
  )
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