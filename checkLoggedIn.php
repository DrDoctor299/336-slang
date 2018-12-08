<?php
    $ret = array();
    session_start();
    if(!empty($_SESSION["username"]))
        $ret["success"] = true;
    echo json_encode($ret);
?>