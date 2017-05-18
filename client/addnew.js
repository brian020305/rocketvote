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
    var type = $(':radio[name="type"]:checked').val();
    if (type == '') {
      alert('종류를 선택하세요.');
      return;
    }
    var region = $('#region option:selected').val();
    if (type == '유권자' && region == '') {
      alert('지역을 선택하세요.');
      return;
    }
    var name = $('#name').val();
    if (type == '후보자' && name == '') {
      alert('후보자의 이름을 입력하세요.');
      return;
    }

    if (type != '유권자') {
      region = '';
    } else if (type != '후보자') {
      name = '';
    }

    var param = {
      region: region,
      type: type,
      name: name
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

  'click .type-input': function(event, instance) {
    var type = event.currentTarget.value;

    if (type == '유권자') {
      $('.region-input-row').show();
      $('.name-input-row').hide();
    } else if (type == '후보자') {
      $('.region-input-row').hide();
      $('.name-input-row').show();
    } else {
      $('.region-input-row').hide();
      $('.name-input-row').hide();
    }
  }
});
