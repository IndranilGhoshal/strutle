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
    hsn:String,
    igst:String,
    status:String,
    createdAt:String
},
{
    timestamps:true
});

export const productSchema = mongoose.models.mstproducts|| mongoose.model("mstproducts", productModel);

const productcolorvariantsModel = new mongoose.Schema({
    mstproductid:String,
    status:String,
    createdAt:String
},
{
    timestamps:true
});

export const productcolorvariantsSchema = mongoose.models.mstproductcolorvariants|| mongoose.model("mstproductcolorvariants", productcolorvariantsModel);

const productcolorvariantsvaluesModel = new mongoose.Schema({
    mstproductid:String,
    mstproductcolorvariantid:String,
    mstproductimagesid:String,
    colorname:String,
    status:String,
    createdAt:String
},
{
    timestamps:true
});

export const productcolorvariantsvaluesSchema = mongoose.models.mstproductcolorvariantsvalues|| mongoose.model("mstproductcolorvariantsvalues", productcolorvariantsvaluesModel);

const productimageModel = new mongoose.Schema({
    mstproductid:String,
    productimage:String,
    productmainimage:String,
    status:String,
    createdAt:String
},
{
    timestamps:true
});

export const productimageSchema = mongoose.models.mstproductimages|| mongoose.model("mstproductimages", productimageModel);

const productotherattributesModel = new mongoose.Schema({
    mstproductid:String,
    labelname:String,
    status:String,
    createdAt:String
},
{
    timestamps:true
});

export const productotherattributesSchema = mongoose.models.mstproductotherattributes|| mongoose.model("mstproductotherattributes", productotherattributesModel);

const productotherattributevaluesModel = new mongoose.Schema({
    mstproductid:String,
    mstproductotherattributesid:String,
    value:String,
    status:String,
    createdAt:String
},
{
    timestamps:true
});

export const productotherattributevaluesSchema = mongoose.models.mstproductotherattributevalues|| mongoose.model("mstproductotherattributevalues", productotherattributevaluesModel);


const privacypoliciesModel = new mongoose.Schema({
    usertype:String,
    htmlcode:String,
    status:String,
    createdAt:String,
    updatedAt:String
},
{
    timestamps:true
});

export const privacypoliciesSchema = mongoose.models.mstprivacypolicies || mongoose.model("mstprivacypolicies", privacypoliciesModel);

const termsconditionsModel = new mongoose.Schema({
    usertype:String,
    htmlcode:String,
    status:String,
    createdAt:String,
    updatedAt:String
},
{
    timestamps:true
});

export const termsconditionsSchema = mongoose.models.msttermsconditions || mongoose.model("msttermsconditions", termsconditionsModel);
