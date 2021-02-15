	
	var firebaseRealTimeDatabase = null;	
	
	// Your web app's Firebase configuration - Development
	   var firebaseConfig = {
		apiKey: "AIzaSyAaIaM24Pa1zga0YfUF6VAARJ1-cBW_tiY",
		authDomain: "pring-27b4e.firebaseapp.com",
		databaseURL: "https://pring-27b4e.firebaseio.com",
		projectId: "pring-27b4e",
		storageBucket: "pring-27b4e.appspot.com",
		messagingSenderId: "266917635560",
		appId: "1:266917635560:web:617cf7c32e679da7d2f05d"
	  }; 
	 
	  
	// Your web app's Firebase configuration - Demo
	
	/* var firebaseConfig = {
		apiKey: "AIzaSyAiMFKwaY3Xt4Xy5Oy7_IK_mv9gAE5FdIE",
		authDomain: "pring-dev-ac0a2.firebaseapp.com",
		databaseURL: "https://pring-dev-ac0a2.firebaseio.com",
		projectId: "pring-dev-ac0a2",
		storageBucket: "pring-dev-ac0a2.appspot.com",
		messagingSenderId: "1074872057405",
		appId: "1:1074872057405:web:382bdad74b324bce52f454"
	}; */
		
	
			
	// Global Function
	function getFirebaseDatabase(){		
		//Initialize Firebase
		firebase.initializeApp(firebaseConfig);		
		var database = firebase.database(); 		
		var ref  = database.ref();			
		ref.on("value", function(data) {
			firebaseRealTimeDatabase = data.val();							   
		   return firebaseRealTimeDatabase;		  
		}, function (error) {
		   console.log("Error: " + error.code);
		   return null;
		});			
	}
	
	function getFirebaseDatabaseOnly(){		
		//Initialize Firebase
		firebase.initializeApp(firebaseConfig);		
		var database = firebase.database(); 		
		return database;
	}
	
	function getfirebaseApp(){
		try{
			var app = firebase.initializeApp(firebaseConfig);	
			return app;
		}catch(err){
			console.log(err);
			return null;
		}
	}
	
	
	
	
	
	
	

	
	
	
	

	
	
	
	
	