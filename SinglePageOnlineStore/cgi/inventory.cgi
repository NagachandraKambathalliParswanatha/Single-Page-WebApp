use CGI;
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

print <<END;
Content-type: text/html\n\n
<html>
<head>
    <meta charset="utf-8">
    <title>Menu page</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <script src="/~jadrn053/proj1/ajax_get_lib.js"></script>
    <script src="/~jadrn053/proj1/tab_example.js"></script>
    <script src="/~jadrn053/proj1/edit_validation.js"></script>
    <link rel="stylesheet" href="/~jadrn053/proj1/login.css"/>
</head>
<body>
<div class="example3">
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">

        <a class="navbar-brand" href="#">
        <!--<span class="text-light"> <img src="/~jadrn053/proj1/camera_lrg.png" width="30" height="30" class="d-inline-block align-top" alt="">
                    Online Store
                </span>-->
            <span class="text-light">
                <img src="/~jadrn053/proj1/CameraMart.jpg" width="40" height="40" class="d-inline-block align-top" alt=""> CameraMart
            </span>
            </a>

        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
            <ul class="navbar-nav mr-auto">
            </ul>
            <ul class="nav navbar-nav navbar-right">
                <li class="active"><a href="/perl/jadrn053/logout.cgi"><span id = "logout" class="text-light"><b>Logout</b><span></a></li>
            </ul>
        </div>
    </nav>
