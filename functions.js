module.exports = {
  //function to convert hashes per second into a human readable format, add the abbr tag for thousands, millions, etc...
  convertHashes: function (hashes) {
    if (hashes < 1e3) {
        return hashes + " H/s"
    }
    else if (hashes > 1e3 && hashes < 1e6) {
        return (hashes / 1e3).toFixed(3) + " KH/s"
    }
    else if (hashes > 1e6 && hashes < 1e9) {
        return (hashes / 1e6).toFixed(3) + " MH/s"
    }
    else if (hashes > 1e9 && hashes < 1e12) {
        return (hashes / 1e9).toFixed(3) + " GH/s"
    }
    else if (hashes > 1e12 && hashes < 1e15) {
        return (hashes / 1e12).toFixed(3) + " TH/s"
    }
    else if (hashes > 1e15 && hashes < 1e18) {
        return (hashes / 1e15).toFixed(3) + " PH/s"
    }
    else if (hashes > 1e18 && hashes < 1e21) {
        return (hashes / 1e18).toFixed(3) + " EH/s"
    }
  },
  
  //function to convert hashes needed to "crack a block" into human readable format, add abbr tag for thousands, millions, etc...
  convertDifficulty: function (difficulty) {
    if (difficulty < 1e3) {
        return difficulty + " H"
    }
    else if (difficulty > 1e3 && difficulty < 1e6) {
        return (difficulty / 1e3).toFixed(3) + " KH"
    }
    else if (difficulty > 1e6 && difficulty < 1e9) {
        return (difficulty / 1e6).toFixed(3) + " MH"
    }
    else if (difficulty > 1e9 && difficulty < 1e12) {
        return (difficulty / 1e9).toFixed(3) + " GH"
    }
    else if (difficulty > 1e12 && difficulty < 1e15) {
        return (difficulty / 1e12).toFixed(3) + " TH"
    }
    else if (difficulty > 1e15 && difficulty < 1e18) {
        return (difficulty / 1e15).toFixed(3) + " PH"
    }
    else if (difficulty > 1e18 && difficulty < 1e21) {
        return (difficulty / 1e18).toFixed(3) + " EH"
    }
  },

  // Thanks to this guy: https://stackoverflow.com/a/6078873
  timeConverter: function (timestamp){
    var a = new Date(timestamp * 1000)
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    var year = a.getFullYear()
    var month = months[a.getMonth()]
    var date = a.getDate()
    var hour = a.getHours()
    var min = a.getMinutes()
    var sec = a.getSeconds()
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec 
    return time
	},
	//check to see if wallet exists in database
	walletCheck: function (network, walletAddress) {
		const mysql = require("mysql"),
			token = require('./configs/token.json'),
			sql = mysql.createConnection(token.mySql)
		sql.createQuery('select * from mystats where ' + network + 'wallet = ' + walletAddress, (err, walletdata) => {
			if (network == "upx") {
				walletNet = walletdata[0].upxwallet
			} else if (network == "xmr"){
				walletNet = walletdata[0].xmrwallet
			} else if (network == "vrsc") {
				walletNet = walletdata[0].vrscwallet
			}
			if (walletNet < 1) {
				status = 1
				wallet = null
				return(err, status, wallet)
			}
			if (walletNet == walletAddress) {
				status = 2
				wallet = walletNet
				return(err, status, wallet)
			}
			if (walletNet > 0 && walletNet !== walletAddress) {
				status = 3
				wallet = walletNet
				return(err, status, wallet)
			}
		})
	},
	addWallet: function (network, walletAddress, memberID) {
    var walletNet
		if (network == "upx") {
			walletNet ="upxwallet"
		} else if (network == "xmr") {
			walletNet = "xmrwallet"
		} else if (network == "vrsc") {
			walletNet = "vrscwallet"
        }
    sql.createQuery('select * from mystats where discord_userid = ' + memberID, (err, walletdata) => {
      if (walletdata[0] < 1) return(newuser = true)
      else newuser = false
    })
    sql.createQuery('insert into mystats (discord_userid, ' + walletNet + ') values (' + memberID + ', ' + walletAddress + ')')
    return(err, newuser)
  },
  nameitalready: function (network, walletAddress) {

  },
  fetchMinerStats: function (network, walletAddress) {
    const fetch = require("node-fetch"),
      pools = require("./configs/pools.json")
      
    var poolType
    if (network == "upx" || network == "xmr") poolType = "cn"
    else poolType = "sn"
    if (poolType == "cn") {
      var data
      var statsUS
      var statsBE
      apiUrl = pools.api.cn.walletStats
      apiCall = ("/" + network + apiUrl)
      apiUS = (pools.stratum.USA + apiCall)
      apiBE = (pools.stratum.BE + apiCall)
      fetch(apiUS)
      .then(result => result.json())
      .then(data => {
        if (data.error) return data.error
        
      })
      fetch(apiBE)
      .then(result => result.json())
      .then(data => {
        if (data.error) return 
      })
    
    } else {

    }
  }
}