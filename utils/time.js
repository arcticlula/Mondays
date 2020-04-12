export function secondsToTime(d) {
    d = Number(d)
    var h = Math.floor(d / 3600)
    var m = Math.floor((d % 3600) / 60)
    var s = Math.floor((d % 3600) % 60)

    var hDisplay = h > 0 ? (h < 10 ? '0' + h : h) : '00'
    var mDisplay = m > 0 ? (m < 10 ? '0' + m : m) : '00'
    var sDisplay = s > 0 ? (s < 10 ? '0' + s : s) : '00'
    return hDisplay + ':' + mDisplay + ':' + sDisplay
}

export function timeToSeconds(str) {
    var p = str.split(':'),
        s = 0,
        m = 1

    while (p.length > 0) {
        s += m * parseInt(p.pop(), 10)
        m *= 60
    }
    return s
}
