let authed = false

module.exports = {
    isLoggedIn: function() {
        return authed
    },
    setLoggedIn: function(bool) {
        authed = bool
    }
}
