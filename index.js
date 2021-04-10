const fs = require('fs');

if (process.argv.length !== 4) console.log('use node index.js data/src.txt data/dst.txt'), process.exit(1);

const srcPath = process.argv[2];
const dstPath = process.argv[3];

function start(text) {
    process.stdout.write(text);
}

function done() {
    console.log(' done!');
}

function generateNewLine(obj) {
    const nl = {};
    nl['cid']                               = obj['cid']                            || undefined;
    nl['pid']                               = obj['cpid']                           || undefined;
    nl['channel_name']                      = obj['channel_name']                   || undefined;
    nl['channel_topic']                     = obj['channel_topic']                  || undefined;
    nl['channel_order']                     = obj['channel_order']                  || undefined;
    nl['channel_codec']                     = obj['channel_codec']                  || undefined;
    nl['channel_icon_id']                   = obj['channel_icon_id']                || undefined;
    nl['channel_maxclients']                = obj['channel_maxclients']             || undefined;
    nl['channel_flag_default']              = obj['channel_flag_default']           || undefined;
    nl['total_clients_family']              = obj['total_clients_family']           || undefined;
    nl['channel_codec_quality']             = obj['channel_codec_quality']          || undefined;
    nl['channel_flag_password']             = obj['channel_flag_password']          || undefined;
    nl['channel_flag_permanent']            = obj['channel_flag_permanent']         || undefined;
    nl['channel_maxfamilyclients']          = obj['channel_maxfamilyclients']       || undefined;
    nl['channel_needed_talk_power']         = obj['channel_needed_talk_power']      || undefined;
    nl['channel_flag_semi_permanent']       = obj['channel_flag_semi_permanent']    || undefined;
    nl['channel_needed_subscribe_power']    = obj['channel_needed_subscribe_power'] || undefined;

    const arr = [];
    for (let prop in nl) {
        if (nl[prop] !== undefined) {
            arr.push(prop + '=' + nl[prop]);
        }
    }
    return arr.join(' ');
}

function processLine(i) {
    const line = srcLines[i].split(' ');
    const parsed = {};
    line.map(str => {
        const firstEq = str.indexOf('=');
        const propertyName = str.substring(0, firstEq);

        if (propertyName.length === 0) return;
        
        const property = str.substring(firstEq+1);
        parsed[propertyName] = property;
    });

    dstLines.push(generateNewLine(parsed));
}

start('reading src backup from file...');
const srcFull = fs.readFileSync(srcPath).toString();
const srcLines = srcFull.split('\n');
done();

start('parsing and fixing src backup...');
const dstLines = [];
for (let i = 0; i < srcLines.length; i++) {
    processLine(i);
}
// processLine(1);
done();

start('writing dst backup to file...');
fs.writeFileSync(dstPath, dstLines.join('\n'));
done();
