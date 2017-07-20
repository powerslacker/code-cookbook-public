exports.home = (req, res) => {
    let current_user = req.user
    res.render('index', { user: current_user })
}

exports.login = (req, res) => {
    res.render('login', {env: process.env})
}

exports.logout = async (req, res) => {
    await req.logout()
    req.flash('success', 'Logged out!')
    res.redirect('/')
}