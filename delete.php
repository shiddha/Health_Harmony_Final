<?php
    $id = $_GET['id'];
    $utype = $_GET['utype'];
    require_once('db_conn.php');
    $connect = mysqli_connect('localhost','root','','auth_db')
        or die("Can not connect");

        // mysqli_query($connect,"DELETE FROM doctors WHERE id=$id")
        // or die("Can not execute query");
    if($utype == 'doctor'){
        mysqli_query($connect,"DELETE FROM users WHERE id=$id")
        or die("Can not execute query");
    }
    else if($utype == 'patient'){
        mysqli_query($connect,"DELETE FROM users WHERE id=$id")
        or die("Can not execute query");
    }

    echo "Record Deleted<br>";
    //echo "<p><a href='read.php'>Read all the records</a></p>";
?>
