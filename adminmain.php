<?php

    include "db_conn.php";
    include 'php/User.php';
    require_once('db_conn.php');
    $connect = mysqli_connect('localhost','root','','auth_db')
        or die("Can not connect");
    
    $result = mysqli_query($connect, 'SELECT * FROM users')
        or die('Can not execute query');

    echo "<h2>Admin Dashboard</h2>";
    
    echo "<h3>Doctors</h3>";
    echo "<table border>\n";
    echo "<th>Fullname</th> <th>Username</th> <th>Image</th> <th>Delete</th>\n";
    while($rows = mysqli_fetch_array($result)){
        extract($rows);
        echo "<tr>";
        if($utype == 'doctor'){
        echo "<td>$fname</td>";
        echo "<td>$username</td>";
	    echo "<td>$pp</td>";

        //echo "<td><img src='" . $pp . "' class='img-fluid rounded-circle' style='width: 1px'></td>";

        echo "<td><a href= 'delete.php?id=$id&utype=$utype'>Delete</a></td>";
        }
        //echo "<td><a href= 'update.php?id=$id&username=$username&age=$age&degree=$degree&specialist=$specialist&address=$address&doctor_image=$doctor_image'>Update</a></td>";
        echo "</tr>\n";
    }
    echo "</table>\n";

	echo "<h3>Patients</h3>";

    $resultp = mysqli_query($connect, 'SELECT * FROM users')
        or die('Can not execute query');
	echo "<table border>\n";
    echo "<th>Fullname</th> <th>Username</th> <th>Image</th> <th>Delete</th>\n";
    while($rows = mysqli_fetch_array($resultp)){
        extract($rows);
        echo "<tr>";
        if($utype == 'patient'){
            echo "<td>$fname</td>";
            echo "<td>$username</td>";
            echo "<td>$pp</td>";
            echo "<td><a href= 'delete.php?id=$id&utype=$utype'>Delete</a></td>";
        }
        //echo "<td><a href= 'update.php?id=$id&username=$username&age=$age&address=$address&diseases=$diseases&medical_image=$medical_image'>Update</a></td>";
        echo "</tr>\n";
    }
    echo "</table>\n";
    //echo "<p><a href=create_input.php>CREATE a new record</a>";
?>