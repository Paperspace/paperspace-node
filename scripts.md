# Script Guide

A brief guide on the use of Paperspace startup scripts

### Overview

Paperspace can run a script automatically on the startup of a paperspace virtual machine.
This feature is similar to `user_data` in other cloud provider frameworks.

### A note on security

The running of scripts automatically can be a path for malware to get access to your machine.
Make sure your account and paperspace apiKey are kept secure, and review your scripts closely to make sure the software you are running is safe.  Paperspace supports two-factor authentication for securing your paperspace account info.  This can add an extra level of security to you account to help keep your apiKeys, scripts, and script assignments secure.

Paperspace stores scripts within a secure area associated with your account, and encrypts and protects  scripts while they are being downloaded to machines during startup.  Scripts cannot be modified once uploaded to paperspace, however a new script can be defined and assigned to a machine using your apiKey.  Hence the importance of keeping your apiKey and account secure.

### Creating a script

Scripts can be defined with a string value or by uploading a file.  You can optionally specify an existing machine that will run the script during the machine's next boot.  See the [scripts create](https://paperspace.github.io/paperspace-node/scripts.html#.create) docs for info on creating and uploading a new script.

Alternatively, when creating a new machine, you can specify an existing script to be used during startup of the machine.  See the [machines create](https://paperspace.github.io/paperspace-node/machines.html#.create) docs for info on specifying an existing script to be used by a new machine.

Note: in the Paperspace API v.1.2.0 release, if you want to change the script assigned to an existing machine you need to create a new script and assign the new script to the machine as part of the [scripts create](https://paperspace.github.io/paperspace-node/scripts.html#.create) call.  (We plan to remove this limitation in a future release.)

### Script options

Scripts are designed to be run during the startup of a machine.  You can optionally specify that the script should only be run once, through the [scripts create](https://paperspace.github.io/paperspace-node/scripts.html#.create) `runOnce` property.  A script name and script description field are also provided.  Use the script description field to make a note of the original script source file name, or other identifying info.  There is also a field to set the script as `isEnabled` (which defaults to true).  You can explicitly set `isEnabled` to false to test script creation without actually activating a script to run automatically.

Note: in the Paperspace API v.1.2.0 release, the `isEnabled` property cannot be changed after script creation.  (We plan to remove this limitation in a future release. For now you can just re-create a script with `isEnabled` set to true to get the same effect.)

### Scripts for Linux machines

For Linux machines startup scripts are piped to `bash` during the machine init process, after the Linux networking stack has been initialized.  Scripts are run with root privileges.

The machine attempts to download the script from the paperspace metadata service only once per boot.  Internally the paperspace infrastructure makes sure the script can only be downloaded by the virtual machine assigned to the script.

If the script's `runOnce` property is set to true the script will only be piped to `bash` during the first boot of the machine.  The paperspace infrastructure records whether the script was retrieved or not, and will not allow the script to be retrieved again if the `runOnce` property was set.

The output of the startup script on Linux gets logged to `/var/log/startup-script-output.log`. Be careful about including sensitive information in the script or its output. If you need to clean up this log file after the script runs you can schedule a cron job to do so.  (In the future we may make script logging optional to enhance security.)

If your script is set up to run on every boot, you can download the script from a terminal window within the machine after logging in, using the following command:

`curl https://metadata.paperspace.com/script`

If you are using an existing vm or template and would like to take advantage of the startup script functionality, simply create an executable file with the following contents at /var/lib/cloud/scripts/per-boot/fetch-and-execute-startup-script.sh:

```
#!/bin/sh
curl  --retry 10 https://metadata.paperspace.com/script | bash > /var/log/startup-script-output.log 2>&1
```

Similarly, if you would like to disable this functionality, simply remove the script located at /var/lib/cloud/scripts/per-boot/fetch-and-execute-startup-script.sh.

Note: this form of download only works from within the machine assigned to the script.

### Scripts for Windows machines

Startup scripts for Windows are run under `powershell` by the Paperspace Service on the Windows virtual machines.  The Windows local system account is used to run the script.  The [samples](samples/) directory shows some example of writing startup scripts for windows, including how to set environment variables globally, and how to run batch file commands from within a powershell script.  See the sample files with the `.ps1` suffix.

If the script's `runOnce` property is set to true the script will only be run by powershell during the first *full boot* of the machine.  On Windows the first full boot occurs only after an initial reboot to configure device drivers and initialize the machine name.  The on the first *full boot* the paperspace infrastructure records whether the script was retrieved or not, and will not allow the script to be retrieved again if the `runOnce` property was set.

On a Windows machine the script is downloaded to `C:\Windows\Temp\ps_script.ps1` and its output is logged to `C:\Windows\Temp\ps_script.log` after completion of the script.  Be careful about including sensitive information in the script or its output, as these files are not automatically cleaned up. If you need to clean up these files you can schedule a Windows task to do so.  (In the future we may make script logging optional to enhance security.)

To examine the contents of an assigned script from within the Windows virtual machine execute the following command from a `powershell` prompt:

`(. { iwr -useb https://metadata.paperspace.com/script }).content`

Note: this form of download only works from within a machine assigned to the script.

### Getting metadata from within a machine

Paperspace supports retrieving basic metadata about a machine from within the machine itself.  This is available anytime after the machine has successfully booted, and also during the execution of any assigned startup script.

To retrieve machine metadata from within a Linux machine run:

`curl https://metadata.paperspace.com/meta-data/machine`


For a Windows machine run the `powershell` equivalent command:

`(. { iwr -useb https://metadata.paperspace.com/meta-data/machine }).content`

The metadata available includes the user specified machine 'name', the paperspace machine 'id' and other machine specific info.  The info is returned from the Paperspace metadata service as a JSON object.  Here is an example JSON return value:

```
{
    "id": "ps123abc",
    "name": "My Machine",
    "hostname": "pssiq341",
    "privateIpAddress": "10.63.0.97",
    "publicIpAddress": ""
}
```  

On Linux or Windows you can use the [jq](https://stedolan.github.io/jq/) tool to parse JSON data.  Also the latest version of `powershell` has native support for parsing JSON data.
