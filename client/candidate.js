import {
  Template
} from 'meteor/templating';
import {
  ReactiveVar
} from 'meteor/reactive-var';

import './candidate.html';

Wallets = new Mongo.Collection('wallets');
Price = new Mongo.Collection('price');
Candidates = new Mongo.Collection('candidates');
client = new CoinStack('ab6d65b31aca913b0f8fece05c41a7', '623c31e6607785e1d237893226f6d7');
client.endpoint = "testchain.blocko.io";
client.protocol = 'http://';

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

/*
Template.walletdetail.events({
  'click [name="wallet"]' (event, instance) {

  },
});
*/
