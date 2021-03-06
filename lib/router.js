FlowRouter.route('/', {
    action: function () {
        FlowRouter.go('/wallets/');
    }
});
/*
FlowRouter.route('/wallet/:walletAdderss', {
    action: function (params, queryParams) {
        console.log("Yeah! We are on the post:", params.walletAdderss);
        BlazeLayout.render('home', {content:'walletdetail'});
    }
});
*/
FlowRouter.route('/test', {
    action: function () {
        BlazeLayout.render('index');
    }
});
FlowRouter.route('/login', {
    action: function () {
        BlazeLayout.render('login');
    }
});
FlowRouter.route('/wallets', {
    action: function () {
        BlazeLayout.render('wallets');
    }
});
FlowRouter.route('/wallet/:walletAdderss', {
    action: function (params, queryParams) {
        BlazeLayout.render('wallet');
    }
});
FlowRouter.route('/addnew', {
    action: function () {
        BlazeLayout.render('addnew');
    }
});
FlowRouter.route('/walletlist', {
    action: function () {
        BlazeLayout.render('walletlist');
    }
});
FlowRouter.route('/walletdetail/:walletAdderss', {
    action: function (params, queryParams) {
        BlazeLayout.render('walletdetail');
    }
});
FlowRouter.route('/candidates', {
    action: function() {
        BlazeLayout.render('candidates');
    }
});

FlowRouter.route('/candidate/:candidateId', {
    action: function (params, queryParams) {
        BlazeLayout.render('candidate');
    }
});
