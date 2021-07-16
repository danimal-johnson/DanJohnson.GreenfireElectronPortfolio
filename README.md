# Greenfire Electron-Portfolio
A demonstration Electron/Vue3 project.
* Displays live prices of 3 cryptocurrencies (Tezos, Signum, and Algorand).
* Prices are presented in scannable QR Codes.
* Displays live Twitter feeds of BBCAfrica and Ethereum.
* Has a button to save the page as a PDF file. Files are saved under `~/electron-portfolio`.

[TOC]
### Platform
* This project was built for a Linux environment under WSL2/Ubuntu in Windows 10. This can lead to many complications. See the [Troubleshooting](#troubleshooting) section for details.
* Built using Node 14.16.1, Vue 3, and Electron 13.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run electron:serve
```
A dropdown menu for developer tools is present in the development build. Additional console logging may appear.

### Compiles and minifies for production
```
npm run electron:build
```
Outputs bundled distribution version to the `./dist_electron` directory.

## Changes from the requirements:
A few departures were made from the [specifications](requirements.pdf):
* Signum is the official replacement for Burst, so all references to Burst have been updated accordingly.
* The email link has been replaced with a website link (since this is a public repository), although it will still be rendered if an address is provided in `App.vue`.
* Node version 14 was used instead of 12 to overcome some filesystem errors.

## Troubleshooting
If using Windows Subsystem for Linux (WSL), you will need an X Server application installed, such as Xming, VcXsrv, or Cygwin. This app was created and tested using VcXsrv with the following settings:
* Multiple windows
* Display number -1
* Start no client
* Extra settings: Clipboard, Primary Selection, Native OpenGL
* Additional parameters for VcXsrv: `-ac`

This project was developed under WSL2/Ubuntu. To make this work, note these settings:
* `$DISPLAY` must be set to the computer's external IP address (not the virtual address generally available to WSL). To get this, you can run `ipconfig.exe.` Look for the IPv4 address under a section that doesn't include the word `vEthernet`.
* `$LIBGL_ALWAYS_INDIRECT` must be set to true.
* Since WSL Linux distributions contain no graphical interface, these libraries will have to be installed as well: `libnss3, libgm1, libasound2`.
* WSL accesses the Windows NTFS file system over a virtual network connection. If your project is located in a Windows subdirectory, hot reloading will be disabled. Every change during developoment will require a fresh compile from scratch, and file access will be *an order of magnitude* slower. To avoid this, make sure you run the project from your Linux home directory (`~/install-dir`).

To summarize, if you are using the bash shell, you can add the following lines to your `~/.bashrc` file and restart the terminal window:
```
export EXTERN_IP_LINE=$(ipconfig.exe | grep "Ethernet adapter Ethernet" -n | awk -F ":" '{print $1+7}')
export DISPLAY=$(ipconfig.exe | awk -v a=$EXTERN_IP_LINE '{if (NR==a) print $NF":0.0"}' | tr -d "\r")

export LIBGL_ALWAYS_INDIRECT=true
```
Then install the appropriate libraries from the shell:
```
sudo apt-install libnss3
sudo apt-install libgn1
sudo apt-install libasound2
```

Finally, the shell that opens in VSCode may not auto-load the `.bashrc` file. You might need to type the following two lines into the terminal *every* time:
```
export DISPLAY=YOUR.IP.ADDRESS:0
export LIBGL_ALWAYS_INDIRECT=true
```