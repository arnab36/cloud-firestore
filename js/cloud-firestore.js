

firebase.initializeApp(firebaseConfig);		
var db = firebase.firestore();
var list = [];
var idList = [];

idList = ["PVoU4up7hF6vCExdjNTf","0QY4VvietMHAHHsYwpvM","0qui5c4YGptsb10o0pKH","2Rm0HUJFvWGlTOaXFpFV","M8ZqEVCmshSnSqpQ644W","VNLvp5DUwM3wRDG4z9Jg","XH7g1bOes6BVqEaKCd3D",
		"aKJcgMGA9ZpnrGtrcJZP","blVTX1K4WCNeT5fnynij","eMAiIi3fWOTqUdXyPejN"];
		

$('#insert').click(function(){
	var collectionName = "users";
	var fName = $('#fname').val();
	var lName = $('#lname').val();
	var sub = $('#sub').val();;
	addData(collectionName, fName, lName, sub);
});

function addData(collectionName, fName, lName, sub){
	
	db.collection(collectionName).add({	
    sender: fName,
    receiver: lName,
    sub: sub
	})
	.then((docRef) => {
		console.log("Document written with ID: ", docRef.id);
		db.collection("users").doc(docRef.id).set({
			id:docRef.id
		},{ merge: true });
	})
	.catch((error) => {
		console.error("Error adding document: ", error);
	});

}

function setData(collectionName, fName, lName, sub){	
	
	// Add a new document with a generated id.
	var dataObj = db.collection(collectionName).doc();
	
	var data = {
		id:dataObj.id,
		sender: fName,
		receiver: lName,
		sub: sub
	}

	// later...
	dataObj.set(data);

}


function deleteAll(){
	db.collection("users").get().then((querySnapshot) => {
		querySnapshot.forEach((doc) => {
			deleteData(doc.id)            
		});
	});
}


function deleteData(docId){
	db.collection("users").doc(docId).delete().then(() => {
    console.log("Document successfully deleted!");
	}).catch((error) => {
		console.error("Error removing document: ", error);
	});

}



function add_all(){
	var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
	var collectionName = "users";
	var count = 0;
	for(var i in alphabet){
		for(var j in alphabet){
			if(alphabet[i] != alphabet[j]){
				console.log(alphabet[i] + "\t" + alphabet[j]);
				// addData(collectionName, alphabet[i], alphabet[j], alphabet[i]+"-"+alphabet[j]);
				setData(collectionName, alphabet[i], alphabet[j], alphabet[i]+"-"+alphabet[j]);
				count++;				
			}			
		}			
	}
	console.log("Document added => "+count);
}



$('#query').click(function(){
	var key = $("#search").val();
	list = [];
	// Display All Data
	/* var op = db.collection("users")
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					console.log(doc.data());      
					list.push(doc);
				});
			}); */
			
	var op = db.collection("users")
		.where("sender", "==", key)
		.get()
		.then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				console.log(doc.data());      
				list.push(doc);
			});
		});
			
			
	
	op.then(() => {
		displayData(list)
	});
	
});


function displayData(list){
	console.log(list.length);
	var div = document.getElementById('table');
	div.innerHTML = "";
	
	var content = "";
	content += '<table style="width:25%">';	
	content += '<tr><th>Header</th><th>Sender</th><th>Receiver</th><th>Subject</th></tr>';

	for(var i in list){
		var doc = list[i];
		content +=  '<tr>'+ '<td>'+ doc.id +'</td>'+'<td>'+ doc.data().sender +'</td>'+'<td>'+ doc.data().receiver +'</td>' +'<td>'+ doc.data().sub +'</td>' +'</tr>';			
	}
	
	content += '</table>';	
	div.innerHTML += content;	
}



function addListener(){	
	var key = $("#search").val();	
	db.collection("users")
	.where("sender", "==", key)
    .onSnapshot((querySnapshot) => {      
       $('#query').click();
    });


}


function updateDocument(id,data){
	console.log(id);
	console.log(data);
	db.collection("users").doc(id).set({
		sub:data
	},{ merge: true })
	.then(() => {
		console.log("Document successfully written!");
	})
	.catch((error) => {
		console.error("Error writing document: ", error);
	});
}


$("#update").click(function() {
	var id = $("#docId").val();
	var data = $("#changedSub").val();
	if(id == null || id == ""){
		return;
	}
	if(data == null || data == ""){
		return;
	}
	updateDocument(id,data);
});


function displayDatainList(collectionName, fieldName, idList){
	
	var docList = [];
	
	var op = db.collection(collectionName)
		.where(fieldName, "in", idList)
		.get()
		.then((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				console.log(doc.data());      
				docList.push(doc);
			});
		});
	
	op.then(() => {
		displayData(docList)
	});
}




















