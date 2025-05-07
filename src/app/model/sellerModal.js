const { default: mongoose } = require("mongoose");

const sellerModel = new mongoose.Schema({
    image:String,
    name:String,
    email:String,
    password:String,
    phone:String,
    whatsapp:String,
    esignature:String,
    esignaturetype:String,
    islogin:String,
    status:String,
    createdAt:String
},
{
    timestamps:true
});

export const sellersSchema = mongoose.models.mstsellers || mongoose.model("mstsellers", sellerModel);

const sellerbusinesdetailsModel = new mongoose.Schema({
    mstsellerid:String,
    enrolmentno:String,
    gstinno:String,
    businessname:String,
    businesstype:String,
    panno:String,
    addressone:String,
    addresstwo:String,
    city:String,
    pin:String,
    postoffice:String,
    state:String,
    landmark:String,
    status:String,
    createdAt:String
},
{
    timestamps:true
});

export const sellerbusinesdetailsSchema = mongoose.models.mstsellerbusinesdetails || mongoose.model("mstsellerbusinesdetails", sellerbusinesdetailsModel);

const sellerbusinepickupdetailsModel = new mongoose.Schema({
    mstsellerid:String,
    addressone:String,
    addresstwo:String,
    city:String,
    pin:String,
    postoffice:String,
    state:String,
    landmark:String,
    status:String,
    createdAt:String
},
{
    timestamps:true
});

export const sellerbusinepickupdetailsSchema = mongoose.models.mstsellerbusinepickupdetails || mongoose.model("mstsellerbusinepickupdetails", sellerbusinepickupdetailsModel);

const sellerbankaccountdetailsModel = new mongoose.Schema({
    mstsellerid:String,
    bankname:String,
    bankaccountnumber:String,
    ifsc:String,
    status:String,
    createdAt:String
},
{
    timestamps:true
});

export const sellerbankaccountdetailsSchema = mongoose.models.mstsellerbankaccountdetails || mongoose.model("mstsellerbankaccountdetails", sellerbankaccountdetailsModel);

const ordersModel = new mongoose.Schema({
    mstconsumerid:String,
    mstconsumershippingaddressesid:String,
    ordertype:String,
    orderamount:String,
    status:String,
    createdAt:String
},
{
    timestamps:true
});

export const ordersSchema = mongoose.models.mstorders|| mongoose.model("mstorders", ordersModel);

const orderproductsModel = new mongoose.Schema({
    mstorderid:String,
    mstproductid:String,
    mstsellerid:String,
    orderproductquantity:String,
    orderproductmrp:String,
    orderproductnetamount:String,
    orderproductdiscount:String,
    status:String,
    createdAt:String
},
{
    timestamps:true
});

export const orderproductsSchema = mongoose.models.mstorderproducts|| mongoose.model("mstorderproducts", orderproductsModel);

const orderpaymentsModel = new mongoose.Schema({
    mstorderid:String,
    mstconsumerid:String,
    ordercreationid:String,
    razorpaypaymentid:String,
    razorpayorderid:String,
    razorpaysignature:String,
    paymenttype:String,
    paymentamount:String,
    paymentstatus:String,
    status:String,
    createdAt:String
},
{
    timestamps:true
});

export const orderpaymentsSchema = mongoose.models.mstorderpayments|| mongoose.model("mstorderpayments", orderpaymentsModel);

const orderproductshippingstatusModel = new mongoose.Schema({
    mstorderid:String,
    mstproductid:String,
    orderproductconfirmedstatus:String,
    orderproductconfirmeddatetime:String,
    orderproductshippingstatus:String,
    orderproductshippingdatetime:String,
    orderproductoutofdeliverystatus:String,
    orderproductoutofdeliverydatetime:String,
    orderproductdeliveredstatus:String,
    orderproductdelivereddatetime:String,
    status:String,
    createdAt:String
},
{
    timestamps:true
});

export const orderproductshippingstatusSchema = mongoose.models.mstorderproductshippingstatuses|| mongoose.model("mstorderproductshippingstatuses", orderproductshippingstatusModel);

const productModel = new mongoose.Schema({
    mstsellerid:String,
    mstcategoryid:String,
    mstsubcategoryid:String,
    mstproducttypeid:String,
    productname:String,
    producttitledescription:String,
    productmrp:String,
    productquantity:String,
    productdiscount:String,
    status:String,
    createdAt:String
},
{
    timestamps:true
});

export const productSchema = mongoose.models.mstproducts|| mongoose.model("mstproducts", productModel);
