const { default: mongoose } = require("mongoose");

const consumerModel = new mongoose.Schema({
    image:String,
    firstname:String,
    lastname:String,
    email:String,
    dateofbirth:String,
    gender:String,
    phone:String,
    status:String,
    createdAt:String
},
{
    timestamps:true
});

export const consumerSchema = mongoose.models.mstconsumers || mongoose.model("mstconsumers", consumerModel);


const otpModel = new mongoose.Schema({
    phone:String,
    otp:String,
    status:String,
    exptime:String,
    createdAt:String
},
{
    timestamps:true
});

export const otpSchema = mongoose.models.mstotps || mongoose.model("mstotps", otpModel);


const productlistModel = new mongoose.Schema({
    mstsellerid:String,
    mstcategoryid:String,
    mstsubcategoryid:String,
    mstproducttypeid:String,
    productname:String,
    producttitledescription:String,
    productmrp:String,
    productquantity:String,
    productdiscount:String,
    igst:String,
    status:String,
    createdAt:String
},
{
    timestamps:true
});

export const productlistSchema = mongoose.models.mstproducts|| mongoose.model("mstproducts", productlistModel);

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

const productinformationModel = new mongoose.Schema({
    mstproductid:String,
    name:String,
    description:String,
    status:String,
    createdAt:String
},
{
    timestamps:true
});

export const productinformationSchema = mongoose.models.mstproductinformations|| mongoose.model("mstproductinformations", productinformationModel);



const productreviewModel = new mongoose.Schema({
    mstproductid:String,
    mstconsumerid:String,
    rate:String,
    description:String,
    status:String,
    createdAt:String
},
{
    timestamps:true
});

export const productreviewSchema = mongoose.models.mstproductreviews|| mongoose.model("mstproductreviews", productreviewModel);


const cartModel = new mongoose.Schema({
    mstproductid:String,
    mstconsumerid:String,
    productquantity:String,
    productmrp:String,
    productdiscount:String,
    productnetprice:String,
    saveaslater:String,
    orderid:String,
    status:String,
    createdAt:String
},
{
    timestamps:true
});

export const cartSchema = mongoose.models.mstcarts|| mongoose.model("mstcarts", cartModel);

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


const consumershippingaddressModel = new mongoose.Schema({
    mstconsumerid:String,
    addresstype:String,
    name:String,
    phone:String,
    pincode:String,
    postoffice:String,
    locality:String,
    building:String,
    landmark:String,
    district:String,
    state:String,
    isdefault:String,
    status:String,
    createdAt:String
},
{
    timestamps:true
});

export const consumershippingaddressSchema = mongoose.models.mstconsumershippingaddresses|| mongoose.model("mstconsumershippingaddresses", consumershippingaddressModel);


const favouritesModel = new mongoose.Schema({
    mstconsumerid:String,
    mstproductid:String,
    status:String,
    createdAt:String
},
{
    timestamps:true
});

export const favouritesSchema = mongoose.models.mstfavourites|| mongoose.model("mstfavourites", favouritesModel);


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

const giftcardModel = new mongoose.Schema({
    image:String,
    title:String,
    description:String,
    status:String,
    createdAt:String
},
{
    timestamps:true
});

export const giftcardsSchema = mongoose.models.mstgiftcards || mongoose.model("mstgiftcards", giftcardModel);

const giftcarddetailsModel = new mongoose.Schema({
    mstconsumerid:String,
    mstgiftcardsid:String,
    image:String,
    amount:String,
    sendername:String,
    senderemail:String,
    status:String,
    createdAt:String
},
{
    timestamps:true
});

export const giftcarddetailsSchema = mongoose.models.mstgiftcarddetails || mongoose.model("mstgiftcarddetails", giftcarddetailsModel);

const giftcardrecipientdetailsModel = new mongoose.Schema({
    mstgiftcardsid:String,
    mstgiftcarddetailsid:String,
    recipientname:String,
    image:String,
    card:String,
    amount:String,
    recipientemail:String,
    recipientmessage:String,
    status:String,
    createdAt:String
},
{
    timestamps:true
});

export const giftcardrecipientdetailsSchema = mongoose.models.mstgiftcardrecipientdetails || mongoose.model("mstgiftcardrecipientdetails", giftcardrecipientdetailsModel);

const giftcardpaymentsModel = new mongoose.Schema({
    mstconsumerid:String,
    mstgiftcardsid:String,
    mstgiftcarddetailsid:String,
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

export const giftcardpaymentsSchema = mongoose.models.mstgiftcardpayments || mongoose.model("mstgiftcardpayments", giftcardpaymentsModel);

const sellerModel = new mongoose.Schema({
    image:String,
    firstname:String,
    lastname:String,
    email:String,
    phone:String,
    status:String,
    password:String,
    storename:String,
    createdAt:String
},
{
    timestamps:true
});

export const sellerSchema = mongoose.models.mstsellers || mongoose.model("mstsellers", sellerModel);
