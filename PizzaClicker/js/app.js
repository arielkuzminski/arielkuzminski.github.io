function PizzaClickerGame() {

    var pizzaCount = 0;                                         // główny licznik - liczba pizz :)
    var autoClick = 0;                                          // licznik automatycznych kliknięć na sekundę
    var booster = 0;
    var score = 0;
    
    
    var upgrades = [                                                // każde z ulepszeń
        {
            name : 'pizzerman',
            type : 'upgrades',
            id : '#pizzerman',                                  //aby móc akutalizować wyniki na stronie
            idValue : '#pizzerman-value',                       // j.w
            idCount : '#pizzaViewCount',                        // do wzoru na koszt kolejnego ulepszenia
            itemCount : 0,                                      // j.w
            currentPrice : 15,                                  // akutalna cena ulepszenia
            basePrice : 15,                                     //bazowy koszt ulepszenia
            bonus: 1                                            // ile automatycznych kliknięć daje nam kupno ulepszenia
        },
        
        {
            name : 'waitress',
            type : 'upgrades',
            id : '#waitress',
            idValue : '#waitress-value',
            idCount : '#waitressViewCount',
            itemCount : 0,
            currentPrice : 150,
            basePrice: 150,
            bonus : 10
        },
        
        {
            name : 'deliveryboy',
            type : 'upgrades',
            id : '#deliveryboy',
            idValue : '#deliveryboy-value',
            idCount : '#deliveryboyViewCount',
            itemCount : 0,
            currentPrice : 3000,
            basePrice: 3000,
            bonus : 200
        },
        
        {
            name : 'manager',
            type : 'upgrades',
            id : '#manager',
            idValue : '#manager-value',
            idCount : '#managerViewCount',
            itemCount : 0,
            currentPrice : 75000,
            basePrice: 75000,
            bonus : 5000
        },
        
        {
            name : 'godfather',
            type : 'upgrades',
            id : '#godfather',
            idValue : '#godfather-value',
            idCount : '#godfatherViewCount',
            itemCount : 0,
            currentPrice : 1000000,
            basePrice: 1000000,
            bonus : 123456
        }
        
    ];
    
    
    var clickerUpgrades = [
        
        {
            name : 'cursor',
            type : 'clickUpgrades',
            id : '#cursor',
            idValue : '#cursor-value',
            idCount : '#cursorCount',
            itemCount : 0,
            currentPrice : 10,
            basePrice: 10,
            bonus : 1
        },
        
        {
            name : 'rollingPin',
            type : 'clickUpgrades',
            id : '#rollingPin',
            idValue : '#rollingPin-value',
            idCount : '#rollingPinCount',
            itemCount : 0,
            currentPrice : 500,
            basePrice: 500,
            bonus : 5
        },
        
        {
            name : 'pizzaBox',
            type : 'clickUpgrades',
            id : '#pizzaBox',
            idValue : '#pizzaBox-value',
            idCount : '#pizzaBoxCount',
            itemCount : 0,
            currentPrice : 2000,
            basePrice: 2000,
            bonus : 20
        },
        
        {
            name : 'briefcase',
            type : 'clickUpgrades',
            id : '#briefcase',
            idValue : '#briefcase-value',
            idCount : '#briefcaseCount',
            itemCount : 0,
            currentPrice : 10000,
            basePrice: 10000,
            bonus : 100
        }
    ];

    var clickClicker = function() {                            //kliknięcie w clicker...
        
        pizzaCount++;
        score++;
        pizzaCount = pizzaCount + booster;
        score = score + booster;
        
        update();
        
    };
    
    
    var clickUpgrade = function(currentUpgrade) {              //kliknięcie w jakiekolwiek ulepszenie
        
        update();                                          //wywołanie funkcji aktualizującej wyświetlanie danych na stronie
        
        if(currentUpgrade.type == 'upgrades') {
            
            if (pizzaCount >= currentUpgrade.currentPrice) {                                                         // jeżeli mamy więcej pizz niż kosztuje ulepszenie, to:
                pizzaCount = pizzaCount - currentUpgrade.currentPrice;                                                  // aktualizujemy nasze 'saldo'
                autoClick = autoClick + currentUpgrade.bonus;                                                           // aktualizujemy liczbę automatycznych kliknięć
                currentUpgrade.itemCount++;                                                                             // inkrementujemy licznik tego konkretnego ulepszenia
                currentUpgrade.currentPrice = (currentUpgrade.basePrice * (Math.pow(1.15, currentUpgrade.itemCount)));  // Pani Partyka byłaby ze mnie dumna...
                currentUpgrade.currentPrice = Math.round(currentUpgrade.currentPrice);                                  // żeby był int a nie float

                update();

            }
            
        }
        else if (currentUpgrade.type == 'clickUpgrades') {
            
            if (pizzaCount >= currentUpgrade.currentPrice) {                                                         // jeżeli mamy więcej pizz niż kosztuje ulepszenie, to:
                pizzaCount = pizzaCount - currentUpgrade.currentPrice;                                                  // aktualizujemy nasze 'saldo'
                booster = booster + currentUpgrade.bonus;                                                         // aktualizujemy liczbę automatycznych kliknięć
                currentUpgrade.itemCount++;                                                                             // inkrementujemy licznik tego konkretnego ulepszenia
                currentUpgrade.currentPrice = (currentUpgrade.basePrice * (Math.pow(1.05, currentUpgrade.itemCount)));  // Pani Partyka byłaby ze mnie dumna...
                currentUpgrade.currentPrice = Math.round(currentUpgrade.currentPrice);                                  // żeby był int a nie float

                update();

            }
        }
            

        
    };

//    this.changeCost = function(argument) {
//
//    //pizzermancurrentPrice = (autoClick + 1) * Math.round((Math.pow(2, autoClick * autoClick / 10))); //wzór nr 1
//    //firstClickerCost = Math.round((autoClick + 1) * 1.33);
//        
//    console.log(argument);
//    argument = argument * (Math.pow(1.15, argument));
//    argument = Math.round(argument);
//    console.log(argument);
//    //this.update();
//        
//    };
    
    var checkPizza = function() {                              // metoda sprawdzająca czy można się wklikać w dane ulepszenie czy nie
        
        for(var i = 0; i < upgrades.length; i++) {
            
            if(pizzaCount >= upgrades[i].currentPrice) {
                $(upgrades[i].id).attr("disabled", false);
            }
            
            else {
                $(upgrades[i].id).attr("disabled", true);
            }
        }
        
        for(var i = 0; i < clickerUpgrades.length; i++) {
            
            if(pizzaCount >= clickerUpgrades[i].currentPrice) {
                $(clickerUpgrades[i].id).attr("disabled", false);
            }
            
            else {
                $(clickerUpgrades[i].id).attr("disabled", true);
            }
        }
    };

    var update = function() {                                      // metoda często wywoływana - odpowiedzialna za aktualizacje danych wyświetlanych na stronie
        $('#counter').text(pizzaCount);
        
        for(var i = 0; i < upgrades.length; i++) {
            $(upgrades[i].idValue).text(upgrades[i].currentPrice);  // aktualizacja wyświetlenia aktualnej ceny ulepszenia
            $(upgrades[i].idCount).text(upgrades[i].itemCount);     // aktualizacja wyświetlenia aktualnej ilości posiadanych ulepszeń
            
        }
        
        for(var i = 0; i < clickerUpgrades.length; i++) {
            $(clickerUpgrades[i].idValue).text(clickerUpgrades[i].currentPrice);
            $(clickerUpgrades[i].idCount).text(clickerUpgrades[i].itemCount);
        }
        
        $('#perSec').text(autoClick);                               // automatycznych kliknięć na sekundę
        $('#perClick').text(booster + 1);
        $('#score').text(score);
        
    };
    
    var updateTitle = function() {
      
        update();
        $('title').text(pizzaCount + ' pizzas!');
        
    };
    
    ////////@@@@@@@@@@@@@@@@@@///////// TO DO ////////////@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@///////////////////
    
    var updateAutoClicks = function() { // do poprawki: metoda odpowiedzialna za dodanie automatycznych kliknięć do całkowitej liczby pizz - w razie zmiany SetInterval z 1 sekundy, wszystko zacznya źle działać :(
        pizzaCount = pizzaCount + autoClick;
        score = score + autoClick;
    };

    ////////@@@@@@@@@@@@@@@@@@///////// TO DO ////////////@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@///////////////////

    var save = function() {                                        //metoda zapisująca postęp gry do localStorage
        localStorage.setItem('pizzaCount', pizzaCount);
        localStorage.setItem('autoClick', autoClick);
        localStorage.setItem('booster', booster);
        localStorage.setItem('score', score);
        
        for(var i = 0; i < upgrades.length; i++) {
            localStorage.setItem(upgrades[i].name + 'Cost', upgrades[i].currentPrice);
            localStorage.setItem(upgrades[i].name + 'Count', upgrades[i].itemCount);
        }
        
        for(var i = 0; i < clickerUpgrades.length; i++) {
            localStorage.setItem(clickerUpgrades[i].name + 'Cost', clickerUpgrades[i].currentPrice);
            localStorage.setItem(clickerUpgrades[i].name + 'Count', clickerUpgrades[i].itemCount);
        }
        
        console.log('zapisano');

    };

    var load = function() {                                        //metoda wczytująca postęp gry z localStorage
        
        update();
        
        if(localStorage.getItem('pizzaCount')) {                    // jeżeli istnieje już jakakolwiek pizza to wczytaj dane...
            
            
            for(var i = 0; i < upgrades.length; i++) {
                
                upgrades[i].currentPrice = localStorage.getItem(upgrades[i].name + 'Cost');
                upgrades[i].currentPrice = parseInt(upgrades[i].currentPrice);
                upgrades[i].itemCount = localStorage.getItem(upgrades[i].name + 'Count');
                upgrades[i].itemCount = parseInt(upgrades[i].itemCount);
            }
            
            for(var i = 0; i < clickerUpgrades.length; i++) {
                
                clickerUpgrades[i].currentPrice = localStorage.getItem(clickerUpgrades[i].name + 'Cost');
                clickerUpgrades[i].currentPrice = parseInt(clickerUpgrades[i].currentPrice);
                clickerUpgrades[i].itemCount = localStorage.getItem(clickerUpgrades[i].name + 'Count');
                clickerUpgrades[i].itemCount = parseInt(clickerUpgrades[i].itemCount);
            }
            
            pizzaCount = localStorage.getItem('pizzaCount');
            pizzaCount = parseInt(pizzaCount);
            
            autoClick = localStorage.getItem('autoClick');
            autoClick = parseInt(autoClick);
            
            booster = localStorage.getItem('booster');
            booster = parseInt(booster);
            
            score = localStorage.getItem('score');
            score = parseInt(score);
            
           }
        else {                                                      // ... w przeciwnym wypadku zresetuj wynik
            reset();
        };
    
        update();
    };
    
    var reset = function() {                                       // metoda resetująca grę
        
        localStorage.clear();
        
        localStorage.setItem('pizzaCount', 0);
        localStorage.setItem('autoClick', 0);
        localStorage.setItem('booster', 0);
        localStorage.setItem('score', 0);
		
		for(var i = 0; i < upgrades.length; i++) {
            
            localStorage.setItem(upgrades[i].name + 'Cost', upgrades[i].basePrice);
            localStorage.setItem(upgrades[i].name + 'Count', 0);
            
        }
        
        for(var i = 0; i < clickerUpgrades.length; i++) {
            
            localStorage.setItem(clickerUpgrades[i].name + 'Cost', clickerUpgrades[i].basePrice);
            localStorage.setItem(clickerUpgrades[i].name + 'Count', 0);
            
        }
    }
    
    
    var changeBg = function(color) {
        var color = color;
        $( 'body' ).css('background', color);
    }
    
    var changeFontColor = function(fontColor) {
        $( 'body' ).css('color', fontColor);
    }
    
    var setCurrentColor = function(currentColor) {
        $('#currentColor').text(currentColor);
    }
    
    var events = function() {

//        var ev = this;
        
        $( document ).on( 'click', '#clicker', clickClicker );

        $( document ).on( 'click', '#pizzerman', function() {
            clickUpgrade(upgrades[0]);
        } );
        
        $( document ).on( 'click', '#waitress', function() {
            clickUpgrade(upgrades[1]);
        } );

        $( document ).on( 'click', '#deliveryboy', function() {
            clickUpgrade(upgrades[2]);
        } );

        $( document ).on( 'click', '#manager', function() {
            clickUpgrade(upgrades[3]);
        } );
        
        $( document ).on( 'click', '#godfather', function() {
            clickUpgrade(upgrades[4]);
        } );
        
        $( document ).on( 'click', '#cursor', function() {
            clickUpgrade(clickerUpgrades[0]);
        } );
        
        $( document ).on( 'click', '#rollingPin', function() {
            clickUpgrade(clickerUpgrades[1]);
        } );
        
        $( document ).on( 'click', '#pizzaBox', function() {
            clickUpgrade(clickerUpgrades[2]);
        } );
        
        $( document ).on( 'click', '#briefcase', function() {
            clickUpgrade(clickerUpgrades[3]);
        } );

        $( document ).on( 'click', '#save', save );

        $( document ).on( 'click', '#load', load );

        $( document ).on( 'click', '#reset', function() {
            reset();
            load();
        });
        
        $( document ).on( 'click', '#fancy', function() {
            changeFontColor('#333');
            changeBg('-webkit-linear-gradient(top, rgba(252,234,187,1) 0%, rgba(252,205,77,1) 33%, rgba(248,181,0,1) 73%, rgba(251,223,147,1) 100%)fixed');
            setCurrentColor('fancy');
        });
        
        $( document ).on( 'click', '#minimalistic', function() {
            changeFontColor('#333');
            changeBg('#FABE1D');
            setCurrentColor('minimalistic');
        });
        
        $( document ).on( 'click', '#dark', function() {
            changeFontColor('#D4D4D4');
            changeBg('#000');
            setCurrentColor('dark');
        });
        
        $( document ).on( 'click', '#myBtn', function(){
            $('#myModal').css('display', 'block');
        });
        
        $( document ).on( 'click', '.close', function(){
            $('#myModal').css('display', 'none');
        });
        
        $( document ).on( 'click', '#myModal', function(){
            $('#myModal').css('display', 'none');
        });

    };
    
    // buttony domyślnie ustawione na disabled
    var disableButtons = function() {
        
        for(var i = 0; i < upgrades.length; i++) {
            $(upgrades[i].id).attr("disabled", true);
        } 
        
        for(var i = 0; i < clickerUpgrades.length; i++) {
            $(clickerUpgrades[i].id).attr("disabled", true);
        }
    };
    
    
    var construct = function() {                                   // konstruktor
        events();
        disableButtons();
        load();                                                // wczytywanie danych z localStorage po wejściu na stronę - 1000ms / 30fps = 33
        setInterval(update, 500);                             // wywołanie metody aktualizującej dane na stronie co 1 sekundę - 1000ms / 30fps = 33
        setInterval(updateTitle, 500);
        setInterval(checkPizza, 500);                          // wywołanie metody sprawdzającej czy można się wklikać w dane ulepszenie czy nie co 0.1s
        setInterval(save, 60000);                              // autozapis co 60 sekund
        setInterval(updateAutoClicks, 1000);                   // TO DO // nie wolno zmieniać wartości, inaczej wszystko się psuje :( :( :(
        
        
    }
    
    return { start: construct };
    

};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {
    var Clicker = new PizzaClickerGame().start();
});

