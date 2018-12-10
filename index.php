<?php

include "checkSupportedLanguages.php";

?>

<!DOCTYPE html>
<html>
    <head>
        <title>Google Slang</title>
        <meta charset="UTF-8">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">
        <link rel="stylesheet" href = "css/styles.css">
        <script language="javascript" type="text/javascript" src="js/navigation.js"></script>
        <script language="javascript" type="text/javascript" src="js/translation.js"></script>
        <script language="javascript" type="text/javascript" src="js/slang.js"></script>
        <script language="javascript" type="text/javascript" src="js/loginAndSignup.js"></script>

    </head>
    
    <body style="text-align: center">
        <ul class="nav nav-tabs justify-content-end">
          <li class="nav-item" id="homeLink" >
            <a class="nav-link active" href="#home">Home</a>
          </li>
          <li class="nav-item" id="slangLink">
            <a class="nav-link" href="#Slang">Slang</a>
          </li>
          <li class="nav-item" id="contributeLink">
            <a class="nav-link" href="#Contribute">Contribute</a>
          </li>
           <li class="nav-item" id="loginLink">
            <a class="nav-link" href="#Login">Login</a>
          </li>
        </ul>
        <!-- Homepage -->
        <div id="homePage">
          <img src="img/logo.png" alt="logo"><br><br>
            <select id="sourceLang"></select>
            <select id="targetLang"></select>
            <select id="dialect"><option>Dialect</option></select>
            <br>
            <textarea id="sourceMessage" maxlength=250></textarea>
            <textarea id="targetMessage" disabled="true"></textarea>
        </div>
        
        <!-- Slang -->
        <div id="slangPage">
          <h1>All Slang</h1>
            Search:  <input type="text" id="slangSearch"></input> 
            Language: <select id="slangLang">
            </select>
            Dialect: <select name="slangDialect">
            </select> <br/>
            ORDER: 
            <input type="radio" value="newest-first"> Newest first
            <input type="radio" value="oldest-first"> Oldest first <br/>
        </div>
        
        <!-- Contribute -->
        <div id="contributePage">
          <h1>Make a Contribution</h1>
          <div id="contributeBox">
              First Language: <select>
                <option>Select Language...</option>
                <?php
                foreach(getSupportedLanguages() as $lang) {
                  echo "<option>".$lang."</option>";
                }
                ?>
                <!--<div class="supportedLanguages"></div>-->
              </select>
              <input type="text" placeholder="First Language Pair"></input>
              <input type="text" placeholder="Second Language Pair"></input>
              Second Language: <select id="contributeLang">
                <option id>Select Language...</option>
                <?php
                foreach(getSupportedLanguages() as $lang) {
                  echo "<option>".$lang."</option>";
                }
                ?>
                <!--<div class="supportedLanguages"></div>-->
              </select>
              Dialect: <input type="text" id="contributeDialect"></input>
              <button id="contributeButton" type="button" class="btn btn-primary btn-lg">Contribute</button>
          </div>
        </div>
        
        <!-- Login -->
        <div id="loginPage">
          <!-- By default -->
          <div id="loginDiv">
            <h1>Log In</h1><br>
            <div id="loginErrorMessage">The information doesn't match our records</div>
            <input type="text" id="loginUsername" placeholder="Enter Username"></input><br>
            <input type="password" id="loginPassword" placeholder="Enter Password"></input> <br><br>
            <button id="tryLoginButton" type="button" class="btn btn-primary btn-lg">Login</button>
          </div>
          <div id="signupPrompt">
            <h2>Don't have an account yet?</h2>
            <button id="signupButton" type="button" class="btn btn-success btn-lg">Sign Up</button>
          </div>
          <!-- If user clicks signup -->
          <div id="signupDiv">
            Username: <br>
            <input type="text" id="signupUsername"></input> <br>
            Password: <br>
            <input type="password" id="signupPassword"></input> <br>
            Retype Password: <br>
            <input type="password" id="retypedPassword"></input> <br><br>
            <button id="trySignupButton" type="button" class="btn btn-primary btn-lg">Sign Up</button>
          </div>
        </div>
    </body>
</html>