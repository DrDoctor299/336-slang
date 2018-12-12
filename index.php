
<!DOCTYPE html>
<html>
    <head>
        <title>Google Slang</title>
        <meta charset="UTF-8">
        <!--Jquery-->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <!--bootstrap js and css-->
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">
        <!--custom css-->
        <link rel="stylesheet" href = "css/styles.css">
        <!--all custom js-->
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
            <select id="dialect"><option value="">Dialect</option><option>Standard</option></select>
            <br>
            <textarea id="sourceMessage" maxlength=250></textarea>
            <textarea id="targetMessage" disabled="true"></textarea>
        </div>
        
        <!-- Slang -->
        <!--TODO on search : total number of results, total unique users, total number of contributions in the search results made by current user (or something else for people not logged in)-->
        <div id="slangPage">
          <h1>All Slang</h1>
            <div id="aggData"></div>
            Search:  <input type="text" id="slangSearch"></input> 
            Language: <select id="slangLang"><option value="">Select Language...</option></select>
            Dialect: <input type="text" id="slangDialect">
            </select> <br/>
            ORDER: 
            <input class="slangOrderBy" id="slangByUser" name="order" type="radio"> User
            <input class="slangOrderBy" id="slangByLang" name="order" type="radio"> Language <br/>
            <div class="contributeBox" id="results"></div>
            <div class="contributeBox" id="resultsMetadata"></div>
        </div>
        
        <!-- Contribute -->
        <div id="contributePage">
          <h1>Make a Contribution</h1>
          <div class="contributeBox">
              <input id="contributeTextOne" type="text" placeholder="First Language Pair"></input>
                Language: <select id="contributeLangOne">
                </select>
                Dialect: <input type="text" id="contributeDialectOne" value="Standard"></input>
                <br><img id="downArrow" src="img/down.png" alt="downArrow"/><br>
                <input id="contributeTextTwo" type="text" placeholder="Second Language Pair"></input>
                Language: <select id="contributeLangTwo">
              </select>
              Dialect: <input type="text" id="contributeDialectTwo" value="Standard"></input><br>
              <button id="contributeButton" type="button" class="btn btn-primary btn-lg">Contribute</button>
          </div> <br>
          <div class="contributeBox" id="displayUserContributions"></div>
        </div>
        <!--Contributons edit modal-->
        <div id="editModal" class="modal fade" role="dialog">
          <div class="modal-dialog modal-lg">
        
            <!-- Modal content-->
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">Edit Contribution</h4>
                <button type="button" class="close" data-dismiss="modal">&times;</button>
              </div>
              <div class="modal-body">
                <input id="editTextOne" type="text" placeholder="First Language Pair"></input>
                Language: <select id="editLangOne"></select>
                Dialect: <input type="text" id="editDialectOne" value="Standard"></input>
                <br><img id="downArrow" src="img/down.png" alt="downArrow"/><br>
                <input id="editTextTwo" type="text" placeholder="Second Language Pair"></input>
                Language: <select id="editLangTwo"></select>
                Dialect: <input type="text" id="editDialectTwo" value="Standard"></input><br>
                <button id="editButton" type="button" class="btn btn-primary btn-lg" data-dismiss="modal">Submit Edit</button>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
              </div>
            </div>
        
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