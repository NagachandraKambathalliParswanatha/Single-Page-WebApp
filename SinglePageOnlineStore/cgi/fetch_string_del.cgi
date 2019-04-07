#!/usr/bin/perl

use DBI;
use CGI;

my $host = "opatija.sdsu.edu";
my $port = "3306";
my $database = "jadrn053";
my $username = "jadrn053";
my $password = "calendar";
my $database_source = "dbi:mysql:$database:$host:$port";
my $response = "";
my $response1 = "";


my $dbh = DBI->connect($database_source, $username, $password)
    or die 'Cannot connect to db';

my $q = new CGI;
my $skuForDel = $q->param("skuForDel");

my $query = "SELECT sku, catID, venID, vendorModel, description, features, cost, retail, quantity, image FROM product where sku = '$skuForDel'";

my $sth = $dbh->prepare($query);
$sth->execute();


my $number_of_rows = $sth->rows;
if($number_of_rows == 0) {
    $response1 = "ERROR";
}
else {
    $response1 = "OK";
}




while(my @row=$sth->fetchrow_array()) {
    foreach $item (@row) {
        $response .= $item."|"; #field separator
    }
    $response = substr $response, 0, (length($response)-1);
    $response .= "||";  #record separator
}
$response = substr $response, 0, (length($response)-2);
unless($response) {
    $response = "invalid";
}

$sth->finish();
$dbh->disconnect();

print "Content-type: text/html\n\n";
print $response;
