#!/usr/bin/perl
use CGI;
use DBI;
use CGI::Carp qw (fatalsToBrowser);

####################################################################
### constants
$CGI::POST_MAX = 1024 * 3000; # Limit file size to 3MB
my $upload_dir = '/home/jadrn053/public_html/file_upload/_uploadDIR_/';
my $safe_filename_chars = "a-zA-Z0-9_.-";
####################################################################

my $host = 'opatija.sdsu.edu';
my $port = '3306';
my $database = 'jadrn053';
my $username = 'jadrn053';
my $password = 'calendar';

my $database_source = "dbi:mysql:$database:$host:$port";

my $dbh = DBI->connect($database_source, $username, $password)
    or die "Cannot connect to DB";
	
my $q = new CGI;
my $skud = $q->param("skuForDel");
my $filename = $q->param("Delfilename");

my $todel = $upload_dir.$filename;
unlink($todel);

my $sth = $dbh->prepare("DELETE FROM product where sku = '$skud'");
$sth->execute();


my $number_of_rows = $sth->rows;
$sth->finish();
$dbh->disconnect();



if($number_of_rows == 0) {
    $response = "ERROR";
}
else {
    $response = "OK";
}
print "content-type: text/html\n\n";
print $response;

