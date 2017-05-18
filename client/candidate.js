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
    return Candidates.findOne();
  }
});

/*
Template.walletdetail.events({
  'click [name="wallet"]' (event, instance) {

  },
});
*/
