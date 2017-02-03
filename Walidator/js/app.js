$( document ).ready(function() {
    
    function validate() {
        
        var validateAll = true; //zmienna typu "flaga", zwróci 'false' jeżeli jakakolwiewiek walidacja pójdzie źle.
        
        this.getInput = function(argument) {
            var argument = $('#' + argument + 'Input').val(); //pobieramy z HTML to co chcemy sprawdzić.
            return argument;
        };
        
        /////////////////////////////////////////////FUNKCJA SPRAWDZAJACA NIP///////////////////////////////////////////
        this.CheckNIP = function() {
            
            var validateArray = [6, 5, 7, 2, 3, 4, 5, 6, 7]; //gotowa tablica z "wagami" walidacyjnymi z wikipedii
            
            var temp = [];
            var nip = this.getInput('nip');
                nip = nip.toString().split(''); //parsujemy na stringa
            
            var checkSum = 0; //zmienna pomocnicza
            
            for(var i = 0; i < validateArray.length; i++) {
                
                checkSum += parseInt(nip[i]) * parseInt(validateArray[i]); //sprawdzamy sumę kontrolną
            }
            
            if(checkSum % 11 == parseInt(nip[9])) {
                console.log('nip poprawny');
                return true;
            }
            else {
                console.log('nip zły');
                validateAll = false;
                return false;
            }
        };
        
        /////////////////////////////////////////////FUNKCJA SPRAWDZAJACA PESEL///////////////////////////////////////////
        this.CheckPESEL = function() {
            
            var validateArray = [9,7,3,1,9,7,3,1,9,7];
            
            var temp = [];
            var pesel = this.getInput('pesel');
                pesel = pesel.toString().split('');
            
            var checkSum = 0;
            
            for(var i = 0; i < validateArray.length; i++) {
                
                checkSum += parseInt(pesel[i]) * parseInt(validateArray[i]);
            }
            
            if(checkSum % 10 == parseInt(pesel[10])) {
                console.log('pesel poprawny');
                return true;
            }
            else {
                console.log('pesel zły');
                validateAll = false;
                return false;
            }
        };
        
        /////////////////////////////////////////////FUNKCJA SPRAWDZAJACA REGON///////////////////////////////////////////
        this.CheckRegon = function() {
            
            var validateArray = [8,9,2,3,4,5,6,7];
            
            var temp = [];
            var regon = this.getInput('regon');
                regon = regon.toString().split('');
            
            var checkSum = 0;
            
            for(var i = 0; i < validateArray.length; i++) {
                
                checkSum += parseInt(regon[i]) * parseInt(validateArray[i]);
            }
            
            
            if(checkSum % 11 == parseInt(regon[8])) {
                console.log('regon poprawny');
                return true;
            }
            else {
                console.log('regon zły');
                validateAll = false;
                return false;
            }
        };
        
        
        /////////////////////////////////////////////FUNKCJA SPRAWDZAJACA TELEFON///////////////////////////////////////////
        this.CheckPhone = function() {
            
            //Telefon w sumie jest zrobiony kijowo bo zabezpieczony jest w pliku HTML
            
            var temp = [];
            var phone = this.getInput('telefon');
                phone = phone.replace(/\-/g, '').replace(/\+/g, '');
                phone = phone.toString().split('');
            
            console.log('Numer się zgadza xD');
            return true;
        };    
        
		
		this.Construct = function() {
            
            this.CheckNIP(); // !!!!!!!!!!! ZAKOMENTOWAĆ JEŻELI AKURAT TEGO NIE SPRAWDZAMY !!!!!!!!!!!
            this.CheckPESEL(); // !!!!!!!!!!! ZAKOMENTOWAĆ JEŻELI AKURAT TEGO NIE SPRAWDZAMY !!!!!!!!!!!
            this.CheckRegon(); // !!!!!!!!!!! ZAKOMENTOWAĆ JEŻELI AKURAT TEGO NIE SPRAWDZAMY !!!!!!!!!!!
            this.CheckPhone(); // !!!!!!!!!!! ZAKOMENTOWAĆ JEŻELI AKURAT TEGO NIE SPRAWDZAMY !!!!!!!!!!!
            
            if(validateAll == true) {
                alert('walidacja przebiegla pomyslnie');
            }
            else {
                alert('BŁĄD!!!');
            }

		};
        
		this.Construct();
	};
	
    
    $('#validateButton').click(function() {
        var o = new validate();
    
    });
    
    
});




