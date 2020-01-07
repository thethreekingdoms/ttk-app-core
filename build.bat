call npm install
call npm run build

set webserverDir=.\..\webserver\html

if exist %webserverDir% rd %webserverDir% /s/q
mkdir %webserverDir%
xcopy dist\* %webserverDir% /Y /Q /S

