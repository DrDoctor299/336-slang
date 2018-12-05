
<!DOCTYPE html>
<html>
    <head>
        <title>Google Slang</title>
        <meta charset="UTF-8">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">
        <link rel="stylesheet" href = "css/styles.css">
        <script language="javascript" type="text/javascript" src="inc/functions.js"></script>

    </head>
    
    <body style="text-align: center">
        <ul class="nav nav-tabs justify-content-end">
          <li class="nav-item">
            <a class="nav-link active" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Contribute</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Sign Up</a>
          </li>
        </ul>
        <img src="img/logo.png" alt="logo"><br><br>
        <form>
          <select id="startLang"><option>Starting Language</option></select>
          <select id="resultLang"><option>English</option></select>
          <select id="dialect"><option>Dialect</option></select>
          <br>
          <textarea id="startMessage" maxlength=250></textarea>
          <textarea id="resultMessage" maxlength=250></textarea>
        </form>
    </body>
</html>