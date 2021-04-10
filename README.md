# YaTQA backup fixer

Sometimes you create full backup of your TeamSpeak3 server channels. Sometimes you can't restore channels from your backup.

This script cuts off permissions, passwords and other things of your backup to make it possible to use again.

## Guide

Move your backup to **data** folder, call it `src.txt`, then run `node index.js data/src.txt data/dst.txt`.
