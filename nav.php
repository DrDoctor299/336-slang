<?php 
session_start();
echo '<ul class="nav nav-tabs justify-content-end">';
    echo'<li class="nav-item" id="homeLink" >';
        echo'<a class="nav-link active" href="#home">Home</a>';
    echo'</li>';
    echo'<li class="nav-item" id="slangLink">';
        echo'<a class="nav-link" href="#Slang">Slang</a>';
    echo '</li>';
    echo '<li class="nav-item" id="contributeLink">';
        echo'<a class="nav-link" href="#Contribute">Contribute</a>';
    echo'</li>';
    echo'<li class="nav-item" id="loginLink">';
        if(empty($_SESSION['username']))
            echo'<a class="nav-link" href="#Login">Login</a>';
        else
            echo'<a class="nav-link" href="#Login">Logout</a>';
    echo'</li>';
echo'</ul>';

?>