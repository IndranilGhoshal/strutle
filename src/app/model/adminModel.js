const { default: mongoose } = require("mongoose");

const adminModel = new mongoose.Schema({
    mstroleid:String,
    image:String,
    firstname:String,
    lastname:String,
    email:String,
    countryname:String,
    countrycode:String,
    dialCode:String,
    phone:String,
    status:String,
    password:String,
    isfirstlogin:String,
    createdby:String,
    createdAt:String
},
{
    timestamps:true
});

export const adminSchema = mongoose.models.mstadmins || mongoose.model("mstadmins", adminModel);


const adminRoleModel = new mongoose.Schema({
    mstAdminsId:String,
    mstRolesId:String
});

export const adminRoleSchema = mongoose.models.mstadminroles || mongoose.model("mstadminroles", adminRoleModel);

const adminRoleMenuModel = new mongoose.Schema({
    mstRolesId:String,
    mstMenusId:String,
    isEdit:String,
    isView:String,
    isDelete:String
});

export const adminRoleMenuSchema = mongoose.models.mstrolespermissions || mongoose.model("mstrolespermissions", adminRoleMenuModel);


const adminMenuModel = new mongoose.Schema({
    menuName:String,
    menuIcon:String,
    menuUrl:String,
    status:String
});

export const adminMenuSchema = mongoose.models.mstmenus || mongoose.model("mstmenus", adminMenuModel);

const roleModel = new mongoose.Schema({
    role:String,
    roletype:String,
    status:String,
    createdAt:Date
},
{
    timestamps:true
});

export const roleSchema = mongoose.models.mstroles || mongoose.model("mstroles", roleModel);

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

const giftcardimageModel = new mongoose.Schema({
    mstgiftcardsid:String,
    image:String,
    status:String,
    createdAt:String
},
{
    timestamps:true
});

export const giftcardimagesSchema = mongoose.models.mstgiftcardimages || mongoose.model("mstgiftcardimages", giftcardimageModel);

const giftcardamountModel = new mongoose.Schema({
    mstgiftcardsid:String,
    amount:String,
    status:String,
    createdAt:String
},
{
    timestamps:true
});

export const giftcardamountsSchema = mongoose.models.mstgiftcardamounts || mongoose.model("mstgiftcardamounts", giftcardamountModel);


const adminSubMenuModel = new mongoose.Schema({
    mstmenuid:String,
    submenuname:String,
    submenuicon:String,
    submenurl:String,
    status:String
});

export const adminSubMenuSchema = mongoose.models.mstsubmenus || mongoose.model("mstsubmenus", adminSubMenuModel);


const categoryModel = new mongoose.Schema({
    name:String,
    image:String,
    status:String,
    createdAt:String
},{
    timestamps:true
});

export const categorySchema = mongoose.models.mstcategories || mongoose.model("mstcategories", categoryModel);


const subCategoryModel = new mongoose.Schema({
    mstcategoryid:String,
    name:String,
    image:String,
    status:String,
    createdAt:String
},{
    timestamps:true
});

export const subCategorySchema = mongoose.models.mstsubcategories || mongoose.model("mstsubcategories", subCategoryModel);


const productTypeModel = new mongoose.Schema({
    mstcategoryid:String,
    mstsubcategoryid:String,
    name:String,
    image:String,
    status:String,
    createdAt:String
},{
    timestamps:true
});

export const productTypesSchema = mongoose.models.mstproducttypes || mongoose.model("mstproducttypes", productTypeModel);


const productTypeAttributeModel = new mongoose.Schema({
    mstproducttypeid:String,
    fieldname:String,
    isdefault:String,
    ismandatory:String,
    isfilter:String,
    fieldinputtype:String,
    maxvalue:String,
    maxfile:String,
    status:String,
    accordionarray:Array,
    createdAt:String
},{
    timestamps:true
});

export const productTypesAttributeSchema = mongoose.models.mstproducttypeattributes || mongoose.model("mstproducttypeattributes", productTypeAttributeModel);

const productTypeAttributeValueModel = new mongoose.Schema({
    mstproducttypeattributeid:String,
    name:String,
    status:String,
    createdAt:String
},{
    timestamps:true
});

export const productTypesAttributeValueSchema = mongoose.models.mstproducttypeattributevalues || mongoose.model("mstproducttypeattributevalues", productTypeAttributeValueModel);


const sellerModel = new mongoose.Schema({
    image:String,
    name:String,
    email:String,
    password:String,
    phone:String,
    whatsapp:String,
    esignature:String,
    status:String,
    createdAt:String
},
{
    timestamps:true
});

export const sellerSchema = mongoose.models.mstsellers || mongoose.model("mstsellers", sellerModel);


const partnerModel = new mongoose.Schema({
    image:String,
    firstname:String,
    lastname:String,
    email:String,
    phone:String,
    status:String,
    password:String,
    createdAt:String
},
{
    timestamps:true
});

export const partnerSchema = mongoose.models.mstpartners || mongoose.model("mstpartners", partnerModel);


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


const privacypoliciesModel = new mongoose.Schema({
    usertype:String,
    htmlcode:String,
    status:String,
    createdAt:String
},
{
    timestamps:true
});

export const privacypoliciesSchema = mongoose.models.mstprivacypolicies || mongoose.model("mstprivacypolicies", privacypoliciesModel);


const termsconditionsModel = new mongoose.Schema({
    usertype:String,
    htmlcode:String,
    status:String,
    createdAt:String
},
{
    timestamps:true
});

export const termsconditionsSchema = mongoose.models.msttermsconditions || mongoose.model("msttermsconditions", termsconditionsModel);


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


const faqsModel = new mongoose.Schema({
    question:String,
    answer:String,
    status:String,
    createdAt:String
},
{
    timestamps:true
});

export const faqsSchema = mongoose.models.mstfaqs|| mongoose.model("mstfaqs", faqsModel);
