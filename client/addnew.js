import {
  Template
} from 'meteor/templating';
import {
  ReactiveVar
} from 'meteor/reactive-var';

import './addnew.html';

/*
Template.addnew.onCreated(function addNewCreated() {
  Meteor.subscribe('wallets');
});
*/

Template.addnew.events({
  'click .ion-ios-checkmark-empty': function(event, instance) {
    console.log("click event!!!")
    var region = $('#region-field option:selected').val();
    if (region == '') {
      alert('지역을 선택하세요.');
      return;
    }

    var param = {
      region: region
    };

    Meteor.call('save', param, function (err, res) {
      if (err) {
        alert('저장에 실패했습니다.');
      } else {
        alert('저장되었습니다.');
        FlowRouter.go('/wallets');
      }
    });
  },
});
