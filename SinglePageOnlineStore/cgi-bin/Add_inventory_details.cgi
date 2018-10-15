#!/usr/bin/perl
use CGI;
use DBI;
use File::Basename;
use CGI::Session;
use CGI::Carp qw (fatalsToBrowser);

my $q = new CGI;
my $cookie_sid = $q->cookie('jadrn053SID');
my $session = new CGI::Session(undef, $cookie_sid, {Directory=>'/tmp'});
my $sid = $session->id;

if($cookie_sid ne $sid) {
    print <<END;
Content-type:  text/html

<html>
<head>
    <meta http-equiv="refresh"
        content="0; url=http://jadran.sdsu.edu/~jadrn053/proj1/ErrorPage.html" />
</head><body></body>
</html>

END
    return;
}

####################################################################
### constants
$CGI::POST_MAX = 1024 * 3000; # Limit file size to 3MB
my $upload_dir = '/home/jadrn053/public_html/file_upload/_uploadDIR_';
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
my $sku = $q->param("sku");
my $catID = $q->param("categories");
my $venID = $q->param("vendor");
my $quantity = $q->param("Quantity");
my $vendorModel = $q->param("ManufacturerId");
my $cost = $q->param("cost");
my $retail = $q->param("retail");
my $description = $q->param("description");
my $features = $q->param("features");
my $filename = $q->param("product_image");


unless($filename)
{
    $response = "There was a problem uploading the image;
        it's probably too big";
    die "There was a problem uploading the image; ".
            "it's probably too big.";
}
my ($name, $path, $extension) = fileparse($filename, '\.[^\.]*');
$filename = $sku.$extension;
$filename =~ s/ //; #remove any spaces
if($filename !~ /^([$safe_filename_chars]+)$/) {
    die "Sorry, invalid character in the filename.";
    $response = "Sorry, invalid character in the filename.";
}

$filename = untaint($filename);
# get a handle on the uploaded image
my $filehandle = $q->upload("product_image");
unless($filehandle) { die "Invalid handle"; }

# save the file
open UPLOADFILE, ">$upload_dir/$filename" or die
    "Error, cannot save the file.";
binmode UPLOADFILE;
while(<$filehandle>) {
    print UPLOADFILE $_;
}
close UPLOADFILE;

my $sth = $dbh->prepare("INSERT INTO product VALUES('$sku','$catID','$venID','$vendorModel','$description','$features','$cost','$retail','$quantity','$filename')");
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


sub untaint {
if($filename =~ m/^(\w+)$/) { die "Tainted filename!"; }
return $1;
}
