;(function (global, $) {
  
    var Currency = function (Amount, fromCurrency, toCurrency) {
        return new Currency.init(Amount, fromCurrency, toCurrency);
	};
    
    
    var CurrencyInfo = {
        dollar: {
            name: "dollar",
            ratio: 1,
            country: "United States",
            subcurrency: "cent",
            code: "usd",
            symbol: "$"
		},
        euro: {
            name: "euro",
            ratio: 0.90,
            country: "Euro Member",
            subcurrency: "cent",
            code: "eur",
            symbol: "€"
		}
    };
    
    var supportedCurrency = Object.getOwnPropertyNames(CurrencyInfo);
	
    Currency.prototype = {
        
        getRatio:function(){ 
                var ratio;
                if (this.fromCurrency === supportedCurrency[0]) {
                     ratio = CurrencyInfo[this.toCurrency].ratio;
                }
                else if (this.toCurrency === supportedCurrency[0]) {
                     ratio = 1/CurrencyInfo[this.fromCurrency].ratio;
                }
                else {
                     ratio = CurrencyInfo[this.fromCurrency].ratio/CurrencyInfo[this.toCurrency].ratio;
                }
                return ratio;
        },
        
        validate: function () {
                if (supportedCurrency.indexOf(this.fromCurrency) ===-1 || supportedCurrency.indexOf(this.toCurrency) ===-1) 
                {
                throw "Invalid currency";   
                }
            return this;
        },
        
        set: function (amount,_from, _to) {
                this.validate();
                return this;
            
        },
        
        exchange: function () {
                var ratioResult = this.set().getRatio();
                var result = this.Amount * ratioResult;
                return result;    
        },
		
		HTMLexchange: function (selector) {
				if (!$){
					throw "jQuety not loaded!";
				}
				
				if (!selector) {
					throw "Missing jQuery selector";
				}
				
				$(selector).val(this.exchange());
				
		}
    };
    
    Currency.init = function(Amount, fromCurrency, toCurrency) {
                this.Amount = Amount;
                this.fromCurrency = fromCurrency;
                this.toCurrency = toCurrency;
    }
    
    
    Currency.init.prototype = Currency.prototype;
        
    global.Cur$ = global.Currency = Currency;
    
}(window, jQuery));