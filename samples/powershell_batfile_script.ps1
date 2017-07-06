$str = @'

rem my windows batch file
date /t > C:\Windows\Temp\batfile_output.txt
time /t >> C:\Windows\Temp\batfile_output.txt

'@
$tmp = New-TemporaryFile
$batfile = $tmp.fullname.replace('.tmp','.bat')
rename-item $tmp.fullname $batfile
$str | out-file $batfile -encoding ascii
cmd.exe /c $batfile
remove-item $batfile -force
