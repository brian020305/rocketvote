import {
  Meteor
} from 'meteor/meteor';
import {
  Mongo
} from 'meteor/mongo';
import {
  HTTP
} from 'meteor/http'
var CryptoJS = require("crypto-js");

client = new CoinStack('ab6d65b31aca913b0f8fece05c41a7', '623c31e6607785e1d237893226f6d7');
client.endpoint = "testchain.blocko.io";
client.protocol = 'http://';

Wallets = new Mongo.Collection('wallets');
Price = new Mongo.Collection('price');

Meteor.startup(() => {
  var data = CoinStack.ECKey.createKey();
  var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), 'secret key 123');

  // Decrypt
  var bytes = CryptoJS.AES.decrypt(ciphertext.toString(), 'secret key 123');
  var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  console.log(decryptedData);


  //console.log(ciphertext);

  var walletsCnt = Wallets.find().count();

  var privateKey = CoinStack.ECKey.createKey();
  var address = CoinStack.ECKey.deriveAddress(privateKey);

  if (walletsCnt == 0) {
    var documnet = {
      _id: address,
      privateKey: privateKey,
      label: 'center',
      createAt: new Date()
    };
    Wallets.insert(documnet);
    console.log('insert wallet');
  } else {
    console.log('ended');
  }

  Meteor.setInterval(function () {
    console.log('timer');
    HTTP.get('https://api.bithumb.com/public/ticker', {}, function(err, data){
      if(err){
        console.log('으악 에러남');
        return false;
      }

      var btc_price = data.data.data.closing_price;
      console.log(btc_price);
      Price.upsert({
        _id:'btc_bithumb'
      }, {
        price: btc_price
      });
    });
  }, 100000);
});

Meteor.methods({
  'getBalance' ({
    address
  }) {
    console.log('check balance: ' + address);
    var balance = CoinStack.Math.toBitcoin(client.getBalanceSync(address));
    console.log('check balance: ' + balance);
    return balance;
  },
  'getTxHistory' ({
    address
  }) {
    console.log('check balance: ' + address);
    client.getTransactionsSync(address);
    //console.log('check balance: ' + balance);
    return balance;
  },
    'vote' ({
        targetAddress,
        pKey,
        fromAddress
    }) {
        console.log('do vote!');
        var txBuilder = client.createTransactionBuilder();
        txBuilder.addOutput(targetAddress, CoinStack.Math.toSatoshi("0.0001"));
        txBuilder.setInput(fromAddress);
        txBuilder.fee = 0;
        var tx = client.buildTransactionSync(txBuilder);
        tx.sign(pKey);
        var rawTx = tx.serialize();
        console.log(rawTx)
        console.log(tx)

        try {
            client.sendTransactionSync(rawTx);
        } catch(e) {
            console.log("failed to send tx");
        }
        return rawTx;
    },
  'save' ({
    region, type, name
  }) {
    console.log('region: ' + region);
    var privateKey = CoinStack.ECKey.createKey();
    var address = CoinStack.ECKey.deriveAddress(privateKey);

    var documnet = {
      _id: address,
      privateKey: privateKey,
      label: region + name + ' ' + type,
      type: type,
      region: region,
      name: name,
      createAt: new Date()
    };
    Wallets.insert(documnet);
    console.log('insert wallet');
  }
});


