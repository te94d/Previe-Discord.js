import re
import urllib.request
from yt_dlp import YoutubeDL
from tkinter import filedialog
import sys
url = sys.stdin.readline()  #標準入力からデータを取得する
print('URL : ' + url)

if check_url(url)[0] == True:
  meta = video_meta(url)
  filename = filedialog.asksaveasfilename(
    title = "名前を付けて保存",
    filetypes = [("mp4", ".mp4"),("webm", ".webm"),("flv", ".flv")], # ファイルフィルタ
    initialdir = "./", # ディレクトリ
    initialfile = meta['title'], # title
    defaultextension = "mp4"
    )
  print(filename)
  if filename:
    ydl_opts = {
      'format': 'best',
      'outtmpl': filename,
      }
    with YoutubeDL(ydl_opts) as ydl:
      ydl.download([url])
else:
  err = 1
  return err

# urlチェック関数
def check_url(url):
  flag = []
  if re.match(r"^https?:\/\/", url):
    try:
      f = urllib.request.urlopen(url)
      f.close()
      if ("youtube" in url) or ("youtu.be" in url):
        flag = [True, 1]
      elif ("twitter" in url):
        flag = [True, 2]
      else:
        flag = [False]
    except urllib.request.HTTPError:
      flag = [False]
    return flag
  else:
    flag = [False]
    return flag

# video meta
def video_meta(url):
  ydl_opts = {} 
  with YoutubeDL(ydl_opts) as ydl: 
    meta = ydl.extract_info(url, download= False) 
    return meta