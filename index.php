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
        <script language="javascript" type="text/javascript" src="js/contribution.js"></script>
        <script language="javascript" type="text/javascript" src="js/loginAndSignup.js"></script>
    </head>
    
    <body onload="checkLoggedIn()" style="text-align: center">
        <?php include "nav.php" ?>
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
            Dialect: <select name="slangDialect"><option>All</option><option>Standard</option>
            </select> <br/>
            ORDER: 
            <input type="radio" value="newest-first"> Newest first
            <input type="radio" value="oldest-first"> Oldest first <br/>
        </div>
        
        <!-- Contribute -->
        <div id="contributePage">
          <h1>Make a Contribution</h1>
          <div class="contributeBox">
                <!--<div class="supportedLanguages"></div>-->
              </select>
              <input id="contributeTextOne" type="text" placeholder="First Language Pair"></input>
                Language: <select id="contributeLangOne">
                  <option>Select Language...</option>
                  <?php
                  foreach(getSupportedLanguages() as $lang) {
                    echo "<option>".$lang."</option>";
                  }
                  ?>
                  <!--<div class="supportedLanguages"></div>-->
                </select>
                Dialect: <input type="text" id="contributeDialectOne" value="Standard"></input>
                <br><img id="downArrow" src="img/down.png" alt="downArrow"/><br>
                <input id="contributeTextTwo" type="text" placeholder="Second Language Pair"></input>
                Language: <select id="contributeLangTwo">
                  <option id>Select Language...</option>
                  <?php
                  foreach(getSupportedLanguages() as $lang) {
                    echo "<option>".$lang."</option>";
                  }
                  ?>
                  <!--<div class="supportedLanguages"></div>-->
              </select>
              Dialect: <input type="text" id="contributeDialectTwo" value="Standard"></input><br>
              <button id="contributeButton" type="button" class="btn btn-primary btn-lg">Contribute</button>
          </div> <br>
          <div class="contributeBox" id="displayUserContributions"></div>
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