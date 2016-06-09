# raspbooth

My Wedding Rasberry PI Photobooth

## Environment

  * Raspberry Pi 3 (Archlinux arm7h)
  * RPi Camera v2 (8MP)
  * Photo printer (ie: Canon SELPHY CP910)
  * A tablet/phone for IHM

## Bootstrap

Update the system and install dependencies
```sh
$ pacman -Syu
$ pacman -S python python-pip python-virtualenv cups python-cups hostapd dnsmasq
```

Initializing the python environment
```sh
$ virtualenv env
$ source env/bin/activate
$ pip install -r requirements.txt
```

## Run

```sh
(env) [alarm@alarmpi raspibooth]$ python app.py
 * Running on http://0.0.0.0:5000/ (Press CTRL+C to quit)
```

## Photo and Screenshots

![Tablet view](https://raw.githubusercontent.com/Zenithar/raspbooth/master/screenview.png)
