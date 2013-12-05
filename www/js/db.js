function login(id, first_name, last_name, email){
    function populateDB(tx) {
    tx.executeSql('DROP TABLE IF EXISTS User');
    tx.executeSql('CREATE TABLE IF NOT EXISTS User (id unique, first_name, last_name, email)');
    tx.executeSql('INSERT INTO User (id, first_name, last_name, email) VALUES (?,?,?,?)',[id, first_name, last_name, email]);
    }

    function errorCB(err) {
        alert("Error processing SQL: "+err.code);
    }

    function successCB() {
        alert("success!");
        document.location.href = 'index.html';
    }
    var db = window.openDatabase("User", "1.0", "User DB", 1000000);
    db.transaction(populateDB, errorCB, successCB);
    //document.location.href = 'index.html';

}

function getCurrentUsersName() {

    function queryDB(tx) {
        //tx.executeSql('DROP TABLE IF EXISTS User');
        tx.executeSql('SELECT first_name FROM User', [], querySuccess, errorCB);
    }

    function querySuccess(tx, results) {
        console.log("Returned rows = " + results.rows.length);
        var num = results.rows.length;
        // this will be true since it was a select statement and so rowsAffected was 0
        if (!results.rowsAffected) {
            console.log('No rows affected!');
            $('#name').append(results.rows.item(num-1).first_name + ',');
            return false;
        } else {

        }
        // for an insert statement, this property will return the ID of the last inserted row
        console.log("Last inserted row ID = " + results.insertId);
    }

    function errorCB(err) {
        alert("Error processing SQL: "+err.code);
        document.location.href = 'signup.html';
    }

    var db = window.openDatabase("User", "1.0", "User DB", 1000000);
    db.transaction(queryDB, errorCB);
    //tx.executeSql('SELECT first_name FROM User', [], function (tx, results) {
    //alert(results.rows.item(i).first_name);
    //$('#name').append(data.items.first_name + ',');
 }