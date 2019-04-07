#!/usr/bin/perl
use CGI;
use DBI;
use File::Basename;
use CGI::Carp qw (fatalsToBrowser);

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
my $sku = $q->param("skuE");
my $catID = $q->param("Editcategories");
my $venID = $q->param("Editvendor");
my $quantity = $q->param("EditQuantity");
my $vendorModel = $q->param("EditManufacturer");
my $cost = $q->param("Editcost");
my $retail = $q->param("Editretail");
my $description = $q->param("Editdescription");
my $features = $q->param("Editfeatures");
my $filename = $q->param("product_image_edit");

if($filename != "")
{

    unless ($filename) {
        $response = "There was a problem uploading the image;
        it's probably too big";
        die "There was a problem uploading the image; " .
                "it's probably too big.";
    }
    my ($name, $path, $extension) = fileparse($filename, '\.[^\.]*');
    $filename = $sku.$extension;
    $filename =~ s/ //; #remove any spaces
    if ($filename !~ /^([$safe_filename_chars]+)$/) {
        die "Sorry, invalid character in the filename.";
        $response = "Sorry, invalid character in the filename.";
    }

    $filename = untaint($filename);
    # get a handle on the uploaded image
    my $filehandle = $q->upload("product_image_edit");
    unless ($filehandle) {die "Invalid handle";}

    # save the file
    open UPLOADFILE, ">$upload_dir/$filename" or die
        "Error, cannot save the file.";
    binmode UPLOADFILE;
    while (<$filehandle>) {
        print UPLOADFILE $_;
    }
    close UPLOADFILE;

    $query = "UPDATE product SET catID = '$catID',venID ='$venID',vendorModel ='$vendorModel',description = '$description',features ='$features',cost = '$cost',retail= '$retail',quantity= '$quantity' where sku = '$sku'";

    sub untaint {
        if ($filename =~ m/^(\w+)$/) {die "Tainted filename!";}
        return $1;
    }

}
else
{
    $query = "UPDATE product SET catID = '$catID',venID ='$venID',vendorModel ='$vendorModel',description = '$description',features ='$features',cost = '$cost',retail= '$retail',quantity= '$quantity' where sku = '$sku'";

}


my $sth = $dbh->prepare($query);
$sth->execute();
my $number_of_rows = $sth->rows;
$sth->finish();
$dbh->disconnect();
if ($number_of_rows == 0) {
    $response = "ERROR";
}
else {
    $response = "OK";
}

print "content-type: text/html\n\n";
print $response;








