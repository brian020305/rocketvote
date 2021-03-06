import {
  Template
} from 'meteor/templating';
import {
  ReactiveVar
} from 'meteor/reactive-var';

import './main.html';

Wallets = new Mongo.Collection('wallets');
Price = new Mongo.Collection('price');
Candidates = new Mongo.Collection('candidates');
client = new CoinStack('ab6d65b31aca913b0f8fece05c41a7', '623c31e6607785e1d237893226f6d7');


Template.home.onCreated(function homeOnCreated() {
  Meteor.subscribe('wallets');
});

Template.wallets.onCreated(function homeOnCreated() {
  Meteor.subscribe('wallets');
});

Template.login.onCreated(function homeOnCreated() {
  Meteor.subscribe('wallets');
});

Template.wallets.helpers({
  myWalletlist() {
    return Wallets.find();
  }
});


Template.wallet.onCreated(function walletdetailOnCreated() {
  var address = FlowRouter.getParam('walletAdderss');
  Meteor.subscribe('wallets', address);
  Meteor.subscribe('price');
});

Template.wallet.rendered = function () {
  if (!this.qrloaded) {
    this.qrloaded = true;

    var address = FlowRouter.getParam('walletAdderss');

    var param = {
      address: address
    };

    Meteor.call('getBalance', param, function (err, res) {
      if (!err) {
        Session.set(address + 'balance', res);
      }
    });

    qrContents = "bitcoin:" + address;
    var qrcodesvg = new Qrcodesvg(qrContents, "qrcode", 250, {
      "ecclevel": 1
    });
    qrcodesvg.draw({
      "method": "classic",
      "fill-colors": ["#003658", "#0085CB", "#0085CB"]
    }, {
      "stroke-width": 1
    });

    var pp = { targetAddress: "15FhoxGDG6BpqX8pEDVJ7WbLTDuPo1xJsZ",
        pKey: "L4LhBiv6M3ZTPCXhx3eErrEqPWA3HEJH25hD4JzuD6j5eEsBT4k4",
        fromAddress: "1LZahPzqBQ58mbGwYKMWZWKXKRErUCdoaC"
    };
      client.getTransactions("1LZahPzqBQ58mbGwYKMWZWKXKRErUCdoaC", function(err, result) {
          console.log('result', result);
      });
      /*
      Meteor.call('vote', pp, function(err, res) {
         if(!err) {
              var voteresult=res;
              console.log(voteresult);
        }
      });
      */
  }
}

Template.login.events({
    'submit .login-form': function(e) {
        e.preventDefault();
        const target = e.target;
        const key = target.email.value;
        var row = Wallets.findOne({privateKey:key});
        var address = row._id;

        Session.set('myaddress', address);
        Session.set('isLogin', "true");
        FlowRouter.go('/candidates');
    }
});

Template.wallet.helpers({
  walletaddress() {
    return FlowRouter.getParam('walletAdderss');
  },
  mywallet() {
    return Wallets.findOne();
  },
  mywalletbalance() {
    var address = FlowRouter.getParam('walletAdderss');
    return Session.get(address + 'balance');
  },
  price() {
    return Price.findOne({_id:'btc_bithumb'}).price;
  }
});

Template.walletlist.helpers({
  myWalletlist() {
    return Wallets.find();
  }
});

Template.walletlist.events({
  'click [name="wallet"]' (event, instance) {
    FlowRouter.go('/wallet/' + $(event.currentTarget).attr('data-address'));
  },
});

Template.walletdetail.onCreated(function walletdetailOnCreated() {
  var address = FlowRouter.getParam('walletAdderss');
  Meteor.subscribe('mywallet', address);
  Meteor.subscribe('price');
});

Template.walletdetail.rendered = function () {
  if (!this.qrloaded) {
    this.qrloaded = true;

    var address = FlowRouter.getParam('walletAdderss');

    var param = {
      address: address
    };

    Meteor.call('getBalance', param, function (err, res) {
      if (!err) {
        Session.set(address + 'balance', res);
      }
    });

    qrContents = "bitcoin:" + address;
    var qrcodesvg = new Qrcodesvg(qrContents, "qrcode", 250, {
      "ecclevel": 1
    });
    qrcodesvg.draw({
      "method": "classic",
      "fill-colors": ["#003658", "#0085CB", "#0085CB"]
    }, {
      "stroke-width": 1
    });
  }
}

Template.walletdetail.helpers({
  walletaddress() {
    return FlowRouter.getParam('walletAdderss');
  },
  mywallet() {
    return Wallets.findOne();
  },
  mywalletbalance() {
    var address = FlowRouter.getParam('walletAdderss');
    return Session.get(address + 'balance');
  },
  price() {
    return Price.findOne({_id:'btc_bithumb'}).price;
  }
});

Template.candidates.onCreated(function candidatesOnCreated() {
  Meteor.subscribe('candidates');
});

Template.candidate.onCreated(function candidateOnCreated() {
  Meteor.subscribe('candidates');
});

Template.candidates.helpers({
  candidateList() {
    return Candidates.find();
  }
});

Template.candidate.helpers({
    candidate() {
        var candidateId = FlowRouter.getParam('candidateId');
        return Candidates.findOne(candidateId);
  }
});

Template.candidate.events({
    'click .vote': function(e) {
        if(confirm("이 후보에게 투표할까용?")){
            var candidateId = FlowRouter.getParam('candidateId');
        var param = {
            targetAddress: Candidates.findOne(candidateId).address,
            pKey: Session.get("myKey"),
            fromAddress: Session.get("myaddress")
        }
        Meteor.call('vote', param, function(err, res) {
            if(!err) {
                var voteresult=res;
                console.log(voteresult);
                alert("이미 투표 하셨네용ㅎ");
            }
        });
        } else {
            alert("신중히 투표하세요.");
        }
    }
});
