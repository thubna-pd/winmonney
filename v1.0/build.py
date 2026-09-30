# Build v1.0/index.html tự chứa: nhúng data.js vào template.
# Chạy lại sau mỗi lần sửa index.template.html hoặc data.js.
import os
SC=os.path.dirname(os.path.abspath(__file__))
R=os.path.dirname(SC)
tpl=open(os.path.join(SC,'index.template.html')).read()
data=open(os.path.join(SC,'data.js')).read()
anch=open(os.path.join(SC,'anchors.js')).read() if os.path.exists(os.path.join(SC,'anchors.js')) else 'window.ANCH={};'
assert '</script' not in data and '</script' not in anch, 'data chứa </script — phải escape'
tpl=tpl.replace('<script src="anchors.js"></script>','<script>\n'+anch+'</script>')
old='<script src="data.js"></script>'
assert old in tpl
tpl=tpl.replace(old,
  '<!-- Dữ liệu nhúng trực tiếp (nguồn: data.js) để trang chạy được cả khi mở bằng file://\n'
  '     hoặc trong preview pane không phân giải được đường dẫn tương đối. -->\n'
  '<script>\n'+data+'</script>')
open(os.path.join(SC,'index.html'),'w').write(tpl)
print('built v1.0/index.html:', os.path.getsize(os.path.join(SC,'index.html')), 'bytes')

# Prototype của flow Overview (mở tab riêng từ nút "Mở prototype"): cùng nguồn data.js + anchors.js
pt=open(os.path.join(SC,'prototype.template.html')).read()
pt=pt.replace('<script src="anchors.js"></script>','<script>\n'+anch+'</script>')
pt=pt.replace('<script src="data.js"></script>','<script>\n'+data+'</script>')
open(os.path.join(SC,'prototype.html'),'w').write(pt)
print('built v1.0/prototype.html:', os.path.getsize(os.path.join(SC,'prototype.html')), 'bytes')

# Bản "AI của dev đọc" ra file out/ai/** — sinh từ CÙNG hàm markdown của view AI (route #/__export), không chép tay
import subprocess, re, html, pathlib
CHROME=os.environ.get('CHROME','/Applications/Google Chrome.app/Contents/MacOS/Google Chrome')
dom=subprocess.run([CHROME,'--headless=new','--disable-gpu','--virtual-time-budget=5000','--dump-dom',
                    pathlib.Path(SC,'index.html').as_uri()+'#/__export'],capture_output=True,text=True).stdout
files=re.findall(r'<pre data-file="([^"$]+)">(.*?)</pre>',dom,re.S)
assert files, 'không xuất được out/ai'
out=pathlib.Path(SC,'out','ai')
for f,m in files:
    t=out/html.unescape(f); t.parent.mkdir(parents=True,exist_ok=True); t.write_text(html.unescape(m)+'\n',encoding='utf-8')
print('built out/ai:', len(files), 'files')
