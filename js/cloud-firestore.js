

firebase.initializeApp(firebaseConfig);		
var db = firebase.firestore();


$('#insert').click(function(){
	var collectionName = "users";
	var fName = $('#fname').val();
	var lName = $('#lname').val();
	var dob = $('#dob').val();;
	addData(collectionName, fName, lName, dob);
});

function addData(collectionName, fName, lName, dob){
	
	db.collection(collectionName).add({
    first: fName,
    last: lName,
    born: dob
	})
	.then((docRef) => {
		console.log("Document written with ID: ", docRef.id);
	})
	.catch((error) => {
		console.error("Error adding document: ", error);
	});

}


function readData(){
	
	db.collection("users").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        console.log(`${doc.first} +"\t"+ ${doc.last}`);
    });
});
	
}


function deleteData(){
	
}