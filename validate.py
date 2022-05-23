import requests
import re
import sys
import os

hadSomeWarn=False
hadSomeErr=False

def validateSheets(path: str) -> None:
	print("\033[104;97m CSS \033[0m ",end="")

	with open( path , 'rb' ) as f:
		response = requests.post('https://jigsaw.w3.org/css-validator/#validate_by_upload', files={'index.html': f})

	passed = ( re.search('<div id="congrats">',response.text) != None )
	failed = ( re.search('<div id="errors">',response.text) != None )

	if failed:
		print( "\033[91m ✘ Failed for %s " % (path) )
	else:
		print( "\033[92m ✓ %s" % (path) )

def validatePages(path: str) -> None:
	print("\033[104;97m HTML \033[0m",end="")

	with open( path , 'rb' ) as f:
		response = requests.post('https://validator.w3.org/nu/#file', files={'index.html': f})

	passed = ( re.search('<p class="success">',response.text) != None )
	failed = ( re.search('<p class="failure">',response.text) != None )

	if failed:
		info = re.search('<ol.*</ol>',response.text).group(0)

		errCount = info.count('<strong>Error</strong>')
		warnCount = info.count('<strong>Warning</strong>')

		global hadSomeWarn
		global hadSomeErr
		hadSomeWarn = (warnCount > 0) or hadSomeWarn
		hadSomeErr = (errCount > 0) or hadSomeErr

		if errCount == 0:
			print( "\033[93m ⚠ Failed for %s with : " % (path) )
			print( "\033[93m %u warnings ! " % warnCount )
			print( "\033[92m 0 errors ! " )

		else:
			print( "\033[91m ✘ Failed for %s with : " % (path) )
			print( "\033[93m %u warnings ! " % warnCount )
			print( "\033[91m %u errors ! " % errCount )
			print( "\033[0m" )

		
		for thing in re.finditer('<li[^>]*>(([^<]|(<[^/])|(</[^l]))+)</li>',info):
			withoutTag = re.sub('<[^>]+>', '', thing[0] )
			withoutEntity = re.sub('(&lt;)|(&gt;)', '', withoutTag )
			withoutStrangeChar = re.sub('[^a-zA-Z0-9 :,!.-]', '',  withoutEntity )
			print( "\t" + (withoutStrangeChar if (len(withoutStrangeChar)<90) else (withoutStrangeChar[:87]+'...')) )
	else:
		print( "\033[92m ✓ %s" % (path) )


def findFiles(path: str) -> None:
	for fPath in os.listdir(path):
		fullPath=path+"/"+fPath
		if os.path.isdir(fullPath):
			findFiles(fullPath)
		else:
			if re.match('.*\.html$',fPath) != None :
				if re.match('.*assets',fullPath) == None :
					validatePages(fullPath)
			if re.match('.*\.css$',fPath) != None :
				validateSheets(fullPath)

	
findFiles('.')

if hadSomeErr:
	sys.exit(2)
if hadSomeWarn:
	sys.exit(1)
