<?php

$host = "localhost";
$user = "root";
$pass = "";
$db   = "sb_guajiro";

$con = new mysqli($host, $user, $pass, $db);

if ($con -> connect_error){
    die("Error de conexion". $con ->connect_error);
}