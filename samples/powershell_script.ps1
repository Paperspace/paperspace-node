# Log some output
get-date | out-file C:/Windows/Temp/my_script_output.txt

# Set a global (machine-wide) environment variable
[Environment]::SetEnvironmentVariable('MY_TEST_VAR', 'my value', 'Machine')
