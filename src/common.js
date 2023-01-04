const timeZone = () => {
    return new Date().toLocaleString('en-In', {
        timeZone: 'Asia/Kolkata'
    })
}

module.exports = {
    timeZone
}