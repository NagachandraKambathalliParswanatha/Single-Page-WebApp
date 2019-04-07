use CGI;
use CGI::Session;
use CGI::Carp qw (fatalsToBrowser);

my $q = new CGI;
my $sid = $q->cookie("jadrn053SID") || undef;
$session = new CGI::Session(undef, $sid, {Directory => '/tmp'});
$session->delete();
my $cookie = $q->cookie(jadrn053SID => '');
print $q->header( -cookie=>$cookie ); #send cookie with session ID to browser  


print <<END;    
    
<!DOCTYPE html>

<title>Login </title>

<html>
<head>

    <!--<link href="/~jadrn053/proj1/css/bootstrap.min.css" rel="stylesheet">-->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
    <script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
    <link rel="stylesheet" href="/~jadrn053/proj1/login.css">
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
    <link href="/~jadrn053/proj1/signin.css" rel="stylesheet">
</head>
<body>
<nav class="navbar navbar-inverse">
    <div class="container-fluid">
        <div class="navbar-header">
            <ul class="nav navbar-nav">
                <li class="active"><a href="#"><b>CameraMart</b></a></li>
            </ul>
        </div>
        <!--<ul class="nav navbar-nav">
            <li class="active"><a href="#">Home</a></li>
        </ul>-->
    </div>
</nav>
<div class="container">
    <div id="loginbox" class="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 loginbox">
        <div class="panel panel-info" >
            <div class="panel-heading">
                <div class="panel-title"> Sign In </div>

            </div>
            <div class="panel-body panel-pad">
                <div id="login-alert" class="alert alert-danger col-sm-12 login-alert"></div>
                <form id="loginform" class="form-horizontal" role="form" method="POST" action="/perl/jadrn053/login.cgi">

                    <div class="input-group margT25">
							<span class="input-group-addon">
								<i class="glyphicon glyphicon-user"></i>
							</span>
                        <input id="login-username" type="text" class="form-control" name="user" value="" placeholder="Username">
                    </div>
                    <div class="input-group margT25">
                        <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
                        <input id="login-password" type="password" class="form-control" name="password" placeholder="Password">
                    </div>
                    <div class="form-group margT10">
                        <!-- Button -->
                        <div class="col-sm-12 controls">
                            <button class="btn btn-lg btn-primary btn-block" type="submit">Log in</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
<h2 class="error">You ARE NOW LOGGED OUT, Enter username or password to login</h2>
</body>
</html>


END