</div>
</br></br></br>
<div class="container">
    <div id="tabs">
        <ul class="nav nav-tabs">
            <li class="nav-item"><a class="nav-link text-secondary" id = "newtab" href="#tabs-1">Add Inventory</a></li>
            <li class="nav-item"><a class="nav-link text-secondary" id  = "tabedit" href="#tabs-2">Edit Inventory</a></li>
            <li class="nav-item"><a class="nav-link text-secondary" id =  "deltab" href="#tabs-3">Delete Inventory</a></li>
        </ul>

            <div id="tabs-1" class="container"><br>
                <h1 class="well">Add Inventory</h1>
                        <form id = "Add_inventory_form">
                                <div class="row">
                                    <div class="col-sm-6 form-group">
                                        <label class="form-label" for="sku">SKU</label>
                                        <input type="text" placeholder="Enter SKU" class="form-control" name="sku" id="sku" required/>
                                    </div>
                                     <div class="col-sm-6 form-group">
                                        <label class="form-label" for="description">Description</label>
                                        <input type="text" placeholder="Enter description" class="form-control" name="description" id="description required" />
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-6 form-group">
                                        <label class="form-label" for="categories">Enter Category</label>
                                        <select id="categories" class="form-control" required name="categories">
                                            <option value = "0" selected>select</option>
                                            <option value="1">DSLR</option>
                                            <option value="2">Point and shoot</option>
                                            <option value="3">Advanced Amateur</option>
                                            <option value="4">Underwater</option>
                                            <option value="5">Film</option>
                                            <option value="6">mirrorless</option>
                                            <option value="7">superzoom</option>
                                        </select>
                                    </div>
                                    <div class="col-sm-6 form-group">
                                        <label class="form-label" for="Cost">Cost</label>
                                        <input type="text" step = "any" placeholder="Enter Cost..." class="form-control" name="cost" id="cost" required/>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-6 form-group">
                                        <label class="form-label" for="vendor">Enter Vendor</label>
                                        <select id="vendor" class="form-control" required name="vendor" required>
                                            <option value="0" selected>select</option>
                                            <option value="1">Nikon</option>
                                            <option value="2">Canon</option>
                                            <option value="3">Olympus</option>
                                            <option value="4">Lumix</option>
                                            <option value="5">Pentax</option>
                                            <option value="6">Leica</option>
                                            <option value="7">Sony</option>
                                            <option value="8">Fuji</option>
                                        </select>
                                    </div>
                                    <div class="col-sm-6 form-group">
                                        <label class="form-label" for="retail">Retail</label>
                                        <input type="number" step = "any" placeholder="Enter Retail Price..." class="form-control" name="retail" id="retail" required/>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-6 form-group">
                                        <label class="form-label" for="ManufacturerId">Manufacturer's Identification</label>
                                        <input type="text" placeholder="Enter MID" class="form-control" name="ManufacturerId" id="ManufacturerId" required/>
                                    </div>
                                    <div class="col-sm-6 form-group">
                                        <label class="form-label" for="Quantity">Quantity</label>
                                        <input type="number" placeholder="Enter Quantity..." class="form-control" name="Quantity" id="Quantity" required/>
                                    </div>
                                </div>
                                <div class="row">

                                    <div class="col-sm-6 form-group">
                                        <label class="form-label" for="features">Features</label>
                                        <textarea placeholder="Enter features..." class="form-control" name="features" id="features" required></textarea>
                                    </div>
                                    <div class="col-sm-6 form-group">

                                        <label class="form-label" for="product_image">Product Image</label>
                                        <br>

                                        <input type="file" name="product_image" accept=".png, .jpg, .jpeg" value="product_image" id="product_image">

                                    </div>
                                </div>
                                <div class="row">
                                     <div class="col">
                                        <div class="form-group">

                                            <span id="status"></span>
                                            <br></br>
                                            <span id="message"></span>

                                        </div>
                                     </div>
                                </div>

                                <div class="col-sm-6 form-group">
                                        <img id = "pic" alt="Image" width="200px" height="120px" />
                                </div>


                            <button id="button" class="btn btn-lg btn-info" type="reset">Clear</button>
                            <input type="submit" id = "addInventorySubmit" class="btn btn-lg btn-info" value = "Submit"/>
                        </form>

            </div>

            <div id="tabs-2" class="container"><br>
                <h1 class="well">Edit Inventory</h1>
                    <form id = "edit_inventory_form">
                        <div class="row">
                            <div class="col-sm-6 form-group">
                                <label class="form-label" for="skuE">SKU</label>
                                <input type="text" placeholder="Enter SKU" class="form-control" name="skuE" id="skuE" required/>
                            </div>
                             <div class="col-sm-6 form-group">
                                <label class="form-label" for="Editdescription">Description</label>
                                <input type="text" placeholder="Enter description" class="form-control" name="Editdescription" id="Editdescription" required/>
                            </div>

                        </div>
                        <div class="row">
                            <div class="col-sm-6 form-group">
                                <label class="form-label" for="Editcategories">Enter Category</label>
                                <select id="Editcategories" class="form-control" name="Editcategories" required>
                                     <option value = "0" selected>select</option>
                                            <option value="1">DSLR</option>
                                            <option value="2">Point and shoot</option>
                                            <option value="3">Advanced Amateur</option>
                                            <option value="4">Underwater</option>
                                            <option value="5">Film</option>
                                            <option value="6">mirrorless</option>
                                            <option value="7">superzoom</option>
                                </select>
                            </div>
                            <div class="col-sm-6 form-group">
                                <label class="form-label" for="Editcost">Cost</label>
                                <input type="number" step = "any" placeholder="Enter Cost..." class="form-control" name="Editcost" id="Editcost" required/>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6 form-group">
                                <label class="form-label" for="Editvendor">Enter Vendor</label>
                                <select id="Editvendor" class="form-control" required name="Editvendor" required>
                                            <option value="0" selected>select</option>
                                            <option value="1">Nikon</option>
                                            <option value="2">Canon</option>
                                            <option value="3">Olympus</option>
                                            <option value="4">Lumix</option>
                                            <option value="5">Pentax</option>
                                            <option value="6">Leica</option>
                                            <option value="7">Sony</option>
                                            <option value="8">Fuji</option>
                                </select>
                            </div>
                            <div class="col-sm-6 form-group">
                                <label class="form-label" for="Editretail">Retail</label>
                                <input type="number" step = "any" placeholder="Enter Retail Price..." class="form-control" name="Editretail" id="Editretail" required />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6 form-group">
                                <label class="form-label" for="EditManufacturer">Manufacturer's Identification</label>
                                <input type="text" placeholder="Enter MID" class="form-control" name="EditManufacturer" id="EditManufacturer" required/>
                            </div>
                            <div class="col-sm-6 form-group">
                                <label class="form-label" for="EditQuantity">Qauntity</label>
                                <input type="number" placeholder="Enter Qauntity..." class="form-control" name="EditQuantity" id="EditQuantity" required />
                            </div>
                        </div>
                        <div class="row">

                            <div class="col-sm-6 form-group">
                                <label class="form-label" for="Editfeatures">Features</label>
                                <textarea placeholder="Enter features..." class="form-control" name="Editfeatures" id="Editfeatures" required ></textarea>
                            </div>
                            <div class="row">
                                <div class="col-sm-6 form-group">
                                    <input type="hidden"  name="Editfilename" id="Editfilename">
                                </div>
                            </div>
                            <div class="col-sm-6 form-group">

                                <label class="form-label" for="fileupload">Product Image</label>
                                <br>
                                <input type="file"  name="product_image_edit" accept=".png, .jpg, .jpeg" value="fileupload" id="product_image_edit">
                            </div>
                        </div>
                        <div class="row">
                        <div class="col">
                            <div class="form-group">

                                <span id="statusE"></span>
                                <br></br>
                                <span id="messageE"></span>

                            </div>
                        </div>
                        </div>
                        <div class="row">
                             <div class="col-sm-6 form-group">

                                        <img id = "picE1" src="#" alt="image" style="width:150px; height:150px;"></img>
                             </div>

                        </div>
                        <button id="buttonEdit" class="btn btn-lg btn-info" type="reset">Clear</button>
                        <input type="submit" id = "editInventorySubmit" class="btn btn-lg btn-info" value = "Update"/>
                    </form>

            </div>

            <div id="tabs-3" class="container"><br>
                <h1 class="well">Delete Inventory</h1>
                <form id = "delete_inventory_form">
                    <div class="row">
                        <div class="col-sm-6 form-group">
                            <label class="form-label" for="sku">SKU</label>
                            <input type="text" placeholder="Enter SKU" class="form-control" name="skuForDel" id="skuForDel" required/>
                        </div>

                            <div class="col-sm-6 form-group">
                                <label class="form-label" for="Deldescription">Description</label>
                                <input type="text" placeholder="Enter description" class="form-control" name="Deldescription" id="Deldescription" />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6 form-group">
                                <label class="form-label" for="Delcategories">Enter Category</label>
                                <select id="Delcategories" class="form-control"  name="Delcategories">
                                    <option selected>select</option>
                                    <option value="1">A</option>
                                    <option value="2">B</option>
                                    <option value="3">C</option>
                                    <option value="4">D</option>
                                    <option value="5">E</option>
                                    <option value="6">F</option>
                                    <option value="7">G</option>
                                </select>
                            </div>
                            <div class="col-sm-6 form-group">
                                <label class="form-label" for="Delcost">Cost</label>
                                <input type="text" placeholder="Enter Cost..." class="form-control" name="Delcost" id="Delcost" />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6 form-group">
                                <label class="form-label" for="Delvendor">Enter Vendor</label>
                                <select id="Delvendor" class="form-control"  name="Delvendor">
                                    <option selected>select</option>
                                    <option value="1">A</option>
                                    <option value="2">B</option>
                                    <option value="3">C</option>
                                    <option value="4">D</option>
                                    <option value="5">E</option>
                                    <option value="6">F</option>
                                    <option value="7">G</option>
                                </select>
                            </div>
                            <div class="col-sm-6 form-group">
                                <label class="form-label" for="Delretail">Retail</label>
                                <input type="text" placeholder="Enter Retail Price..." class="form-control" name="Delretail" id="Delretail" />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6 form-group">
                                <label class="form-label" for="DelManufacturer">Manufacturer's Identification</label>
                                <input type="text" placeholder="Enter MID" class="form-control" name="DelManufacturer" id="DelManufacturer" />
                            </div>
                            <div class="col-sm-6 form-group">
                                <label class="form-label" for="DelQuantity">Qauntity</label>
                                <input type="text" placeholder="Enter Qauntity..." class="form-control" name="DelQuantity" id="DelQuantity" />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6 form-group">
                                <label class="form-label" for="Delfeatures">Features</label>
                                <textarea placeholder="Enter features..." class="form-control" name="Delfeatures" id="Delfeatures" ></textarea>
                            </div>

                        </div>
                        <div class="row">
                            <div class="col-sm-6 form-group">
                                <input type="hidden"  name="Delfilename" id="Delfilename">
                            </div>
                        </div>
                        <div class="row">
                        <div class="col">
                            <div class="form-group">

                                <span id="statusD"></span>
                                <br></br>
                                <span id="messageD"></span>

                            </div>
                        </div>
                        </div>
                        <div class="row">
                             <div class="col-sm-6 form-group">

                                       <img id = "picD1" src="#" alt="image" style="width:150px; height:150px;"></img>
                             </div>

                        </div>

                        <button id="buttonDel" class="btn btn-lg btn-info" type="reset">Clear</button>
                        <input type="submit" id = "deleteInventorySubmit" class="btn btn-lg btn-info" value = "Delete"/>
                </form>

            </div>





    </div>



</div>

</body>
</html>
END
