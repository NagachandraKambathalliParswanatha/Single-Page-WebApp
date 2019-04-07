use CGI;
use DBI;
use CGI::Session;
use CGI::Carp qw (fatalsToBrowser);

my $q = new CGI;
my $cookie_sid = $q->cookie('jadrn053SID');
my $session = new CGI::Session(undef, $cookie_sid, {Directory=>'/tmp'});
my $sid = $session->id;

if($cookie_sid ne $sid) {
	print "Content-type:text/html\n\n";
	print "AccessFailed";
	return;
}


my $sku = $q->param('sku');

my $host = 'opatija.sdsu.edu';
my $port = '3306';
my $database = 'jadrn053';
my $username = 'jadrn053';
my $password = 'calendar';

my $database_source = "dbi:mysql:$database:$host:$port";
my $dbh = DBI->connect($database_source, $username, $password)
	or die "Cannot connect to DB";
	
my $sth = $dbh->prepare("SELECT sku FROM product where sku='$sku'");
$sth->execute();
my $number_of_rows = $sth->rows;
$sth->finish();
$dbh->disconnect();
print "content-type: text/html\n\n";

if($number_of_rows == 0) {
	print "OK";
	}
else {
	print "DUPLICATE";
	}

