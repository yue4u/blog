---
title: Backup iOS on Linux via libimobiledevice
date: 2023-09-23 23:38:34
tags:
 - iOS
 - Arch Linux
---

## I just wanted to make a simple backup

For some reason, I decided to wipe out my iPhone and use it in a different context. Before doing that, of course, I needed to back up all the photos, files, messages, etc.

The sad news is I don't own a "functional" Mac device for the time being. I had to do this on my main PC which is dual-boot Linux and Windows. Due to my experience with "Apple products", using iTunes on Windows sounds more straightforward to me. 

Things turn out contrary to how one wishes. After trying to plug/unplug my iPhone countless times, install/uninstall iTunes many times, update/remove the "Apple USB driver" a few times, reboot my PC several times, the "famous" `Could not back up because the "iPhone disconnected"` still prevented me from a successful backup. I had to give up. 😢

Two obvious bugs I've encountered:

- if you tap "Trust computer" on iPhone before the dialog shows up on PC, the dialog will never be resolved and keep waiting forever.
- I used the iTunes Windows installer at first but the Apple USB driver didn't work at all before switching to the version in the Microsoft Store.

## Trying `libimobiledevice`

So the other option was to switch to Arch Linux and try backuping there. To be honest, I had little expectation for any working solution. After some googling, the `libimobiledevice` library looked good to me. I decided to give it a try.

Since it's available on Arch official repositories, I tried to install it from there at first.

```sh
pacman -S libimobiledevice
```

The CLI interface of `libimobiledevice` is a bit complex at first glance. I plugged in my iPhone and nervously tried to run `idevice_id`. However, it turned out iPhone was not detected at all. Googling again and this time it brought me to https://github.com/libimobiledevice/libimobiledevice/issues/68. Somehow `libimobiledevice` itself was not enough.  I had to install `usbmuxd`.

```sh
pacman -S usbmuxd
```

After rebooting, the "Trust computer" confirmation popped up on my iPhone. At this time I saw some possibility that this approach might actually work. Run `idevice_id` again, it printed `Could not perform backup protocol version exchange, error code -1` which is indeed https://github.com/libimobiledevice/libimobiledevice/issues/1111. According to comments the best chance was to compile `libimobiledevice` from source. Sigh.

Anyway, let's proceed with the build instructions.

```sh
git clone git@github.com:libimobiledevice/libimobiledevice.git
cd libimobiledevice
./autogen.sh
make
```

Build failed due to missing dependencies, to be more specific, `libimobiledevice-glue`. I had to install it via AUR.

```sh
git clone https://aur.archlinux.org/libimobiledevice-glue.git
cd libimobiledevice-glue
cat PKGBUILD
makepkg -sic

# back to the libimobiledevice repo
./autogen.sh
make
make install

./tools/idevicebackup2 -v
# -> idevicebackup2 1.3.0-190-g6fc41f5
```

This time build succeeded, and `ideviceinfo` also printed my device info correctly. 

Finally, we can start the backup process. Thanks to the speed of the lightning cable, it took a whole night to finish.

```sh
mkdir /mnt/1000_pb_ssd/iphone_backup
idevicebackup2 backup -i /mnt/1000_pb_ssd/iphone_backup
```

To unpack the backup to normal files:

```sh
idevicebackup2 unback /mnt/1000_pb_ssd/iphone_backup
#              ^_____ NOTE it's 'unback' not 'unpack'
```

The unpacking process succeeded and all the photos and other media are located in `/mnt/1000_pb_ssd/iphone_backup/_unback_/<device-id>/var/mobile/Media/DCIM/`. 🎉🎉

## Appendix

1. Maybe you should just subscribe to iCloud to avoid all the trouble.
2. I did not try restoring the backup so not sure if the backup is actually restorable. I just wanted photos/videos from camera most and everything else were optional.
3. The "Trust computer" confirmation on iPhone looks way less dangerous than when you try to `adb` an Android device. This made me a bit worried. You don't even need to enable "developer mode" on the device side first.
    - Indeed there are some articles about how companies trying to steal personal info via mobile battery rental services by sneaking `libimobiledevice` inside.😱